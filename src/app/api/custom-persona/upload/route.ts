import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { embedMistralCached } from "@/lib/embeddings/mistral";

// Chunk text into overlapping segments
function chunkText(text: string, maxChunkSize = 800, overlap = 100): string[] {
    const chunks: string[] = [];
    let start = 0;
    while (start < text.length) {
        const end = Math.min(start + maxChunkSize, text.length);
        const chunk = text.slice(start, end).trim();
        if (chunk.length > 50) {
            chunks.push(chunk);
        }
        start += maxChunkSize - overlap;
    }
    return chunks;
}

// Extract text from different file types
function extractText(content: string, fileType: string): string {
    // For now, treat all as plain text.
    // PDF parsing would need a library like pdf-parse but we handle that via QStash
    return content;
}

export async function POST(req: NextRequest) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const formData = await req.formData();
        const personaId = formData.get("persona_id") as string;
        const file = formData.get("file") as File | null;
        const textContent = formData.get("text_content") as string | null;
        const filename = formData.get("filename") as string || file?.name || "untitled.txt";

        if (!personaId) {
            return NextResponse.json({ error: "persona_id is required" }, { status: 400 });
        }

        // Verify persona belongs to user
        const { data: persona, error: personaErr } = await supabase
            .from("custom_personas")
            .select("id, user_id")
            .eq("id", personaId)
            .eq("user_id", user.id)
            .single();

        if (personaErr || !persona) {
            return NextResponse.json({ error: "Persona not found" }, { status: 404 });
        }

        // Get text content from file or direct text
        let rawText: string;
        if (file) {
            rawText = await file.text();
        } else if (textContent) {
            rawText = textContent;
        } else {
            return NextResponse.json({ error: "No file or text content provided" }, { status: 400 });
        }

        if (rawText.length < 100) {
            return NextResponse.json({ error: "Content too short (minimum 100 characters)" }, { status: 400 });
        }

        // Detect file type
        const ext = filename.split(".").pop()?.toLowerCase() || "txt";
        const processedText = extractText(rawText, ext);

        // Create document record
        const sbAdmin = createAdminClient();
        const { data: docRecord, error: docErr } = await sbAdmin
            .from("custom_persona_documents")
            .insert({
                persona_id: personaId,
                user_id: user.id,
                filename,
                file_type: ext,
                file_size_bytes: rawText.length,
                status: "processing",
            })
            .select("id")
            .single();

        if (docErr || !docRecord) {
            return NextResponse.json({ error: "Failed to create document record" }, { status: 500 });
        }

        // Chunk the text
        const chunks = chunkText(processedText);

        // Generate embeddings in batches of 10
        const batchSize = 10;
        let totalEmbedded = 0;

        for (let i = 0; i < chunks.length; i += batchSize) {
            const batch = chunks.slice(i, i + batchSize);
            try {
                const embeddings = await embedMistralCached(batch);

                // Insert chunks + embeddings
                const rows = batch.map((chunk, idx) => ({
                    persona_id: personaId,
                    user_id: user.id,
                    chunk_content: chunk,
                    embedding: JSON.stringify(embeddings[idx]),
                    document_id: null,
                }));

                const { error: insertErr } = await sbAdmin
                    .from("repo_embeddings")
                    .insert(rows);

                if (insertErr) {
                    console.error(`[Custom Persona Upload] Embedding insert error batch ${i}:`, insertErr);
                } else {
                    totalEmbedded += batch.length;
                }
            } catch (embErr) {
                console.error(`[Custom Persona Upload] Embedding generation error batch ${i}:`, embErr);
            }
        }

        // Update document status
        await sbAdmin
            .from("custom_persona_documents")
            .update({
                chunk_count: totalEmbedded,
                status: totalEmbedded > 0 ? "ready" : "error",
                error_message: totalEmbedded === 0 ? "Failed to generate embeddings" : null,
            })
            .eq("id", docRecord.id);

        // Update persona document count
        await sbAdmin
            .from("custom_personas")
            .update({
                document_count: chunks.length,
                updated_at: new Date().toISOString(),
            })
            .eq("id", personaId);

        return NextResponse.json({
            success: true,
            document_id: docRecord.id,
            chunks_processed: totalEmbedded,
            total_chunks: chunks.length,
            message: `${totalEmbedded}/${chunks.length} chunks embedded successfully`,
        });

    } catch (error: any) {
        console.error("[Custom Persona Upload] Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
