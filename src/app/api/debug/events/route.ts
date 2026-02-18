import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const runId = url.searchParams.get('runId');
  
  if (!runId) return NextResponse.json({ error: 'missing runId' }, { status: 400 });

  const supabase = createAdminClient();
  
  const { data, error } = await supabase
    .from('debate_events')
    .select('*')
    .eq('run_id', runId)
    .order('created_at', { ascending: true });

  return NextResponse.json({ count: data?.length || 0, error: error?.message, events: data });
}
