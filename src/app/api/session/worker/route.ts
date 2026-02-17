import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getCouncilConfig } from '@/config/council';
import { logAICall } from '@/lib/logs/ai';
import { apiError, apiOk } from '@/lib/api/error';
import { redactPII } from '@/lib/privacy/redact';
import { trackUsage } from '@/lib/billing/usage';
import { triggerWebhook } from '@/lib/webhooks/send';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function addEvent(run_id: string, event_type: string, model: string | null, payload: any) {
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

export async function POST(req: Request) {
    try {
        const { validationId, runId, tenant_id, user_id, idea, region, sensitivity } = await req.json();

        // Phase 3.2: PII Redaction
        const { redacted: ideaRedacted, hadPII } = redactPII(idea);

        if (hadPII) {
            await addEvent(runId, 'system', null, { msg: 'PII detected and redacted before processing' });
        }

        const config = getCouncilConfig(region, sensitivity);
        const models = config.frontModels;

        const messagesBase = [
            { role: 'system', content: 'You are an expert AI panelist. Provide a concise, professional analysis based on your specialty.' },
            { role: 'user', content: ideaRedacted }
        ];

        // swarm discussion
        for (const m of models) {
            const t0 = Date.now();
            console.log(`Processing model ${m.key}...`);

            try {
                // Real LLM call
                const out = await callOpenRouter(m.model || m.key, messagesBase, { zdr: config.judge.zdr });
                const text = out?.choices?.[0]?.message?.content || `Analysis complete by ${m.label}.`;

                await addEvent(runId, 'model_msg', m.key, { text, phase: 'initial_analysis' });

                await logAICall({
                    validation_id: validationId,
                    tenant_id: tenant_id,
                    layer: 'swarm',
                    provider: m.provider || 'openrouter',
                    model: m.model || m.key,
                    latency_ms: Date.now() - t0,
                    status: 'ok'
                });
            } catch (err: any) {
                console.error(`Swarm error for ${m.key}:`, err);
                await addEvent(runId, 'error', m.key, { msg: `Failed to get response from ${m.label}: ${err.message}` });
            }
        }

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

            await addEvent(runId, 'judge_note', 'judge', { text: judgeText, type: 'final_consensus' });

            const score = 85; // Placeholder

            // Mark complete
            await supabase.from('validations').update({
                status: 'complete',
                consensus_score: score, // Placeholder - in real app we'd parse this from judgeText
                full_result: { judge: judgeText }
            }).eq('id', validationId);

            // Billing Usage
            await trackUsage({ tenant_id, validation_id: validationId });

            // Webhook
            await triggerWebhook({
                tenant_id,
                event: 'debate.complete',
                payload: { validation_id: validationId, consensus_score: score, council: models.length }
            });

        } catch (err: any) {
            console.error('Judge Error:', err);
            await addEvent(runId, 'error', 'judge', { msg: `Judge failed: ${err.message}` });
        }

        return apiOk({});
    } catch (error: any) {
        console.error('Worker Error:', error);
        return apiError(error.message, 500);
    }
}
