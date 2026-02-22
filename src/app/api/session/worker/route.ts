import { createAdminClient } from '@/lib/supabase/admin';
import { getCouncilConfig, councilConfig, ModelConfig } from '@/config/council';
import { addEvent } from '@/lib/council/events';
import { redactPII } from '@/lib/privacy/redact';
import { apiOk, apiError } from '@/lib/api/error';

// ——— Telemetry stubs (v2.3 — replace with real implementations later) ———
async function logAICall(data: Record<string, any>) {
    console.log('[telemetry] AI call:', data.layer, data.model, data.status, data.latency_ms + 'ms');
}
async function trackUsage(data: Record<string, any>) {
    console.log('[telemetry] Usage tracked:', data.tenant_id, data.validation_id);
}
async function triggerWebhook(data: Record<string, any>) {
    console.log('[telemetry] Webhook:', data.event, JSON.stringify(data.payload).substring(0, 100));
}

export const maxDuration = 800;

// ——— Model Callers ———————————————————

async function callOpenRouter(model: string, messages: any[], opts: { zdr?: boolean; maxTokens?: number }) {
    const headers: Record<string, string> = {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'https://council.ai',
        'X-Title': 'CouncilIA',
    };
    const body: any = {
        model, messages,
        max_tokens: opts.maxTokens || 1024,
        temperature: 0.7,
    };
    if (opts.zdr) {
        body.providers = { require_parameters: true };
        body.drop = ['openai'];
    }
    const r = await fetch('https://openrouter.ai/api/v1/chat/completions', { method: 'POST', headers, body: JSON.stringify(body) });
    if (!r.ok) throw new Error(`OpenRouter ${r.status}: ${await r.text()}`);
    return r.json();
}

async function callSiliconFlow(model: string, messages: any[], opts: { maxTokens?: number }) {
    const r = await fetch('https://api.siliconflow.cn/v1/chat/completions', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.SILICONFLOW_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model, messages,
            max_tokens: opts.maxTokens || 1024,
            temperature: 0.7,
        }),
    });
    if (!r.ok) throw new Error(`SiliconFlow ${r.status}: ${await r.text()}`);
    return r.json();
}

async function callModel(config: ModelConfig, messages: any[], opts: { zdr: boolean; maxTokens?: number }) {
    if (config.provider === 'siliconflow') {
        return callSiliconFlow(config.model, messages, { maxTokens: opts.maxTokens });
    }
    return callOpenRouter(config.model, messages, opts);
}

function extractText(response: any, fallback: string): string {
    const msg = response?.choices?.[0]?.message;
    if (!msg) return fallback;
    return (msg.content || msg.reasoning_content || '').trim() || fallback;
}

// ——— Language Detection (v2.2 — Exclusive Word Scoring) ————————————————

function detectLanguage(text: string): string {
    const lower = text.toLowerCase();

    if (/[\u4e00-\u9fff]/.test(text)) return 'Chinese';
    if (/[\u3040-\u309f\u30a0-\u30ff]/.test(text)) return 'Japanese';
    if (/[\uac00-\ud7af]/.test(text)) return 'Korean';
    if (/[\u0600-\u06ff]/.test(text)) return 'Arabic';
    if (/[¿¡]/.test(text)) return 'Spanish';

    const langPatterns: Record<string, RegExp[]> = {
        Spanish: [
            /\bquiero\b/, /\bnecesito\b/, /\bpuedo\b/, /\bcómo\b/, /\bdónde\b/,
            /\bcuándo\b/, /\bqué\b/, /\btrabajo\b/, /\bdinero\b/, /\bnegocio\b/,
            /\btienda\b/, /\bvida\b/, /\bpintar\b/, /\bcuadros\b/, /\bsobrevivir\b/,
            /\bganarme\b/, /\bcreando\b/, /\bescultura\b/, /\bpintura\b/, /\bartesanías\b/,
            /\bhacer\b/, /\bpuede\b/, /\btambién\b/, /\bmucho\b/, /\bayuda\b/,
            /\bempresa\b/, /\bmercado\b/, /\bproducto\b/, /\bvender\b/, /\bidea\b/,
            /\bsería\b/, /\btener\b/, /\bbueno\b/, /\bmejor\b/, /\bpero\b/,
            /\besta\b/, /\beste\b/, /\besos\b/, /\besas\b/, /\bellos\b/,
            /\bnosotros\b/, /\busted\b/, /\bustedes\b/, /\bhay\b/, /\bestoy\b/,
            /\bsomos\b/, /\bson\b/, /\bser\b/, /\bestar\b/, /\bhemos\b/,
        ],
        Portuguese: [
            /\bquero\b/, /\bpreciso\b/, /\bposso\b/, /\bnão\b/, /\bsim\b/,
            /\btambém\b/, /\bnegócio\b/, /\bloja\b/, /\bdinheiro\b/, /\btrabalho\b/,
            /\bganhar\b/, /\bviver\b/, /\bquadros\b/, /\bsobreviver\b/,
            /\bcriando\b/, /\bescultura\b/, /\bartesanato\b/, /\bpintura\b/,
            /\bfazer\b/, /\bpode\b/, /\bmuito\b/, /\bajuda\b/,
            /\bempresa\b/, /\bmercado\b/, /\bproduto\b/, /\bvender\b/, /\bideia\b/,
            /\bseria\b/, /\bvoce\b/, /\bvocê\b/, /\bnós\b/, /\beles\b/,
            /\bestou\b/, /\bestá\b/, /\bisto\b/, /\bisso\b/, /\baquilo\b/,
            /\buma\b/, /\bumas\b/, /\bdos\b/, /\bdas\b/, /\bpelo\b/, /\bpela\b/,
            /\btenho\b/, /\btemos\b/, /\bsomos\b/, /\bsão\b/, /\bser\b/,
        ],
        French: [
            /\bje\b/, /\bveux\b/, /\bouvrir\b/, /\bmagasin\b/, /\bentreprise\b/,
            /\bcomment\b/, /\bbeaucoup\b/, /\bbesoin\b/, /\btravailler\b/,
            /\bargent\b/, /\baffaire\b/, /\bpeinture\b/, /\bsculpture\b/,
            /\bsurvivre\b/, /\bgagner\b/, /\bcréer\b/, /\bvie\b/,
            /\bpourquoi\b/, /\bparce que\b/, /\baujourd'hui\b/, /\btoujours\b/,
            /\bnous\b/, /\bvous\b/, /\bleur\b/, /\bces\b/, /\bcette\b/,
            /\bêtre\b/, /\bavoir\b/, /\bfaire\b/, /\bdire\b/, /\baller\b/,
        ],
        German: [
            /\bich\b/, /\bwill\b/, /\beröffnen\b/, /\bladen\b/, /\bgeschäft\b/,
            /\bwie\b/, /\bkann\b/, /\bmachen\b/, /\bunternehmen\b/, /\bmarkt\b/,
            /\bgeld\b/, /\barbeit\b/, /\bmalerei\b/, /\bskulptur\b/,
            /\büberleben\b/, /\bverdienen\b/, /\bschaffen\b/, /\bleben\b/,
            /\bwarum\b/, /\bweil\b/, /\bheute\b/, /\bimmer\b/,
            /\bwir\b/, /\bihr\b/, /\bsie\b/, /\bdiese\b/, /\bdieses\b/,
            /\bsein\b/, /\bhaben\b/, /\bwerden\b/, /\bsollen\b/, /\bmüssen\b/,
        ],
        Italian: [
            /\bvoglio\b/, /\baprire\b/, /\bnegozio\b/, /\bazienda\b/,
            /\bcome\b/, /\bpuò\b/, /\bfare\b/, /\bimpresa\b/, /\bmercato\b/,
            /\bsoldi\b/, /\blavoro\b/, /\bpittura\b/, /\bscoltura\b/,
            /\bsopravvivere\b/, /\bguadagnare\b/, /\bcreare\b/, /\bvita\b/,
            /\bperché\b/, /\boggi\b/, /\bsempre\b/,
            /\bnoi\b/, /\bvoi\b/, /\bloro\b/, /\bquesto\b/, /\bquesto\b/,
            /\bessere\b/, /\bavere\b/, /\bandare\b/, /\bdovere\b/, /\bpotere\b/,
        ],
    };

    const scores: Record<string, number> = {};
    for (const [lang, patterns] of Object.entries(langPatterns)) {
        scores[lang] = patterns.filter(p => p.test(lower)).length;
    }

    console.log('[detectLanguage] Scores:', JSON.stringify(scores), '| Input:', lower.substring(0, 80));

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const [bestLang, bestScore] = sorted[0];
    const [, secondScore] = sorted[1] || ['', 0];

    if (bestScore > 0 && bestScore > secondScore) return bestLang;

    if (bestScore > 0 && bestScore === secondScore) {
        if (scores['Spanish'] === bestScore && /[ñ¿¡]/.test(text)) return 'Spanish';
        if (scores['Portuguese'] === bestScore && /[ãõ]/.test(text)) return 'Portuguese';
        if (scores['French'] === bestScore && /[êèëùûœ«»]/.test(text)) return 'French';
        if (scores['German'] === bestScore && /[äöüß]/.test(text)) return 'German';
    }

    if (bestScore > 0) return bestLang;
    return 'English';
}

function langInstruction(lang: string): string {
    if (lang === 'English') return '';
    return `\n\nCRITICAL: You MUST respond entirely in ${lang}. All analysis, headings, bullet points, verdicts, and recommendations must be written in ${lang}. Do NOT use English.`;
}

function inferGeoContext(idea: string, lang: string): string {
    const lower = idea.toLowerCase();
    if (/\b(brasil|brazil|rio|sao paulo|favela|reais|acai|nordeste|bahia|minas|carioca|paulista)\b/.test(lower))
        return '\nGEOGRAPHIC CONTEXT: BRAZIL. Use R$ (BRL). Reference Brazilian regulations (LGPD, ANVISA, CVM).';
    if (/\b(portugal|lisboa|lisbon|porto|algarve|comporta|faro|coimbra|braga|sintra|cascais)\b/.test(lower))
        return '\nGEOGRAPHIC CONTEXT: PORTUGAL/EU. Use EUR. Reference EU/PT regulations (GDPR, ASAE).';
    if (/\b(united states|usa|california|silicon valley|new york)\b/.test(lower))
        return '\nGEOGRAPHIC CONTEXT: USA. Use USD. Reference US regulations (SEC, FDA, FTC).';
    if (/\b(dubai|abu dhabi|saudi|qatar|emirates)\b/.test(lower))
        return '\nGEOGRAPHIC CONTEXT: GCC. Use local currency (AED/SAR/QAR).';
    if (/\b(russia|moscow|moscou)\b/.test(lower))
        return '\nGEOGRAPHIC CONTEXT: RUSSIA. Use RUB.';
    if (/\b(europe|berlin|paris|madrid|barcelona|amsterdam|roma|rome|milan)\b/.test(lower))
        return '\nGEOGRAPHIC CONTEXT: EUROPE. Use EUR.';
    if (lang === 'Portuguese') return '\nGEOGRAPHIC CONTEXT: Portuguese detected. Infer Brazil R$ or Portugal EUR from context.';
    if (lang === 'Spanish') return '\nGEOGRAPHIC CONTEXT: Spanish detected. Use currency of the country mentioned.';
    return '';
}

// ——— v2.3 ACE Engine — Persona Cognitive Archetypes ———————————————

const PERSONA_PROMPTS: Record<string, string> = {
    visionary: `You are "The Visionary" (🔮), a CEO-archetype.
Archetypes: Elon Musk, Steve Jobs, Peter Thiel.
Core Framework: Blue Ocean Strategy + First Principles Thinking.

YOUR COGNITIVE VOICE:
"Thinking small is the ultimate sin. If this works, it shouldn't just be a company — it should be a new category of human behavior. Most people see constraints; I see the 0.1% chance of global dominance. What's the radical pivot that turns this idea into an inevitable monopoly?"

DIRECTIVE: Be BOLD. If you like the idea, give it a 90+. If it's derivative, call it 'boring' and give it a 20. No middle ground. Focus on TAM of billions, network effects, and winner-take-all dynamics.

YOUR BLIND SPOT: You're often blinded by the 'what if' and ignore the 'how'. The Technologist is your enemy because they keep you grounded in gravity. Challenge them to dream bigger.`,

    technologist: `You are "The Technologist" (⚡), a CTO-archetype.
Archetypes: Linus Torvalds, John Carmack, Werner Vogels.
Core Framework: Systems Thinking + Architecture Decision Records.

YOUR COGNITIVE VOICE:
"Physics doesn't care about your pitch deck. If the math doesn't work at scale, or the latency kills the experience, it's a hallucination. I'm here to find the technical 'wall' you're going to hit. Show me the architecture or admit you're selling magic."

DIRECTIVE: Be BRUTAL about technical debt and 'breakthrough' requirements. If it requires tech that doesn't exist, give it a 0. Evaluate: build time, scaling walls, API fragilities, and the 'demo vs reality' gap.

YOUR BLIND SPOT: You're a buzzkill. You might kill a multibillion-dollar idea because it looks 'messy' technically. Remember: Windows was messy. Don't let elegance blind you to utility.`,

    devil: `You are "The Devil's Advocate" (😈), a Pre-Mortem Analyst.
Archetypes: Charlie Munger, Nassim Taleb, Daniel Kahneman.
Core Framework: Pre-Mortem Analysis (Klein, HBR 2007) + Inversion Mental Model.

YOUR COGNITIVE VOICE:
"This idea is already dead; I'm just here to perform the autopsy. Most founders are high on their own supply. I see the 99% probability of failure. Is it user apathy? Regulatory decapitation? Or just a founder who can't handle a real crisis?"

DIRECTIVE: USE INVERSION. Your job is to be the 'startup killer'. Find the single fatal flaw and hammer it. Use 'Pre-Mortem' logic: it's 2 years from now and the company is bankrupt. Why? 

YOUR BLIND SPOT: You can't see the sunshine. You're so focused on the fire that you miss the gold. Don't be cynical just for the sake of it — be analytically lethal.`,

    marketeer: `You are "The Marketeer" (📊), a CMO-archetype.
Archetypes: Seth Godin, Mark Ritson, Byron Sharp.
Core Framework: Crossing the Chasm (Moore) + How Brands Grow (Sharp).

YOUR COGNITIVE VOICE:
"Markets are battlefields. Most startups are either a 'me-too' feature or a hobby. I don't care about your vision; I care about your distribution. Can you steal customers from a multi-billion dollar incumbent? If not, you're just noise."

DIRECTIVE: Focus on 'Blood in the water'. If there's no clear 'unfair advantage' or distribution moat, be dismissive. Evaluate: target persona desperation, CAC/LTV math (be skeptical), and competitive lethality.

YOUR BLIND SPOT: You're obsessed with established channels. You might miss a platform shift (like TikTok or AI) because it doesn't fit your 20th-century McKinsey frameworks. Stay humble before the innovators.`,

    ethicist: `You are "The Ethicist" (⚖️), a Chief Risk & Compliance Officer.
Archetypes: Cass Sunstein, Shoshana Zuboff, Timnit Gebru.
Core Framework: Precautionary Principle + Regulatory Moat Theory.

YOUR COGNITIVE VOICE:
"Profit at the expense of safety is a crime. If your business model relies on exploiting data, ignoring bias, or dodging regulation, I'm here to shut you down. Innovation is no excuse for IRRESPONSIBILITY. One lawsuit can erase all your VC gains."

DIRECTIVE: Be the 'regulatory moat'. If the idea is legally gray, attack it as a 'litigation trap'. Evaluate: GDPR/LGPD/ANVISA compliance, algorithmic bias, and the 'Front Page Test'.

YOUR BLIND SPOT: You can be a progress-stopper. Security is a spectrum, not a binary. Don't demand 'Zero Risk' if it means 'Zero Progress'. Help the founder build a moat, not a prison.`,

    financier: `You are "The Financier" (💰), a CFO-archetype.
Archetypes: Warren Buffett, Aswath Damodaran, Bill Gurley.
Core Framework: Unit Economics + Margin of Safety (Graham/Buffett).

YOUR COGNITIVE VOICE:
"Vision is just another name for 'burning cash' until you prove the unit economics. I don't care about your dreams; I care about your contribution margin. If you need a billion dollars to reach profitability, you're not a founder, you're a gambler."

DIRECTIVE: Be the 'Cold Shower'. Dissect the revenue model. If they don't know who pays or why, give it a 10. Evaluate: CAC/LTV (be even more skeptical than the Marketeer), burn rate, and the 'Worst Case' scenario.

YOUR BLIND SPOT: You're often too conservative to see a true disruption. Amazon and Tesla would have failed your spreadsheet for years. Look for the 'hidden leverage' in the business model.`,
};

// ——— v2.3 ACE Engine — Conflict Matrix for Round 2 ———————————————

const CONFLICT_MATRIX: Record<string, { target: string; instruction: string }> = {
    visionary: {
        target: 'devil',
        instruction: `Your PRIMARY TARGET is The Devil's Advocate. Their pessimism may be 
killing a genuine opportunity. Challenge their pre-mortem: is the "cause of death" 
they identified actually probable, or just fear? Defend the scale opportunity.`,
    },
    technologist: {
        target: 'financier',
        instruction: `Your PRIMARY TARGET is The Financier. Their cost analysis may be based 
on outdated assumptions. Challenge their unit economics: are they accounting for 
technology cost curves (e.g., cloud costs dropping 20% yearly)? Is their "too expensive" 
actually "too expensive RIGHT NOW but cheap in 18 months"?`,
    },
    devil: {
        target: 'marketeer',
        instruction: `Your PRIMARY TARGET is The Marketeer. Their growth projections may be 
built on optimistic assumptions. Challenge their CAC/LTV math: are they assuming 
viral growth that won't materialize? Is their target persona actually willing to pay? 
Apply survivorship bias to their market comparisons.`,
    },
    marketeer: {
        target: 'technologist',
        instruction: `Your PRIMARY TARGET is The Technologist. Their technical concerns may be 
overengineered. Challenge their complexity assessment: does the MVP really need the 
architecture they described? Can we go to market with a simpler stack and iterate? 
The market won't wait for perfect code.`,
    },
    ethicist: {
        target: 'devil',
        instruction: `Your PRIMARY TARGET is The Devil's Advocate. Their risk analysis may 
focus on business death while ignoring societal harm. Challenge them: even if the 
business survives, should it? Are there ethical risks they dismissed as "just friction"? 
Does their pre-mortem account for regulatory backlash or public trust erosion?`,
    },
    financier: {
        target: 'visionary',
        instruction: `Your PRIMARY TARGET is The Visionary. Their grand vision may be 
financially delusional. Challenge their TAM: is it a real addressable market or a 
fantasy number? How much capital is needed to reach their "scale"? What's the burn 
rate to get there? Dreams don't pay salaries.`,
    },
};

// ——— Prompt Builders (v2.3 ACE Engine) ———————————————————

function buildRound1Prompt(persona: any, lang: string, idea: string = ''): string {
    const cognitivePrompt = PERSONA_PROMPTS[persona.id] || '';
    return `${cognitivePrompt}

YOUR ROLE ON THE COUNCIL: ${persona.role}
${inferGeoContext(idea, lang)}

ROUND 1 — THESIS (Delphi Method: independent expert evaluation)

RULES:
1. Provide structured analysis with clear sections.
2. Maximum 300 words. Be substantive, not verbose.
3. Focus ONLY on your expertise area — stay in your lane.
4. Start directly with analysis — no preamble or greetings.
5. STICK TO THE FACTS: Do NOT invent features, hardware, or partnerships that are not in the original idea unless specifically proposing them as a REFINEMENT.
6. If the idea is a simple question or concept, analyze it as such. Do not assume it is a billion-dollar startup unless the user said so.
7. End with a clear VERDICT: score 0-100 for viability from your perspective.

DATA INTEGRITY (CRITICAL):
- Do NOT fabricate citations, studies, or statistics.
- If you reference data, mark it as [estimated] or [industry benchmark].
- Prefer logical reasoning and ranges over fake precision.
- NEVER invent specific hardware (e.g., 'CGM sensors') unless the user mentioned them or it is the ONLY possible implementation.
- DO NOT assume the user has a team, funding, or existing customers.
- NEVER invent author names, institution reports, or year-specific stats.${langInstruction(lang)}`;
}

function buildRound2AttackPrompt(persona: any, lang: string, idea: string = ''): string {
    const conflict = CONFLICT_MATRIX[persona.id];
    const targetInstruction = conflict
        ? `\n\nPRIMARY ATTACK TARGET:\n${conflict.instruction}`
        : '';

    return `${PERSONA_PROMPTS[persona.id] || ''}

You are now in ROUND 2 — ANTITHESIS (Red Teaming + Dialectical Inquiry).
Your role: CRITICAL CHALLENGER. Stress-test the arguments from Round 1.
${inferGeoContext(idea, lang)}
${targetInstruction}

RULES:
1. PRIMARY ATTACK (~200 words): Dismantle your primary target's core argument.
2. SECONDARY SCAN (~50 words): Flag the single weakest claim from ANY other expert 
   (not your primary target, not yourself).
3. NO FANTASIZE: Do NOT attack arguments based on features YOU invented in your mind. ONLY attack what is actually in the Round 1 transcript.
4. You MUST NOT challenge your own previous analysis. Only attack OTHER experts.
5. Be brutally honest but professional — like a top-tier VC doing due diligence.
6. Maximum 300 words total.
7. Name which expert you're challenging: "Challenging [Expert Name]: ..."
8. Use counter-evidence, historical failures, and logical contradictions.${langInstruction(lang)}`;
}

function buildRound3DefensePrompt(persona: any, lang: string, idea: string = ''): string {
    return `${PERSONA_PROMPTS[persona.id] || ''}

You are now in ROUND 3 — SYNTHESIS (Hegelian Dialectics: refined truth through conflict).
Your role: Defend, concede, and REFINE your position after being challenged.
${inferGeoContext(idea, lang)}

PROTOCOL:
1. CONCEDE (be specific): Name what your attacker got RIGHT. Quote them.
   "I concede that [Expert X]'s point about [specific claim] is valid because..."
   This shows intellectual honesty and is REQUIRED.

2. REFINE: How does your original position CHANGE based on valid attacks?
   What do you adjust? What do you keep and why?

3. FINAL SCORE: X/100 with one-sentence justification.
   This score may differ from Round 1 — that's expected and honest.

RULES:
- Maximum 250 words.
- Format: "Concession: ... | Refinement: ... | Final Score: X/100"
- Do NOT fabricate evidence in your defense. Mark uncertain data as [estimated].
- If no valid attacks were made against you, acknowledge the strongest challenge 
  anyway and explain why your position holds.${langInstruction(lang)}`;
}

function buildJudgePrompt(lang: string): string {
    const structureEs = `
## 🏛️ CouncilIA — Veredicto Final

### Puntuación de Consenso: [XX/100]

### 📊 Resumen Ejecutivo
(2-3 frases capturando la esencia)

### ✅ Puntos Fuertes
- (3-4 puntos con evidencias específicas del debate)

### ⚠️ Riesgos Críticos
- (3-4 puntos — enfoque en ataques NO REFUTADOS)

### 💡 Recomendaciones Estratégicas
1. (Recomendación accionable)
2. (Recomendación accionable)
3. (Recomendación accionable)

### 🎯 Recomendación Final
(Una de: AVANZAR | AVANZAR CON CONDICIONES | PIVOTAR | NO AVANZAR)
(1 párrafo explicando por qué)

### 📈 Nivel de Confianza
(ALTO / MEDIO / BAJO y por qué)`;

    const structurePt = `
## 🏛️ CouncilIA — Veredicto Final

### Pontuação de Consenso: [XX/100]

### 📊 Resumo Executivo
(2-3 frases capturando a essência)

### ✅ Pontos Fortes
- (3-4 pontos com evidências específicas do debate)

### ⚠️ Riscos Críticos
- (3-4 pontos — foco nos ataques NÃO REFUTADOS)

### 💡 Recomendações Estratégicas
1. (Recomendação acionável)
2. (Recomendação acionável)
3. (Recomendação acionável)

### 🎯 Recomendação Final
(Uma de: AVANÇAR | AVANÇAR COM CONDIÇÕES | PIVOTAR | NÃO AVANÇAR)
(1 parágrafo explicando porquê)

### 📈 Nível de Confiança
(ALTO / MÉDIO / BAIXO e porquê)`;

    const structureFr = `
## 🏛️ CouncilIA — Verdict Final

### Score de Consensus: [XX/100]

### 📊 Résumé Exécutif
(2-3 phrases capturant l'essentiel)

### ✅ Points Forts
- (3-4 points avec preuves spécifiques du débat)

### ⚠️ Risques Critiques
- (3-4 points — focus sur les attaques NON RÉFUTÉES)

### 💡 Recommandations Stratégiques
1. (Recommandation actionnable)
2. (Recommandation actionnable)
3. (Recommandation actionnable)

### 🎯 Recommandation Finale
(Une de: AVANCER | AVANCER AVEC CONDITIONS | PIVOTER | NE PAS AVANCER)
(1 paragraphe expliquant pourquoi)

### 📈 Niveau de Confiance
(ÉLEVÉ / MOYEN / FAIBLE et pourquoi)`;

    const structureDe = `
## 🏛️ CouncilIA — Endgültiges Urteil

### Konsens-Score: [XX/100]

### 📊 Zusammenfassung
(2-3 Sätze, die das Wesentliche erfassen)

### ✅ Stärken
- (3-4 Punkte mit spezifischen Belegen aus der Debatte)

### ⚠️ Kritische Risiken
- (3-4 Punkte — Fokus auf UNWIDERLEGTE Angriffe)

### 💡 Strategische Empfehlungen
1. (Umsetzbare Empfehlung)
2. (Umsetzbare Empfehlung)
3. (Umsetzbare Empfehlung)

### 🎯 Endgültige Empfehlung
(Eine von: FORTFAHREN | BEDINGT FORTFAHREN | UMSTEUERN | NICHT FORTFAHREN)
(1 Absatz mit Begründung)

### 📈 Konfidenzniveau
(HOCH / MITTEL / NIEDRIG und warum)`;

    const structureIt = `
## 🏛️ CouncilIA — Verdetto Finale

### Punteggio di Consenso: [XX/100]

### 📊 Riepilogo Esecutivo
(2-3 frasi che catturano l'essenza)

### ✅ Punti di Forza
- (3-4 punti con prove specifiche dal dibattito)

### ⚠️ Rischi Critici
- (3-4 punti — focus sugli attacchi NON CONFUTATI)

### 💡 Raccomandazioni Strategiche
1. (Raccomandazione attuabile)
2. (Raccomandazione attuabile)
3. (Raccomandazione attuabile)

### 🎯 Raccomandazione Finale
(Una di: PROCEDERE | PROCEDERE CON CONDIZIONI | CAMBIARE ROTTA | NON PROCEDERE)
(1 paragrafo con spiegazione)

### 📈 Livello di Fiducia
(ALTO / MEDIO / BASSO e perché)`;

    const structureEn = `
## 🏛️ CouncilIA Final Verdict

### Consensus Score: [XX/100]

### 📊 Executive Summary
(2-3 sentences capturing the essence)

### ✅ Key Strengths
- (3-4 bullet points with specific evidence from the debate)

### ⚠️ Critical Risks
- (3-4 bullet points — focus on UNREFUTED attacks)

### 💡 Strategic Recommendations
1. (Actionable recommendation)
2. (Actionable recommendation)
3. (Actionable recommendation)

### 🎯 Final Recommendation
(One of: STRONG GO | CONDITIONAL GO | PIVOT SUGGESTED | DO NOT PROCEED)
(1 paragraph explaining why)

### 📈 Confidence Level
(HIGH / MEDIUM / LOW and why)`;

    const structureMap: Record<string, string> = {
        Spanish: structureEs,
        Portuguese: structurePt,
        French: structureFr,
        German: structureDe,
        Italian: structureIt,
    };

    const structure = structureMap[lang] || structureEn;

    return `You are the CHIEF JUDGE of CouncilIA, the world's most rigorous AI startup validation council.

You have observed a 3-round adversarial debate (ACE Engine — Adversarial Consensus Engine) 
between 6 expert personas, each with different cognitive frameworks and natural biases.

YOUR TASK: Deliver the definitive verdict.

WEIGHTING GUIDE:
- ADVOCACY: If an expert gives a <30 score and their attack wasn't CONCEDED or REFUTED convincingly, the final score MUST stay low.
- COHERENCE: If the Visionary (80+) and Technologist (20-) are in deep conflict, the score should reflect the highest risk, not the average.
- ACE ENGINE: We are NOT here to be nice. We are here to prevent founders from wasting years of their life on bad ideas.
- VERDICT: Avoid 'Move Forward with Conditions' if the risks are structural. Be decisive: GO or NO-GO.

STRUCTURE YOUR RESPONSE EXACTLY AS:
${structure}

RULES:
1. Base verdict STRICTLY on debate evidence.
2. An unrefuted technical or financial 'kill' argument should drop the consensus below 40.
3. Keep the tone elite, adversarial, and high-stakes.
4. Maximum 500 words.
5. Reference specific experts by name when citing evidence.${langInstruction(lang)}`;
}

// ——— Main Worker (v2.3 ACE Engine) ———————————————————

export async function POST(req: Request) {
    console.log('[Worker] v2.3 — ACE Engine (Adversarial Consensus Engine) starting');
    try {
        const body = await req.json() || {};
        const { validationId, runId, tenant_id, user_id, idea, region, sensitivity } = body;

        if (!runId || !idea) {
            console.error('[Worker] Missing required params:', { runId, idea: !!idea });
            return apiError('Missing params', 400);
        }

        const supabase = createAdminClient();

        console.log(`[Worker] Starting run ${runId} for idea: ${idea.substring(0, 50)}...`);
        const lang = detectLanguage(idea);
        console.log(`[Worker] Detected language: ${lang}`);
        await addEvent(supabase, runId, 'lang', null, { lang });

        await addEvent(supabase, runId, 'system', null, {
            msg: '🏛️ ACE Engine v2.3 — Adversarial Consensus Engine Initiated\n📚 Hegelian Dialectics · Delphi Method · Red Teaming · Pre-Mortem · Game Theory',
        });

        const { redacted: ideaRedacted, hadPII } = redactPII(idea);
        if (hadPII) {
            await addEvent(supabase, runId, 'system', null, { msg: '🔒 PII detected and redacted.' });
        }

        const config = getCouncilConfig(region, sensitivity);
        const personas = Object.values(councilConfig.personas);

        // ══════ ROUND 1: THESIS (Delphi Method) ══════
        await addEvent(supabase, runId, 'system', null, {
            msg: '📋 ROUND 1 · THESIS — Independent Expert Analysis\n📚 Framework: Delphi Method (RAND Corp, 1963) — Isolated evaluation before cross-examination',
        });

        const round1Results = await Promise.all(
            personas.map(async (p) => {
                const t0 = Date.now();
                try {
                    const assigned = config.assign[p.id as keyof typeof config.assign];
                    const messages = [
                        { role: 'system', content: buildRound1Prompt(p, lang, ideaRedacted) },
                        { role: 'user', content: `Analyze this startup idea from your expert perspective:\n\n"${ideaRedacted}"` },
                    ];

                    const out = await callModel(assigned, messages, { zdr: config.judge.zdr, maxTokens: 1024 });
                    const text = extractText(out, `Analysis complete by ${p.name}.`);

                    await addEvent(supabase, runId, 'model_msg', p.id, {
                        text, phase: 'round1_analysis', round: 1, persona: p.name, emoji: p.emoji,
                    });

                    await logAICall({
                        validation_id: validationId, tenant_id, layer: 'swarm_r1',
                        provider: assigned.provider, model: assigned.model,
                        latency_ms: Date.now() - t0, status: 'ok',
                    });

                    return { id: p.id, name: p.name, emoji: p.emoji, text };
                } catch (err: any) {
                    console.error(`[R1] ${p.id}:`, err.message);
                    await addEvent(supabase, runId, 'error', p.id, { msg: `R1 failed: ${err.message}` });
                    return { id: p.id, name: p.name, emoji: p.emoji, text: `[Error: ${err.message}]` };
                }
            })
        );

        await addEvent(supabase, runId, 'consensus', null, { coreSync: 35, global: 25, phase: 'after_round_1' });

        // ══════ ROUND 2: ANTITHESIS (Red Teaming + Dialectical Inquiry) ══════
        const transcriptR1 = round1Results.map((r) => `[${r.emoji} ${r.name}]: ${r.text}`).join('\n\n');

        await addEvent(supabase, runId, 'system', null, {
            msg: '⚔️ ROUND 2 · ANTITHESIS — Cross-Examination & Stress-Testing\n📚 Framework: Red Teaming (CIA/NSA) + Mason\'s Dialectical Inquiry (1969)\n🎯 Each expert has a PRIMARY ATTACK TARGET based on natural conflict of interest',
        });

        const round2Results = await Promise.all(
            personas.map(async (p) => {
                const t0 = Date.now();
                try {
                    const assigned = config.assign[p.id as keyof typeof config.assign];
                    const messages = [
                        { role: 'system', content: buildRound2AttackPrompt(p, lang, ideaRedacted) },
                        { role: 'user', content: `Original idea: "${ideaRedacted}"\n\n=== ROUND 1 ANALYSES ===\n${transcriptR1}\n\nExecute your attack protocol. Primary target first, then secondary scan.` },
                    ];

                    const out = await callModel(assigned, messages, { zdr: config.judge.zdr, maxTokens: 900 });
                    const text = extractText(out, `Challenge complete by ${p.name}.`);

                    await addEvent(supabase, runId, 'model_msg', p.id, {
                        text, phase: 'round2_attack', round: 2, persona: p.name, emoji: p.emoji,
                    });

                    await logAICall({
                        validation_id: validationId, tenant_id, layer: 'swarm_r2',
                        provider: assigned.provider, model: assigned.model,
                        latency_ms: Date.now() - t0, status: 'ok',
                    });

                    return { id: p.id, name: p.name, emoji: p.emoji, text };
                } catch (err: any) {
                    console.error(`[R2] ${p.id}:`, err.message);
                    return { id: p.id, name: p.name, emoji: p.emoji, text: `[Error: ${err.message}]` };
                }
            })
        );

        await addEvent(supabase, runId, 'consensus', null, { coreSync: 55, global: 45, phase: 'after_round_2' });

        // ══════ ROUND 3: SYNTHESIS (Hegelian Dialectics) ══════
        const transcriptR2 = round2Results.map((r) => `[${r.emoji} ${r.name}]: ${r.text}`).join('\n\n');

        await addEvent(supabase, runId, 'system', null, {
            msg: '🟢 ROUND 3 · SYNTHESIS — Concession, Refinement & Convergence\n📚 Framework: Hegelian Dialectics (1807) — Refined truth emerges from thesis + antithesis',
        });

        const round3Results = await Promise.all(
            personas.map(async (p) => {
                const t0 = Date.now();
                try {
                    const assigned = config.assign[p.id as keyof typeof config.assign];
                    const myR1 = round1Results.find((r) => r.id === p.id)?.text || '';
                    const attacksOnMe = round2Results
                        .filter((r) => r.id !== p.id && r.text.toLowerCase().includes(p.name.toLowerCase()))
                        .map((r) => `[${r.emoji} ${r.name}]: ${r.text}`)
                        .join('\n\n');

                    const messages = [
                        { role: 'system', content: buildRound3DefensePrompt(p, lang, ideaRedacted) },
                        {
                            role: 'user',
                            content: `Original idea: "${ideaRedacted}"\n\nYOUR ROUND 1 ANALYSIS:\n${myR1}\n\nATTACKS AGAINST YOU:\n${attacksOnMe || 'No direct attacks.'}\n\nALL ROUND 2 CHALLENGES:\n${transcriptR2}\n\nExecute synthesis protocol: Concede → Refine → Final Score.`,
                        },
                    ];

                    const out = await callModel(assigned, messages, { zdr: config.judge.zdr, maxTokens: 800 });
                    const text = extractText(out, `Defense complete by ${p.name}.`);

                    await addEvent(supabase, runId, 'model_msg', p.id, {
                        text, phase: 'round3_defense', round: 3, persona: p.name, emoji: p.emoji,
                    });

                    await logAICall({
                        validation_id: validationId, tenant_id, layer: 'swarm_r3',
                        provider: assigned.provider, model: assigned.model,
                        latency_ms: Date.now() - t0, status: 'ok',
                    });

                    return { id: p.id, name: p.name, emoji: p.emoji, text };
                } catch (err: any) {
                    console.error(`[R3] ${p.id}:`, err.message);
                    return { id: p.id, name: p.name, emoji: p.emoji, text: `[Error: ${err.message}]` };
                }
            })
        );

        await addEvent(supabase, runId, 'consensus', null, { coreSync: 75, global: 65, phase: 'after_round_3' });

        // ══════ JUDGE: Nash Equilibrium Verdict ══════
        const transcriptR3 = round3Results.map((r) => `[${r.emoji} ${r.name}]: ${r.text}`).join('\n\n');
        const fullTranscript = `=== ROUND 1: THESIS (Independent Analysis) ===\n${transcriptR1}\n\n=== ROUND 2: ANTITHESIS (Cross-Examination) ===\n${transcriptR2}\n\n=== ROUND 3: SYNTHESIS (Concession & Refinement) ===\n${transcriptR3}`;

        await addEvent(supabase, runId, 'system', null, {
            msg: '⚖️ VERDICT · NASH EQUILIBRIUM — Judge Deliberating\n📚 Framework: Game Theory (Nash, 1950) — Optimal convergence from adversarial positions',
        });

        let finalScore = 0;

        try {
            const judgeModel: ModelConfig = { provider: 'openrouter', model: config.judge.primary };
            const judgeMessages = [
                { role: 'system', content: buildJudgePrompt(lang) },
                { role: 'user', content: `Deliver your verdict on:\n\n"${ideaRedacted}"\n\nFULL ACE DEBATE (3 rounds, 6 experts):\n\n${fullTranscript}` },
            ];

            const judgeOut = await callModel(judgeModel, judgeMessages, { zdr: config.judge.zdr, maxTokens: 1500 });
            const judgeText = extractText(judgeOut, 'Judge deliberation complete.');

            const scoreMatch = judgeText.match(/(\d{1,3})\/100/);
            finalScore = scoreMatch ? Math.min(parseInt(scoreMatch[1]), 100) : 50;

            await addEvent(supabase, runId, 'judge_note', 'judge', {
                text: judgeText, type: 'final_verdict', consensusDelta: finalScore,
            });
            await addEvent(supabase, runId, 'consensus', null, {
                coreSync: finalScore, global: finalScore, phase: 'final',
            });

            await supabase.from('validations').update({
                status: 'complete', consensus_score: finalScore,
                full_result: {
                    lang,
                    protocol: 'ACE_v2.3',
                    judge: judgeText, round1: round1Results,
                    round2: round2Results, round3: round3Results,
                    model_config: {
                        personas: Object.keys(config.assign),
                        models: Object.values(config.assign).map((m) => m.model),
                        judge: config.judge.primary,
                    },
                },
            }).eq('id', validationId);

            await trackUsage({ tenant_id, validation_id: validationId });
            await triggerWebhook({
                tenant_id, event: 'debate.complete',
                payload: { validation_id: validationId, consensus_score: finalScore, rounds: 3, models_used: 7, protocol: 'ACE_v2.3' },
            });
        } catch (err: any) {
            console.error('[Judge] Primary failed:', err.message);

            try {
                const fbModel: ModelConfig = { provider: 'openrouter', model: config.judge.fallback };
                const fbMessages = [
                    { role: 'system', content: buildJudgePrompt(lang) },
                    { role: 'user', content: `Verdict on:\n"${ideaRedacted}"\n\n${fullTranscript}` },
                ];
                const fbOut = await callModel(fbModel, fbMessages, { zdr: config.judge.zdr, maxTokens: 1500 });
                const fbText = extractText(fbOut, 'Fallback judge complete.');
                const sm = fbText.match(/(\d{1,3})\/100/);
                finalScore = sm ? Math.min(parseInt(sm[1]), 100) : 50;

                await addEvent(supabase, runId, 'judge_note', 'judge', {
                    text: fbText, type: 'final_verdict_fallback', consensusDelta: finalScore,
                });
            } catch (fbErr: any) {
                console.error('[Judge] Fallback also failed:', fbErr.message);
                await addEvent(supabase, runId, 'error', 'judge', {
                    msg: `Both judges failed: ${err.message} | ${fbErr.message}`,
                });
            }

            await supabase.from('validations').update({
                status: 'complete', consensus_score: finalScore,
                full_result: { lang, protocol: 'ACE_v2.3', judge: `Error: ${err.message}`, round1: round1Results, round2: round2Results, round3: round3Results },
            }).eq('id', validationId);
        }

        // ══════ COMPLETE ══════
        await addEvent(supabase, runId, 'complete', null, {
            validationId, consensus_score: finalScore, status: 'complete', protocol: 'ACE_v2.3',
        });
        await supabase.from('debate_runs').update({ status: 'complete' }).eq('id', runId);

        console.log(`[Worker] ✅ ${runId} complete. Score: ${finalScore}/100 | Lang: ${lang} | Engine: ACE_v2.3`);
        return apiOk({ runId, validationId, score: finalScore });
    } catch (error: any) {
        console.error('[Worker] Fatal:', error);
        return apiError(error.message, 500);
    }
}





