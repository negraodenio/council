'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function Chamber() {
    const { runId } = useParams();
    const [messages, setMessages] = useState<any[]>([]); // Added type annotation to avoid implicit any error if strict
    const [consensus, setConsensus] = useState(0);

    const personas = [
        { id: 'advocate', name: 'Advocate', emoji: '✅', color: 'bg-green-500' },
        { id: 'skeptic', name: 'Skeptic', emoji: '❓', color: 'bg-yellow-500' },
        { id: 'architect', name: 'Architect', emoji: '🏗️', color: 'bg-blue-500' },
        { id: 'optimizer', name: 'Optimizer', emoji: '⚡', color: 'bg-purple-500' },
        { id: 'judge', name: 'Judge', emoji: '⚖️', color: 'bg-slate-500' },
    ];

    useEffect(() => {
        // Phase 4: Use SSE for Vercel compatibility
        const es = new EventSource(`/api/chamber/stream?runId=${runId}`);

        es.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.type === 'system' && data.ok) {
                console.log('Connected to Council Chamber stream');
                return;
            }

            setMessages(prev => {
                // Dedup based on timestamp + persona
                const exists = prev.some(m => m.timestamp === data.ts && m.persona === data.persona);
                if (exists) return prev;

                return [...prev, {
                    persona: data.model, // Backend sends 'model' as persona ID (e.g. 'advocate')
                    content: data.text || data.msg,
                    emoji: data.emoji,
                    timestamp: data.ts || Date.now(),
                    ...data
                }];
            });

            // Update consensus
            if (data.type === 'final_consensus' && data.consensusDelta) {
                setConsensus(data.consensusDelta);
            }
        };

        es.onerror = (err) => {
            console.error('SSE Error:', err);
            es.close();
        };

        return () => {
            es.close();
        };
    }, [runId]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white p-8">
            {/* Header */}
            <div className="max-w-4xl mx-auto mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl flex items-center justify-center">
                        <span className="text-2xl">C</span>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">Council Chamber #{runId}</h1>
                        <p className="text-slate-400">Live AI debate in progress...</p>
                    </div>
                </div>

                {/* Consensus Bar */}
                <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center gap-4 mb-2">
                        <span className="text-xl font-bold text-yellow-400">Global Consensus Level</span>
                        <div className="flex-1 h-3 bg-white/20 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-1000"
                                style={{ width: `${Math.max(10, consensus)}%` }}
                            />
                        </div>
                        <span className="font-mono text-sm text-slate-400">{Math.round(consensus)}%</span>
                    </div>
                    <div className="flex gap-4 text-xs text-slate-500">
                        <span>🔒 Privacy: EU-first</span>
                        <span>📊 Audit: Active</span>
                        <span>⚡ Rate: 30/min</span>
                    </div>
                </div>
            </div>

            {/* Debate Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {personas.map((persona) => (
                    <div key={persona.id} className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`w-12 h-12 ${persona.color} rounded-xl flex items-center justify-center shadow-lg`}>
                                <span className="text-2xl">{persona.emoji}</span>
                            </div>
                            <div>
                                <h3 className="font-bold">{persona.name}</h3>
                                <p className="text-xs text-slate-400 capitalize">{persona.id}</p>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {messages
                                .filter(msg => msg.persona === persona.id)
                                .slice(-3)
                                .map((msg, i) => (
                                    <div key={i} className="p-3 bg-white/5 rounded-lg text-sm">
                                        <span className="font-medium text-slate-300">{msg.content?.slice(0, 100)}...</span>
                                        <span className="text-xs text-slate-500 block mt-1">
                                            {new Date(msg.timestamp).toLocaleTimeString()}
                                        </span>
                                    </div>
                                ))}
                            {messages.filter(msg => msg.persona === persona.id).length === 0 && (
                                <div className="text-center py-8 text-slate-500 text-sm">
                                    <div className="w-6 h-6 border-2 border-slate-500/30 border-t-white/50 rounded-full animate-spin mx-auto mb-2"></div>
                                    Listening...
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Transcript */}
            <div className="max-w-6xl mx-auto mt-12">
                <div className="bg-white/5 backdrop-blur rounded-2xl p-8 border border-white/10">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <span>📜</span> Live Transcript
                    </h3>
                    <div className="max-h-64 overflow-y-auto space-y-4">
                        {messages.map((msg, i) => (
                            <div key={i} className="flex gap-3">
                                <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                                    {msg.emoji || '🤖'}
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium text-slate-300 mb-1">{msg.persona}</div>
                                    <div className="text-slate-200">{msg.content}</div>
                                </div>
                            </div>
                        ))}
                        {messages.length === 0 && (
                            <div className="text-center py-12 text-slate-500">
                                <div className="animate-pulse">Debate will appear here...</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
