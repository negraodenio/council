export type Region = 'EU' | 'US' | 'APAC' | 'GCC' | 'CN';
export type Sensitivity = 'public' | 'business' | 'code' | 'pii' | 'regulated';

export function blockChina(region: Region, sensitivity: Sensitivity) {
    return region === 'EU' && (sensitivity === 'pii' || sensitivity === 'regulated' || sensitivity === 'code');
}

export function getCouncilConfig(region: Region, sensitivity: Sensitivity) {
    const euSensitive = blockChina(region, sensitivity);

    const config = (() => {
        if (region === 'EU') {
            return {
                frontModels: [
                    { key: 'deepseek', label: 'DeepSeek', provider: 'openrouter', model: 'deepseek/deepseek-chat', avatarColor: '#FF00FF' },
                    { key: 'mistral', label: 'Mistral', provider: 'mistral', model: 'mistral-large-latest', avatarColor: '#3b82f6' },
                    { key: 'glm', label: 'GLM', provider: euSensitive ? 'openrouter' : 'siliconflow', model: euSensitive ? 'meta-llama/llama-3.1-70b-instruct' : 'glm-4', avatarColor: '#32CD32' },
                    { key: 'llama', label: 'Llama', provider: 'openrouter', model: 'meta-llama/llama-3.1-70b-instruct', avatarColor: '#FFBF00' },
                ],
                judge: {
                    provider: 'openrouter',
                    primary: 'openai/gpt-5.2',
                    fallback: 'anthropic/claude-opus-4.5',
                    zdr: true,
                    allowlist: euSensitive ? ['OpenAI', 'Anthropic', 'Mistral'] : undefined
                }
            };
        }

        if (region === 'CN') {
            return {
                frontModels: [
                    { key: 'kimi', label: 'Kimi', provider: 'siliconflow', model: 'kimi-k2.5', avatarColor: '#A020F0' },
                    { key: 'deepseek', label: 'DeepSeek', provider: 'siliconflow', model: 'deepseek-r1', avatarColor: '#FF00FF' },
                    { key: 'glm', label: 'GLM', provider: 'siliconflow', model: 'glm-4', avatarColor: '#32CD32' },
                    { key: 'qwen', label: 'Qwen', provider: 'siliconflow', model: 'qwen2.5-72b-instruct', avatarColor: '#00FFFF' },
                ],
                judge: { provider: 'openrouter', primary: 'openai/gpt-5.2', fallback: 'anthropic/claude-opus-4.5', zdr: false }
            };
        }

        if (region === 'GCC') {
            const safe = sensitivity === 'public' || sensitivity === 'business';
            return {
                frontModels: [
                    { key: 'mistral', label: 'Mistral', provider: 'mistral', model: 'mistral-large-latest', avatarColor: '#3b82f6' },
                    { key: 'deepseek', label: 'DeepSeek', provider: 'openrouter', model: 'deepseek/deepseek-chat', avatarColor: '#FF00FF' },
                    { key: 'llama', label: 'Llama', provider: 'openrouter', model: 'meta-llama/llama-3.1-70b-instruct', avatarColor: '#FFBF00' },
                    safe
                        ? { key: 'qwen', label: 'Qwen', provider: 'siliconflow', model: 'qwen2.5-72b-instruct', avatarColor: '#00FFFF' }
                        : { key: 'glm', label: 'GLM', provider: 'mistral', model: 'devstral-medium-latest', avatarColor: '#32CD32' },
                ],
                judge: { provider: 'openrouter', primary: 'openai/gpt-5.2', fallback: 'anthropic/claude-opus-4.5', zdr: true }
            };
        }

        // US/APAC default
        return {
            frontModels: [
                { key: 'deepseek', label: 'DeepSeek', provider: 'siliconflow', model: 'deepseek-r1', avatarColor: '#FF00FF' },
                { key: 'qwen', label: 'Qwen', provider: 'siliconflow', model: 'qwen2.5-72b-instruct', avatarColor: '#00FFFF' },
                { key: 'glm', label: 'GLM', provider: 'siliconflow', model: 'glm-4', avatarColor: '#32CD32' },
                { key: 'llama', label: 'Llama', provider: 'openrouter', model: 'meta-llama/llama-3.1-70b-instruct', avatarColor: '#FFBF00' },
            ],
            judge: { provider: 'openrouter', primary: 'openai/gpt-5.2', fallback: 'anthropic/claude-opus-4.5', zdr: (sensitivity !== 'public' && sensitivity !== 'business') }
        };
    })();

    return config;
}
