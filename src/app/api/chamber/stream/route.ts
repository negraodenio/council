import { createAdminClient } from '@/lib/supabase/admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    const url = new URL(req.url);
    const runId = url.searchParams.get('runId');

    if (!runId) {
        return new Response('Missing runId', { status: 400 });
    }

    const encoder = new TextEncoder();
    let closed = false;

    const stream = new ReadableStream({
        async start(controller) {
            const supabase = createAdminClient();
            let lastId = 0;

            function send(eventType: string, data: any) {
                if (closed) return;
                try {
                    controller.enqueue(
                        encoder.encode(`event: ${eventType}\ndata: ${JSON.stringify(data)}\n\n`)
                    );
                } catch {
                    closed = true;
                }
            }

            // Send initial heartbeat
            send('heartbeat', { ts: Date.now() });

            const poll = setInterval(async () => {
                if (closed) {
                    clearInterval(poll);
                    return;
                }

                try {
                    // Fetch new events since last seen id
                    let query = supabase
                        .from('debate_events')
                        .select('*')
                        .eq('run_id', runId)
                        .order('created_at', { ascending: true });

                    if (lastId > 0) {
                        query = query.gt('id', lastId);
                    }

                    const { data: events, error } = await query;

                    if (error) {
                        console.error('[Stream] Query error:', error.message);
                        return;
                    }

                    if (!events || events.length === 0) return;

                    for (const ev of events) {
                        // Track last seen id
                        if (typeof ev.id === 'number' && ev.id > lastId) {
                            lastId = ev.id;
                        } else if (typeof ev.id === 'string') {
                            // If id is UUID, use a different tracking approach
                            lastId = lastId + 1;
                        }

                        const payload = ev.payload || {};

                        switch (ev.event_type) {
                            case 'model_msg':
                                send('model_msg', {
                                    model: ev.model,
                                    text: payload.text || '',
                                    phase: payload.phase || '',
                                    ts: ev.created_at,
                                });
                                break;

                            case 'judge_note':
                                send('judge_note', {
                                    model: 'judge',
                                    text: payload.text || '',
                                    type: payload.type || '',
                                    ts: ev.created_at,
                                });
                                break;

                            case 'consensus':
                                send('consensus', {
                                    coreSync: payload.coreSync ?? 0,
                                    global: payload.global ?? 0,
                                    phase: payload.phase || '',
                                });
                                break;

                            case 'complete':
                                send('complete', {
                                    validationId: payload.validationId || '',
                                    consensus_score: payload.consensus_score ?? 0,
                                });
                                // Stop polling after complete
                                clearInterval(poll);
                                setTimeout(() => {
                                    if (!closed) {
                                        try {
                                            controller.close();
                                        } catch { }
                                    }
                                }, 1000);
                                return;

                            case 'system':
                                send('model_msg', {
                                    model: 'system',
                                    text: payload.msg || '',
                                    ts: ev.created_at,
                                });
                                break;

                            case 'error':
                                send('model_msg', {
                                    model: ev.model || 'system',
                                    text: `⚠️ ${payload.msg || 'Unknown error'}`,
                                    ts: ev.created_at,
                                });
                                break;

                            default:
                                send('model_msg', {
                                    model: ev.model || 'system',
                                    text: payload.text || payload.msg || '',
                                    ts: ev.created_at,
                                });
                        }
                    }
                } catch (err) {
                    console.error('[Stream] Poll error:', err);
                }
            }, 1500); // Poll every 1.5s

            // Cleanup after 10 minutes max
            setTimeout(() => {
                closed = true;
                clearInterval(poll);
                try {
                    controller.close();
                } catch { }
            }, 600_000);
        },

        cancel() {
            closed = true;
        },
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache, no-transform',
            Connection: 'keep-alive',
            'X-Accel-Buffering': 'no',
        },
    });
}