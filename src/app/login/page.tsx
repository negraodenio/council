'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const supabase = createClient();

    async function handleLogin() {
        setLoading(true);
        setError('');
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) {
            setError(err.message);
            setLoading(false);
            return;
        }
        router.push('/');
    }

    async function handleSignup() {
        setLoading(true);
        setError('');
        const { error: err } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || window.location.origin}/api/auth/callback`,
            }
        });
        if (err) {
            setError(err.message);
            setLoading(false);
            return;
        }
        setError('Check your email to confirm signup!');
        setLoading(false);
    }

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-white mb-6">CouncilIA Login</h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900/50 border border-white/10 rounded p-3 text-white mb-4"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-900/50 border border-white/10 rounded p-3 text-white mb-4"
                />

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded mb-4 text-sm animate-in fade-in slide-in-from-top-1">
                        {error}
                    </div>
                )}

                <div className="flex gap-3 mb-6">
                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold py-3 rounded-lg disabled:opacity-50 hover:shadow-lg hover:shadow-purple-500/30 transition-all active:scale-95"
                    >
                        {loading && !error ? 'Processing...' : 'Login'}
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
                        If you get "Database error", run the SQL migration in Supabase.<br />
                        If you see "Invalid credentials", make sure you have signed up first.
                    </p>
                </div>
            </div>
        </div>
    );
}
