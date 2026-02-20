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

                    {/* Social Proof */}
                    <div className="mt-20 py-8 border-y border-neutral-100">
                        <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-8">
                            Used by 200+ founders & strategists
                        </p>
                        <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 grayscale opacity-50">
                            {/* SVG Logos would go here, using placeholders for now */}
                            <div className="font-bold text-neutral-900 text-xl tracking-tighter italic">LINDOS</div>
                            <div className="font-extrabold text-neutral-900 text-xl tracking-tight">KREATIVE</div>
                            <div className="font-black text-neutral-900 text-xl">SDR.ai</div>
                            <div className="font-bold text-neutral-900 text-xl tracking-widest">QUARTZ</div>
                        </div>
                    </div>

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

                    {/* TRANSPARENT PRICING */}
                    <div className="mt-24 max-w-2xl mx-auto text-left">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold tracking-tight mb-4">Why this price?</h2>
                            <p className="text-neutral-500">Continuous innovation isn{"'"}t free. Here{"'"}s how it works.</p>
                        </div>

                        <div className="bg-white rounded-3xl border border-neutral-100 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                            <div className="p-10 border-b border-neutral-50">
                                <h3 className="font-semibold mb-6 text-neutral-400 uppercase text-[10px] tracking-[0.2em]">Real cost per session</h3>
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center text-sm">
                                        <div className="flex flex-col">
                                            <span className="text-neutral-900 font-medium">6 Experts (Multi-Model)</span>
                                            <span className="text-neutral-400 text-xs text-[10px]">DeepSeek, Qwen, Mistral, Llama, Kimi, Gemini</span>
                                        </div>
                                        <span className="font-mono text-neutral-900">~€0.06</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <div className="flex flex-col">
                                            <span className="text-neutral-900 font-medium">1 Head Judge</span>
                                            <span className="text-neutral-400 text-xs text-[10px]">GPT-4o 2024-08-06 (Latest)</span>
                                        </div>
                                        <span className="font-mono text-neutral-900">~€0.05</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <div className="flex flex-col">
                                            <span className="text-neutral-900 font-medium">EU Infrastructure</span>
                                            <span className="text-neutral-400 text-xs text-[10px]">Sovereign routing & Zero Data Retention</span>
                                        </div>
                                        <span className="font-mono text-neutral-900">~€0.01</span>
                                    </div>
                                    <div className="pt-6 border-t border-neutral-50 flex justify-between items-center">
                                        <span className="font-bold text-lg">Total Baseline AI Cost</span>
                                        <span className="font-mono font-bold text-lg text-emerald-600">~€0.12</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-10 bg-neutral-50/50">
                                <h3 className="font-semibold mb-6 text-neutral-400 uppercase text-[10px] tracking-[0.2em]">Pro Efficiency (€0.97/session)</h3>
                                <div className="space-y-4 text-sm leading-relaxed">
                                    <p className="text-neutral-600">{"·"} <span className="font-mono text-neutral-900 font-semibold">~€0.12</span> → Direct AI compute pass-through.</p>
                                    <p className="text-neutral-600">{"·"} <span className="font-mono text-neutral-900 font-semibold">~€0.85</span> → Used for continuous R&D, human support, and infrastructure maintenance.</p>
                                </div>
                                <div className="mt-8 flex items-center justify-between p-4 bg-white rounded-2xl border border-neutral-100">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">🛡️</span>
                                        <p className="text-xs text-neutral-500 font-medium">No hidden fees. No massive markups.</p>
                                    </div>
                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-neutral-900 text-white rounded-full scale-90 origin-right">
                                        <span className="text-[10px] font-bold uppercase tracking-wider">7-DAY REFUND</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="mt-24 max-w-2xl mx-auto text-left">
                        <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Frequently Asked Questions</h2>
                        <div className="space-y-8">
                            <FAQItem
                                q="What counts as 1 session?"
                                a="A session is a full debate loop: Language detection + 6 experts (Round 1) + Adversarial challenge (Round 2) + Defense/Synthesis (Round 3) + Final Judicial Verdict. It includes all AI model calls involved."
                            />
                            <FAQItem
                                q="Is my data used for training?"
                                a="No. We use Zero Data Retention (ZDR) APIs for all EU-sensitive routing. Your ideas and debates remain yours and are never used to train future AI models."
                            />
                            <FAQItem
                                q="What happens if I run out of sessions?"
                                a="On the Pro plan, you can purchase additional session packs. On the Team plan, overage is automatically billed at €0.30/session at the end of the month."
                            />
                            <FAQItem
                                q="Can I cancel anytime?"
                                a="Yes. You can cancel your subscription with one click through our Stripe Customer Portal. You will keep access until the end of your billing period."
                            />
                        </div>
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

function FAQItem({ q, a }: { q: string; a: string }) {
    return (
        <div className="border-b border-neutral-100 pb-6">
            <h4 className="font-semibold text-neutral-900 mb-2">{q}</h4>
            <p className="text-sm text-neutral-500 leading-relaxed">{a}</p>
        </div>
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