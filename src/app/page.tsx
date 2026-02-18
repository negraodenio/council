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
                        <a href="#usecases" className="hover:text-neutral-900 transition">Use cases</a>
                        <a href="#pricing" className="hover:text-neutral-900 transition">Pricing</a>
                        <a
                            href="#start"
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

                    <p className="text-sm text-neutral-400 uppercase tracking-widest mb-6">
                        Multi-agent AI deliberation
                    </p>

                    <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-8">
                        One AI agrees with you.
                        <br />
                        <span className="text-neutral-300">Four won't.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto mb-12 leading-relaxed">
                        Submit any idea, decision, or strategy. Four AI agents
                        with opposing perspectives debate it live. A fifth
                        arbitrates and delivers the verdict.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="#start"
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

            {/* DEBATE VISUAL — NÃO É DIAGRAM GENÉRICO */}
            <section className="py-24 px-6 border-t border-neutral-100">
                <div className="max-w-5xl mx-auto">

                    <div className="bg-neutral-950 rounded-2xl p-8 md:p-12 text-white font-mono text-sm overflow-hidden">

                        <div className="text-neutral-500 mb-6">
                            session #0847 — "Should we migrate to microservices?"
                        </div>

                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <span className="text-emerald-400 shrink-0">advocate</span>
                                <span className="text-neutral-300">
                                    Microservices enable independent deployment. Team velocity
                                    increases 3x after migration based on DORA metrics.
                                </span>
                            </div>

                            <div className="flex gap-3">
                                <span className="text-red-400 shrink-0">skeptic&nbsp;&nbsp;</span>
                                <span className="text-neutral-300">
                                    Your team has 4 engineers. You'll spend 18 months on
                                    infrastructure instead of product. Netflix needed it. You don't.
                                </span>
                            </div>

                            <div className="flex gap-3">
                                <span className="text-blue-400 shrink-0">architect</span>
                                <span className="text-neutral-300">
                                    Modular monolith gives you 80% of the benefit with 20% of
                                    the cost. Extract services only when bottlenecks emerge.
                                </span>
                            </div>

                            <div className="flex gap-3">
                                <span className="text-amber-400 shrink-0">optimizer</span>
                                <span className="text-neutral-300">
                                    Current deploy takes 45min. A build pipeline fix gets you
                                    to 4min. That solves the real pain without architecture risk.
                                </span>
                            </div>

                            <div className="border-t border-neutral-700 pt-4 mt-6">
                                <div className="flex gap-3">
                                    <span className="text-white shrink-0">verdict&nbsp;&nbsp;</span>
                                    <span className="text-neutral-100">
                                        <strong>Don't migrate.</strong> Implement modular monolith pattern.
                                        Fix build pipeline first. Reassess at 15 engineers.
                                        <span className="text-neutral-500"> Confidence: 87%</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>

                    <p className="text-center text-sm text-neutral-400 mt-6">
                        Real session output. Unedited.
                    </p>

                </div>
            </section>

            {/* COMO FUNCIONA */}
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
                                An idea, a piece of code, a business decision, a strategy.
                                Anything you need pressure-tested.
                            </p>
                        </div>

                        <div>
                            <div className="text-4xl font-bold text-neutral-200 mb-4">02</div>
                            <h3 className="text-lg font-semibold mb-2">Four agents debate</h3>
                            <p className="text-neutral-500 leading-relaxed">
                                Advocate defends. Skeptic attacks. Architect restructures.
                                Optimizer simplifies. They argue until every angle is covered.
                            </p>
                        </div>

                        <div>
                            <div className="text-4xl font-bold text-neutral-200 mb-4">03</div>
                            <h3 className="text-lg font-semibold mb-2">Judge delivers verdict</h3>
                            <p className="text-neutral-500 leading-relaxed">
                                Claude or GPT-4 reads the full debate, weighs the arguments,
                                and gives you a reasoned verdict with confidence score.
                            </p>
                        </div>

                    </div>

                </div>
            </section>

            {/* USE CASES */}
            <section id="usecases" className="py-24 px-6 bg-neutral-50 border-t border-neutral-100">
                <div className="max-w-4xl mx-auto">

                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-center">
                        Debate anything
                    </h2>
                    <p className="text-neutral-500 text-center mb-16 text-lg">
                        Not just code. Any decision that matters.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">

                        <div className="bg-white p-8 rounded-xl border border-neutral-200">
                            <h3 className="font-semibold text-lg mb-2">Code & Architecture</h3>
                            <p className="text-neutral-500 text-sm leading-relaxed">
                                "Is this production-ready?" — Get security, performance,
                                readability, and maintainability perspectives before shipping.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl border border-neutral-200">
                            <h3 className="font-semibold text-lg mb-2">Business Decisions</h3>
                            <p className="text-neutral-500 text-sm leading-relaxed">
                                "Should we enter the European market?" — Market analysis,
                                risk assessment, financial modeling, timing evaluation.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl border border-neutral-200">
                            <h3 className="font-semibold text-lg mb-2">Startup Validation</h3>
                            <p className="text-neutral-500 text-sm leading-relaxed">
                                "Is this idea viable?" — Business model stress-test,
                                competitor analysis, market fit, unit economics.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl border border-neutral-200">
                            <h3 className="font-semibold text-lg mb-2">Strategy & Planning</h3>
                            <p className="text-neutral-500 text-sm leading-relaxed">
                                "Hire or outsource?" — Cost analysis, quality trade-offs,
                                timeline impact, long-term implications.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl border border-neutral-200">
                            <h3 className="font-semibold text-lg mb-2">Content & Marketing</h3>
                            <p className="text-neutral-500 text-sm leading-relaxed">
                                "Which positioning wins?" — Brand voice, audience fit,
                                competitive differentiation, messaging clarity.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl border border-neutral-200">
                            <h3 className="font-semibold text-lg mb-2">Legal & Compliance</h3>
                            <p className="text-neutral-500 text-sm leading-relaxed">
                                "Are we GDPR compliant?" — Risk vectors, data flow analysis,
                                remediation priorities, compliance gaps.
                            </p>
                        </div>

                    </div>

                </div>
            </section>

            {/* OS AGENTES */}
            <section className="py-24 px-6 border-t border-neutral-100">
                <div className="max-w-4xl mx-auto">

                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-16 text-center">
                        The council
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">

                        <div className="p-8 rounded-xl border border-neutral-200">
                            <div className="w-3 h-3 rounded-full bg-emerald-500 mb-4"></div>
                            <h3 className="font-semibold text-lg mb-1">The Advocate</h3>
                            <p className="text-neutral-500 text-sm leading-relaxed">
                                Finds every reason it works. Identifies strengths,
                                opportunities, and potential you might be undervaluing.
                                Builds the strongest case for.
                            </p>
                        </div>

                        <div className="p-8 rounded-xl border border-neutral-200">
                            <div className="w-3 h-3 rounded-full bg-red-500 mb-4"></div>
                            <h3 className="font-semibold text-lg mb-1">The Skeptic</h3>
                            <p className="text-neutral-500 text-sm leading-relaxed">
                                Finds every reason it breaks. Edge cases, market risks,
                                technical debt, hidden costs. The critic you need but
                                don't want to hear.
                            </p>
                        </div>

                        <div className="p-8 rounded-xl border border-neutral-200">
                            <div className="w-3 h-3 rounded-full bg-blue-500 mb-4"></div>
                            <h3 className="font-semibold text-lg mb-1">The Architect</h3>
                            <p className="text-neutral-500 text-sm leading-relaxed">
                                Thinks in systems. Restructures your approach for scale,
                                maintainability, and long-term sustainability. Sees the
                                big picture you're missing.
                            </p>
                        </div>

                        <div className="p-8 rounded-xl border border-neutral-200">
                            <div className="w-3 h-3 rounded-full bg-amber-500 mb-4"></div>
                            <h3 className="font-semibold text-lg mb-1">The Optimizer</h3>
                            <p className="text-neutral-500 text-sm leading-relaxed">
                                Cuts the fat. Makes it faster, cheaper, simpler.
                                Questions every complexity. If there's a shortcut
                                that doesn't sacrifice quality, this agent finds it.
                            </p>
                        </div>

                    </div>

                    <div className="mt-8 p-8 rounded-xl bg-neutral-950 text-white text-center">
                        <div className="w-3 h-3 rounded-full bg-white mx-auto mb-4"></div>
                        <h3 className="font-semibold text-lg mb-1">The Judge</h3>
                        <p className="text-neutral-400 text-sm leading-relaxed max-w-lg mx-auto">
                            Claude or GPT-4. Reads the entire debate. Weighs every argument.
                            Delivers the final verdict with confidence score, key trade-offs,
                            and actionable next steps.
                        </p>
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
                                <li>5 sessions / month</li>
                                <li>4 agents + judge</li>
                                <li>Basic verdict report</li>
                                <li>Community support</li>
                            </ul>
                            <a className="block text-center border border-neutral-200 py-3 rounded-md text-sm font-medium hover:border-neutral-400 transition cursor-pointer">
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
                                <li>100 sessions / month</li>
                                <li>Choose your judge model</li>
                                <li>Full debate transcript</li>
                                <li>Export reports (PDF, MD)</li>
                                <li>GitHub integration</li>
                                <li>Priority support</li>
                            </ul>
                            <a className="block text-center bg-neutral-900 text-white py-3 rounded-md text-sm font-medium hover:bg-neutral-800 transition cursor-pointer">
                                Start pro
                            </a>
                        </div>

                        <div className="bg-white p-8 rounded-xl border border-neutral-200">
                            <h3 className="font-semibold mb-1">Team</h3>
                            <div className="text-3xl font-bold mb-6">
                                $99<span className="text-lg text-neutral-400 font-normal">/mo</span>
                            </div>
                            <ul className="space-y-3 text-sm text-neutral-500 mb-8">
                                <li>Unlimited sessions</li>
                                <li>Team collaboration</li>
                                <li>Custom agent personas</li>
                                <li>API access</li>
                                <li>SSO + audit logs</li>
                                <li>Dedicated support</li>
                            </ul>
                            <a className="block text-center border border-neutral-200 py-3 rounded-md text-sm font-medium hover:border-neutral-400 transition cursor-pointer">
                                Contact sales
                            </a>
                        </div>

                    </div>

                </div>
            </section>

            {/* CTA FINAL */}
            <section id="start" className="py-24 px-6 border-t border-neutral-100">
                <div className="max-w-2xl mx-auto text-center">

                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                        Stop guessing.<br />Start debating.
                    </h2>
                    <p className="text-neutral-500 text-lg mb-10">
                        Your next decision deserves more than one perspective.
                    </p>
                    <a className="inline-block bg-neutral-900 text-white px-10 py-4 rounded-md text-base font-medium hover:bg-neutral-800 transition cursor-pointer">
                        Start your first session — free
                    </a>

                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-12 px-6 border-t border-neutral-100">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <span className="text-sm text-neutral-400">
                        © 2025 CouncilIA — EU-first, GDPR-ready
                    </span>
                    <div className="flex gap-6 text-sm text-neutral-400">
                        <a className="hover:text-neutral-600 transition">Privacy</a>
                        <a className="hover:text-neutral-600 transition">Terms</a>
                        <a className="hover:text-neutral-600 transition">Docs</a>
                        <a className="hover:text-neutral-600 transition">GitHub</a>
                    </div>
                </div>
            </footer>

        </main>
    )
}
