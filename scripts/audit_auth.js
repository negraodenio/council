require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase environment variables');
    process.exit(1);
}

console.log(`URL: ${supabaseUrl}`);
console.log(`Key (start): ${supabaseKey.substring(0, 10)}...`);
console.log(`Service Key (start): ${serviceKey ? serviceKey.substring(0, 10) + '...' : 'Not Provided'}`);

const supabase = createClient(supabaseUrl, supabaseKey);
const admin = serviceKey ? createClient(supabaseUrl, serviceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
}) : null;

async function runAuthAudit() {
    console.log('🔒 Starting Authentication Audit...');

    const testEmail = `audit_test_${Date.now()}@example.com`;
    const testPassword = 'SafePassword123!';

    // 1. Signup Test
    console.log(`\nTest 1: Signup (${testEmail})`);
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
    });

    if (signUpError) {
        console.error('❌ Signup Failed:', signUpError.message);
    } else {
        console.log('✅ Signup Successful');
        if (signUpData.user && signUpData.user.identities && signUpData.user.identities.length === 0) {
            console.warn('⚠️ User already registered (Identity empty)');
        }
    }

    // 2. Login Test
    console.log('\nTest 2: Login (Correct Credentials)');
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email: testEmail,
        password: testPassword,
    });

    if (loginError) {
        console.error('❌ Login Failed:', loginError.message);
    } else {
        console.log('✅ Login Successful');
        console.log('   User ID:', loginData.user.id);
    }

    // 3. Login Test (Wrong Password)
    console.log('\nTest 3: Login (Invalid Credentials)');
    const { error: invalidError } = await supabase.auth.signInWithPassword({
        email: testEmail,
        password: 'WrongPassword123!',
    });

    if (invalidError) {
        console.log('✅ System correctly rejected invalid login:', invalidError.message);
    } else {
        console.error('❌ SECURITY FAILURE: System accepted wrong password!');
    }

    // Cleanup (if admin key available)
    if (admin && signUpData.user) {
        console.log('\n🧹 Cleaning up test user...');
        const { error: deleteError } = await admin.auth.admin.deleteUser(signUpData.user.id);
        if (deleteError) {
            console.error('⚠️ Failed to delete test user:', deleteError.message);
        } else {
            console.log('✅ Test user deleted');
        }
    } else {
        console.warn('\n⚠️ Cannot cleanup test user (No Service Key or User creation failed)');
    }
}

runAuthAudit();
