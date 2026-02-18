export const dynamic = 'force-dynamic';
export const maxDuration = 800; // Vercel Pro: 13.3 minutes
export const preferredRegion = ['fra1', 'iad1']; // Frankfurt (EU), US East

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function sse(event: string, data: unknown) {
    return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const runId = url.searchParams.get('runId');
    if (!runId) return new Response('Missing runId', { status: 400 });

    const stream = new TransformStream();
    const writer = stream.writable.getWriter();
    const enc = new TextEncoder();

    let lastId = 0;
    const tick = async () => {
        const { data } = await supabase
            .from('debate_events')
            .select('id,event_type,model,payload,ts')
            .eq('run_id', runId)
            .gt('id', lastId)
            .order('id', { ascending: true })
            .limit(50);

        if (data?.length) {
            for (const ev of data) {
                lastId = Math.max(lastId, ev.id);
                await writer.write(enc.encode(sse(ev.event_type, { ...ev.payload, model: ev.model, ts: ev.ts })));
            }
        }
    };

    await writer.write(enc.encode(sse('system', { ok: true, runId })));
    const interval = setInterval(() => { tick().catch(() => { }); }, 600);

    req.signal.addEventListener('abort', () => {
        clearInterval(interval);
        writer.close();
    });

    return new Response(stream.readable, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache, no-transform',
            Connection: 'keep-alive',
        },
    });
}
