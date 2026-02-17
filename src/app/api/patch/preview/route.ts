import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { safeApplyUnifiedDiff } from '@/lib/patch/apply';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
    try {
        const { patch_id } = await req.json();
        if (!patch_id) return NextResponse.json({ error: 'patch_id is required' }, { status: 400 });

        const { data: patch, error: pErr } = await supabase
            .from('code_patches')
            .select('id,repo_id,file_path,diff')
            .eq('id', patch_id)
            .single();

        if (pErr) return NextResponse.json({ error: pErr.message }, { status: 500 });

        // V2: Use repo_files (Full Content) instead of coding_memory chunks
        const { data: file, error: fErr } = await supabase
            .from('repo_files')
            .select('full_content')
            .eq('repo_id', patch.repo_id)
            .eq('file_path', patch.file_path)
            .single();

        if (fErr) {
            return NextResponse.json({
                error: 'Original file not found in repo_files. Please run sync v2 with wipe:true.',
                details: fErr.message
            }, { status: 404 });
        }

        const applied = safeApplyUnifiedDiff({
            originalText: file.full_content,
            unifiedDiff: patch.diff
        });

        return NextResponse.json({
            ok: applied.ok,
            error: applied.error,
            originalPreview: file.full_content.slice(0, 5000), // Trim for large files
            patchedPreview: applied.patchedText ? applied.patchedText.slice(0, 5000) : null
        });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
