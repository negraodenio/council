import Link from 'next/link';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header */}
            <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
                            <span className="text-white font-bold">C</span>
                        </div>
                        <span className="text-xl font-bold text-slate-900">CouncilIA</span>
                    </div>

                    <nav className="hidden md:flex items-center gap-6">
                        <a href="#features" className="text-slate-600 hover:text-slate-900">Features</a>
                        <a href="#pricing" className="text-slate-600 hover:text-slate-900">Pricing</a>
                        <a href="#demo" className="text-slate-600 hover:text-slate-900">Demo</a>
                    </nav>

                    <Link
                        href="/login"
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
                    >
                        Get Started
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <section className="max-w-6xl mx-auto px-6 py-20 md:py-32">
                <div className="text-center max-w-3xl mx-auto">
                    <div className="inline-block mb-4 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        ✨ AI-Powered Code Review
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                        4 AI Agents Debate
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
                            Before You Commit
                        </span>
                    </h1>

                    <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                        CouncilIA simulates a council of expert AI personas—Advocate, Skeptic, Architect, Optimizer—to validate your code with live debate and automated GitHub PRs.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/login"
                            className="px-8 py-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition font-semibold text-lg shadow-lg hover:shadow-xl"
                        >
                            Start Free Session →
                        </Link>
                        <a
                            href="#demo"
                            className="px-8 py-4 bg-white text-slate-900 rounded-xl hover:bg-slate-50 transition font-semibold text-lg border border-slate-200"
                        >
                            Watch Demo
                        </a>
                    </div>

                    <p className="mt-4 text-sm text-slate-500">
                        🎁 First 100 users get Pro free for 3 months • No credit card required
                    </p>
                </div>
            </section>

            {/* Social Proof */}
            <section className="max-w-6xl mx-auto px-6 pb-20">
                <div className="bg-white rounded-2xl shadow-sm p-8 border border-slate-200">
                    <p className="text-center text-slate-500 text-sm mb-6">TRUSTED BY DEVELOPERS AT</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
                        <span className="text-2xl font-bold text-slate-400">YourCompany</span>
                        <span className="text-2xl font-bold text-slate-400">StartupCo</span>
                        <span className="text-2xl font-bold text-slate-400">TechCorp</span>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="max-w-6xl mx-auto px-6 py-20 bg-white">
                <h2 className="text-4xl font-bold text-center text-slate-900 mb-4">
                    How It Works
                </h2>
                <p className="text-center text-slate-600 mb-16 max-w-2xl mx-auto">
                    Three-step AI validation with live debate, RAG-enhanced synthesis, and automated GitHub integration.
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: '💬',
                            title: '1. Live AI Debate',
                            desc: '4 personas debate your code in real-time: Advocate validates, Skeptic challenges, Architect refines structure, Optimizer boosts performance.'
                        },
                        {
                            icon: '⚖️',
                            title: '2. Judge Synthesizes',
                            desc: 'A Judge agent analyzes debate using RAG on your repo context, producing a consensus report with actionable recommendations.'
                        },
                        {
                            icon: '🚀',
                            title: '3. Auto GitHub PR',
                            desc: 'One click opens a PR with validated code, debate summary, and compliance audit trail—ready to merge.'
                        }
                    ].map((feature, i) => (
                        <div key={i} className="p-6 rounded-xl border border-slate-200 hover:border-purple-300 hover:shadow-lg transition">
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                            <p className="text-slate-600">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="max-w-6xl mx-auto px-6 py-20">
                <h2 className="text-4xl font-bold text-center text-slate-900 mb-4">
                    Simple Pricing
                </h2>
                <p className="text-center text-slate-600 mb-16">
                    Start free, upgrade as you scale. No hidden fees.
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { name: 'Free', price: '$0', sessions: '5 sessions/month', repos: '1 repo', support: 'Community' },
                        { name: 'Pro', price: '$29', sessions: '100 sessions/month', repos: 'Unlimited repos', support: 'Priority', highlight: true },
                        { name: 'Team', price: '$99', sessions: 'Unlimited sessions', repos: 'SSO + Audit logs', support: 'Dedicated' }
                    ].map((plan, i) => (
                        <div
                            key={i}
                            className={`p-8 rounded-xl border ${plan.highlight ? 'border-purple-600 shadow-xl scale-105' : 'border-slate-200'} bg-white`}
                        >
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                            <div className="text-4xl font-bold text-slate-900 mb-6">
                                {plan.price}<span className="text-lg text-slate-500">/mo</span>
                            </div>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600">✓</span>
                                    <span className="text-slate-600">{plan.sessions}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600">✓</span>
                                    <span className="text-slate-600">{plan.repos}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600">✓</span>
                                    <span className="text-slate-600">{plan.support} support</span>
                                </li>
                            </ul>
                            <Link
                                href="/login"
                                className={`block text-center px-6 py-3 rounded-lg font-semibold transition ${plan.highlight
                                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                                        : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                                    }`}
                            >
                                Start {plan.name}
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-4xl mx-auto px-6 py-20">
                <div className="bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl p-12 text-center text-white">
                    <h2 className="text-4xl font-bold mb-4">Ready to Ship Better Code?</h2>
                    <p className="text-xl opacity-90 mb-8">
                        Join 100+ developers using AI councils to validate every commit.
                    </p>
                    <Link
                        href="/login"
                        className="inline-block px-8 py-4 bg-white text-purple-600 rounded-xl hover:bg-slate-100 transition font-semibold text-lg shadow-lg"
                    >
                        Start Free Session →
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t bg-white">
                <div className="max-w-6xl mx-auto px-6 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded bg-gradient-to-br from-purple-600 to-blue-500" />
                            <span className="font-bold text-slate-900">CouncilIA</span>
                        </div>
                        <div className="flex gap-6 text-sm text-slate-600">
                            <a href="#" className="hover:text-slate-900">Privacy</a>
                            <a href="#" className="hover:text-slate-900">Terms</a>
                            <a href="#" className="hover:text-slate-900">Docs</a>
                            <a href="https://github.com/negraodenio/council" className="hover:text-slate-900">GitHub</a>
                        </div>
                        <p className="text-sm text-slate-500">© 2026 CouncilIA. EU-first, GDPR-ready.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
