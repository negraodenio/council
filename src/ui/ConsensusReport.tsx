'use client';
import { useState } from 'react';

export default function ConsensusReport({ validation, patches }: {
    validation: any;
    patches: any[];
}) {
    const score = Math.round(validation.consensus_score || 78);
    const align = Math.round(validation.consensus_score || 78);
    const risk = 100 - align;

    // Parse full_result
    const result = validation.full_result || {};
    const judgeText = result.judge || '';

    return (
        <div className="bg-[#0a0f1e] text-slate-50 min-h-screen relative overflow-x-hidden">
            <div className="absolute inset-0 pointer-events-none z-0"
                style={{
                    background:
                        'radial-gradient(at 0% 0%, rgba(124,58,237,0.12) 0, transparent 50%), radial-gradient(at 100% 100%, rgba(0,210,255,0.12) 0, transparent 50%)'
                }}
            />

            <header className="sticky top-0 z-50 bg-[#0a0f1e]/80 backdrop-blur-xl border-b border-white/10 h-16 flex items-center justify-between px-4 lg:px-8">
                <a className="flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition-colors" href="/dashboard">
                    <span className="text-cyan-300 drop-shadow-[0_0_5px_rgba(0,210,255,0.5)]">←</span>
                    <span className="font-mono text-xs font-medium uppercase tracking-wider">Back to Dashboard</span>
                </a>
                <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-slate-400 tracking-widest uppercase hidden sm:block">Validation #{validation.id.slice(0, 8)}</span>
                    <div className="h-4 w-px bg-white/10 hidden sm:block" />
                    <button className="flex items-center justify-center size-9 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors rounded">⤓</button>
                    <button className="flex items-center justify-center size-9 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors rounded">⤴</button>
                </div>
            </header>

            <main className="flex-1 relative z-10 w-full max-w-7xl mx-auto p-4 pb-24 lg:p-8 lg:pb-8 flex flex-col gap-6 lg:flex-row lg:gap-12">
                {/* Left */}
                <section className="flex flex-col gap-6 lg:w-1/3 lg:sticky lg:top-24 lg:h-fit">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-1.5 py-0.5 bg-cyan-300/10 text-cyan-300 font-mono text-[10px] uppercase tracking-wider rounded-sm">
                                {validation.status?.toUpperCase()}
                            </span>
                            <span className="text-slate-400 font-mono text-[10px]">{new Date(validation.created_at).toLocaleDateString()}</span>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight">{validation.idea}</h1>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-8 flex flex-col items-center justify-center gap-4 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
                        <div className="relative size-52">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                                <defs>
                                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#00d2ff" />
                                        <stop offset="100%" stopColor="#7c3aed" />
                                    </linearGradient>
                                </defs>
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    fill="none"
                                    stroke="url(#scoreGradient)"
                                    strokeDasharray="283"
                                    strokeDashoffset={283 - (283 * score) / 100}
                                    strokeLinecap="round"
                                    strokeWidth="8"
                                    style={{ filter: 'drop-shadow(0 0 12px #00d2ff)' }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                <span className="text-6xl font-black tracking-tighter drop-shadow-[0_0_10px_rgba(0,210,255,0.5)]">{score}</span>
                                <span className="font-mono text-xs text-slate-400 uppercase tracking-widest mt-1">/ 100</span>
                            </div>
                        </div>

                        <div className="text-center space-y-1">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-400/10 text-emerald-300 rounded-full border border-emerald-300/30 shadow-[0_0_10px_rgba(0,255,136,0.2)]">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                                <span className="font-mono text-xs font-bold uppercase tracking-wider">{score > 70 ? 'Viable' : 'Caution'}</span>
                            </div>
                            <p className="text-slate-300 text-sm font-medium">{score > 70 ? 'Strong Market Fit Detected' : 'Technical Debt Alert'}</p>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                        <div className="flex justify-between items-end">
                            <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider">Council Dissent</span>
                            <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider">Council Agreement</span>
                        </div>
                        <div className="mt-3 h-2.5 w-full bg-white/5 border border-white/10 overflow-hidden flex rounded-full">
                            <div className="h-full bg-purple-500" style={{ width: `${risk}%`, boxShadow: '0 0 15px rgba(124,58,237,0.8)' }} />
                            <div className="h-full w-[1%]" />
                            <div className="h-full bg-cyan-300" style={{ width: `${align}%`, boxShadow: '0 0 15px rgba(0,210,255,0.8)' }} />
                        </div>
                        <div className="mt-3 flex justify-between items-start font-mono text-xs">
                            <span className="text-purple-300 font-bold">{risk}% Risk</span>
                            <span className="text-cyan-300 font-bold">{align}% Align</span>
                        </div>
                    </div>
                </section>

                {/* Right */}
                <section className="flex flex-col gap-8 lg:w-2/3">
                    <div className="space-y-4">
                        <h2 className="text-lg font-bold tracking-wide uppercase">The Verdict</h2>
                        <div className="p-6 bg-gradient-to-r from-cyan-300 to-purple-500 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] relative overflow-hidden">
                            <div className="absolute inset-0 bg-black/20" />
                            <p className="relative text-xl leading-relaxed text-white font-medium">
                                {judgeText || 'Analysis in progress...'}
                            </p>
                        </div>
                    </div>

                    {/* Patches section */}
                    {patches.length > 0 && (
                        <div className="mt-8">
                            <h2 className="text-lg font-bold tracking-wide mb-4 uppercase">Proposed Patches</h2>
                            <div className="space-y-4">
                                {patches.map((p) => (
                                    <PatchCard key={p.id} patch={p} />
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card title="Key Strengths" tone="green" items={result.strengths || ['High functional relevance.', 'Scalable architecture.']} />
                        <Card title="Consensus Risks" tone="purple" items={result.risks || ['Execution window.', 'Provider lock-in.']} />
                        <Card title="Defensibility (Moat)" tone="cyan" text={result.moat || "Architecture complexity and deep integrations."} />
                        <Card title="Pivot Suggestion" tone="cyan" text={result.pivot || "Expand to cross-platform compatibility."} />
                    </div>
                </section>
            </main>
        </div>
    );
}

function Card({ title, tone, items, text }: { title: string; tone: 'green' | 'purple' | 'cyan'; items?: string[]; text?: string }) {
    const c = tone === 'green' ? 'text-emerald-300' : tone === 'purple' ? 'text-purple-300' : 'text-cyan-300';
    return (
        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <div className={`font-bold ${c} mb-3`}>{title}</div>
            {items ? (
                <ul className="space-y-3 text-slate-100">
                    {items.map((it, i) => (
                        <li key={i} className="text-sm leading-snug">• {it}</li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm leading-relaxed text-slate-100/90">{text}</p>
            )}
        </div>
    );
}

function PatchCard({ patch }: { patch: any }) {
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<any>(null);
    const [prUrl, setPrUrl] = useState('');

    async function handlePreview() {
        setLoading(true);
        const r = await fetch('/api/patch/preview', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ patch_id: patch.id })
        });
        const data = await r.json();
        setPreview(data);
        setLoading(false);
    }

    async function handleOpenPR() {
        if (!confirm('Open PR in GitHub?')) return;
        setLoading(true);
        const r = await fetch('/api/patch/apply_to_github_pr', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ patch_id: patch.id, title: `CouncilIA: ${patch.reasoning}` })
        });
        const data = await r.json();
        if (data.pr_url) setPrUrl(data.pr_url);
        setLoading(false);
    }

    return (
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <div className="flex items-start justify-between mb-3">
                <div>
                    <div className="text-cyan-300 font-mono text-sm">{patch.file_path}</div>
                    <div className="text-slate-300 text-sm mt-1">{patch.reasoning}</div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-bold ${patch.status === 'applied' ? 'bg-emerald-400/20 text-emerald-300' : 'bg-amber-400/20 text-amber-300'
                    }`}>
                    {patch.status}
                </div>
            </div>

            <div className="flex gap-2 mt-4">
                <button
                    onClick={handlePreview}
                    disabled={loading}
                    className="px-4 py-2 bg-white/10 text-white rounded text-sm font-bold hover:bg-white/20 disabled:opacity-50"
                >
                    Preview
                </button>
                <button
                    onClick={handleOpenPR}
                    disabled={loading || patch.status === 'applied'}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-400 text-white rounded text-sm font-bold hover:shadow-lg disabled:opacity-50"
                >
                    Open PR
                </button>
            </div>

            {preview && (
                <div className="mt-4 p-4 bg-black/40 rounded border border-white/10 overflow-x-auto">
                    <pre className="text-xs text-slate-300 whitespace-pre-wrap">
                        {preview.ok ? preview.patchedPreview : preview.error}
                    </pre>
                </div>
            )}

            {prUrl && (
                <div className="mt-4 p-3 bg-emerald-400/10 border border-emerald-400/30 rounded">
                    <a href={prUrl} target="_blank" rel="noopener" className="text-emerald-300 text-sm underline">
                        View PR on GitHub →
                    </a>
                </div>
            )}
        </div>
    );
}
