export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { safeApplyUnifiedDiff } from '@/lib/patch/apply';

export async function POST(req: Request) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
        return NextResponse.json({ error: 'Supabase configuration missing' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
        const { patch_id } = await req.json();
        if (!patch_id) return NextResponse.json({ error: 'patch_id is required' }, { status: 400 });

        const { data: patch, error: pErr } = await supabase
            .from('code_patches')
            .select('id,repo_id,file_path,diff')
            .eq('id', patch_id)
            .single();

        if (pErr) return NextResponse.json({ error: pErr.message }, { status: 500 });

        // Use repo_files for reliable application
        const { data: file, error: fErr } = await supabase
            .from('repo_files')
            .select('full_content')
            .eq('repo_id', patch.repo_id)
            .eq('file_path', patch.file_path)
            .single();

        if (fErr) return NextResponse.json({ error: 'Original file not found in repo_files' }, { status: 404 });

        const applied = safeApplyUnifiedDiff({ originalText: file.full_content, unifiedDiff: patch.diff });
        if (!applied.ok) return NextResponse.json({ error: applied.error }, { status: 400 });

        // Mark as applied virtually
        await supabase.from('code_patches').update({ status: 'applied' }).eq('id', patch_id);
        return NextResponse.json({ ok: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
