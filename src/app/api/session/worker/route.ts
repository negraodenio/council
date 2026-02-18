import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getCouncilConfig, councilConfig } from '@/config/council';
import { logAICall } from '@/lib/logs/ai';
import { apiError, apiOk } from '@/lib/api/error';
import { redactPII } from '@/lib/privacy/redact';
import { trackUsage } from '@/lib/billing/usage';
import { triggerWebhook } from '@/lib/webhooks/send';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300; // Vercel Pro: 5 minutes (Limit detected during build)

async function addEvent(supabase: any, run_id: string, event_type: string, model: string | null, payload: any) {
    // Model field is used for 'persona' identifier in frontend
    await supabase.from('debate_events').insert({ run_id, event_type, model, payload });
}

async function callOpenRouter(model: string, messages: any[], opts: { zdr: boolean; allowlist?: string[] }) {
    const providerConfig: any = {
        zdr: opts.zdr,
        allowFallbacks: true,
        sort: { by: 'latency', partition: 'none' }
    };

    if (opts.allowlist) {
        providerConfig.order = opts.allowlist;
    }

    const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': process.env.OPENROUTER_HTTP_REFERER || '',
            'X-Title': process.env.OPENROUTER_X_TITLE || 'CouncilIA'
        },
        body: JSON.stringify({
            model,
            messages,
            provider: providerConfig
        })
    });

    if (!r.ok) {
        const txt = await r.text();
        throw new Error(`OpenRouter error ${r.status}: ${txt}`);
    }
    return r.json();
}

async function callSiliconFlow(model: string, messages: any[]) {
    const url = `${process.env.SILICONFLOW_API_URL || 'https://api.siliconflow.com/v1'}/chat/completions`;
    console.log(`[SiliconFlow] Calling ${model} at ${url}`);

    try {
        const r = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.SILICONFLOW_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model,
                messages,
                stream: false
            })
        });

        if (!r.ok) {
            const txt = await r.text();
            console.error(`[SiliconFlow] Error ${r.status}: ${txt}`);
            throw new Error(`SiliconFlow error ${r.status}: ${txt}`);
        }
        return r.json();
    } catch (e: any) {
        console.error('[SiliconFlow] Network/Fetch Error:', e);
        throw e;
    }
}

export async function POST(req: Request) {
    console.log('[Worker] Received request');
    try {
        const body = await req.json();
        console.log('[Worker] Body parsed:', JSON.stringify(body).slice(0, 100));

        const { validationId, runId, tenant_id, user_id, idea, region, sensitivity } = body;
        const supabase = createAdminClient();

        // SIGNAL START
        await addEvent(supabase, runId, 'system', null, { msg: '🏛️ Debate 2.0 Protocol Initiated. Worker Active.' });

        // Phase 3.2: PII Redaction
        const { redacted: ideaRedacted, hadPII } = redactPII(idea);

        if (hadPII) {
            await addEvent(supabase, runId, 'system', null, { msg: 'PII detected and redacted before processing' });
        }

        const config = getCouncilConfig(region, sensitivity);
        const personas = Object.values(councilConfig.personas);

        // --- ROUND 1: Initial Analysis ---
        console.log(`Starting Round 1 for ${personas.length} personas...`);

        const round1Results = await Promise.all(personas.map(async (p) => {
            const t0 = Date.now();
            try {
                // Get assigned model
                const assignedModel = config.assign[p.id as keyof typeof config.assign];
                const modelKey = assignedModel?.model || 'deepseek-ai/DeepSeek-V3'; // Default to SF if configured
                const provider = assignedModel?.provider || 'openrouter';

                const messages = [
                    { role: 'system', content: `You are the ${p.name}. Role: ${p.role}. Provide a concise, professional analysis.` },
                    { role: 'user', content: ideaRedacted }
                ];

                let out;
                if (provider === 'siliconflow') {
                    out = await callSiliconFlow(modelKey, messages);
                } else {
                    out = await callOpenRouter(modelKey, messages, { zdr: config.judge.zdr });
                }

                const text = out?.choices?.[0]?.message?.content || `Analysis complete by ${p.name}.`;

                // Important: we save 'p.id' (e.g. 'advocate') as the model field so the UI mapping works
                await addEvent(supabase, runId, 'model_msg', p.id, { text, phase: 'initial_analysis', persona: p.name, emoji: p.emoji });

                await logAICall({
                    validation_id: validationId,
                    tenant_id: tenant_id,
                    layer: 'swarm_r1',
                    provider: provider,
                    model: modelKey,
                    latency_ms: Date.now() - t0,
                    status: 'ok'
                });

                return { id: p.id, name: p.name, text };
            } catch (err: any) {
                console.error(`Round 1 error for ${p.id}:`, err);
                await addEvent(supabase, runId, 'error', p.id, { msg: `Failed Round 1: ${err.message}` });
                return { id: p.id, name: p.name, text: '[Error in Round 1]' };
            }
        }));

        // --- ROUND 2: Rebuttal & Deep Dive ---
        const transcriptR1 = round1Results.map(r => `[${r.name}]: ${r.text}`).join('\n\n');

        await addEvent(supabase, runId, 'system', null, { msg: 'Phase 2: Council Rebuttal & Cross-Examination' });
        console.log('Starting Round 2 (Rebuttal)...');

        const round2Results = await Promise.all(personas.map(async (p) => {
            const t0 = Date.now();
            try {
                const assignedModel = config.assign[p.id as keyof typeof config.assign];
                const modelKey = assignedModel?.model || 'deepseek-ai/DeepSeek-V3';
                const provider = assignedModel?.provider || 'openrouter';

                const messages = [
                    { role: 'system', content: `You are the ${p.name}. Role: ${p.role}. \n\nThe council has spoken (Round 1). Critically evaluate your peers' arguments and provide your rebuttal or final refined conclusion. Be direct.` },
                    { role: 'user', content: `Original Topic: ${ideaRedacted}\n\n=== ROUND 1 TRANSCRIPT ===\n${transcriptR1}` }
                ];

                let out;
                if (provider === 'siliconflow') {
                    out = await callSiliconFlow(modelKey, messages);
                } else {
                    out = await callOpenRouter(modelKey, messages, { zdr: config.judge.zdr });
                }

                const text = out?.choices?.[0]?.message?.content || `Rebuttal complete by ${p.name}.`;

                await addEvent(supabase, runId, 'model_msg', p.id, { text, phase: 'rebuttal', persona: p.name, emoji: p.emoji });

                await logAICall({
                    validation_id: validationId,
                    tenant_id: tenant_id,
                    layer: 'swarm_r2',
                    provider: provider,
                    model: modelKey,
                    latency_ms: Date.now() - t0,
                    status: 'ok'
                });

                return { id: p.id, name: p.name, text };
            } catch (err: any) {
                console.error(`Round 2 error for ${p.id}:`, err);
                // Don't error visually in UI, just log
                return { id: p.id, name: p.name, text: '[Error in Round 2]' };
            }
        }));

        // --- Final Judge Consensus ---
        const transcriptR2 = round2Results.map(r => `[${r.name}]: ${r.text}`).join('\n\n');
        const fullTranscript = `=== ROUND 1 ===\n${transcriptR1}\n\n=== ROUND 2 (REBUTTAL) ===\n${transcriptR2}`;

        const judgeMessages = [
            { role: 'system', content: 'You are the Judge. Consolidate the two rounds of debate into a final verdict and consensus score (0-100).' },
            { role: 'user', content: `Analyze the full debate:\n\n${fullTranscript}` }
        ];

        try {
            const judgeOut = await callOpenRouter(config.judge.primary, judgeMessages, {
                zdr: config.judge.zdr,
                allowlist: config.judge.allowlist
            });
            const judgeText = judgeOut?.choices?.[0]?.message?.content || 'Judge finalized evaluation.';

            // Parse score if possible (simple heuristic)
            const scoreMatch = judgeText.match(/(\d{1,3})\/100/);
            const score = scoreMatch ? parseInt(scoreMatch[1]) : 85;

            await addEvent(supabase, runId, 'judge_note', 'judge', { text: judgeText, type: 'final_consensus', consensusDelta: score });

            // Mark complete
            await supabase.from('validations').update({
                status: 'complete',
                consensus_score: score,
                full_result: { judge: judgeText, round1: round1Results, round2: round2Results }
            }).eq('id', validationId);

            // Billing Usage
            await trackUsage({ tenant_id, validation_id: validationId });

            // Webhook
            await triggerWebhook({
                tenant_id,
                event: 'debate.complete',
                payload: { validation_id: validationId, consensus_score: score, rounds: 2 }
            });

        } catch (err: any) {
            console.error('Judge Error:', err);
            await addEvent(supabase, runId, 'error', 'judge', { msg: `Judge failed: ${err.message}` });
        }

        return apiOk({});
    } catch (error: any) {
        console.error('Worker Error:', error);
        return apiError(error.message, 500);
    }
}
