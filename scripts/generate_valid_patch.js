const { createPatch } = require('diff');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function run() {
    const repoId = 'd0257ee9-28a7-454b-8f23-bdb094f064ff';
    const filePath = 'README.md';

    const { data: file } = await supabase.from('repo_files').select('full_content').eq('repo_id', repoId).eq('file_path', filePath).single();

    const original = file.full_content;
    const changed = original.replace('### Well hello there!', '### Super Spoon Knife');

    const patch = createPatch(filePath, original, changed);
    console.log('Patch generated:\n', patch);

    const { error } = await supabase.from('code_patches').update({ diff: patch }).eq('id', 'patch_test_phase4');
    if (error) console.error('Error updating patch:', error);
    else console.log('Patch updated successfully in Supabase.');
}

run();
