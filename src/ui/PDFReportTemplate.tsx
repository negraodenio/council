'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { type UILang } from '@/lib/i18n/ui-strings';

interface PDFReportTemplateProps {
    validation: any;
    lang: UILang;
}

const PERSONAS: Record<string, { lbl: string; pt: string; em: string; c: string }> = {
    visionary: { lbl: 'Visionary', pt: 'Visionário', em: '🔮', c: '#A855F7' },
    technologist: { lbl: 'Technologist', pt: 'Tecnologista', em: '⚙️', c: '#06B6D4' },
    devil: { lbl: 'Devils Advocate', pt: 'Advogado do Diabo', em: '👿', c: '#EF4444' },
    marketeer: { lbl: 'Market Analyst', pt: 'Analista de Mercado', em: '📊', c: '#22C55E' },
    ethicist: { lbl: 'Ethics and Risk', pt: 'Ética e Risco', em: '⚖️', c: '#F59E0B' },
    financier: { lbl: 'Financial', pt: 'Financeiro', em: '💰', c: '#3B82F6' }
};

function gp(name: string, lang: UILang) {
    const key = Object.keys(PERSONAS).find(k => name.toLowerCase().includes(k));
    const p = key ? PERSONAS[key] : { lbl: name, pt: name, em: '🤖', c: '#6366F1' };
    return { ...p, dn: (lang as string) === 'pt' ? p.pt : p.lbl };
}

export default function PDFReportTemplate({ validation, lang }: PDFReportTemplateProps) {
    const score = validation.consensus_score || 0;
    const dateStr = new Date(validation.created_at).toLocaleDateString();

    // Parse result
    const r = validation.full_result || {};
    const judgeText = r.judge || '';
    const round1 = r.round1 || [];
    const round2 = r.round2 || [];
    const round3 = r.round3 || [];

    // Calculate basic metrics
    const conflictRate = round2.length > 0 ? 'High' : 'Low';

    // Clean judge text to remove headers if they exist
    let cleanJudgeText = typeof judgeText === 'string' ? judgeText.replace(/\\n/g, '\n') : '';
    cleanJudgeText = cleanJudgeText.replace(/## 🏛️ CouncilIA.*?Verdict Final\n/i, '');
    cleanJudgeText = cleanJudgeText.replace(/### (Consensus Score|Puntuación de Consenso|Pontuação de Consenso|Score de Consensus|Konsens-Score|Punteggio di Consenso): \[?\d+\/100\]?\n/i, '');

    return (
        <div id="pdf-report-container" className="bg-[#030712] text-slate-100 font-sans w-[210mm] relative overflow-hidden hidden-in-browser" style={{ fontFamily: "'Inter', sans-serif" }}>

            <style dangerouslySetInnerHTML={{
                __html: `
                .pdf-page { width: 210mm; min-height: 297mm; padding: 40px; padding-bottom: 80px; position: relative; background-color: #030712; }
                .pdf-page.cover { height: 297mm; }
                .bg-gradient-mesh { background: radial-gradient(circle at top right, rgba(99, 102, 241, 0.15), transparent), radial-gradient(circle at bottom left, rgba(168, 85, 247, 0.1), transparent); }
                .mono { font-family: monospace; }
            `}} />

            {/* --- PAGE 1: COVER --- */}
            <section className="pdf-page cover bg-gradient-mesh flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-xl italic text-white">C</div>
                        <span className="font-bold tracking-tight text-xl text-white">CouncilIA</span>
                    </div>
                    <div className="text-right text-xs mono text-slate-500 uppercase tracking-widest">
                        Confidential / Internal Use Only<br />
                        Ref: VAL-{validation.id.substring(0, 8).toUpperCase()}
                    </div>
                </div>

                <div className="my-auto text-center py-20 flex flex-col items-center">
                    <h1 className="text-5xl font-extrabold tracking-tighter mb-4 text-white">
                        Strategic Validation <br />
                        <span className="text-indigo-400">Analysis Report</span>
                    </h1>
                    <div className="max-w-xl px-6 py-3 bg-indigo-900/40 border border-indigo-500/30 rounded-xl mb-12">
                        <span className="text-indigo-200 mono text-sm font-medium leading-relaxed">{validation.idea.substring(0, 150)}{validation.idea.length > 150 ? '...' : ''}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-8 text-left min-w-[300px] pt-10 border-t border-white/10">
                        <div>
                            <p className="text-slate-500 text-xs uppercase font-bold mb-1">Generated On</p>
                            <p className="font-medium text-white">{dateStr}</p>
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs uppercase font-bold mb-1">Engine Version</p>
                            <p className="font-medium text-white">ACE Engine Formatter v2</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-end border-t border-white/5 pt-8">
                    <div className="text-xs text-slate-500 italic">Exported via CouncilIA OS</div>
                    <div className="text-xs text-slate-500">Page 1</div>
                </div>
            </section>

            {/* --- PAGE 2: VERDICT --- */}
            <section className="pdf-page bg-gradient-mesh flex flex-col">
                <div className="flex justify-between border-b border-white/5 pb-4 mb-8 shrink-0">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Section 01 // Executive Summary</span>
                    <span className="text-xs text-slate-500 italic">CouncilIA Report</span>
                </div>

                <div className="grid grid-cols-1 gap-8 flex-1 content-start">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-white">Final Verdict</h2>

                        <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-slate-500 uppercase mb-2">Consensus Score</p>
                                <div className="flex items-baseline gap-2">
                                    <span className={`text-6xl font-black ${score >= 70 ? 'text-emerald-400' : score >= 40 ? 'text-amber-400' : 'text-red-400'}`}>{score}</span>
                                    <span className="text-2xl text-slate-500">/100</span>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className={`w-3 h-3 rounded-full ${score >= 70 ? 'bg-emerald-500' : score >= 40 ? 'bg-amber-500' : 'bg-red-500'}`}></div>
                                    <span className="text-sm font-semibold text-white">
                                        Strategic Viability: {score >= 70 ? 'HIGH' : score >= 40 ? 'MEDIUM' : 'LOW RISK'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="prose prose-invert prose-sm max-w-none 
                            prose-headings:text-white prose-headings:font-bold prose-headings:mt-6 prose-headings:mb-3
                            prose-h3:text-indigo-300 prose-h3:text-xs prose-h3:uppercase prose-h3:tracking-widest
                            prose-p:text-slate-300 prose-p:leading-relaxed prose-p:text-sm
                            prose-li:text-slate-300 prose-li:text-sm
                            prose-strong:text-cyan-300">
                            <ReactMarkdown>{cleanJudgeText}</ReactMarkdown>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-10 left-10 right-10 flex justify-between shrink-0">
                    <div className="text-xs text-slate-500">Page 2</div>
                </div>
            </section>

            {/* --- PAGE 3: AGENT INSIGHTS --- */}
            {round3.length > 0 && (
                <section className="pdf-page bg-gradient-mesh flex flex-col">
                    <div className="flex justify-between border-b border-white/5 pb-4 mb-8 shrink-0">
                        <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Section 02 // Agent Synthesis (Round 3)</span>
                        <span className="text-xs text-slate-500 italic">CouncilIA Report</span>
                    </div>

                    <h2 className="text-2xl font-bold mb-6 text-white shrink-0">Multi-Agent Deliberation Synthesis</h2>

                    <div className="grid grid-cols-2 gap-4 flex-1 content-start">
                        {round3.map((r: any) => {
                            const persona = gp(r.name, lang);
                            // Truncate text manually to avoid html2canvas line-clamp rendering failures
                            const cleanText = r.text.length > 350 ? r.text.substring(0, 350).trim() + '...' : r.text;

                            return (
                                <div key={r.id} className="p-5 bg-slate-900/40 border border-white/5 rounded-xl relative overflow-hidden flex flex-col">
                                    <div className="absolute top-0 right-0 w-32 h-32 blur-[40px] opacity-20 pointer-events-none" style={{ backgroundColor: persona.c }}></div>
                                    <div className="flex items-center gap-3 mb-4 shrink-0">
                                        <div className="w-12 h-12 rounded-full flex flex-col items-center justify-center border-2 shrink-0 bg-black/50" style={{ borderColor: persona.c + '50' }}>
                                            <span className="text-2xl">{persona.em}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm">{persona.dn}</h4>
                                            <span className="text-[9px] mono uppercase font-bold tracking-widest" style={{ color: persona.c }}>Council Expert</span>
                                        </div>
                                    </div>
                                    <div className="prose prose-invert prose-sm text-slate-400 leading-relaxed text-xs">
                                        <ReactMarkdown>{cleanText}</ReactMarkdown>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="absolute bottom-10 left-10 right-10 flex justify-between shrink-0">
                        <div className="text-xs text-slate-500">Page 3</div>
                    </div>
                </section>
            )}
        </div>
    );
}
