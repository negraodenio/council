import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service — CouncilIA",
    description: "Terms governing the use of CouncilIA's Structured Debate Intelligence platform.",
};

export default function TermsPage() {
    return (
        <main className="bg-white text-neutral-900 min-h-screen">
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-sm border-b border-neutral-100">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <a href="/" className="text-lg font-semibold tracking-tight">
                        Council<span className="text-neutral-400">IA</span>
                    </a>
                    <a href="/login" className="bg-neutral-900 text-white px-4 py-2 rounded-md text-sm hover:bg-neutral-800 transition">
                        Start a session
                    </a>
                </div>
            </nav>

            <section className="pt-32 pb-20 px-6">
                <div className="max-w-3xl mx-auto">
                    <a href="/" className="text-sm text-neutral-400 hover:text-neutral-600 transition mb-6 inline-block">{"<-"} Back to home</a>
                    <h1 className="text-4xl font-bold tracking-tight mb-2">Terms of Service</h1>
                    <p className="text-neutral-400 mb-12">Last updated: January 2025</p>

                    <div className="prose prose-neutral max-w-none space-y-8 text-neutral-600 leading-relaxed">

                        <Section title="1. Acceptance">
                            <p>
                                By using CouncilIA ({'"'}the Service{'"'}), you agree to these terms.
                                If you disagree, do not use the Service.
                            </p>
                        </Section>

                        <Section title="2. What CouncilIA Is">
                            <p>
                                CouncilIA is an AI-powered decision-support tool that uses Structured Debate
                                Intelligence (ACP) — multiple AI models debating your ideas through adversarial
                                rounds. It provides analysis, not advice. It is not a substitute for
                                professional legal, financial, or medical counsel.
                            </p>
                        </Section>

                        <Section title="3. Accounts">
                            <ul className="list-disc ml-6 space-y-2">
                                <li>You must provide accurate information when creating an account.</li>
                                <li>You are responsible for maintaining account security.</li>
                                <li>One person per account. Shared accounts are not permitted.</li>
                                <li>You must be at least 18 years old to use the Service.</li>
                            </ul>
                        </Section>

                        <Section title="4. Subscriptions & Payments">
                            <ul className="list-disc ml-6 space-y-2">
                                <li><strong>Free tier:</strong> 2 sessions per month, no payment required.</li>
                                <li><strong>Paid plans:</strong> Billed monthly via Stripe. Prices shown at checkout.</li>
                                <li><strong>Cancellation:</strong> Cancel anytime from your dashboard. Access continues until the end of the billing period.</li>
                                <li><strong>Refunds:</strong> We offer a 7-day refund policy for first-time subscribers. Contact support@council-ia.com.</li>
                                <li><strong>Price changes:</strong> We will notify you 30 days before any price increase.</li>
                            </ul>
                        </Section>

                        <Section title="5. Acceptable Use">
                            <p>You may NOT use CouncilIA to:</p>
                            <ul className="list-disc ml-6 space-y-2">
                                <li>Generate content that is illegal, harmful, or violates third-party rights.</li>
                                <li>Attempt to extract, reverse-engineer, or replicate the ACP Protocol.</li>
                                <li>Submit prompts containing personal data of third parties without consent.</li>
                                <li>Abuse the API or attempt to circumvent usage limits.</li>
                                <li>Resell access or share session outputs commercially without attribution.</li>
                            </ul>
                        </Section>

                        <Section title="6. Intellectual Property">
                            <ul className="list-disc ml-6 space-y-2">
                                <li><strong>Your prompts:</strong> You own them. We do not claim ownership.</li>
                                <li><strong>AI-generated outputs:</strong> Session transcripts and reports are licensed to you for personal and commercial use.</li>
                                <li><strong>The ACP Protocol:</strong> The methodology, prompts, conflict matrix, and debate architecture are proprietary to CouncilIA.</li>
                                <li><strong>The CouncilIA brand:</strong> Name, logo, and design are trademarks of CouncilIA Lda.</li>
                            </ul>
                        </Section>

                        <Section title="7. AI Disclaimer">
                            <p>
                                <strong>CouncilIA uses AI models that can produce inaccurate, biased, or
                                    fabricated information.</strong> All outputs should be independently verified
                                before making business, financial, legal, or personal decisions.
                            </p>
                            <p>
                                We do not guarantee the accuracy, completeness, or reliability of any
                                AI-generated content. The ACP Protocol reduces but does not eliminate
                                AI limitations.
                            </p>
                        </Section>

                        <Section title="8. Limitation of Liability">
                            <p>
                                To the maximum extent permitted by law, CouncilIA Lda. shall not be
                                liable for any indirect, incidental, special, or consequential damages
                                arising from your use of the Service. Our total liability is limited
                                to the amount you paid in the 12 months preceding the claim.
                            </p>
                        </Section>

                        <Section title="9. Service Availability">
                            <p>
                                We aim for high availability but do not guarantee uninterrupted service.
                                We depend on third-party AI providers (OpenAI, Google, DeepSeek, etc.)
                                whose availability is outside our control. Scheduled maintenance will
                                be communicated in advance when possible.
                            </p>
                        </Section>

                        <Section title="10. Termination">
                            <p>
                                We may suspend or terminate accounts that violate these terms.
                                You may delete your account at any time. Upon termination, your
                                data will be deleted per our Privacy Policy.
                            </p>
                        </Section>

                        <Section title="11. Governing Law">
                            <p>
                                These terms are governed by the laws of Portugal and the European Union.
                                Disputes shall be resolved in the courts of Lisbon, Portugal.
                            </p>
                        </Section>

                        <Section title="12. Contact">
                            <p>Questions about these terms: <strong>legal@council-ia.com</strong></p>
                        </Section>

                    </div>
                </div>
            </section>

            <footer className="py-12 px-6 border-t border-neutral-100">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <span className="text-sm text-neutral-400">© 2025 CouncilIA</span>
                    <div className="flex gap-6 text-sm text-neutral-400">
                        <a href="/methodology" className="hover:text-neutral-600 transition cursor-pointer">Methodology</a>
                        <a href="/privacy" className="hover:text-neutral-600 transition cursor-pointer">Privacy</a>
                        <a href="/terms" className="hover:text-neutral-600 transition cursor-pointer">Terms</a>
                        <a href="/pricing" className="hover:text-neutral-600 transition cursor-pointer">Pricing</a>
                    </div>
                </div>
            </footer>
        </main>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div>
            <h2 className="text-xl font-bold text-neutral-900 mb-3">{title}</h2>
            <div className="space-y-3">{children}</div>
        </div>
    );
}