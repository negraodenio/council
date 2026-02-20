export default function Home() {
    return (
        <main className="bg-white text-neutral-900">

            {/* NAV */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-sm border-b border-neutral-100">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <a href="/" className="text-lg font-semibold tracking-tight">
                        Council<span className="text-neutral-400">IA</span>
                    </a>
                    <div className="hidden md:flex items-center gap-8 text-sm text-neutral-500">
                        <a href="#how" className="hover:text-neutral-900 transition">How it works</a>
                        <a href="#council" className="hover:text-neutral-900 transition">The Council</a>
                        <a href="#usecases" className="hover:text-neutral-900 transition">Use cases</a>
                        <a href="#pricing" className="hover:text-neutral-900 transition">Pricing</a>
                        <a href="/methodology" className="hover:text-neutral-900 transition">Methodology</a>
                        <a
                            href="/login"
                            className="bg-neutral-900 text-white px-4 py-2 rounded-md text-sm hover:bg-neutral-800 transition"
                        >
                            Start a session
                        </a>
                    </div>
                </div>
            </nav>

            {/* HERO */}
            <section className="pt-40 pb-24 px-6">
                <div className="max-w-3xl mx-auto text-center">

                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 text-neutral-500 text-sm mb-8">
                        <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                        Council as a Service {"·"} Powered by ACE Engine{"™"}
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-8">
                        One AI agrees with you.
                        <br />
                        <span className="text-neutral-300">Six won{"'"}t.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto mb-12 leading-relaxed">
                        Submit any idea. Six AI experts with opposing perspectives
                        debate it in 3 adversarial rounds. A seventh arbitrates
                        and delivers a reasoned verdict. In any language.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/login"
                            className="bg-neutral-900 text-white px-8 py-4 rounded-md text-base font-medium hover:bg-neutral-800 transition"
                        >
                            Start a free session
                        </a>
                        <a
                            href="#how"
                            className="border border-neutral-200 text-neutral-600 px-8 py-4 rounded-md text-base font-medium hover:border-neutral-400 transition"
                        >
                            See how it works
                        </a>
                    </div>

                </div>
            </section>

            {/* DEBATE VISUAL */}
            <section className="py-24 px-6 border-t border-neutral-100">
                <div className="max-w-5xl mx-auto">

                    <div className="bg-neutral-950 rounded-2xl p-8 md:p-12 text-white font-mono text-sm overflow-hidden">

                        <div className="text-neutral-500 mb-2 flex items-center gap-2">
                            <span className="size-2 rounded-full bg-red-500 animate-pulse" />
                            LIVE — session #0847
                        </div>
                        <div className="text-neutral-400 mb-6 text-xs">
                            &quot;Should we open a coffee shop in Colombo Shopping, Lisbon?&quot;
                        </div>

                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <span className="text-purple-400 shrink-0 w-28">{"🔮"} Visionary</span>
                                <span className="text-neutral-300">
                                    Colombo attracts 20M visitors/year. Premium coffee is growing at 12% CAGR in Lisbon. This is a clear market opportunity with potential for brand expansion.
                                </span>
                            </div>

                            <div className="flex gap-3">
                                <span className="text-red-400 shrink-0 w-28">{"😈"} Devil{"'"}s Adv.</span>
                                <span className="text-neutral-300">
                                    Rent in Colombo is {"€"}8-15K/month. With Starbucks, Delta, and 12 other caf{"é"}s already there, you need 18% daily capture rate just to break even. That{"'"}s delusional.
                                </span>
                            </div>

                            <div className="flex gap-3">
                                <span className="text-cyan-400 shrink-0 w-28">{"⚙️"} Tech</span>
                                <span className="text-neutral-300">
                                    A modular kiosk format with app-based ordering reduces staff from 5 to 2. IoT inventory tracking cuts waste by 30%.
                                </span>
                            </div>

                            <div className="flex gap-3">
                                <span className="text-emerald-400 shrink-0 w-28">{"📊"} Market</span>
                                <span className="text-neutral-300">
                                    TAM for specialty coffee in Lisbon metro: {"€"}180M. Colombo captures 8% of foot traffic conversion. SAM is {"€"}14.4M — realistic SOM: {"€"}720K/year.
                                </span>
                            </div>

                            <div className="flex gap-3">
                                <span className="text-blue-400 shrink-0 w-28">{"💰"} Finance</span>
                                <span className="text-neutral-300">
                                    Unit economics: {"€"}4.50 average ticket, 280 customers/day needed. Breakeven at month 14 with {"€"}120K initial investment. Tight but feasible.
                                </span>
                            </div>

                            <div className="flex gap-3">
                                <span className="text-amber-400 shrink-0 w-28">{"⚖️"} Ethics</span>
                                <span className="text-neutral-300">
                                    Colombo lease contracts have 5-year lock-in. Exit costs are {"€"}40-60K. Regulatory risk is low but lease risk is material.
                                </span>
                            </div>

                            <div className="border-t border-neutral-700 pt-4 mt-6">
                                <div className="flex gap-3">
                                    <span className="text-yellow-400 shrink-0 w-28">{"🏛️"} Judge</span>
                                    <span className="text-neutral-100">
                                        <strong>CONDITIONAL GO — 58/100.</strong> Viable only with premium differentiation and kiosk format. Address rent risk with a revenue-share lease model.
                                        <span className="text-neutral-500"> Confidence: MEDIUM</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>

                    <p className="text-center text-sm text-neutral-400 mt-6">
                        Real session output. 6 experts, 3 rounds, unedited.
                    </p>

                </div>
            </section>

            {/* HOW IT WORKS */}
            <section id="how" className="py-24 px-6 border-t border-neutral-100">
                <div className="max-w-4xl mx-auto">

                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-16 text-center">
                        How it works
                    </h2>

                    <div className="grid md:grid-cols-3 gap-12">

                        <div>
                            <div className="text-4xl font-bold text-neutral-200 mb-4">01</div>
                            <h3 className="text-lg font-semibold mb-2">You submit</h3>
                            <p className="text-neutral-500 leading-relaxed">
                                An idea, a business decision, a strategy — in any language.
                                The council detects your language and responds accordingly.
                            </p>
                        </div>

                        <div>
                            <div className="text-4xl font-bold text-neutral-200 mb-4">02</div>
                            <h3 className="text-lg font-semibold mb-2">Six experts debate</h3>
                            <p className="text-neutral-500 leading-relaxed">
                                Round 1: Each expert analyzes from their perspective.
                                Round 2: They challenge each other{"'"}s weakest arguments.
                                Round 3: They defend positions and give final scores.
                            </p>
                        </div>

                        <div>
                            <div className="text-4xl font-bold text-neutral-200 mb-4">03</div>
                            <h3 className="text-lg font-semibold mb-2">The Judge decides</h3>
                            <p className="text-neutral-500 leading-relaxed">
                                GPT-4o reads all 3 rounds, weighs every argument,
                                and delivers a structured verdict with a consensus score
                                and actionable recommendations.
                            </p>
                        </div>

                    </div>

                </div>
            </section>

            {/* FEATURES GRID */}
            <section className="py-24 px-6 bg-neutral-50 border-t border-neutral-100">
                <div className="max-w-4xl mx-auto">

                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-center">
                        What{"'"}s inside
                    </h2>
                    <p className="text-neutral-500 text-center mb-16 text-lg">
                        Enterprise-grade AI deliberation, not a chatbot.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <FeatureCard
                            icon={"🌐"}
                            title="Multi-language"
                            desc="Write in Portuguese, Spanish, French, German, Chinese, Arabic — the entire council responds in your language."
                        />
                        <FeatureCard
                            icon={"⚔️"}
                            title="3-round adversarial debate"
                            desc="Not just opinions. Experts analyze, attack each other, then defend. Weak arguments get destroyed."
                        />
                        <FeatureCard
                            icon={"🧠"}
                            title="7 different AI models"
                            desc="DeepSeek R1, Gemini 2.5 Flash, Llama 4 Maverick, Mistral Medium 3, GPT-4o, Kimi K2, and Qwen 3."
                        />
                        <FeatureCard
                            icon={"🇪🇺"}
                            title="EU data sovereignty"
                            desc="EU-first routing for sensitive requests. Zero Data Retention on supported providers. GDPR-ready."
                        />
                        <FeatureCard
                            icon={"📡"}
                            title="Live debate streaming"
                            desc="Watch the experts argue in real-time. Interject mid-debate to steer the discussion."
                        />
                        <FeatureCard
                            icon={"🔧"}
                            title="GitHub integration"
                            desc="For code reviews: auto-generate patches and open PRs directly from the verdict."
                        />
                    </div>

                </div>
            </section>

            {/* ACE ENGINE */}
            <section className="py-24 px-6 border-t border-neutral-100">
                <div className="max-w-4xl mx-auto">

                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                            The ACE Engine{"™"}
                        </h2>
                        <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
                            Adversarial Consensus Engine — our multi-agent reasoning framework
                            that structures debate, eliminates sycophancy, and produces
                            actionable verdicts you can trust.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-xl border border-neutral-200">
                            <div className="text-sm font-mono text-neutral-400 mb-2">PHASE 1</div>
                            <h3 className="font-semibold text-base mb-1">Focus Lock</h3>
                            <p className="text-neutral-500 text-sm leading-relaxed">
                                Each AI expert is anchored to its role and perspective. No drift, no generic answers. The Visionary stays visionary, the Devil stays adversarial.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl border border-neutral-200">
                            <div className="text-sm font-mono text-neutral-400 mb-2">PHASE 2</div>
                            <h3 className="font-semibold text-base mb-1">Adversarial Challenge</h3>
                            <p className="text-neutral-500 text-sm leading-relaxed">
                                In Round 2, each expert reads what the others said and attacks the weakest arguments. Weak reasoning gets exposed and dismantled.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl border border-neutral-200">
                            <div className="text-sm font-mono text-neutral-400 mb-2">PHASE 3</div>
                            <h3 className="font-semibold text-base mb-1">Defense {"&"} Concession</h3>
                            <p className="text-neutral-500 text-sm leading-relaxed">
                                In Round 3, experts defend their surviving arguments and concede where they were wrong. This produces intellectual honesty, not stubbornness.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl border border-neutral-200">
                            <div className="text-sm font-mono text-neutral-400 mb-2">PHASE 4</div>
                            <h3 className="font-semibold text-base mb-1">Judicial Arbitration</h3>
                            <p className="text-neutral-500 text-sm leading-relaxed">
                                GPT-4o acts as an impartial judge. It weighs all arguments, penalizes unrefuted attacks, and delivers a scored verdict with concrete recommendations.
                            </p>
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <a href="/methodology" className="text-sm text-neutral-500 hover:text-neutral-900 transition underline underline-offset-4">
                            Read the full methodology {"→"}
                        </a>
                    </div>

                </div>
            </section>

            {/* THE COUNCIL */}
            <section id="council" className="py-24 px-6 bg-neutral-50 border-t border-neutral-100">
                <div className="max-w-4xl mx-auto">

                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-16 text-center">
                        The council
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">

                        <CouncilCard color="bg-purple-500" emoji={"🔮"} name="The Visionary"
                            desc="Finds the 10x opportunity. Thinks like a VC evaluating a Series A. What could this become?" />

                        <CouncilCard color="bg-cyan-500" emoji={"⚙️"} name="The Technologist"
                            desc="Evaluates feasibility, architecture, scalability. Thinks like a CTO who has built 3 startups." />

                        <CouncilCard color="bg-red-500" emoji={"😈"} name="Devil's Advocate"
                            desc="Finds every flaw and failure mode. Thinks like a short-seller researching why this will fail." />

                        <CouncilCard color="bg-emerald-500" emoji={"📊"} name="Market Analyst"
                            desc="TAM/SAM/SOM, competitive landscape, go-to-market. Thinks like a McKinsey partner." />

                        <CouncilCard color="bg-amber-500" emoji={"⚖️"} name="Ethics & Risk"
                            desc="Regulatory risks, bias, privacy, reputation. Thinks like a compliance officer at a top law firm." />

                        <CouncilCard color="bg-blue-500" emoji={"💰"} name="Financial Strategist"
                            desc="Unit economics, burn rate, revenue models, path to profitability. Thinks like a CFO with PE experience." />

                    </div>

                    <div className="mt-6 p-8 rounded-xl bg-neutral-950 text-white text-center">
                        <div className="text-3xl mb-3">{"🏛️"}</div>
                        <h3 className="font-semibold text-lg mb-1">The Judge — GPT-4o</h3>
                        <p className="text-neutral-400 text-sm leading-relaxed max-w-lg mx-auto">
                            Reads all 3 rounds of debate. Weighs every argument. Weights unrefuted attacks heavily.
                            Delivers the final verdict with a consensus score, strategic recommendations, and confidence level.
                        </p>
                    </div>

                </div>
            </section>

            {/* USE CASES */}
            <section id="usecases" className="py-24 px-6 border-t border-neutral-100">
                <div className="max-w-4xl mx-auto">

                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-center">
                        Debate anything
                    </h2>
                    <p className="text-neutral-500 text-center mb-16 text-lg">
                        Not just code. Any decision that matters.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">

                        <UseCaseCard title="Startup validation"
                            desc="Is this idea viable? Business model stress-test, competitor analysis, market fit, unit economics — debated from 6 angles." />

                        <UseCaseCard title="Business decisions"
                            desc="Should we enter the European market? Market analysis, risk assessment, financial modeling, timing evaluation." />

                        <UseCaseCard title="Code & architecture"
                            desc="Is this production-ready? Security, performance, readability, scalability — with auto-generated patches." />

                        <UseCaseCard title="Strategy & planning"
                            desc="Hire or outsource? Cost analysis, quality trade-offs, timeline impact, long-term implications." />

                        <UseCaseCard title="Content & positioning"
                            desc="Which positioning wins? Brand voice, audience fit, differentiation, messaging clarity." />

                        <UseCaseCard title="Risk & compliance"
                            desc="Are we GDPR compliant? Risk vectors, data flow analysis, remediation priorities, compliance gaps." />

                    </div>

                </div>
            </section>

            {/* PRICING */}
            <section id="pricing" className="py-24 px-6 bg-neutral-50 border-t border-neutral-100">
                <div className="max-w-4xl mx-auto">

                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-center">
                        Pricing
                    </h2>
                    <p className="text-neutral-500 text-center mb-16">
                        Start free. No credit card.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">

                        <div className="bg-white p-8 rounded-xl border border-neutral-200">
                            <h3 className="font-semibold mb-1">Free</h3>
                            <div className="text-3xl font-bold mb-6">$0</div>
                            <ul className="space-y-3 text-sm text-neutral-500 mb-8">
                                <li>{"✓"} 2 sessions / month</li>
                                <li>{"✓"} 6 experts + judge</li>
                                <li>{"✓"} 3 adversarial rounds</li>
                                <li>{"✓"} Multi-language</li>
                                <li>{"✓"} Full verdict report</li>
                            </ul>
                            <a href="/login" className="block text-center border border-neutral-200 py-3 rounded-md text-sm font-medium hover:border-neutral-400 transition cursor-pointer">
                                Start free
                            </a>
                        </div>

                        <div className="bg-white p-8 rounded-xl border-2 border-neutral-900 relative">
                            <span className="absolute -top-3 left-8 bg-neutral-900 text-white text-xs px-3 py-1 rounded-full">
                                Most popular
                            </span>
                            <h3 className="font-semibold mb-1">Pro</h3>
                            <div className="text-3xl font-bold mb-6">
                                $29<span className="text-lg text-neutral-400 font-normal">/mo</span>
                            </div>
                            <ul className="space-y-3 text-sm text-neutral-500 mb-8">
                                <li>{"✓"} 100 sessions / month</li>
                                <li>{"✓"} Live debate streaming</li>
                                <li>{"✓"} Interject mid-debate</li>
                                <li>{"✓"} Full transcript export</li>
                                <li>{"✓"} GitHub integration</li>
                                <li>{"✓"} Priority support</li>
                            </ul>
                            <a href="/login" className="block text-center bg-neutral-900 text-white py-3 rounded-md text-sm font-medium hover:bg-neutral-800 transition cursor-pointer">
                                Start pro
                            </a>
                        </div>

                        <div className="bg-white p-8 rounded-xl border border-neutral-200">
                            <h3 className="font-semibold mb-1">Team</h3>
                            <div className="text-3xl font-bold mb-6">
                                $99<span className="text-lg text-neutral-400 font-normal">/mo</span>
                            </div>
                            <ul className="space-y-3 text-sm text-neutral-500 mb-8">
                                <li>{"✓"} 300 sessions / month</li>
                                <li>{"✓"} Overage: $0.30/session</li>
                                <li>{"✓"} Team collaboration</li>
                                <li>{"✓"} Custom personas</li>
                                <li>{"✓"} EU data sovereignty</li>
                                <li>{"✓"} API access</li>
                                <li>{"✓"} SSO + audit logs</li>
                            </ul>
                            <a className="block text-center border border-neutral-200 py-3 rounded-md text-sm font-medium hover:border-neutral-400 transition cursor-pointer">
                                Contact sales
                            </a>
                        </div>

                    </div>

                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-24 px-6 border-t border-neutral-100">
                <div className="max-w-2xl mx-auto text-center">

                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                        Stop guessing.<br />Start debating.
                    </h2>
                    <p className="text-neutral-500 text-lg mb-10">
                        Your next decision deserves more than one perspective.
                    </p>
                    <a href="/login" className="inline-block bg-neutral-900 text-white px-10 py-4 rounded-md text-base font-medium hover:bg-neutral-800 transition cursor-pointer">
                        Start your first session — free
                    </a>

                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-12 px-6 border-t border-neutral-100">
                <div className="max-w-5xl mx-auto">

                    {/* Top row */}
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">

                        {/* Company info */}
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
                                <span>🇵🇹</span>
                                <span>Av. Álvares Cabral 13, Lisboa, Portugal</span>
                            </div>
                            <p className="text-sm text-neutral-400">
                                <a href="mailto:help@ia4all.eu" className="hover:text-neutral-600 transition">
                                    help@ia4all.eu
                                </a>
                            </p>
                        </div>

                        {/* Links */}
                        <div className="flex gap-6 text-sm text-neutral-400">
                            <a href="/methodology" className="hover:text-neutral-600 transition">Methodology</a>
                            <a href="/privacy" className="hover:text-neutral-600 transition">Privacy</a>
                            <a href="/terms" className="hover:text-neutral-600 transition">Terms</a>
                            <a href="/pricing" className="hover:text-neutral-600 transition">Pricing</a>
                        </div>

                    </div>

                    {/* Bottom row */}
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

// --- Reusable Components ---

function FeatureCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
    return (
        <div className="bg-white p-6 rounded-xl border border-neutral-200 hover:border-neutral-300 transition">
            <div className="text-2xl mb-3">{icon}</div>
            <h3 className="font-semibold text-base mb-1">{title}</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">{desc}</p>
        </div>
    );
}

function CouncilCard({ color, emoji, name, desc }: { color: string; emoji: string; name: string; desc: string }) {
    return (
        <div className="p-6 rounded-xl border border-neutral-200 hover:border-neutral-300 transition">
            <div className={`w-3 h-3 rounded-full ${color} mb-4`} />
            <div className="text-xl mb-2">{emoji}</div>
            <h3 className="font-semibold text-base mb-1">{name}</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">{desc}</p>
        </div>
    );
}

function UseCaseCard({ title, desc }: { title: string; desc: string }) {
    return (
        <div className="bg-white p-6 rounded-xl border border-neutral-200 hover:border-neutral-300 transition">
            <h3 className="font-semibold text-base mb-2">{title}</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">{desc}</p>
        </div>
    );
}