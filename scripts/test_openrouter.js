const fetch = require('node-fetch');
require('dotenv').config({ path: '.env.local' });

async function test() {
    console.log('Testing OpenRouter...');
    console.log('API Key exists:', !!process.env.OPENROUTER_API_KEY);

    const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': process.env.OPENROUTER_HTTP_REFERER,
            'X-Title': process.env.OPENROUTER_X_TITLE
        },
        body: JSON.stringify({
            model: 'openai/gpt-4o-mini',
            messages: [{ role: 'user', content: 'Say hi' }]
        })
    });

    const body = await r.text();
    console.log('Status:', r.status);
    console.log('Body:', body);
}

test();
