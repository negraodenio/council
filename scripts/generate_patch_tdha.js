const { createPatch } = require('diff');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function run() {
    const repoId = '78bfa29a-3b36-4eab-b1e0-6394334f5264';
    const filePath = 'README.md';

    const { data: file } = await supabase.from('repo_files').select('full_content').eq('repo_id', repoId).eq('file_path', filePath).single();

    const original = file.full_content;
    const changed = original + '\n\n---\n*Patched by CouncilIA during end-to-end verification phase 4.*';

    const patch = createPatch(filePath, original, changed);

    const { error } = await supabase.from('code_patches').insert({
        id: 'patch_tdha_test',
        tenant_id: '00000000-0000-0000-0000-000000000000',
        repo_id: repoId,
        validation_id: 'val_TEST_PHASE3',
        file_path: filePath,
        diff: patch,
        reasoning: 'Final verification of Phase 4 PR flow',
        status: 'pending'
    });

    if (error) console.error('Error seeding patch:', error);
    else console.log('Patch seeded successfully for TDHA.');
}

run();
