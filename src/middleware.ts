import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export async function middleware(req: NextRequest) {
    let supabaseResponse = NextResponse.next({ request: req });

    // 1) Rate Limiting (only if Redis env vars are available)
    if (req.nextUrl.pathname.startsWith('/api/')) {
        try {
            const redis = Redis.fromEnv();
            const ratelimit = new Ratelimit({
                redis,
                limiter: Ratelimit.slidingWindow(30, '1 m'),
                analytics: true,
                prefix: 'councilia:rl'
            });

            const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'anonymous';
            const { success } = await ratelimit.limit(ip);
            if (!success) {
                return NextResponse.json({ error: 'Rate limited' }, { status: 429 });
            }
        } catch (error) {
            // If Redis is not configured, skip rate limiting but allow the request
            console.warn('Redis not configured, skipping rate limiting:', error);
        }
    }

    // 2) Supabase Session Refresh (only if Supabase env vars are available)
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseAnonKey) {
            console.warn('Supabase credentials missing in middleware, skipping session refresh');
            return supabaseResponse;
        }

        const supabase = createServerClient(
            supabaseUrl,
            supabaseAnonKey,
            {
                cookies: {
                    getAll() {
                        return req.cookies.getAll();
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value));
                        supabaseResponse = NextResponse.next({ request: req });
                        cookiesToSet.forEach(({ name, value, options }) =>
                            supabaseResponse.cookies.set(name, value, options)
                        );
                    },
                },
            }
        );

        const { data: { user } } = await supabase.auth.getUser();

        // 3) Route Protection
        const protectedPaths = ['/chamber', '/report', '/api/session', '/api/patch', '/api/repo', '/api/rag'];
        const isProtected = protectedPaths.some(p => req.nextUrl.pathname.startsWith(p));

        if (isProtected && !user) {
            const redirectUrl = req.nextUrl.clone();
            redirectUrl.pathname = '/login';
            redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname);
            return NextResponse.redirect(redirectUrl);
        }
    } catch (error) {
        console.error('Middleware Supabase error:', error);
        // Continue processing the request even if Supabase fails
    }

    return supabaseResponse;
}

export const config = {
    matcher: [
        // Only run middleware on protected routes
        '/chamber/:path*',
        '/report/:path*',
        '/dashboard/:path*',
        '/api/session/:path*',
        '/api/patch/:path*',
        '/api/repo/:path*',
        '/api/rag/:path*',
    ],
};
