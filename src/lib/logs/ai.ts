import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function logAICall(params: {
    validation_id?: string;
    tenant_id?: string;
    layer: 'swarm' | 'debate' | 'judge' | 'rag' | 'patch' | 'swarm_r1' | 'swarm_r2';
    provider: string;
    model: string;
    latency_ms: number;
    tokens_in?: number;
    tokens_out?: number;
    cost_usd?: number;
    status: 'ok' | 'error' | 'timeout' | 'fallback';
    error?: string;
}) {
    await supabase.from('ai_logs').insert(params);
}
