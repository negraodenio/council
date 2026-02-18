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
        silicon: { provider: 'siliconflow', model: 'deepseek-ai/DeepSeek-V3' }, // Added SiliconFlow
        mistral: { provider: 'mistral', model: 'mistral-large-latest' },
        llama: { provider: 'openrouter', model: 'meta-llama/llama-3.1-70b-instruct' },
        claude: { provider: 'anthropic', model: 'claude-3-5-sonnet-20240620' }, // fallback
        gpt4: { provider: 'openai', model: 'gpt-4o' }
    };

    const config = (() => {
        // EU / Sensitive Logic
        if (euSensitive) {
            return {
                assign: {
                    advocate: models.mistral,  // EU-based
                    skeptic: models.llama,     // Open weights
                    architect: models.mistral,
                    optimizer: models.llama,
                },
                judge: {
                    provider: 'mistral',
                    primary: 'mistral-large-latest',
                    fallback: 'mistral-small-latest',
                    zdr: false, // Explicitly disabled for compliance/audit if needed, or true if preferred
                    allowlist: ['mistral-large-latest', 'mistral-small-latest']
                }
            };
        }

        // Default / Global Logic
        return {
            assign: {
                advocate: models.silicon, // SiliconFlow (DeepSeek)
                skeptic: models.mistral,
                architect: models.llama,
                optimizer: models.silicon, // SiliconFlow (DeepSeek)
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
