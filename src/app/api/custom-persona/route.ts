import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET — List user's custom personas
export async function GET() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: personas, error } = await supabase
        .from("custom_personas")
        .select(`
            *,
            custom_persona_documents(id, filename, file_type, chunk_count, status, created_at)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ personas: personas || [] });
}

// POST — Create a new custom persona
export async function POST(req: NextRequest) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, role, description, color, emoji } = body;

    if (!name || !role) {
        return NextResponse.json({ error: "Name and role are required" }, { status: 400 });
    }

    // Get tenant_id from user metadata or profiles
    const { data: profile } = await supabase
        .from("profiles")
        .select("tenant_id")
        .eq("id", user.id)
        .single();

    const tenantId = profile?.tenant_id || user.id;

    // Check plan limits (free users cannot create custom personas)
    const { data: existing } = await supabase
        .from("custom_personas")
        .select("id")
        .eq("user_id", user.id);

    const count = existing?.length || 0;

    // TODO: Check plan tier for persona limits
    // For now: max 3 personas per user
    if (count >= 3) {
        return NextResponse.json({ error: "Maximum personas reached for your plan" }, { status: 403 });
    }

    const { data: persona, error } = await supabase
        .from("custom_personas")
        .insert({
            tenant_id: tenantId,
            user_id: user.id,
            name,
            role: role || "Internal Strategic Advisor",
            description: description || "",
            color: color || "#6366f1",
            emoji: emoji || "🏢",
        })
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ persona }, { status: 201 });
}

// DELETE — Delete a persona by ID (cascades to docs + embeddings)
export async function DELETE(req: NextRequest) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const personaId = searchParams.get("id");

    if (!personaId) {
        return NextResponse.json({ error: "Persona ID required" }, { status: 400 });
    }

    const { error } = await supabase
        .from("custom_personas")
        .delete()
        .eq("id", personaId)
        .eq("user_id", user.id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Persona and all associated data deleted" });
}
