require('dotenv').config({ path: '.env.local' });
const fetch = require('node-fetch');

async function runApiAudit() {
    console.log('🌐 Starting API Integration Audit...');

    // 1. OpenRouter Check
    const openRouterKey = process.env.OPENROUTER_API_KEY;
    if (!openRouterKey) {
        console.error('❌ OpenRouter: Missing API Key');
    } else {
        try {
            const resp = await fetch('https://openrouter.ai/api/v1/models', {
                headers: { 'Authorization': `Bearer ${openRouterKey}` }
            });
            if (resp.ok) {
                console.log('✅ OpenRouter: Connection Successful');
            } else {
                console.error(`❌ OpenRouter: Failed (${resp.status})`);
            }
        } catch (e) {
            console.error(`❌ OpenRouter: Error ${e.message}`);
        }
    }

    // 2. Mistral Check
    const mistralKey = process.env.MISTRAL_API_KEY;
    if (!mistralKey) {
        console.error('❌ Mistral: Missing API Key');
    } else {
        try {
            const resp = await fetch('https://api.mistral.ai/v1/models', {
                headers: { 'Authorization': `Bearer ${mistralKey}` }
            });
            if (resp.ok) {
                console.log('✅ Mistral: Connection Successful');
            } else {
                console.error(`❌ Mistral: Failed (${resp.status})`);
            }
        } catch (e) {
            console.error(`❌ Mistral: Error ${e.message}`);
        }
    }

    // 3. GitHub Check
    const githubToken = process.env.GITHUB_TOKEN;
    if (!githubToken) {
        console.error('❌ GitHub: Missing Token');
    } else {
        try {
            const resp = await fetch('https://api.github.com/user', {
                headers: { 'Authorization': `Bearer ${githubToken}` }
            });
            if (resp.ok) {
                const data = await resp.json();
                console.log(`✅ GitHub: Connected as ${data.login}`);
            } else {
                console.error(`❌ GitHub: Failed (${resp.status})`);
            }
        } catch (e) {
            console.error(`❌ GitHub: Error ${e.message}`);
        }
    }

    // 4. Redis Check (REST)
    const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
    const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!redisUrl || !redisToken) {
        console.error('❌ Redis: Missing URL or Token');
    } else {
        try {
            const resp = await fetch(`${redisUrl}/ping`, {
                headers: { 'Authorization': `Bearer ${redisToken}` }
            });
            if (resp.ok) {
                const data = await resp.json();
                if (data.result === 'PONG') {
                    console.log('✅ Redis: Connection Successful (PONG)');
                } else {
                    console.error(`❌ Redis: Unexpected response`, data);
                }
            } else {
                console.error(`❌ Redis: Failed (${resp.status})`);
            }
        } catch (e) {
            console.error(`❌ Redis: Error ${e.message}`);
        }
    }

    // 5. SiliconFlow Check
    const siliconKey = process.env.SILICONFLOW_API_KEY;
    if (!siliconKey) {
        console.error('❌ SiliconFlow: Missing Key');
    } else {
        // Assuming a generic models endpoint or similar
        console.log('⚠️ SiliconFlow: Test unimplemented but key present');
    }
}

runApiAudit();
