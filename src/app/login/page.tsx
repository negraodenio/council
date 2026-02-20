'use client';

import { useEffect, useState, Suspense } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const supabase = createClient();

    const redirectTo = searchParams.get('redirect') || '/new';
    const checkout = searchParams.get('checkout');

    async function handleLogin() {
        setLoading(true);
        setError('');
        setInfo('');
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) {
            setError(err.message);
            setLoading(false);
            return;
        }

        const finalRedirect = checkout ? `${redirectTo}?checkout=${checkout}` : redirectTo;
        router.push(finalRedirect);
    }

    async function handleSignup() {
        setLoading(true);
        setError('');
        setInfo('');

        const finalNext = checkout ? `${redirectTo}?checkout=${checkout}` : redirectTo;
        const confirmUrl = `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(finalNext)}`;

        const { error: err } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: confirmUrl,
            },
        });
        if (err) {
            setError(err.message);
            setLoading(false);
            return;
        }
        setInfo('Check your email to confirm signup!');
        setLoading(false);
    }

    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-8 w-full max-w-md">
            <h1 className="text-2xl font-bold text-white mb-6">CouncilIA Login</h1>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full bg-slate-900/50 border border-white/10 rounded p-3 text-white mb-4"
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full bg-slate-900/50 border border-white/10 rounded p-3 text-white mb-4"
            />

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded mb-4 text-sm">
                    {error}
                </div>
            )}

            {info && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3 rounded mb-4 text-sm">
                    {info}
                </div>
            )}

            <div className="flex gap-3 mb-6">
                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold py-3 rounded-lg disabled:opacity-50 hover:shadow-lg hover:shadow-purple-500/30 transition-all active:scale-95"
                >
                    {loading ? 'Processing...' : 'Login'}
                </button>
                <button
                    onClick={handleSignup}
                    disabled={loading}
                    className="flex-1 bg-white/5 border border-white/10 text-white font-bold py-3 rounded-lg disabled:opacity-50 hover:bg-white/10 transition-all active:scale-95"
                >
                    Signup
                </button>
            </div>

            <div className="text-center">
                <p className="text-slate-500 text-xs">
                    Secure authentication powered by Supabase
                </p>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
            <Suspense fallback={<div className="text-white/50 animate-pulse">Loading CouncilIA...</div>}>
                <LoginForm />
            </Suspense>
        </div>
    );
}
