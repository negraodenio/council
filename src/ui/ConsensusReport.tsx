'use client';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { t, resolveUILang, type UILang } from '@/lib/i18n/ui-strings';
import PDFReportTemplate from './PDFReportTemplate';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
    const [activeTab, setActiveTab] = useState<'verdict' | 'round1' | 'round2' | 'round3'>('verdict');
    const [isExporting, setIsExporting] = useState(false);
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

    const handleExportPDF = async () => {
        setIsExporting(true);
        try {
            const container = document.getElementById('pdf-report-container');
            if (!container) {
                setIsExporting(false);
                return;
            }

            // Temporarily unhide for capture
            container.style.display = 'block';
            container.style.position = 'absolute';
            container.style.top = '-9999px';

            const canvas = await html2canvas(container, {
                scale: 2, // High resolution
                useCORS: true,
                logging: false,
                backgroundColor: '#030712'
            });

            container.style.display = 'none';

            const imgData = canvas.toDataURL('image/png');

            // Generate A4 PDF
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            // Handle multi-page if the HTML is taller than a single A4 height
            let heightLeft = pdfHeight;
            let position = 0;
            const pageHeight = pdf.internal.pageSize.getHeight();

            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - pdfHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
                heightLeft -= pageHeight;
            }

            pdf.save(`CouncilIA_${validation.id.substring(0, 8)}.pdf`);
        } catch (error) {
            console.error('Failed to generate PDF:', error);
            alert('Um erro ocorreu ao gerar o PDF. / An error occurred while generating the PDF.');
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="bg-deep-blue text-slate-50 min-h-screen relative overflow-x-hidden font-body" suppressHydrationWarning>
            {/* Tech grid BG overlay */}
            <div className="absolute inset-0 tech-grid pointer-events-none opacity-20 z-0"></div>

            {/* ── Header ── */}
            <header className="sticky top-0 z-50 bg-panel-blue/90 glass-blur border-b border-neon-cyan/20 h-16 flex items-center justify-between px-4 lg:px-8">
                <a className="flex items-center gap-3 text-neon-cyan hover:text-white transition-colors group" href="/dashboard">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30 group-hover:bg-neon-cyan/20 transition-colors shadow-[0_0_10px_rgba(0,242,255,0.1)]">
                        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    </span>
                    <span className="font-display font-bold uppercase tracking-widest text-xs">{t(lang, 'cr_back')}</span>
                </a>
                <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-neon-cyan/50 hidden sm:block">
                        SYS.ID.{validation.id.slice(0, 8).toUpperCase()}
                    </span>
                    <button
                        onClick={handleExportPDF}
                        disabled={isExporting}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/30 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isExporting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-1 h-3 w-3 text-indigo-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                {t(lang, 'speaking') || 'Gerando...'}
                            </>
                        ) : (
                            <>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7 10 12 15 17 10"></polyline>
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                                Export PDF
                            </>
                        )}
                    </button>
                </div>
            </header>

            {/* Hidden PDF Container */}
            <div style={{ display: 'none' }}>
                <PDFReportTemplate validation={validation} lang={lang} />
            </div>

            <main className="relative z-10 w-full max-w-screen-2xl mx-auto p-4 pb-24 lg:p-6 lg:pb-8 flex flex-col gap-6">

                {/* ════ TOP GRID: EXECUTIVE SUMMARY ════ */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Panel 1: Main Metric */}
                    <div className="lg:col-span-4 data-grid-item flex flex-col justify-center items-center rounded-xl">
                        <div className="flex items-center gap-2 mb-4 w-full justify-between">
                            <span className="metric-label">{t(lang, 'cr_final_verdict') || "System Consensus"}</span>
                            <span className={`px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider rounded border ${statusBg}`}>
                                {validation.status?.toUpperCase() || "SYNTHESIS"}
                            </span>
                        </div>
                        {/* Score Ring inside Panel */}
                        <div className="relative size-40 my-4 flex-shrink-0">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
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
                                    strokeWidth="8"
                                    className="drop-shadow-[0_0_15px_rgba(0,242,255,0.3)] transition-all duration-1000"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-5xl font-display font-black tracking-tighter text-white" suppressHydrationWarning>{score}</span>
                                <span className="font-mono text-[10px] text-neon-cyan/70 mt-1 uppercase">Score</span>
                            </div>
                        </div>
                        <div className="w-full text-center mt-2">
                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded bg-black/30 border border-white/5`}>
                                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${statusDot}`} />
                                <span className="font-bold text-xs uppercase tracking-widest text-white">{statusLabel}</span>
                            </div>
                        </div>
                    </div>

                    {/* Panel 2: Diagnostics & Dissent */}
                    <div className="lg:col-span-4 data-grid-item flex flex-col gap-6 rounded-xl relative overflow-hidden">
                        <div className="flex justify-between items-center mb-2 z-10">
                            <span className="metric-label">Neural Alignment</span>
                            <span className="material-symbols-outlined text-neon-cyan/50 text-base">analytics</span>
                        </div>

                        <div className="space-y-5 z-10">
                            <div>
                                <div className="flex justify-between items-end mb-1.5">
                                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Dissent Risk</span>
                                    <span className="text-sm font-bold text-neon-magenta font-mono">{risk}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                                    <div className="h-full bg-neon-magenta shadow-[0_0_8px_#ff00e5]" style={{ width: `${risk}%` }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-end mb-1.5">
                                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Agreement</span>
                                    <span className="text-sm font-bold text-neon-cyan font-mono">{align}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                                    <div className="h-full bg-neon-cyan shadow-[0_0_8px_#00f2ff]" style={{ width: `${align}%` }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Radar Graphic Mockup (Terminal Style) */}
                        <div className="mt-auto pt-6 border-t border-neon-cyan/10 relative h-24 flex items-center justify-center -mx-4 -mb-4 bg-black/20 z-0">
                            <div className="absolute inset-0 tech-grid opacity-30 mix-blend-screen"></div>
                            {/* Decorative Radar Lines */}
                            <svg className="absolute w-full h-[120%] opacity-40 text-neon-cyan mix-blend-screen" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <path d="M0,50 Q25,20 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="1" />
                                <path d="M0,70 Q25,30 50,70 T100,70" fill="none" stroke="#afff33" strokeWidth="1" />
                                <path d="M0,30 Q25,80 50,30 T100,30" fill="none" stroke="#ff00e5" strokeWidth="1" />
                            </svg>
                            <span className="relative z-10 bg-panel-blue/80 border border-neon-cyan/30 px-3 py-1 mt-6 text-[9px] font-mono text-white uppercase tracking-[0.2em] rounded shadow-[0_0_10px_rgba(0,242,255,0.2)]">
                                SYNTHESIS TOPOGRAPHY
                            </span>
                        </div>
                    </div>

                    {/* Panel 3: Active Agents Array */}
                    <div className="lg:col-span-4 data-grid-item flex flex-col rounded-xl">
                        <div className="flex justify-between items-center mb-4">
                            <span className="metric-label">Council Array (Rounds: 3)</span>
                            <span className="text-[10px] font-mono text-neon-lime px-2 py-0.5 bg-neon-lime/10 border border-neon-lime/20 rounded">{result.model_config?.personas?.length || 6} Nodes</span>
                        </div>
                        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-2">
                            {['visionary', 'technologist', 'devil', 'marketeer', 'ethicist', 'financier'].map((id, index) => {
                                const meta = getMeta(id);
                                // Pseudo-random stat based on score to make it look active
                                const statBar = Math.min(100, Math.max(20, score + (index * 7 - 15)));
                                return (
                                    <div key={id} className="group flex items-center justify-between text-xs p-2.5 bg-black/20 border border-white/5 rounded-lg hover:bg-black/40 hover:border-white/10 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <span className="text-base grayscale group-hover:grayscale-0 transition-transform group-hover:scale-110">{meta.emoji}</span>
                                            <span className="font-display font-medium text-slate-300 group-hover:text-white capitalize tracking-wide">{id}</span>
                                        </div>
                                        <div className="flex items-center gap-3 w-28">
                                            <div className="h-1.5 flex-1 bg-black/60 rounded-full overflow-hidden shadow-inner">
                                                <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${statBar}%`, backgroundColor: meta.color, boxShadow: `0 0 5px ${meta.color}` }}></div>
                                            </div>
                                            <span className="font-mono text-[9px] text-slate-500 w-5 text-right font-bold">{statBar}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ════ BOTTOM BLOCK: DETAILS TABS ════ */}
                <div className="flex flex-col gap-10 min-w-0 flex-1">

                    <div className="data-grid-item rounded-xl p-0 flex flex-col">
                        <div className="flex overflow-x-auto hide-scrollbar border-b border-neon-cyan/10 bg-black/20">
                            <button
                                onClick={() => setActiveTab('verdict')}
                                className={`px-6 py-4 text-xs font-mono uppercase tracking-[0.15em] whitespace-nowrap border-b-2 transition-colors ${activeTab === 'verdict' ? 'border-neon-cyan text-neon-cyan bg-neon-cyan/5' : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/5'
                                    }`}
                            >
                                {t(lang, 'cr_final_verdict')}
                            </button>
                            {round1.length > 0 && (
                                <button
                                    onClick={() => setActiveTab('round1')}
                                    className={`px-6 py-4 text-xs font-mono uppercase tracking-[0.15em] whitespace-nowrap border-b-2 transition-colors ${activeTab === 'round1' ? 'border-[#06B6D4] text-[#06B6D4] bg-[#06B6D4]/5' : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/5'
                                        }`}
                                >
                                    ROUND 1
                                </button>
                            )}
                            {round2.length > 0 && (
                                <button
                                    onClick={() => setActiveTab('round2')}
                                    className={`px-6 py-4 text-xs font-mono uppercase tracking-[0.15em] whitespace-nowrap border-b-2 transition-colors ${activeTab === 'round2' ? 'border-[#EF4444] text-[#EF4444] bg-[#EF4444]/5' : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/5'
                                        }`}
                                >
                                    ROUND 2
                                </button>
                            )}
                            {round3.length > 0 && (
                                <button
                                    onClick={() => setActiveTab('round3')}
                                    className={`px-6 py-4 text-xs font-mono uppercase tracking-[0.15em] whitespace-nowrap border-b-2 transition-colors ${activeTab === 'round3' ? 'border-[#22C55E] text-[#22C55E] bg-[#22C55E]/5' : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/5'
                                        }`}
                                >
                                    ROUND 3
                                </button>
                            )}
                        </div>
                        <div className="p-6">

                            {/* ── JUDGE VERDICT ── */}
                            {activeTab === 'verdict' && judgeText && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
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
                                            <ReactMarkdown>
                                                {(() => {
                                                    if (typeof judgeText !== 'string') return '';
                                                    let text = judgeText.replace(/\\n/g, '\n');
                                                    // Strip out the redundant header block
                                                    text = text.replace(/## 🏛️ CouncilIA.*?Verdict Final\n/i, '');
                                                    text = text.replace(/### (Consensus Score|Puntuación de Consenso|Pontuação de Consenso|Score de Consensus|Konsens-Score|Punteggio di Consenso): \[?\d+\/100\]?\n/i, '');
                                                    return text.trim();
                                                })()}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ── ROUND 1 ── */}
                            {activeTab === 'round1' && round1.length > 0 && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <RoundHeader
                                        number="01"
                                        title={t(lang, 'cr_round1_title')}
                                        subtitle={t(lang, 'cr_round1_subtitle')}
                                        color="#06B6D4"
                                    />
                                    <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2">
                                        {round1.map((r) => (
                                            <PersonaCard key={r.id} entry={r} lang={lang} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ── ROUND 2 ── */}
                            {activeTab === 'round2' && round2.length > 0 && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <RoundHeader
                                        number="02"
                                        title={t(lang, 'cr_round2_title')}
                                        subtitle={t(lang, 'cr_round2_subtitle')}
                                        color="#EF4444"
                                    />
                                    <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2">
                                        {round2.map((r) => (
                                            <PersonaCard key={r.id} entry={r} lang={lang} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ── ROUND 3 ── */}
                            {activeTab === 'round3' && round3.length > 0 && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <RoundHeader
                                        number="03"
                                        title={t(lang, 'cr_round3_title')}
                                        subtitle={t(lang, 'cr_round3_subtitle')}
                                        color="#22C55E"
                                    />
                                    <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2">
                                        {round3.map((r) => (
                                            <PersonaCard key={r.id} entry={r} lang={lang} />
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
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
                    <ReactMarkdown>{typeof displayText === 'string' ? displayText.replace(/\\n/g, '\n') : displayText}</ReactMarkdown>
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