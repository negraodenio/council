'use client';

import Link from 'next/link';

export function Footer() {
    return (
        <footer className="py-12 px-6 border-t border-neutral-100 bg-white">
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

                    {/* Links - Unified Order with Header */}
                    <div className="flex gap-6 text-sm text-neutral-400">
                        <Link href="/pricing" className="hover:text-neutral-600 transition font-medium">Pricing</Link>
                        <Link href="/methodology" className="hover:text-neutral-600 transition font-medium">Methodology</Link>
                        <Link href="/privacy" className="hover:text-neutral-600 transition">Privacy</Link>
                        <Link href="/terms" className="hover:text-neutral-600 transition">Terms</Link>
                    </div>
                </div>

                {/* Bottom row */}
                <div className="border-t border-neutral-100 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <span className="text-xs text-neutral-400">
                        © 2025 CouncilIA — EU-first, GDPR-ready
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
    );
}
