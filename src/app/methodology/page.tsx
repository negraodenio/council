import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Methodology — ACE Engine™ | CouncilIA",
    description: "How the Adversarial Consensus Engine works: 6 AI experts, 3 rounds of structured debate, 1 impartial judge.",
};

export default function MethodologyPage() {
    return (
        <main className="bg-white text-neutral-900 min-h-screen">

            {/* NAV */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-sm border-b border-neutral-100">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <a href="/" className="text-lg font-semibold tracking-tight">
                        Council<span className="text-neutral-400">IA</span>
                    </a>
                    <div className="hidden md:flex items-center gap-8 text-sm text-neutral-500">
                        <a href="/#how" className="hover:text-neutral-900 transition">How it works</a>
                        <a href="/#council" className="hover:text-neutral-900 transition">The Council</a>
                        <a href="/#pricing" className="hover:text-neutral-900 transition">Pricing</a>
                        <a href="/methodology" className="text-neutral-900 font-medium">Methodology</a>
                        <a
                            href="/login"
                            className="bg-neutral-900 text-white px-4 py-2 rounded-md text-sm hover:bg-neutral-800 transition"
                        >
                            Start a session
                        </a>
                    </div>
                </div>
            </nav>

            {/* HEADER */}
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <a href="/" className="text-sm text-neutral-400 hover:text-neutral-600 transition mb-6 inline-block">
                        {"←"} Back to home
                    </a>
                    <div className="flex flex-wrap gap-3 mb-6">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 text-neutral-500 text-sm">
                            ACE Engine{"™"} v2.3
                        </span>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 text-neutral-500 text-sm">
                            7 AI Models
                        </span>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 text-neutral-500 text-sm">
                            3-Round Debate
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                        Methodology
                    </h1>
                    <p className="text-lg text-neutral-500 leading-relaxed">
                        The ACE Engine{"™"} (Adversarial Consensus Engine) is our multi-agent
                        reasoning framework. It forces AI models to argue against each other
                        instead of agreeing with you — producing decisions you can actually trust.
                    </p>
                </div>
            </section>

            {/* TABLE OF CONTENTS */}
            <section className="px-6 pb-16">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
                        <h3 className="font-semibold text-sm text-neutral-400 uppercase tracking-wider mb-4">Contents</h3>
                        <ol className="space-y-2 text-sm">
                            <li><a href="#problem" className="text-neutral-600 hover:text-neutral-900 transition">1. The Problem with Single-AI Advice</a></li>
                            <li><a href="#phases" className="text-neutral-600 hover:text-neutral-900 transition">2. The 4 Phases of ACE</a></li>
                            <li><a href="#archetypes" className="text-neutral-600 hover:text-neutral-900 transition">3. The 6 Expert Roles</a></li>
                            <li><a href="#models" className="text-neutral-600 hover:text-neutral-900 transition">4. Model Diversity {"&"} Assignment</a></li>
                            <li><a href="#conflict" className="text-neutral-600 hover:text-neutral-900 transition">5. The Conflict Matrix</a></li>
                            <li><a href="#output" className="text-neutral-600 hover:text-neutral-900 transition">6. Output: The Verdict</a></li>
                            <li><a href="#shells" className="text-neutral-600 hover:text-neutral-900 transition">7. Debate Modes</a></li>
                            <li><a href="#limitations" className="text-neutral-600 hover:text-neutral-900 transition">8. Limitations {"&"} Honest Constraints</a></li>
                        </ol>
                    </div>
                </div>
            </section>

            {/* 1. THE PROBLEM */}
            <section id="problem" className="py-16 px-6 border-t border-neutral-100">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6">1. The Problem with Single-AI Advice</h2>
                    <div className="space-y-4 text-neutral-600 leading-relaxed">
                        <p>
                            When you ask one AI model a question, it gives you <strong>one perspective</strong>.
                            Worse, most models are trained to be agreeable — they tell you what you want to hear.
                            This is called <strong>sycophancy bias</strong>, and it{"'"}s the single biggest problem
                            with AI-assisted decision making.
                        </p>
                        <p>
                            The ACE Engine solves this by forcing <strong>6 different AI models</strong> — each
                            with a different role and perspective — to <strong>argue against each other</strong> in
                            3 structured rounds. A 7th model acts as an impartial judge.
                        </p>
                        <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
                            <p className="text-sm">
                                <strong className="text-neutral-900">The result:</strong> Instead of one biased opinion,
                                you get a stress-tested verdict where weak arguments have been attacked, defended,
                                and scored by an independent arbiter.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. THE 4 PHASES */}
            <section id="phases" className="py-16 px-6 bg-neutral-50 border-t border-neutral-100">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-3">2. The 4 Phases of ACE</h2>
                    <p className="text-neutral-500 mb-10 leading-relaxed">
                        Every session follows the same structured protocol — no shortcuts, no skipped steps.
                    </p>

                    {/* Phase 1 */}
                    <div className="mb-8 p-6 rounded-xl border border-neutral-200 bg-white shadow-sm">
                        <div className="flex items-start gap-4 mb-4">
                            <span className="text-2xl shrink-0">{"🎯"}</span>
                            <div>
                                <h3 className="font-bold text-base text-neutral-900">PHASE 1: Focus Lock</h3>
                                <p className="text-xs font-mono text-neutral-400">Round 1 — Independent Analysis</p>
                            </div>
                        </div>
                        <p className="text-neutral-600 text-sm leading-relaxed">
                            Each AI expert is given a specific role (Visionary, Devil{"'"}s Advocate, etc.)
                            and analyzes your question independently. They don{"'"}t see each other{"'"}s
                            responses. This prevents groupthink and ensures genuine diversity of perspective.
                        </p>
                    </div>

                    {/* Phase 2 */}
                    <div className="mb-8 p-6 rounded-xl border border-neutral-200 bg-white shadow-sm">
                        <div className="flex items-start gap-4 mb-4">
                            <span className="text-2xl shrink-0">{"⚔️"}</span>
                            <div>
                                <h3 className="font-bold text-base text-neutral-900">PHASE 2: Adversarial Challenge</h3>
                                <p className="text-xs font-mono text-neutral-400">Round 2 — Cross-Examination</p>
                            </div>
                        </div>
                        <p className="text-neutral-600 text-sm leading-relaxed">
                            Now each expert reads what all the others said in Round 1 — and attacks
                            the weakest arguments. The Devil{"'"}s Advocate targets the Visionary{"'"}s
                            optimism. The Financier challenges the Technologist{"'"}s cost estimates.
                            Weak reasoning gets exposed and dismantled.
                        </p>
                    </div>

                    {/* Phase 3 */}
                    <div className="mb-8 p-6 rounded-xl border border-neutral-200 bg-white shadow-sm">
                        <div className="flex items-start gap-4 mb-4">
                            <span className="text-2xl shrink-0">{"🛡️"}</span>
                            <div>
                                <h3 className="font-bold text-base text-neutral-900">PHASE 3: Defense {"&"} Concession</h3>
                                <p className="text-xs font-mono text-neutral-400">Round 3 — Final Arguments</p>
                            </div>
                        </div>
                        <p className="text-neutral-600 text-sm leading-relaxed">
                            In the final round, experts defend their surviving arguments and
                            <strong> concede where they were wrong</strong>. This is critical — it
                            produces intellectual honesty, not stubbornness. Each expert gives a
                            final score (0-100) for the original idea.
                        </p>
                    </div>

                    {/* Phase 4 */}
                    <div className="p-6 rounded-xl border border-neutral-200 bg-white shadow-sm">
                        <div className="flex items-start gap-4 mb-4">
                            <span className="text-2xl shrink-0">{"🏛️"}</span>
                            <div>
                                <h3 className="font-bold text-base text-neutral-900">PHASE 4: Judicial Arbitration</h3>
                                <p className="text-xs font-mono text-neutral-400">The Judge — GPT-4o</p>
                            </div>
                        </div>
                        <p className="text-neutral-600 text-sm leading-relaxed">
                            GPT-4o acts as an impartial judge. It reads all 3 rounds of debate,
                            weighs every argument, <strong>penalizes attacks that were never refuted</strong>,
                            and delivers a structured verdict with a consensus score (0-100),
                            confidence level, and concrete recommendations.
                        </p>
                    </div>

                </div>
            </section>

            {/* 3. THE 6 EXPERT ROLES */}
            <section id="archetypes" className="py-16 px-6 border-t border-neutral-100">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-3">3. The 6 Expert Roles</h2>
                    <p className="text-neutral-500 mb-10 leading-relaxed">
                        Each expert has a fixed perspective and a natural bias.
                        The biases are intentional — they create productive conflict.
                    </p>

                    <ExpertCard
                        emoji={"🔮"}
                        name="The Visionary"
                        model="DeepSeek R1"
                        color="border-purple-200 bg-purple-50/50"
                        thinksLike="A VC evaluating a Series A"
                        naturalBias="Optimistic — sees the 10x opportunity"
                        centralQuestion="What could this become at scale?"
                        approach="Identifies market creation potential, network effects, and long-term competitive advantages."
                        blindSpot="Can underestimate execution difficulty and operational costs."
                    />

                    <ExpertCard
                        emoji={"⚙️"}
                        name="The Technologist"
                        model="Kimi K2"
                        color="border-cyan-200 bg-cyan-50/50"
                        thinksLike="A CTO who has built 3 startups"
                        naturalBias="Pragmatic — focused on what can actually be built"
                        centralQuestion="Is this technically feasible and scalable?"
                        approach="Evaluates architecture, build time, tech debt, and failure points at 10x scale."
                        blindSpot="Can over-optimize for technical elegance at the expense of business value."
                    />

                    <ExpertCard
                        emoji={"😈"}
                        name="The Devil's Advocate"
                        model="Llama 4 Maverick"
                        color="border-red-200 bg-red-50/50"
                        thinksLike="A short-seller researching why this will fail"
                        naturalBias="Skeptical — finds every flaw and failure mode"
                        centralQuestion="What is the most likely cause of failure?"
                        approach="Pre-mortem analysis. Identifies single points of failure, market risks, and hidden assumptions."
                        blindSpot="Can miss genuine breakthroughs by focusing only on tail risks."
                    />

                    <ExpertCard
                        emoji={"📊"}
                        name="The Market Analyst"
                        model="Gemini 2.5 Flash"
                        color="border-emerald-200 bg-emerald-50/50"
                        thinksLike="A McKinsey partner"
                        naturalBias="Data-driven — needs numbers to believe"
                        centralQuestion="What do the market data say?"
                        approach="TAM/SAM/SOM analysis, competitive landscape mapping, go-to-market strategy evaluation."
                        blindSpot="Can over-rely on historical data and miss category-creating opportunities."
                    />

                    <ExpertCard
                        emoji={"💰"}
                        name="The Financial Strategist"
                        model="Mistral Medium 3"
                        color="border-blue-200 bg-blue-50/50"
                        thinksLike="A CFO with private equity experience"
                        naturalBias="Conservative — focused on unit economics and survival"
                        centralQuestion="Does the math work?"
                        approach="Unit economics, burn rate analysis, revenue model validation, path to profitability."
                        blindSpot="Can kill growth opportunities by demanding premature profitability."
                    />

                    <ExpertCard
                        emoji={"⚖️"}
                        name="Ethics & Risk"
                        model="Qwen 3"
                        color="border-amber-200 bg-amber-50/50"
                        thinksLike="A compliance officer at a top law firm"
                        naturalBias="Cautious — focused on what could go wrong legally and reputationally"
                        centralQuestion="What are the regulatory and ethical risks?"
                        approach="GDPR compliance, bias assessment, privacy risks, reputation impact, regulatory exposure."
                        blindSpot="Can slow down innovation with excessive caution."
                    />

                    {/* Judge */}
                    <div className="mt-8 p-8 rounded-xl bg-neutral-900 text-white">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="text-3xl">{"🏛️"}</div>
                            <div>
                                <h3 className="font-bold text-lg">The Judge — GPT-4o</h3>
                                <p className="text-neutral-400 text-sm">Impartial Arbiter</p>
                            </div>
                        </div>
                        <div className="space-y-3 text-neutral-300 text-sm leading-relaxed">
                            <p>
                                The Judge never participates in Rounds 1-3. It only reads the complete
                                debate transcript and delivers the final verdict. It weighs arguments
                                by strength, penalizes unrefuted attacks, and produces a consensus
                                score with concrete, actionable recommendations.
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            {/* 4. MODEL DIVERSITY */}
            <section id="models" className="py-16 px-6 bg-neutral-50 border-t border-neutral-100">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6">4. Model Diversity {"&"} Assignment</h2>
                    <div className="space-y-4 text-neutral-600 leading-relaxed mb-8">
                        <p>
                            Each expert runs on a <strong>different AI model</strong> from a different provider.
                            This prevents the "monoculture problem" — if all experts used GPT-4o, they{"'"}d
                            share the same training biases and blind spots. By using 7 different models,
                            we get genuinely independent perspectives.
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-neutral-200">
                                    <th className="text-left py-3 font-semibold">Role</th>
                                    <th className="text-left py-3 font-semibold">AI Model</th>
                                    <th className="text-left py-3 font-semibold">Provider</th>
                                    <th className="text-left py-3 font-semibold">Why this model</th>
                                </tr>
                            </thead>
                            <tbody className="text-neutral-600">
                                <tr className="border-b border-neutral-100">
                                    <td className="py-3">{"🔮"} Visionary</td>
                                    <td className="py-3 font-mono text-xs">DeepSeek R1</td>
                                    <td className="py-3 text-xs">DeepSeek</td>
                                    <td className="py-3 text-xs text-neutral-400">Strong reasoning, creative connections</td>
                                </tr>
                                <tr className="border-b border-neutral-100">
                                    <td className="py-3">{"⚙️"} Technologist</td>
                                    <td className="py-3 font-mono text-xs">Kimi K2</td>
                                    <td className="py-3 text-xs">Moonshot AI</td>
                                    <td className="py-3 text-xs text-neutral-400">Strong technical analysis, code-aware</td>
                                </tr>
                                <tr className="border-b border-neutral-100">
                                    <td className="py-3">{"😈"} Devil{"'"}s Advocate</td>
                                    <td className="py-3 font-mono text-xs">Llama 4 Maverick</td>
                                    <td className="py-3 text-xs">Meta</td>
                                    <td className="py-3 text-xs text-neutral-400">Less filtered, more willing to disagree</td>
                                </tr>
                                <tr className="border-b border-neutral-100">
                                    <td className="py-3">{"📊"} Market Analyst</td>
                                    <td className="py-3 font-mono text-xs">Gemini 2.5 Flash</td>
                                    <td className="py-3 text-xs">Google</td>
                                    <td className="py-3 text-xs text-neutral-400">Fast, data-oriented, search-grounded</td>
                                </tr>
                                <tr className="border-b border-neutral-100">
                                    <td className="py-3">{"💰"} Financier</td>
                                    <td className="py-3 font-mono text-xs">Mistral Medium 3</td>
                                    <td className="py-3 text-xs">Mistral AI</td>
                                    <td className="py-3 text-xs text-neutral-400">Precise, European, structured output</td>
                                </tr>
                                <tr className="border-b border-neutral-100">
                                    <td className="py-3">{"⚖️"} Ethics</td>
                                    <td className="py-3 font-mono text-xs">Qwen 3</td>
                                    <td className="py-3 text-xs">Alibaba</td>
                                    <td className="py-3 text-xs text-neutral-400">Multi-lingual, compliance-aware</td>
                                </tr>
                                <tr className="border-b border-neutral-100">
                                    <td className="py-3">{"🏛️"} Judge</td>
                                    <td className="py-3 font-mono text-xs">GPT-4o</td>
                                    <td className="py-3 text-xs">OpenAI</td>
                                    <td className="py-3 text-xs text-neutral-400">Strongest general reasoning for arbitration</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* 5. THE CONFLICT MATRIX */}
            <section id="conflict" className="py-16 px-6 border-t border-neutral-100">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-3">5. The Conflict Matrix</h2>
                    <p className="text-neutral-500 mb-8 leading-relaxed">
                        The most valuable insights come from structured disagreement.
                        These are the built-in tensions that drive the debate:
                    </p>

                    <div className="space-y-4">
                        <ConflictRow
                            left={"🔮 Visionary"}
                            right={"💰 Financier"}
                            tension="Growth vs Survival"
                            desc="The Visionary pushes for scale. The Financier demands unit economics. The truth is usually the sustainable growth path between them."
                        />
                        <ConflictRow
                            left={"⚙️ Technologist"}
                            right={"😈 Devil's Advocate"}
                            tension="Build vs Break"
                            desc="The Technologist designs the system. The Devil tries to break it. The result is the most resilient version of the architecture."
                        />
                        <ConflictRow
                            left={"📊 Market Analyst"}
                            right={"⚖️ Ethics & Risk"}
                            tension="Opportunity vs Compliance"
                            desc="The Market Analyst sees the opportunity. Ethics & Risk flags the regulatory exposure. The balance is a market entry that won't get you sued."
                        />
                    </div>

                    <div className="mt-8 bg-neutral-50 rounded-xl p-6 border border-neutral-200">
                        <p className="text-sm text-neutral-500 leading-relaxed">
                            <strong className="text-neutral-700">Why this matters:</strong> When two experts
                            with opposing perspectives reach agreement on a point, that point is
                            extremely likely to be valid. When they can{"'"}t agree, the Judge weighs
                            the strength of each side{"'"}s arguments.
                        </p>
                    </div>

                </div>
            </section>

            {/* 6. OUTPUT */}
            <section id="output" className="py-16 px-6 bg-neutral-50 border-t border-neutral-100">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6">6. Output: The Verdict</h2>
                    <p className="text-neutral-500 mb-8 leading-relaxed">
                        Every session produces a structured verdict with these components:
                    </p>

                    <div className="grid gap-4">
                        <div className="p-5 rounded-xl border border-neutral-200 bg-white">
                            <h3 className="font-semibold text-sm mb-1">Consensus Score (0-100)</h3>
                            <p className="text-neutral-500 text-sm">How much agreement exists across all 6 experts after 3 rounds of debate.</p>
                        </div>
                        <div className="p-5 rounded-xl border border-neutral-200 bg-white">
                            <h3 className="font-semibold text-sm mb-1">Decision (GO / NO-GO / CONDITIONAL)</h3>
                            <p className="text-neutral-500 text-sm">The Judge{"'"}s final recommendation based on the weight of arguments.</p>
                        </div>
                        <div className="p-5 rounded-xl border border-neutral-200 bg-white">
                            <h3 className="font-semibold text-sm mb-1">Confidence Level (LOW / MEDIUM / HIGH)</h3>
                            <p className="text-neutral-500 text-sm">How much the experts agreed. Low confidence means the debate was highly contested.</p>
                        </div>
                        <div className="p-5 rounded-xl border border-neutral-200 bg-white">
                            <h3 className="font-semibold text-sm mb-1">Key Arguments (For {"&"} Against)</h3>
                            <p className="text-neutral-500 text-sm">The strongest surviving arguments from both sides, after adversarial testing.</p>
                        </div>
                        <div className="p-5 rounded-xl border border-neutral-200 bg-white">
                            <h3 className="font-semibold text-sm mb-1">Actionable Recommendations</h3>
                            <p className="text-neutral-500 text-sm">Concrete next steps — what to do, what to investigate, what to avoid.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. DEBATE MODES */}
            <section id="shells" className="py-16 px-6 border-t border-neutral-100">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-3">7. Debate Modes</h2>
                    <p className="text-neutral-500 mb-10 leading-relaxed">
                        The ACE Engine supports multiple debate formats optimized for different decision types.
                    </p>

                    <div className="space-y-6">
                        <div className="p-6 rounded-xl border-2 border-neutral-900 relative">
                            <span className="absolute -top-3 left-6 bg-neutral-900 text-white text-xs px-3 py-1 rounded-full">
                                Default
                            </span>
                            <h3 className="font-bold text-base mb-2">{"🏛️"} Classic Council</h3>
                            <p className="text-neutral-600 text-sm leading-relaxed mb-3">
                                All 6 experts debate freely across 3 rounds. Best for business decisions,
                                strategy questions, and startup validation. Covers 80% of use cases.
                            </p>
                        </div>

                        <div className="p-6 rounded-xl border border-neutral-200">
                            <h3 className="font-bold text-base mb-2">{"⚔️"} Tribunal Mode</h3>
                            <p className="text-neutral-600 text-sm leading-relaxed mb-3">
                                Splits the council into Prosecution vs Defense. Three experts argue FOR,
                                three argue AGAINST. Best for high-stakes binary decisions.
                            </p>
                            <p className="text-neutral-400 text-xs">Coming soon — Pro plan</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. LIMITATIONS */}
            <section id="limitations" className="py-16 px-6 bg-neutral-50 border-t border-neutral-100">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6">8. Limitations {"&"} Honest Constraints</h2>
                    <div className="space-y-4 text-neutral-600 leading-relaxed">
                        <p>
                            We believe in transparency about what the ACE Engine can and cannot do:
                        </p>
                        <ul className="space-y-3 ml-4 list-disc">
                            <li>
                                <strong>AI can hallucinate.</strong> All 7 models can generate
                                plausible-sounding but incorrect information. The adversarial format
                                reduces this (other experts catch errors), but doesn{"'"}t eliminate it.
                                Always verify critical facts independently.
                            </li>
                            <li>
                                <strong>Not instant.</strong> A full 3-round debate with 7 models
                                takes 30-90 seconds. Quality reasoning takes time.
                            </li>
                            <li>
                                <strong>Not a replacement for human judgment.</strong> We provide
                                structured analysis from multiple perspectives. You make the final
                                decision. AI is an advisor, not a decision-maker.
                            </li>
                            <li>
                                <strong>Training data cutoffs.</strong> Each model has a knowledge
                                cutoff date. For very recent events, supplement with your own research.
                            </li>
                            <li>
                                <strong>Domain expertise.</strong> The council works best for business,
                                technology, and strategy decisions. For medical, legal, or financial
                                advice, consult qualified professionals.
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-6 border-t border-neutral-100">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-2xl font-bold mb-4">See it in action</h2>
                    <p className="text-neutral-500 mb-8">
                        Submit an idea and watch 6 AI experts debate it
                        through 3 adversarial rounds — in real-time.
                    </p>
                    <a href="/login" className="inline-block bg-neutral-900 text-white px-8 py-4 rounded-md text-base font-medium hover:bg-neutral-800 transition">
                        Start a free session
                    </a>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-12 px-6 border-t border-neutral-100">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
                        <div className="space-y-2">
                            <div className="text-base font-semibold">
                                Council<span className="text-neutral-400">IA</span>
                            </div>
                            <p className="text-sm text-neutral-400">
                                Council as a Service — Powered by{" "}
                                <a href="https://www.ia4all.eu" target="_blank" rel="noopener noreferrer" className="underline hover:text-neutral-600 transition">
                                    ia4all.eu
                                </a>
                            </p>
                            <div className="flex items-center gap-2 text-sm text-neutral-400">
                                <span>{"🇵🇹"}</span>
                                <span>Av. {"Á"}lvares Cabral 13, Lisboa, Portugal</span>
                            </div>
                            <p className="text-sm text-neutral-400">
                                <a href="mailto:help@ia4all.eu" className="hover:text-neutral-600 transition">
                                    help@ia4all.eu
                                </a>
                            </p>
                        </div>
                        <div className="flex gap-6 text-sm text-neutral-400">
                            <a href="/methodology" className="hover:text-neutral-600 transition">Methodology</a>
                            <a href="/privacy" className="hover:text-neutral-600 transition">Privacy</a>
                            <a href="/terms" className="hover:text-neutral-600 transition">Terms</a>
                            <a href="/pricing" className="hover:text-neutral-600 transition">Pricing</a>
                        </div>
                    </div>
                    <div className="border-t border-neutral-100 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                        <span className="text-xs text-neutral-400">
                            {"©"} 2025 CouncilIA — EU-first, GDPR-ready
                        </span>
                        <div className="flex items-center gap-4 text-xs text-neutral-400">
                            <span>Founded by{" "}
                                <a href="https://linkedin.com/in/denionegrao" target="_blank" rel="noopener noreferrer" className="underline hover:text-neutral-600 transition">
                                    Denio Negrao
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </footer>

        </main>
    );
}

// --- Expert Card Component ---
function ExpertCard({
    emoji, name, model, color, thinksLike, naturalBias,
    centralQuestion, approach, blindSpot,
}: {
    emoji: string; name: string; model: string; color: string;
    thinksLike: string; naturalBias: string; centralQuestion: string;
    approach: string; blindSpot: string;
}) {
    return (
        <div className={`p-6 rounded-xl border mb-6 ${color}`}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">{emoji}</span>
                    <div>
                        <h3 className="font-bold text-base">{name}</h3>
                    </div>
                </div>
                <span className="text-xs font-mono text-neutral-400 bg-white px-2 py-1 rounded">{model}</span>
            </div>

            <div className="space-y-3 text-sm">
                <div>
                    <span className="font-semibold text-neutral-700">Thinks like: </span>
                    <span className="text-neutral-500">{thinksLike}</span>
                </div>
                <div>
                    <span className="font-semibold text-neutral-700">Natural bias: </span>
                    <span className="text-neutral-500">{naturalBias}</span>
                </div>
                <div>
                    <span className="font-semibold text-neutral-700">Central question: </span>
                    <span className="text-neutral-500 italic">{"\""}{centralQuestion}{"\""}</span>
                </div>
                <div className="bg-white/80 rounded-lg p-4 border border-neutral-200/50">
                    <span className="font-semibold text-neutral-700 block mb-1">Approach:</span>
                    <span className="text-neutral-500">{approach}</span>
                </div>
                <div className="flex gap-2 items-start">
                    <span className="text-amber-500 shrink-0">{"⚠️"}</span>
                    <div>
                        <span className="font-semibold text-neutral-700">Known blind spot: </span>
                        <span className="text-neutral-500">{blindSpot}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- Conflict Row Component ---
function ConflictRow({
    left, right, tension, desc,
}: {
    left: string; right: string; tension: string; desc: string;
}) {
    return (
        <div className="p-5 rounded-xl border border-neutral-200 bg-white">
            <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-semibold">{left}</span>
                <span className="text-red-400 text-lg">{"⚡"}</span>
                <span className="text-sm font-semibold">{right}</span>
                <span className="text-xs text-neutral-400 ml-auto font-mono">{tension}</span>
            </div>
            <p className="text-neutral-500 text-sm leading-relaxed">{desc}</p>
        </div>
    );
}