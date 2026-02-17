import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { embedMistralCached } from '@/lib/embeddings/mistral';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const { repo_id, query } = await req.json();
        const supabase = createAdminClient();

        if (!repo_id || !query) {
            return NextResponse.json({ error: 'repo_id and query are required' }, { status: 400 });
        }

        if (!process.env.MISTRAL_API_KEY) {
            return NextResponse.json({ error: 'Missing MISTRAL_API_KEY' }, { status: 400 });
        }

        const [queryEmbedding] = await embedMistralCached([query]);

        // RPC match_code_chunks
        const { data, error } = await supabase.rpc('match_code_chunks', {
            repo_filter: repo_id,
            query_embedding: queryEmbedding,
            match_threshold: 0.3, // Adjusted for testing
            match_count: 8
        });

        if (error) {
            console.error('RPC Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ ok: true, results: data });
    } catch (err: any) {
        console.error('RAG Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
