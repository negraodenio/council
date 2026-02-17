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
        const { error: err } = await supabase.auth.signUp({ email, password });
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

                {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

                <div className="flex gap-3">
                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-sky-400 text-white font-bold py-3 rounded disabled:opacity-50"
                    >
                        Login
                    </button>
                    <button
                        onClick={handleSignup}
                        disabled={loading}
                        className="flex-1 bg-white/10 text-white font-bold py-3 rounded disabled:opacity-50"
                    >
                        Signup
                    </button>
                </div>
            </div>
        </div>
    );
}
