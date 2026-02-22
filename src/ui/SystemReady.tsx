'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { t, resolveUILang, type UILang } from '@/lib/i18n/ui-strings';

const EXPERTS = [
    { emoji: '\u{1F52E}', key: 'visionary', color: '#A855F7' },
    { emoji: '\u2699\uFE0F', key: 'technologist', color: '#06B6D4' },
    { emoji: '\u{1F608}', key: 'devil', color: '#EF4444' },
    { emoji: '\u{1F4CA}', key: 'marketeer', color: '#22C55E' },
    { emoji: '\u2696\uFE0F', key: 'ethicist', color: '#F59E0B' },
    { emoji: '\u{1F4B0}', key: 'financier', color: '#3B82F6' },
];

export default function SystemReady() {
    const router = useRouter();
    const [idea, setIdea] = useState('');
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [tenantId, setTenantId] = useState('');
    const [lang] = useState<UILang>(() =>
        resolveUILang(typeof navigator !== 'undefined' ? navigator.language : 'en')
    );

    const [profileLoading, setProfileLoading] = useState(true);
    const [showUpgrade, setShowUpgrade] = useState(false);
    const [debugInfo, setDebugInfo] = useState<any>(null);

    useEffect(() => {
        const supabase = createClient();
        (async () => {
            setProfileLoading(true);
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                setProfileLoading(false);
                return;
            }
            setUserId(user.id);
            const { data: profile } = await supabase
                .from('profiles')
                .select('tenant_id')
                .eq('id', user.id)
                .single();
            if (profile) setTenantId(profile.tenant_id);
            setProfileLoading(false);
        })();
    }, []);

    async function start() {
        setLoading(true);
        try {
            const payload = {
                idea: idea || t(lang, 'sys_placeholder'),
                topic: 'CouncilIA Live Debate',
                region: 'EU',
                sensitivity: 'business',
                tenant_id: tenantId,
                user_id: userId,
            };

            const res = await fetch('/api/session/start', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.status === 403 && data.error === 'LIMIT_REACHED') {
                console.warn('[Limit Reached] Debug info:', data.debug);
                setDebugInfo(data);
                setShowUpgrade(true);
                return;
            }

            if (!data?.runId) throw new Error(data.error || 'Missing runId');

            // Fire worker manually from the client side so serverless doesn't kill it
            fetch('/api/session/worker', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...payload,
                    validationId: data.validationId,
                    runId: data.runId,
                })
            }).catch(console.error);

            router.push('/chamber/' + data.runId);
        } catch (err: any) {
            alert(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    const cc = idea.length;

    return (
        <div className="min-h-screen bg-[#060a13] text-white overflow-hidden relative" suppressHydrationWarning>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-500/[0.07] rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/[0.05] rounded-full blur-[120px]" />
            </div>

            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

            <div className="relative z-10 flex flex-col min-h-screen">
                <header className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
                    <a href="/dashboard" className="flex items-center gap-3 group">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-white/5 transition-colors">
                            <span className="text-white/50 text-sm font-black">&larr;</span>
                        </div>
                        <span className="text-sm font-bold tracking-[0.2em] text-white/60 uppercase group-hover:text-white transition-colors">Dashboard</span>
                    </a>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">{t(lang, 'sys_online')}</span>
                        </div>
                    </div>
                </header>

                <main className="flex-1 flex flex-col items-center justify-center px-6 py-8 max-w-3xl mx-auto w-full">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-full px-4 py-1.5 mb-6">
                            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">{t(lang, 'sys_sequence')}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight">
                            <span className="text-white">{t(lang, 'sys_ready')} </span>
                            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">{t(lang, 'sys_init')}</span>
                        </h1>
                        <p className="mt-4 text-white/30 text-sm max-w-md mx-auto leading-relaxed">{t(lang, 'sys_sovereignty_desc')}</p>
                    </div>

                    <div className="flex items-center justify-center gap-1 mb-8">
                        {EXPERTS.map((ex, i) => (
                            <div key={ex.key} className="flex flex-col items-center"><div className="w-9 h-9 rounded-full flex items-center justify-center border transition-all hover:scale-110 hover:-translate-y-1 cursor-default" style={{ borderColor: ex.color + '40', backgroundColor: ex.color + '15', transitionDelay: i * 50 + 'ms' }}>
                                <span className="text-sm">{ex.emoji}</span>
                            </div>
                                <span className="text-[7px] font-bold text-white/30 mt-1 uppercase">{ex.key === 'visionary' ? 'Visionary' : ex.key === 'technologist' ? 'Tech' : ex.key === 'devil' ? 'Critic' : ex.key === 'marketeer' ? 'Market' : ex.key === 'ethicist' ? 'Ethics' : 'Finance'}</span></div>
                        ))}
                        <span className="text-[10px] text-white/20 ml-3 font-bold uppercase tracking-wider">6 {'AI experts'}</span>
                    </div>

                    <div className="w-full relative group mb-6">
                        <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500/50 via-cyan-500/50 to-purple-500/50 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 blur-sm" />
                        <div className="relative bg-[#0c1220] border border-white/[0.08] group-focus-within:border-white/[0.15] rounded-2xl overflow-hidden transition-colors">
                            <textarea maxLength={2500} className="w-full bg-transparent text-white placeholder:text-white/15 p-6 pb-3 text-base min-h-[160px] resize-none focus:outline-none focus:ring-0 border-0 leading-relaxed" placeholder={t(lang, 'sys_placeholder')} value={idea} onChange={(e) => setIdea(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) start(); }} />
                            <div className="flex items-center justify-between px-6 py-3 border-t border-white/[0.04]">
                                <span className={'text-[10px] font-mono transition-colors ' + (cc > 2000 ? 'text-red-400' : cc > 0 ? 'text-white/40' : 'text-white/10')}>
                                    <span>{cc > 0 ? `${cc} / 2500 chars` : t(lang, 'sys_input_buffer') + ' 0.00kb'}</span>
                                </span>
                                <span className="text-[10px] text-white/10 font-mono">Ctrl+Enter</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-10 justify-center">
                        {[
                            { em: '\u{1F3C4}', tx: String(lang) === 'pt' ? 'Escola de surf na Comporta' : 'Surf school in Portugal' },
                            { em: '\u{1F916}', tx: String(lang) === 'pt' ? 'App de IA para saude mental' : 'AI mental health app' },
                            { em: '\u{1F6D2}', tx: String(lang) === 'pt' ? 'Marketplace de produtos locais' : 'Local products marketplace' },
                        ].map((ex) => (
                            <button key={ex.tx} onClick={() => setIdea(ex.tx)} className="flex items-center gap-2 bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-white/[0.12] rounded-xl px-4 py-2 text-xs text-white/40 hover:text-white/70 transition-all">
                                <span>{ex.em}</span><span>{ex.tx}</span>
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={start}
                        disabled={loading || profileLoading || !idea.trim()}
                        className="w-full bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 text-white font-black py-5 rounded-2xl shadow-xl shadow-purple-500/20 hover:shadow-purple-500/40 transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale disabled:scale-100 flex items-center justify-center gap-3 group"
                    >
                        {loading || profileLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <span className="text-xl">🏛️</span>
                                <span className="uppercase tracking-[0.2em]">{t(lang, 'sys_execute')}</span>
                            </>
                        )}
                    </button>
                    <p className="mt-6 text-white/10 text-[10px] font-mono uppercase tracking-[0.3em]">{t(lang, 'sys_protocol')}</p>
                </main>
            </div>
            {showUpgrade && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-[#0f172a] border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl shadow-purple-500/20 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-cyan-500" />

                        <div className="mb-6">
                            <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Limit Reached</h2>
                            <p className="text-white/50 text-sm leading-relaxed mb-4">
                                {debugInfo ? (
                                    <span>Plan: <b className="text-purple-400 uppercase">{debugInfo.debug?.plan}</b> · Usage: <b className="text-white">{debugInfo.usage} / {debugInfo.limit}</b></span>
                                ) : (
                                    t(lang, 'sys_limit_reached_desc')
                                )}
                            </p>

                            {debugInfo?.debug && (
                                <div className="p-3 bg-white/[0.03] rounded-xl border border-white/[0.05] mb-4">
                                    <p className="text-[9px] font-mono text-white/20 uppercase tracking-tighter mb-1">Debug Session Info</p>
                                    <p className="text-[10px] font-mono text-white/40 break-all leading-tight">
                                        Tenant: {debugInfo.debug.tenant?.substring(0, 16)}...<br />
                                        User: {debugInfo.debug.user?.substring(0, 16)}...
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => router.push('/pricing?checkout=pro')}
                                className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all active:scale-[0.98]"
                            >
                                Upgrade to Pro
                            </button>
                            <button
                                onClick={() => setShowUpgrade(false)}
                                className="w-full bg-white/5 border border-white/10 text-white/50 font-medium py-3 rounded-xl hover:bg-white/10 transition-all"
                            >
                                Close
                            </button>
                        </div>

                        <p className="mt-6 text-center text-[10px] text-white/20 uppercase tracking-widest font-bold">
                            Secure payment via Stripe
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
