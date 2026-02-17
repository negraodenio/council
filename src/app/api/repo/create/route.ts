import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Optimized for Vercel Edge Runtime for faster cold starts and lower latency
export const runtime = 'edge';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
        auth: { persistSession: false }, // Faster for one-off API calls
    }
);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { tenant_id, user_id, repo_url, repo_name } = body;

        // Strict validation for production
        if (!tenant_id || !user_id || !repo_url) {
            return NextResponse.json(
                { error: 'Missing required fields: tenant_id, user_id, and repo_url are mandatory.' },
                { status: 400 }
            );
        }

        // Validate repo_url format
        try {
            new URL(repo_url);
        } catch {
            return NextResponse.json({ error: 'Invalid repository URL format.' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('repositories')
            .insert({
                tenant_id,
                user_id,
                repo_url,
                repo_name: repo_name || repo_url.split('/').pop()?.replace('.git', '') || 'unnamed-repo',
                default_branch: 'main',
                status: 'active'
            })
            .select('*')
            .single();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({
            repo: data,
            message: 'Repository registered successfully in intelligence layer.'
        });
    } catch (err: any) {
        return NextResponse.json({ error: 'Internal server error: ' + err.message }, { status: 500 });
    }
}
