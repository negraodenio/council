export type Region = 'EU' | 'US' | 'APAC' | 'GCC' | 'CN';
export type Sensitivity = 'public' | 'business' | 'code' | 'pii' | 'regulated';

export const councilConfig = {
    personas: {
        advocate: { id: 'advocate', name: 'Advocate', emoji: '✅', role: 'Argue in favor of the proposal, highlighting benefits and opportunities.' },
        skeptic: { id: 'skeptic', name: 'Skeptic', emoji: '❓', role: 'Critically analyze the proposal, finding flaws, risks, and edge cases.' },
        architect: { id: 'architect', name: 'Architect', emoji: '🏗️', role: 'Focus on technical feasibility, scalability, and implementation details.' },
        optimizer: { id: 'optimizer', name: 'Optimizer', emoji: '⚡', role: 'Suggest improvements for efficiency, performance, and cost.' },
    }
};

export function blockChina(region: Region, sensitivity: Sensitivity) {
    return region === 'EU' && (sensitivity === 'pii' || sensitivity === 'regulated' || sensitivity === 'code');
}

export function getCouncilConfig(region: Region, sensitivity: Sensitivity) {
    const euSensitive = blockChina(region, sensitivity);

    // ALL models via OpenRouter — cheap tier
    const models = {
        deepseek: { provider: 'openrouter', model: 'deepseek/deepseek-chat' },              // $0.14/M in
        gemini: { provider: 'openrouter', model: 'google/gemini-2.0-flash-001' },          // $0.10/M in
        llama: { provider: 'openrouter', model: 'meta-llama/llama-3.1-8b-instruct' },     // $0.05/M in
        mistral: { provider: 'openrouter', model: 'mistralai/mistral-small-latest' },       // $0.10/M in
        gpt4mini: { provider: 'openrouter', model: 'openai/gpt-4o-mini' },                   // $0.15/M in
    };

    const config = (() => {
        // EU / Sensitive — no DeepSeek (China), use EU-friendly models
        if (euSensitive) {
            return {
                assign: {
                    advocate: models.mistral,
                    skeptic: models.llama,
                    architect: models.gemini,
                    optimizer: models.llama,
                },
                judge: {
                    provider: 'openrouter',
                    primary: 'openai/gpt-4o-mini',
                    fallback: 'mistralai/mistral-small-latest',
                    zdr: false,
                    allowlist: undefined as string[] | undefined
                }
            };
        }

        // Default / Global — cheapest mix
        return {
            assign: {
                advocate: models.deepseek,
                skeptic: models.gemini,
                architect: models.llama,
                optimizer: models.deepseek,
            },
            judge: {
                provider: 'openrouter',
                primary: 'openai/gpt-4o-mini',
                fallback: 'deepseek/deepseek-chat',
                zdr: true,
                allowlist: undefined as string[] | undefined
            }
        };
    })();

    return config;
}