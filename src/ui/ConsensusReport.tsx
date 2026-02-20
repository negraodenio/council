'use client';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { t, resolveUILang, type UILang } from '@/lib/i18n/ui-strings';

// ─── V2 Persona config ────────────────────────
const PERSONA_META: Record<string, { color: string; gradient: string; emoji: string }> = {
    visionary: { color: '#A855F7', gradient: 'from-purple-500/20 to-purple-900/10', emoji: '🔮' },
    technologist: { color: '#06B6D4', gradient: 'from-cyan-500/20 to-cyan-900/10', emoji: '⚙️' },
    devil: { color: '#EF4444', gradient: 'from-red-500/20 to-red-900/10', emoji: '😈' },
    marketeer: { color: '#22C55E', gradient: 'from-emerald-500/20 to-emerald-900/10', emoji: '📊' },
    ethicist: { color: '#F59E0B', gradient: 'from-amber-500/20 to-amber-900/10', emoji: '⚖️' },
    financier: { color: '#3B82F6', gradient: 'from-blue-500/20 to-blue-900/10', emoji: '💰' },
};

function getMeta(id: string) {
    return PERSONA_META[id] || { color: '#94a3b8', gradient: 'from-slate-500/20 to-slate-900/10', emoji: '🤖' };
}

export default function ConsensusReport({ validation, patches }: {
    validation: any;
    patches: any[];
}) {
    const result = validation.full_result || {};
    const lang: UILang = resolveUILang(result.lang);

    const score = Math.round(validation.consensus_score || 0);
    const align = score;
    const risk = 100 - align;

    const judgeText = result.judge || '';

    const round1 = (result.round1 || []) as { id: string; name: string; emoji?: string; text: string }[];
    const round2 = (result.round2 || []) as { id: string; name: string; emoji?: string; text: string }[];
    const round3 = (result.round3 || []) as { id: string; name: string; emoji?: string; text: string }[];

    const statusLabel = score >= 70 ? t(lang, 'cr_viable') : score >= 40 ? t(lang, 'cr_caution') : t(lang, 'cr_high_risk');
    const statusBg = score >= 70
        ? 'bg-emerald-400/10 text-emerald-300 border-emerald-400/30'
        : score >= 40
            ? 'bg-amber-400/10 text-amber-300 border-amber-400/30'
            : 'bg-red-400/10 text-red-300 border-red-400/30';
    const statusDot = score >= 70 ? 'bg-emerald-400' : score >= 40 ? 'bg-amber-400' : 'bg-red-400';
    const statusDesc = score >= 70
        ? t(lang, 'cr_viable_desc')
        : score >= 40
            ? t(lang, 'cr_caution_desc')
            : t(lang, 'cr_high_risk_desc');
    const ringColor = score >= 70 ? '#22c55e' : score >= 40 ? '#f59e0b' : '#ef4444';

    return (
        <div className="bg-[#0a0f1e] text-slate-50 min-h-screen relative overflow-x-hidden">
            {/* BG gradient */}
            <div className="absolute inset-0 pointer-events-none z-0"
                style={{
                    background:
                        'radial-gradient(at 0% 0%, rgba(124,58,237,0.08) 0, transparent 50%), radial-gradient(at 100% 100%, rgba(0,210,255,0.08) 0, transparent 50%)'
                }}
            />

            {/* ── Header ── */}
            <header className="sticky top-0 z-50 bg-[#0a0f1e]/80 backdrop-blur-xl border-b border-white/10 h-16 flex items-center justify-between px-4 lg:px-8">
                <a className="flex items-center gap-3 text-slate-300 hover:text-cyan-300 transition-colors group" href="/dashboard">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 group-hover:bg-cyan-500/20 transition-colors">
                        <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                    <span className="font-semibold text-sm">{t(lang, 'cr_back')}</span>
                </a>
                <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-slate-500 hidden sm:block">
                        {validation.id.slice(0, 8)}
                    </span>
                </div>
            </header>

            <main className="relative z-10 w-full max-w-7xl mx-auto p-4 pb-24 lg:p-8 lg:pb-8 flex flex-col gap-8 lg:flex-row lg:gap-12">

                {/* ════ LEFT COLUMN ════ */}
                <section className="flex flex-col gap-6 lg:w-[400px] lg:shrink-0 lg:sticky lg:top-24 lg:h-fit">

                    {/* Idea Title */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider rounded-md border ${statusBg}`}>
                                {validation.status?.toUpperCase()}
                            </span>
                            <span className="text-slate-500 text-xs">
                                {new Date(validation.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight leading-snug">{validation.idea}</h1>
                    </div>

                    {/* Score Ring */}
                    <div className="bg-white/[0.03] border border-white/10 p-10 flex flex-col items-center justify-center gap-5 rounded-2xl">
                        <div className="relative size-52">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                                <defs>
                                    <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#00d2ff" />
                                        <stop offset="50%" stopColor={ringColor} />
                                        <stop offset="100%" stopColor="#7c3aed" />
                                    </linearGradient>
                                </defs>
                                <circle
                                    cx="50" cy="50" r="42"
                                    fill="none"
                                    stroke="url(#scoreGrad)"
                                    strokeDasharray={2 * Math.PI * 42}
                                    strokeDashoffset={2 * Math.PI * 42 * (1 - score / 100)}
                                    strokeLinecap="round"
                                    strokeWidth="6"
                                    className="drop-shadow-[0_0_16px_rgba(0,210,255,0.4)] transition-all duration-1000"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-6xl font-black tracking-tighter">{score}</span>
                                <span className="font-mono text-sm text-slate-500 mt-1">/ 100</span>
                            </div>
                        </div>
                        <div className="text-center space-y-2">
                            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${statusBg}`}>
                                <span className={`w-2 h-2 rounded-full animate-pulse ${statusDot}`} />
                                <span className="font-bold text-sm uppercase tracking-wider">{statusLabel}</span>
                            </div>
                            <p className="text-slate-400 text-sm">{statusDesc}</p>
                        </div>
                    </div>

                    {/* Dissent / Agreement Bar */}
                    <div className="bg-white/[0.03] border border-white/10 p-6 rounded-2xl">
                        <div className="flex justify-between items-end mb-3">
                            <div>
                                <span className="text-xs text-slate-500 uppercase tracking-wider">{t(lang, 'cr_dissent')}</span>
                                <div className="text-lg font-black text-purple-400">{risk}%</div>
                            </div>
                            <div className="text-right">
                                <span className="text-xs text-slate-500 uppercase tracking-wider">{t(lang, 'cr_agreement')}</span>
                                <div className="text-lg font-black text-cyan-400">{align}%</div>
                            </div>
                        </div>
                        <div className="h-3 w-full bg-white/5 border border-white/10 overflow-hidden flex rounded-full">
                            <div className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-l-full transition-all duration-700" style={{ width: `${risk}%` }} />
                            <div className="h-full w-px bg-white/30" />
                            <div className="h-full bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-r-full transition-all duration-700" style={{ width: `${align}%` }} />
                        </div>
                    </div>

                    {/* Model Config Info */}
                    {result.model_config && (
                        <div className="bg-white/[0.03] border border-white/10 p-5 rounded-2xl">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">{t(lang, 'cr_council_config')}</h3>
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-500">{t(lang, 'cr_experts')}</span>
                                    <span className="text-slate-300 font-mono">{result.model_config.personas?.length || 6}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-500">{t(lang, 'cr_rounds')}</span>
                                    <span className="text-slate-300 font-mono">3</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-500">{t(lang, 'cr_judge')}</span>
                                    <span className="text-cyan-400 font-mono">{result.model_config.judge?.split('/')?.pop() || 'GPT-4o'}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </section>

                {/* ════ RIGHT COLUMN ════ */}
                <section className="flex flex-col gap-10 lg:flex-1 min-w-0">

                    {/* ── JUDGE VERDICT ── */}
                    {judgeText && (
                        <div>
                            <RoundHeader
                                number="⚖️"
                                title={t(lang, 'cr_final_verdict')}
                                subtitle={t(lang, 'cr_verdict_subtitle')}
                                color="#FBBF24"
                            />
                            <div className="mt-4 p-6 md:p-8 bg-gradient-to-br from-amber-500/10 via-purple-500/5 to-cyan-500/10 border border-amber-500/20 rounded-2xl">
                                <div className="prose prose-invert prose-base max-w-none
                                    prose-headings:text-white prose-headings:font-bold prose-headings:mt-6 prose-headings:mb-3
                                    prose-h2:text-xl prose-h3:text-lg
                                    prose-p:text-slate-200 prose-p:leading-relaxed prose-p:text-[15px]
                                    prose-li:text-slate-200 prose-li:text-[15px]
                                    prose-strong:text-cyan-300
                                    prose-ul:my-3 prose-ol:my-3">
                                    <ReactMarkdown>{judgeText}</ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── ROUND 1 ── */}
                    {round1.length > 0 && (
                        <div>
                            <RoundHeader
                                number="01"
                                title={t(lang, 'cr_round1_title')}
                                subtitle={t(lang, 'cr_round1_subtitle')}
                                color="#06B6D4"
                            />
                            <div className="mt-4 grid gap-4">
                                {round1.map((r) => (
                                    <PersonaCard key={r.id} entry={r} lang={lang} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ── ROUND 2 ── */}
                    {round2.length > 0 && (
                        <div>
                            <RoundHeader
                                number="02"
                                title={t(lang, 'cr_round2_title')}
                                subtitle={t(lang, 'cr_round2_subtitle')}
                                color="#EF4444"
                            />
                            <div className="mt-4 grid gap-4">
                                {round2.map((r) => (
                                    <PersonaCard key={r.id} entry={r} lang={lang} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ── ROUND 3 ── */}
                    {round3.length > 0 && (
                        <div>
                            <RoundHeader
                                number="03"
                                title={t(lang, 'cr_round3_title')}
                                subtitle={t(lang, 'cr_round3_subtitle')}
                                color="#22C55E"
                            />
                            <div className="mt-4 grid gap-4">
                                {round3.map((r) => (
                                    <PersonaCard key={r.id} entry={r} lang={lang} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ── PATCHES ── */}
                    {patches.length > 0 && (
                        <div>
                            <RoundHeader
                                number="🔧"
                                title={t(lang, 'cr_patches_title')}
                                subtitle={t(lang, 'cr_patches_subtitle')}
                                color="#A855F7"
                            />
                            <div className="mt-4 grid gap-4">
                                {patches.map((p) => (
                                    <PatchCard key={p.id} patch={p} lang={lang} />
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

// ─── Round Header ──────────────────────────────
function RoundHeader({ number, title, subtitle, color }: {
    number: string; title: string; subtitle: string; color: string;
}) {
    const isEmoji = number.length > 2;
    return (
        <div className="flex items-center gap-4">
            <div
                className="flex items-center justify-center shrink-0 rounded-xl font-black text-white"
                style={{
                    background: `linear-gradient(135deg, ${color}30, ${color}10)`,
                    border: `2px solid ${color}40`,
                    width: 52,
                    height: 52,
                    fontSize: isEmoji ? 24 : 20,
                }}
            >
                {number}
            </div>
            <div>
                <h2 className="text-xl font-bold tracking-tight">{title}</h2>
                <p className="text-sm text-slate-500">{subtitle}</p>
            </div>
        </div>
    );
}

// ─── Persona Card ──────────────────────────────
function PersonaCard({ entry, lang }: {
    entry: { id: string; name: string; emoji?: string; text: string };
    lang: UILang;
}) {
    const [expanded, setExpanded] = useState(false);
    const meta = getMeta(entry.id);
    const emoji = entry.emoji || meta.emoji;
    const isLong = entry.text.length > 500;
    const displayText = isLong && !expanded ? entry.text.slice(0, 500) + '...' : entry.text;

    return (
        <div className={`bg-gradient-to-br ${meta.gradient} border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors`}>
            {/* Card Header */}
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/5">
                <div
                    className="flex items-center justify-center size-9 rounded-lg text-lg shrink-0"
                    style={{ background: meta.color + '20', border: `2px solid ${meta.color}50` }}
                >
                    {emoji}
                </div>
                <span className="font-bold text-sm" style={{ color: meta.color }}>
                    {entry.name}
                </span>
            </div>

            {/* Card Body */}
            <div className="px-5 py-4">
                <div className="prose prose-invert prose-sm max-w-none
                    prose-p:text-slate-300 prose-p:leading-relaxed prose-p:text-[14px]
                    prose-strong:text-white prose-strong:font-semibold
                    prose-headings:text-white prose-headings:text-base prose-headings:font-bold prose-headings:mt-3 prose-headings:mb-1
                    prose-li:text-slate-300 prose-li:text-[14px]
                    prose-ul:my-2 prose-ol:my-2">
                    <ReactMarkdown>{displayText}</ReactMarkdown>
                </div>
                {isLong && (
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="mt-3 flex items-center gap-1.5 text-cyan-400 text-xs font-bold hover:text-cyan-300 transition-colors"
                    >
                        {expanded ? (
                            <><svg width="14" height="14" fill="none" viewBox="0 0 16 16"><path d="M12 10L8 6l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>{t(lang, 'cr_show_less')}</>
                        ) : (
                            <><svg width="14" height="14" fill="none" viewBox="0 0 16 16"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>{t(lang, 'cr_read_full')}</>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}

// ─── Patch Card ────────────────────────────────
function PatchCard({ patch, lang }: { patch: any; lang: UILang }) {
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
        <div className="bg-white/[0.03] border border-white/10 p-6 rounded-xl">
            <div className="flex items-start justify-between mb-3">
                <div>
                    <div className="text-cyan-300 font-mono text-sm font-bold">{patch.file_path}</div>
                    <div className="text-slate-400 text-sm mt-1">{patch.reasoning}</div>
                </div>
                <div className={`px-2.5 py-1 rounded-md text-xs font-bold ${patch.status === 'applied' ? 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30' : 'bg-amber-400/20 text-amber-300 border border-amber-400/30'}`}>
                    {patch.status}
                </div>
            </div>
            <div className="flex gap-2 mt-4">
                <button onClick={handlePreview} disabled={loading} className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm font-bold hover:bg-white/20 disabled:opacity-50 transition">{t(lang, 'cr_preview')}</button>
                <button onClick={handleOpenPR} disabled={loading || patch.status === 'applied'} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-400 text-white rounded-lg text-sm font-bold hover:shadow-lg hover:shadow-purple-500/20 disabled:opacity-50 transition">{t(lang, 'cr_open_pr')}</button>
            </div>
            {preview && (
                <div className="mt-4 p-4 bg-black/40 rounded-lg border border-white/10 overflow-x-auto">
                    <pre className="text-xs text-slate-300 whitespace-pre-wrap">{preview.ok ? preview.patchedPreview : preview.error}</pre>
                </div>
            )}
            {prUrl && (
                <div className="mt-4 p-3 bg-emerald-400/10 border border-emerald-400/30 rounded-lg">
                    <a href={prUrl} target="_blank" rel="noopener" className="text-emerald-300 text-sm font-bold underline">{t(lang, 'cr_view_pr')}</a>
                </div>
            )}
        </div>
    );
}