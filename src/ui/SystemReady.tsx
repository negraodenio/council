'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function SystemReady() {
    const router = useRouter();
    const [idea, setIdea] = useState('');
    const [loading, setLoading] = useState(false);

    const supabase = createClient();
    const [userId, setUserId] = useState('');
    const [tenantId, setTenantId] = useState('');

    useEffect(() => {
        (async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;
            setUserId(user.id);

            // Note: Assuming 'profiles' table exists as per prompts
            const { data: profile } = await supabase
                .from('profiles')
                .select('tenant_id')
                .eq('id', user.id)
                .single();

            if (profile) setTenantId(profile.tenant_id);
        })();
    }, []);

    async function start() {
        setLoading(true);
        try {
            const res = await fetch('/api/session/start', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    idea: idea || 'Describe your objective…',
                    topic: 'CouncilIA Live Debate',
                    region: 'EU',
                    sensitivity: 'business',
                    tenant_id: tenantId,
                    user_id: userId
                })
            });

            const data = await res.json();
            if (!data?.runId) throw new Error('Missing runId from /api/session/start');

            router.push(`/chamber/${data.runId}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-[#0f172a] text-slate-100 min-h-screen flex flex-col font-sans">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-white/5 backdrop-blur sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="bg-[#163a9c] p-2 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(22,58,156,0.6)]">
                        <span className="text-white text-xl">⌘</span>
                    </div>
                    <h1 className="text-xl font-bold tracking-widest text-white uppercase">Councilia</h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex flex-col items-end">
                        <span className="text-[10px] text-sky-400 font-bold tracking-tighter uppercase">System Status</span>
                        <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium uppercase tracking-widest">
                            <span className="h-2 w-2 rounded-full bg-emerald-400" /> Online
                        </span>
                    </div>
                    <div className="h-10 w-10 rounded-full border-2 border-purple-500 p-0.5">
                        <div className="h-full w-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                            <span className="text-slate-400">👤</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-8">
                {/* Hero */}
                <div className="mb-8">
                    <p className="text-sky-400 font-bold text-sm tracking-[0.2em] mb-2 uppercase">
                        Sequence 01 // Initialization
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                        SYSTEM_READY:{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-500">
                            INITIALIZE SESSION
                        </span>
                    </h2>
                </div>

                {/* Data sovereignty marketing block */}
                <div className="mb-8 p-5 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-xs font-bold uppercase tracking-[0.22em] text-slate-300">
                        Data sovereignty
                    </div>
                    <div className="mt-2 text-sm text-slate-200 leading-relaxed">
                        EU‑first routing for sensitive requests, with policy-controlled retention and a hardened audit trail.
                    </div>
                    <div className="mt-3 text-xs text-slate-400">
                        Tip: enable “Strict Privacy (L3)” when handling PII/regulated/code.
                    </div>
                </div>

                {/* Input */}
                <div className="relative group mb-8">
                    <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-purple-500 rounded-xl blur opacity-25 group-focus-within:opacity-60 transition duration-500" />
                    <div className="relative bg-white/5 rounded-xl overflow-hidden p-1 border border-white/10">
                        <textarea
                            className="w-full bg-slate-900/50 border-0 focus:ring-0 text-white placeholder:text-slate-500 p-6 text-lg min-h-[180px] font-light leading-relaxed resize-none"
                            placeholder="Describe your objective..."
                            value={idea}
                            onChange={(e) => setIdea(e.target.value)}
                        />
                        <div className="flex justify-between items-center px-6 py-3 bg-slate-900/80 border-t border-white/5">
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                                Input Buffer: {(idea.length / 1024).toFixed(2)}kb
                            </span>
                            <div className="flex gap-4">
                                <button className="text-slate-400 hover:text-white transition-colors" type="button">
                                    📎
                                </button>
                                <button className="text-slate-400 hover:text-white transition-colors" type="button">
                                    🎙
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-10 flex flex-col items-center">
                    <button
                        onClick={start}
                        disabled={loading}
                        className="w-full md:w-auto px-12 py-5 bg-gradient-to-r from-purple-500 to-sky-400 rounded-xl text-white font-bold text-lg uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(124,58,237,0.4)] hover:shadow-[0_15px_40px_rgba(124,58,237,0.6)] hover:-translate-y-1 transition-all disabled:opacity-60"
                    >
                        {loading ? 'Executing…' : 'Execute Session'}
                    </button>
                    <p className="mt-4 text-slate-500 text-xs font-mono uppercase tracking-widest">
                        Protocol 2.4.9-alpha // Authorized users only
                    </p>
                </div>
            </main>

            {/* Bottom nav */}
            <nav className="bg-white/5 border-t border-white/10 py-4 px-8 mt-auto sticky bottom-0 z-50">
                <div className="max-w-xl mx-auto flex justify-between items-center">
                    <a className="flex flex-col items-center gap-1 text-sky-400" href="/dashboard">
                        <span className="text-2xl">⌂</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Dashboard</span>
                    </a>
                    <a className="flex flex-col items-center gap-1 text-slate-500 hover:text-white" href="/marketplace">
                        <span className="text-2xl">🛍</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Marketplace</span>
                    </a>
                    <a className="flex flex-col items-center gap-1 text-slate-500 hover:text-white" href="#">
                        <span className="text-2xl">⌗</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Vault</span>
                    </a>
                    <a className="flex flex-col items-center gap-1 text-slate-500 hover:text-white" href="#">
                        <span className="text-2xl">⚙</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Node</span>
                    </a>
                </div>
            </nav>
        </div>
    );
}
