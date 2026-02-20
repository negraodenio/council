import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { nanoid } from 'nanoid';
import { getLimitForPlan } from '@/config/limits';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    const supabase = createAdminClient();
    const { idea, region, sensitivity, topic, tenant_id, user_id } = await req.json();

    const t_id = tenant_id || '00000000-0000-0000-0000-000000000000';
    const u_id = user_id || '00000000-0000-0000-0000-000000000000';

    // 1. Verify Usage & Subscription
    const now = new Date();
    const periodMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    const { data: subscription } = await supabase
        .from('subscriptions')
        .select('plan')
        .eq('tenant_id', t_id)
        .maybeSingle();

    const { data: usage } = await supabase
        .from('usage_records')
        .select('validations_count')
        .eq('tenant_id', t_id)
        .eq('period_month', periodMonth)
        .maybeSingle();

    const limit = getLimitForPlan(subscription?.plan);
    const currentUsage = usage?.validations_count || 0;

    if (currentUsage >= limit) {
        return NextResponse.json(
            {
                error: 'LIMIT_REACHED',
                message: 'Your monthly session limit has been reached.',
                limit,
                usage: currentUsage
            },
            { status: 403 }
        );
    }

    const validationId = `val_${nanoid(10)}`;
    const runId = `run_${nanoid(10)}`;

    const { error: valError } = await supabase.from('validations').insert({
        id: validationId,
        tenant_id: t_id,
        user_id: u_id,
        region,
        sensitivity,
        idea,
        status: 'running',
    });

    if (valError) return NextResponse.json({ error: valError.message }, { status: 500 });

    await supabase.from('debate_runs').insert({
        id: runId,
        validation_id: validationId,
        tenant_id: t_id,
        user_id: u_id,
        topic: topic ?? 'CouncilIA Live Debate',
        status: 'running',
    });

    const host = req.headers.get('host');
    const protocol = req.headers.get('x-forwarded-proto') || 'https';
    const baseUrl = `${protocol}://${host}`;

    console.log(`[Start] Triggering worker at ${baseUrl}/api/session/worker`);

    fetch(`${baseUrl}/api/session/worker`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-internal': '1' },
        body: JSON.stringify({
            validationId,
            runId,
            tenant_id: t_id,
            user_id: u_id,
            idea,
            region,
            sensitivity,
        }),
    }).catch((err) => {
        console.error('Worker trigger failed:', err);
    });

    return NextResponse.json({ validationId, runId });
}
