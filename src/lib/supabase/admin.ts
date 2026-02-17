import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export function createAdminClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
        console.warn('Supabase admin credentials missing');
    }

    return createSupabaseClient(
        url || 'http://placeholder.url',
        key || 'placeholder-key'
    );
}
