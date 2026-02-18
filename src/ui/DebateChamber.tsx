'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { councilConfig } from '@/config/council';

type DebateMsg = {
    model?: string | null;
    ts?: string;
    text?: string;
    phase?: string;
    latency_ms?: number;
};

type ConsensusEvent = { global?: number; coreSync?: number };

function clampPct(n: number) {
    if (Number.isNaN(n)) return 0;
    return Math.max(0, Math.min(100, n));
}

export default function DebateChamber({ runId }: { runId: string }) {
    // v1: fixo pra testar rápido; depois puxamos do Supabase
    const region = 'EU' as const;
    const sensitivity = 'business' as const;

    const router = useRouter();
    // Use personas directly from config
    const personas = Object.values(councilConfig.personas);

    const [coreSync, setCoreSync] = useState(84);
    const [globalConsensus, setGlobalConsensus] = useState(68.4);
    const [activeSpeaker, setActiveSpeaker] = useState<string | null>('advocate');
    const [msgs, setMsgs] = useState<DebateMsg[]>([]);
    const [liveTimer, setLiveTimer] = useState('LIVE');

    const [interjectInput, setInterjectInput] = useState('');
    const [interjectOpen, setInterjectOpen] = useState(false);

    async function sendInterject() {
        if (!interjectInput.trim()) return;
        await fetch('/api/chamber/interject', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ run_id: runId, user_input: interjectInput, region, sensitivity })
        });
        setInterjectInput('');
        setInterjectOpen(false);
    }

    const council = useMemo(() => {
        const judgeNode = {
            key: 'judge',
            label: 'Judge',
            avatarColor: '#FFFFFF',
            image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDd94_1G5XF_LYADyz4wGuBXUvWpG6Tyj_jZI5rKCTUw3VfXKzCaETb7V-7w9fDTY7NpKU53QOqUQ-EJlzC-CFRHgGNOMW_kWn2jdHIft8mwq6WjYC7AfVIkjtjXN2jPlUlTtknWhpP0ZbDFsLCyE74yxN7POsm4ySnYwXA2AXV4d8ZAADi-eUUhkCfXDqLWOg63Khh7PoLW4hvCxvjewwySeF8eYEPWRnffPCs3AKTv2Q7QBu4Y5AhNo-40lFepGjw4NZT4aXPOHs'
        };

        const mapImg: Record<string, string> = {
            advocate: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDd94_1G5XF_LYADyz4wGuBXUvWpG6Tyj_jZI5rKCTUw3VfXKzCaETb7V-7w9fDTY7NpKU53QOqUQ-EJlzC-CFRHgGNOMW_kWn2jdHIft8mwq6WjYC7AfVIkjtjXN2jPlUlTtknWhpP0ZbDFsLCyE74yxN7POsm4ySnYwXA2AXV4d8ZAADi-eUUhkCfXDqLWOg63Khh7PoLW4hvCxvjewwySeF8eYEPWRnffPCs3AKTv2Q7QBu4Y5AhNo-40lFepGjw4NZT4aXPOHs',
            skeptic: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcEKNdV31zTNHjTfvYtwbwYGQ8fvUzTvT4YovMTHdo_tNRukZ5aLYnvZbDkZ0FrnXev2BAlN0vgrI1OEpBtPmFNWOuFL6qguwbs_O3z2Mx5NakaPxGHnq44Lw-pT3Dg7wBmSgLKoubiyNFZiKMQxWlLFSr9quWhfDcfeOU18li7OxtSDkMTYmaq7NUhFe-axWEega75UM7-gymzSLyKq4YeqdmU0Vh0DL1Oo7P7iHUcvTd7Iuwk4KwDpJm_VSV3nogCZ1J7ro78C4',
            architect: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsX9Y6Is3x3NHpwyxgV2AvUgIxLwLI3FvUigHV8TSSqvWpmmOXtFdAbcRqP7jFA7gGjRCWN2H58VP8x2agoHUQN22g6Nd1TGMHSp0k1y42DKyNNQIpeaNGV4CjJTL2i3UhQDDg_ywwvVOrnMTPJ2rSCf8Qb8lgklbd9TFx5jtCA-AfO_MdHZ2Ygkg6c4uEivpBzvyAFafVWwjjtCmUYi4XF5-2G0T7ZjkpbZF9Ol0KnzYvvtbbpH-rmdY0l5zj_huW0vWPD9HYR5g',
            optimizer: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDM5W83OyJt4-NwxLGro1mrgwRqdEzInQtcm28RA5s5l39RxHpzL9v78Eqxh5_OAPL2NBLnVaOgQIITh4UizZgQFNdW-_I2x-AJEw5eyRpnx3Cpoj0OlNx4f0XWKPTTxRjpxviOXuhtfrqFboEjRW7XycO-yxxCXXboVxAq8kvZvIPZsESm1zdt7fnRKXA9L1aHBEKW3Y3yUpnAVYXj1rLb-2upkv0Yesu4rvatwtoSiNB4go8sPMRyjCn3QuSSmEcjCvRSyi24BTQ'
        };

        const mapColor: Record<string, string> = {
            advocate: '#FF00FF',
            skeptic: '#00FFFF',
            architect: '#32CD32',
            optimizer: '#FFBF00'
        };

        const four = personas.map((p) => ({
            key: p.id,
            label: p.name,
            avatarColor: mapColor[p.id] || '#FFFFFF',
            image: mapImg[p.id] || judgeNode.image
        }));

        return { four, judgeNode };
    }, [runId]);

    useEffect(() => {
        const es = new EventSource(`/api/chamber/stream?runId=${runId}`);

        const onModelMsg = (ev: MessageEvent) => {
            const data = JSON.parse(ev.data) as DebateMsg;
            setMsgs((prev) => [...prev, data]);
            if (data.model) setActiveSpeaker(data.model);
        };

        const onConsensus = (ev: MessageEvent) => {
            const data = JSON.parse(ev.data) as ConsensusEvent;
            if (typeof data.coreSync === 'number') setCoreSync(clampPct(data.coreSync));
            if (typeof data.global === 'number') setGlobalConsensus(clampPct(data.global));
        };

        const onJudge = (ev: MessageEvent) => {
            const data = JSON.parse(ev.data) as DebateMsg;
            setMsgs((prev) => [...prev, { ...data, model: 'judge' }]);
            setActiveSpeaker('judge');
        };

        const onComplete = (ev: MessageEvent) => {
            const data = JSON.parse(ev.data);
            es.close();
            setTimeout(() => {
                router.push(`/report/${data.validationId}`);
            }, 2000);
        };

        es.addEventListener('model_msg', onModelMsg as any);
        es.addEventListener('consensus', onConsensus as any);
        es.addEventListener('judge_note', onJudge as any);
        es.addEventListener('complete', onComplete as any);

        return () => es.close();
    }, [runId, router]);

    useEffect(() => {
        const t0 = Date.now();
        const id = setInterval(() => {
            const s = Math.floor((Date.now() - t0) / 1000);
            const hh = String(Math.floor(s / 3600)).padStart(2, '0');
            const mm = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
            const ss = String(s % 60).padStart(2, '0');
            setLiveTimer(`LIVE ${hh}:${mm}:${ss}`);
        }, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="bg-[#f6f6f8] text-[#163a9c] min-h-screen overflow-x-hidden font-sans relative">
            <style>{`
        .pulse-line { opacity: 0.6; stroke-dasharray: 4; }
        .active-speaker-ring { border: 2px solid; animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: .5; transform: scale(1.08); }
        }
      `}</style>

            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#163a9c]/10 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded bg-[#163a9c] flex items-center justify-center text-white">
                        <span className="text-[18px]">⎈</span>
                    </div>
                    <div>
                        <h1 className="text-sm font-bold uppercase tracking-wider text-[#163a9c]/60">Live Debate Chamber</h1>
                        <h2 className="text-lg font-bold leading-none">CouncilIA Session</h2>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="bg-red-500/10 text-red-600 px-2 py-1 rounded-sm text-[10px] font-black flex items-center gap-1">
                        <span className="size-1.5 bg-red-600 rounded-full animate-pulse" />
                        {liveTimer}
                    </div>
                    <button className="size-10 rounded border border-[#163a9c]/10 flex items-center justify-center hover:bg-[#163a9c]/5">
                        <span className="text-[18px]">⚙</span>
                    </button>
                </div>
            </header>

            <main className="flex flex-col min-h-[calc(100vh-140px)]">
                <div className="relative w-full aspect-square md:aspect-video flex items-center justify-center p-8 overflow-hidden bg-[#163a9c]/5">
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #163a9c 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                    <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
                            <line className="pulse-line" stroke="#ffffff" strokeWidth="2" x1="200" y1="200" x2="200" y2="55" />
                            <line className="pulse-line" stroke={council.four[0]?.avatarColor || '#FF00FF'} strokeWidth="2" x1="200" y1="200" x2="350" y2="150" />
                            <line className="pulse-line" stroke={council.four[1]?.avatarColor || '#00FFFF'} strokeWidth="2" x1="200" y1="200" x2="300" y2="330" />
                            <line className="pulse-line" stroke={council.four[2]?.avatarColor || '#32CD32'} strokeWidth="2" x1="200" y1="200" x2="100" y2="330" />
                            <line className="pulse-line" stroke={council.four[3]?.avatarColor || '#FFBF00'} strokeWidth="2" x1="200" y1="200" x2="50" y2="150" />
                            <circle cx="200" cy="200" r="40" fill="white" stroke="#163a9c" strokeWidth="1" />
                        </svg>

                        <div className="absolute flex flex-col items-center justify-center text-center">
                            <span className="text-[10px] font-bold text-[#163a9c]/40">CORE</span>
                            <span className="text-2xl font-black text-[#163a9c]">{Math.round(coreSync)}%</span>
                            <span className="text-[8px] font-bold text-[#163a9c]/40 uppercase">Sync</span>
                        </div>

                        {/* Judge */}
                        <div className="absolute top-[9%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                            <div className={`relative size-20 rounded-full bg-white flex items-center justify-center border-4 border-white/50 shadow-[0_0_12px_rgba(255,255,255,0.8)] ${activeSpeaker === 'judge' ? 'active-speaker-ring' : ''}`}>
                                <img className="size-full rounded-full object-cover" alt="Judge" src={council.judgeNode.image} />
                            </div>
                            <div className="bg-black/80 text-white px-3 py-1 rounded-sm text-xs font-bold">Judge</div>
                        </div>

                        <Node pos="topRight" label={council.four[0]?.label ?? 'Model'} color={council.four[0]?.avatarColor ?? '#FF00FF'} img={council.four[0]?.image ?? council.judgeNode.image} active={activeSpeaker === council.four[0]?.key} />
                        <Node pos="bottomRight" label={council.four[1]?.label ?? 'Model'} color={council.four[1]?.avatarColor ?? '#00FFFF'} img={council.four[1]?.image ?? council.judgeNode.image} active={activeSpeaker === council.four[1]?.key} />
                        <Node pos="bottomLeft" label={council.four[2]?.label ?? 'Model'} color={council.four[2]?.avatarColor ?? '#32CD32'} img={council.four[2]?.image ?? council.judgeNode.image} active={activeSpeaker === council.four[2]?.key} />
                        <Node pos="topLeft" label={council.four[3]?.label ?? 'Model'} color={council.four[3]?.avatarColor ?? '#FFBF00'} img={council.four[3]?.image ?? council.judgeNode.image} active={activeSpeaker === council.four[3]?.key} />
                    </div>
                </div>

                <div className="px-4 py-3 bg-white border-y border-[#163a9c]/10">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-black text-[#163a9c]/60 uppercase tracking-widest">Global Consensus Level</span>
                        <span className="text-xs font-bold text-[#163a9c]">{globalConsensus.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#163a9c]/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#163a9c]" style={{ width: `${clampPct(globalConsensus)}%` }} />
                    </div>
                </div>

                <div className="flex-1 bg-[#111521] p-4 space-y-4 overflow-y-auto max-h-[420px]">
                    <h3 className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-4">Live Transcript</h3>
                    {msgs.length === 0 ? (
                        <div className="text-white/50 text-sm">Waiting for council messages…</div>
                    ) : (
                        msgs.slice(-40).map((m, idx) => (
                            <TranscriptItem key={idx} model={m.model ?? 'system'} text={m.text ?? ''} ts={m.ts ?? ''} />
                        ))
                    )}
                </div>
            </main>

            {/* Bottom Controls */}
            <footer className="sticky bottom-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#163a9c]/10 p-4 flex items-center justify-center gap-4">
                <button
                    onClick={() => setInterjectOpen(!interjectOpen)}
                    className="px-6 h-12 rounded-lg bg-[#163a9c] text-white flex items-center gap-2 font-bold text-sm shadow-lg hover:shadow-xl transition-all"
                >
                    <span>⚡</span>
                    INTERJECT
                </button>
            </footer>

            {interjectOpen && (
                <div className="fixed bottom-32 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/90 backdrop-blur shadow-2xl rounded-xl p-4 z-50 border border-[#163a9c]/10">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#163a9c]/60 mb-2">User Intervention</h4>
                    <textarea
                        className="w-full bg-slate-100 border border-slate-300 rounded p-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#163a9c]/20"
                        placeholder="Your input for the Judge..."
                        value={interjectInput}
                        onChange={(e) => setInterjectInput(e.target.value)}
                        rows={3}
                    />
                    <div className="flex gap-2 mt-3">
                        <button
                            onClick={sendInterject}
                            className="flex-1 bg-[#163a9c] text-white py-2 rounded font-bold text-sm"
                        >
                            Send
                        </button>
                        <button
                            onClick={() => setInterjectOpen(false)}
                            className="px-4 bg-slate-300 text-slate-900 py-2 rounded font-bold text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

function Node(props: { pos: 'topRight' | 'bottomRight' | 'bottomLeft' | 'topLeft'; label: string; color: string; img: string; active?: boolean }) {
    const pos = {
        topRight: 'top-[35%] right-[5%]',
        bottomRight: 'bottom-[15%] right-[20%]',
        bottomLeft: 'bottom-[15%] left-[20%]',
        topLeft: 'top-[35%] left-[5%]'
    }[props.pos];

    return (
        <div className={`absolute ${pos} flex flex-col items-center gap-2`}>
            <div
                className={`relative size-16 rounded-full flex items-center justify-center border-2 border-white/50 ${props.active ? 'active-speaker-ring' : ''}`}
                style={{ background: props.color, boxShadow: `0 0 10px ${props.color}` }}
            >
                <img className="size-full rounded-full object-cover" alt={props.label} src={props.img} />
            </div>
            <div className="bg-black/80 text-white px-2 py-0.5 rounded-sm text-[10px] font-bold">{props.label}</div>
        </div>
    );
}

function TranscriptItem({ model, text, ts }: { model: string; text: string; ts: string }) {
    const colorMap: Record<string, string> = {
        deepseek: '#FF00FF',
        qwen: '#00FFFF',
        glm: '#32CD32',
        llama: '#FFBF00',
        mistral: '#3b82f6',
        kimi: '#A020F0',
        judge: '#ffffff',
        system: '#94a3b8'
    };
    const c = colorMap[model] || '#94a3b8';

    return (
        <div className="flex gap-3">
            <div className="size-1 w-1 shrink-0 rounded-full mt-2" style={{ background: c, boxShadow: `0 0 8px ${c}` }} />
            <div className="flex-1 bg-white/5 border-l-2 p-3 rounded-lg" style={{ borderLeftColor: c }}>
                <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-black uppercase" style={{ color: c }}>{model}</span>
                    <span className="text-white/20 text-[9px]">{ts ? new Date(ts).toLocaleTimeString() : ''}</span>
                </div>
                <p className="text-sm text-white/90 leading-relaxed whitespace-pre-wrap">{text}</p>
            </div>
        </div>
    );
}
