export async function embedMistral(inputs: string[]) {
    const r = await fetch('https://api.mistral.ai/v1/embeddings', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'mistral-embed',
            input: inputs // Mistral API uses 'input' for technical embeddings
        })
    });

    if (!r.ok) {
        const err = await r.text();
        throw new Error(`Mistral embeddings failed: ${r.status} - ${err}`);
    }

    const data = await r.json();

    // Model: mistral-embed usually returns 1024 dimension
    return (data.data as Array<{ embedding: number[] }>).map(x => x.embedding);
}
