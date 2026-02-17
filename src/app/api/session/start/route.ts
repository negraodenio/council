import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { nanoid } from 'nanoid';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    const supabase = createAdminClient();
    const { idea, region, sensitivity, topic, tenant_id, user_id } = await req.json();

    // Ensure UUID format or placeholders for development matching the tenant/user structure
    const t_id = tenant_id || '00000000-0000-0000-0000-000000000000';
    const u_id = user_id || '00000000-0000-0000-0000-000000000000';

    const validationId = `val_${nanoid(10)}`;
    const runId = `run_${nanoid(10)}`;

    const { error: valError } = await supabase.from('validations').insert({
        id: validationId,
        tenant_id: t_id,
        user_id: u_id,
        region,
        sensitivity,
        idea,
        status: 'running'
    });

    if (valError) return NextResponse.json({ error: valError.message }, { status: 500 });

    await supabase.from('debate_runs').insert({
        id: runId,
        validation_id: validationId,
        tenant_id: t_id,
        user_id: u_id,
        topic: topic ?? 'CouncilIA Live Debate',
        status: 'running'
    });

    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/session/worker`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-internal': '1' },
        body: JSON.stringify({ validationId, runId, tenant_id: t_id, user_id: u_id, idea, region, sensitivity })
    }).catch(() => { });

    return NextResponse.json({ validationId, runId });
}
