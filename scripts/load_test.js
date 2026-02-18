const https = require('https');

const URL = 'https://council-bay.vercel.app';
const CONCURRENT_REQUESTS = 10;
const TOTAL_REQUESTS = 50;

async function makeRequest(id) {
    return new Promise((resolve) => {
        const start = Date.now();
        https.get(URL, (res) => {
            res.on('data', () => { }); // Consume stream
            res.on('end', () => {
                const duration = Date.now() - start;
                console.log(`Req ${id}: Status ${res.statusCode} (${duration}ms)`);
                resolve({ id, status: res.statusCode, duration });
            });
        }).on('error', (e) => {
            console.error(`Req ${id}: Failed - ${e.message}`);
            resolve({ id, status: 'error', duration: Date.now() - start });
        });
    });
}

async function runLoadTest() {
    console.log(`🚀 Starting Load Test on ${URL}`);
    console.log(`   Concurrent: ${CONCURRENT_REQUESTS}, Total: ${TOTAL_REQUESTS}`);

    const results = [];
    const batches = Math.ceil(TOTAL_REQUESTS / CONCURRENT_REQUESTS);

    for (let i = 0; i < batches; i++) {
        const batchPromises = [];
        const batchStart = i * CONCURRENT_REQUESTS;
        const batchEnd = Math.min((i + 1) * CONCURRENT_REQUESTS, TOTAL_REQUESTS);

        console.log(`\nBatch ${i + 1}/${batches} (Reqs ${batchStart + 1}-${batchEnd})`);

        for (let j = batchStart; j < batchEnd; j++) {
            batchPromises.push(makeRequest(j + 1));
        }

        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults);
    }

    // Statistics
    const successful = results.filter(r => r.status === 200).length;
    const failed = results.filter(r => r.status !== 200).length;
    const avgDuration = results.reduce((acc, r) => acc + r.duration, 0) / results.length;

    console.log('\n📊 Load Test Results');
    console.log(`   Total Requests: ${results.length}`);
    console.log(`   Successful (200): ${successful}`);
    console.log(`   Failed: ${failed}`);
    console.log(`   Avg Duration: ${avgDuration.toFixed(2)}ms`);

    if (failed > 0) {
        console.warn('⚠️ Some requests failed. Check server logs.');
    } else {
        console.log('✅ Load Test Passed (Basic)');
    }
}

runLoadTest();
