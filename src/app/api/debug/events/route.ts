import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const runId = url.searchParams.get('runId');
  
  if (!runId) return NextResponse.json({ error: 'missing runId' }, { status: 400 });

  const supabase = createAdminClient();
  
  // First: get any row to see columns
  const { data: sample, error: sampleErr } = await supabase
    .from('debate_events')
    .select('*')
    .limit(1);

  const columns = sample && sample.length > 0 ? Object.keys(sample[0]) : [];

  // Now fetch by runId without ordering
  const { data, error } = await supabase
    .from('debate_events')
    .select('*')
    .eq('run_id', runId);

  return NextResponse.json({ 
    columns,
    sampleError: sampleErr?.message,
    count: data?.length || 0, 
    error: error?.message, 
    events: data 
  });
}
