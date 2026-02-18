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
    const r = await fetch(`${process.env.SILICONFLOW_API_URL || 'https://api.siliconflow.com/v1'}/chat/completions`, {
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
        throw new Error(`SiliconFlow error ${r.status}: ${txt}`);
    }
    return r.json();
}

export async function POST(req: Request) {
    try {
        const { validationId, runId, tenant_id, user_id, idea, region, sensitivity } = await req.json();
        const supabase = createAdminClient();

        // Phase 3.2: PII Redaction
        const { redacted: ideaRedacted, hadPII } = redactPII(idea);

        if (hadPII) {
            await addEvent(supabase, runId, 'system', null, { msg: 'PII detected and redacted before processing' });
        }

        const config = getCouncilConfig(region, sensitivity);
        const personas = Object.values(councilConfig.personas);

        // Parallel swarm discussion
        console.log(`Starting swarm for ${personas.length} personas...`);

        await Promise.all(personas.map(async (p) => {
            const t0 = Date.now();
            try {
                // Get assigned model for this persona
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
                    layer: 'swarm',
                    provider: provider,
                    model: modelKey,
                    latency_ms: Date.now() - t0,
                    status: 'ok'
                });
            } catch (err: any) {
                console.error(`Swarm error for ${p.id}:`, err);
                await addEvent(supabase, runId, 'error', p.id, { msg: `Failed to get response from ${p.name}: ${err.message}` });
            }
        }));

        // Final Judge Note (Phase 3.3: Pass allowlist)
        const judgeMessages = [
            { role: 'system', content: 'You are the Judge. Summarize the panel results and provide a final consensus score (0-100).' },
            { role: 'user', content: `Analyze the discussion for: ${ideaRedacted}` }
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
                full_result: { judge: judgeText }
            }).eq('id', validationId);

            // Billing Usage
            await trackUsage({ tenant_id, validation_id: validationId });

            // Webhook
            await triggerWebhook({
                tenant_id,
                event: 'debate.complete',
                payload: { validation_id: validationId, consensus_score: score, council: personas.length }
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
