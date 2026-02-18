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

    // Dynamic model selection based on region/sensitivity
    // Mapping personas to specific models for best performance
    const models = {
        deepseek: { provider: 'openrouter', model: 'deepseek/deepseek-chat' },
        mistral: { provider: 'mistral', model: 'mistral-large-latest' },
        llama: { provider: 'openrouter', model: 'meta-llama/llama-3.1-70b-instruct' },
        claude: { provider: 'anthropic', model: 'claude-3-5-sonnet-20240620' }, // fallback
        gpt4: { provider: 'openai', model: 'gpt-4o' }
    };

    const config = (() => {
        // Default assignment
        return {
            assign: {
                advocate: models.deepseek,
                skeptic: models.mistral,
                architect: models.llama,
                optimizer: models.deepseek, // reusing deepseek for distinct logic
            },
            judge: {
                provider: 'openrouter',
                primary: 'openai/gpt-4o',
                fallback: 'anthropic/claude-3-opus',
                zdr: true,
                allowlist: undefined as string[] | undefined
            }
        };
    })();

    return config;
}
