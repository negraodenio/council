import { verifySignatureAppRouter } from "@upstash/qstash/dist/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { chunkRepoFile } from "@/lib/repo/chunker";

// Function simulating finding an OpenAI compatible embeddings provider
import OpenAI from "openai";
const mistralClient = new OpenAI({
    apiKey: process.env.MISTRAL_API_KEY,
    baseURL: "https://api.mistral.ai/v1"
});

async function handler(req: NextRequest) {
    try {
        const body = await req.json();
        const { type, payload } = body;

        console.log(`[QStash Worker] Received task type: ${type}`);

        if (type === 'process-repo-chunk') {
            const documentId = payload.shardId;
            const sbAdmin = createAdminClient();

            // 1. Fetch the raw context from the Database
            const { data: doc, error: fetchErr } = await sbAdmin
                .from('repo_documents')
                .select('id, file_path, content, repo_id')
                .eq('id', documentId)
                .single();

            if (fetchErr || !doc) {
                console.error(`[QStash] Error loading document ${documentId}:`, fetchErr);
                return NextResponse.json({ success: false, error: 'Document not found' }, { status: 404 });
            }

            console.log(`[QStash Worker] Loaded ${doc.file_path}. Initiating Langchain Chunker...`);

            // 2. Semantic Chunking (using our Langchain config)
            const chunks = await chunkRepoFile(doc.file_path, doc.content);
            console.log(`[QStash Worker] Generated ${chunks.length} chunks. Generating Vector Embeddings...`);

            // 3. Batch Request Embeddings (Using Mistral's cheap embedding model)
            const chunkTexts = chunks.map(c => c.content);
            const embeddingResponse = await mistralClient.embeddings.create({
                model: "mistral-embed",
                input: chunkTexts,
            });

            // 4. Save Embeddings into Supabase vector store
            const rowsToInsert = embeddingResponse.data.map((emb, idx) => ({
                document_id: doc.id,
                chunk_content: chunks[idx].content,
                embedding: emb.embedding,
            }));

            const { error: insertErr } = await sbAdmin
                .from('repo_embeddings')
                .insert(rowsToInsert);

            if (insertErr) {
                console.error(`[QStash] Supabase Vector Insert Error:`, insertErr);
                // We return 500 to tell QStash to retry this chunk later!
                return NextResponse.json({ success: false, error: 'DB Insert Failed' }, { status: 500 });
            }

            console.log(`[QStash Worker] Successfully saved ${rowsToInsert.length} embedding rows in HNSW database.`);
            return NextResponse.json({ success: true, message: `Embedded ${chunks.length} pieces of memory.` });
        }

        return NextResponse.json({ success: false, error: 'Unknown task type' }, { status: 400 });

    } catch (error: any) {
        console.error('[QStash Worker] Fatal Error processing task:', error);
        // Retries if it's a rate limit or transient network error
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// Ensure QStash Signature Validation so hackers can't overload our DB
export const POST = verifySignatureAppRouter(handler);
