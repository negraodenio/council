import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { nanoid } from 'nanoid';
import { getLimitForPlan } from '@/config/limits';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    const supabase = createAdminClient();
    const { idea, region, sensitivity, topic, tenant_id, user_id } = await req.json() || {};

    if (!idea) return NextResponse.json({ error: 'Missing idea' }, { status: 400 });

    let t_id = tenant_id;
    let u_id = user_id;

    // 1. Resolve User ID from Auth if missing
    if (!u_id || u_id === '00000000-0000-0000-0000-000000000000') {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) u_id = user.id;
    }

    if (!u_id) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });

    // 2. Resolve Tenant ID
    // Robust check for "zero" or missing tenant
    const isZero = (id: any) => !id || id === '00000000-0000-0000-0000-000000000000' || String(id).trim() === '';

    if (isZero(t_id)) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('tenant_id')
            .eq('id', u_id)
            .maybeSingle();

        // If profile has a real tenant, use it. Otherwise, isolate usage to the user's ID.
        if (profile?.tenant_id && !isZero(profile.tenant_id)) {
            t_id = profile.tenant_id;
        } else {
            t_id = u_id;
        }
    }

    // SAFETY: Ensure tenant and profile records exist to avoid FK violations (validations_tenant_id_fkey)
    await supabase.from('tenants').upsert({ id: t_id, name: 'Personal Workspace' }, { onConflict: 'id' });
    await supabase.from('profiles').upsert({ id: u_id, tenant_id: t_id, role: 'admin' }, { onConflict: 'id' });

    // 3. Verify Usage & Subscription
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
        console.log(`[Limit] Blocked. Tenant: ${t_id} | Usage: ${currentUsage} | Limit: ${limit} | Plan: ${subscription?.plan}`);
        return NextResponse.json(
            {
                error: 'LIMIT_REACHED',
                message: 'Your monthly session limit has been reached.',
                limit,
                usage: currentUsage,
                debug: {
                    tenant: t_id,
                    user: u_id,
                    plan: subscription?.plan || 'free',
                    month: periodMonth,
                    currentUsage,
                    limit
                }
            },
            { status: 403 }
        );
    }

    // 4. Create Validation
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

    console.log(`[Start] Session created. Run ID: ${runId}`);

    return NextResponse.json({ validationId, runId });
}
