import type { Metadata } from "next";
import { PricingCards } from "./PricingCards";

export const metadata: Metadata = {
    title: "Pricing — CouncilIA",
    description: "Simple, transparent pricing. Start free with 2 sessions, scale when ready.",
};

export default function PricingPage() {
    return (
        <main className="bg-white text-neutral-900 min-h-screen">
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-sm border-b border-neutral-100">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <a href="/" className="text-lg font-semibold tracking-tight">
                        Council<span className="text-neutral-400">IA</span>
                    </a>
                    <div className="hidden md:flex items-center gap-8 text-sm text-neutral-500">
                        <a href="/#how" className="hover:text-neutral-900 transition">How it works</a>
                        <a href="/methodology" className="hover:text-neutral-900 transition">Methodology</a>
                        <a href="/pricing" className="text-neutral-900 font-medium">Pricing</a>
                        <a href="/login" className="bg-neutral-900 text-white px-4 py-2 rounded-md text-sm hover:bg-neutral-800 transition">
                            Start a session
                        </a>
                    </div>
                </div>
            </nav>

            <section className="pt-32 pb-20 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                        Simple, transparent pricing
                    </h1>
                    <p className="text-lg text-neutral-500 mb-16 max-w-2xl mx-auto">
                        Start with 2 free sessions. Upgrade when your decisions need the full
                        power of 7 AI models debating in real-time.
                    </p>

                    <PricingCards />

                    <div className="mt-16 max-w-2xl mx-auto">
                        <h2 className="font-semibold text-lg mb-6">Every plan includes</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left text-sm">
                            <Feature text="7 different AI models per session" />
                            <Feature text="3-round adversarial debate" />
                            <Feature text="6 expert perspectives" />
                            <Feature text="Structured judicial verdict" />
                            <Feature text="Consensus score (0-100)" />
                            <Feature text="Multi-language support" />
                            <Feature text="EU data sovereignty routing" />
                            <Feature text="Actionable recommendations" />
                        </div>
                    </div>

                    <div className="mt-16 p-6 rounded-xl bg-neutral-50 border border-neutral-200 max-w-xl mx-auto text-left">
                        <h3 className="font-semibold mb-2">{"🔒"} Secure payments via Stripe</h3>
                        <p className="text-sm text-neutral-500 leading-relaxed">
                            All payments are processed by Stripe (PCI-DSS Level 1). We never see
                            or store your card details. Cancel anytime — no questions asked.
                            7-day refund policy for first-time subscribers.
                        </p>
                    </div>
                </div>
            </section>

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

function Feature({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-2 text-neutral-600">
            <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            {text}
        </div>
    );
}