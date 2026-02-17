const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function seed() {
    const tenantId = '00000000-0000-0000-0000-000000000000';
    const userId = '00000000-0000-0000-0000-000000000000';

    console.log('Seeding tenant...');
    const { error: tErr } = await supabase.from('tenants').upsert({ id: tenantId, name: 'Default Tenant' });
    if (tErr) console.error('Tenant error:', tErr);

    console.log('Seeding profile...');
    const { error: pErr } = await supabase.from('profiles').upsert({
        id: userId,
        tenant_id: tenantId,
        email: 'test@example.com',
        role: 'member'
    });
    if (pErr) console.error('Profile error:', pErr);

    console.log('Done.');
}

seed();
