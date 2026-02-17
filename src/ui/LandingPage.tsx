'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
    const router = useRouter();
    const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

    const features = [
        {
            icon: '🏛️',
            title: 'AI Council Debate',
            description: 'Multiple AI personas debate your ideas from different perspectives'
        },
        {
            icon: '⚖️',
            title: 'Unbiased Validation',
            description: 'Get objective analysis through structured multi-agent deliberation'
        },
        {
            icon: '🔒',
            title: 'EU-First Privacy',
            description: 'Data sovereignty with policy-controlled retention and audit trails'
        },
        {
            icon: '⚡',
            title: 'Instant Insights',
            description: 'Real-time collaborative intelligence for critical decisions'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-lg border-b border-purple-500/20">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="text-2xl">🏛️</div>
                        <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            CouncilIA
                        </span>
                    </div>
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => router.push('/marketplace')}
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            Marketplace
                        </button>
                        <button
                            onClick={() => router.push('/login')}
                            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-block mb-4 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full">
                            <span className="text-purple-300 text-sm font-medium">
                                🚀 AI-Powered Decision Intelligence
                            </span>
                        </div>
                        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent leading-tight">
                            Validate Your Ideas<br />
                            Through AI Debate
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                            CouncilIA brings together multiple AI personas to debate, challenge, and validate your ideas.
                            Get unbiased insights through structured multi-agent deliberation.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button
                                onClick={() => router.push('/dashboard')}
                                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105"
                            >
                                Start Free Session →
                            </button>
                            <button
                                onClick={() => router.push('/marketplace')}
                                className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
                            >
                                Explore Templates
                            </button>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                onMouseEnter={() => setHoveredFeature(index)}
                                onMouseLeave={() => setHoveredFeature(null)}
                                className={`p-6 rounded-2xl border transition-all duration-300 ${hoveredFeature === index
                                        ? 'bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border-purple-500/50 shadow-xl shadow-purple-500/20 transform scale-105'
                                        : 'bg-white/5 border-white/10'
                                    }`}
                            >
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* How It Works */}
                    <div className="mt-32 text-center">
                        <h2 className="text-4xl font-bold mb-4 text-white">How It Works</h2>
                        <p className="text-gray-400 mb-16 max-w-2xl mx-auto">
                            Three simple steps to get unbiased AI-powered validation
                        </p>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { step: '01', title: 'Describe Your Idea', desc: 'Share your concept, decision, or proposal' },
                                { step: '02', title: 'AI Council Debates', desc: 'Multiple personas analyze from different angles' },
                                { step: '03', title: 'Get Synthesis', desc: 'Receive balanced judgment and actionable insights' }
                            ].map((item, i) => (
                                <div key={i} className="relative">
                                    <div className="text-6xl font-bold text-purple-500/20 mb-4">{item.step}</div>
                                    <h3 className="text-2xl font-bold mb-2 text-white">{item.title}</h3>
                                    <p className="text-gray-400">{item.desc}</p>
                                    {i < 2 && (
                                        <div className="hidden md:block absolute top-12 -right-4 text-purple-500/30 text-4xl">
                                            →
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="mt-32 p-12 rounded-3xl bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/30 text-center">
                        <h2 className="text-4xl font-bold mb-4 text-white">Ready to Validate Your Ideas?</h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Join hundreds of decision-makers using AI-powered deliberation
                        </p>
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="px-10 py-5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-bold text-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105"
                        >
                            Start Your First Session →
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-white/10 py-8 px-6">
                <div className="max-w-7xl mx-auto text-center text-gray-500">
                    <p>© 2026 CouncilIA. Built with AI-powered multi-agent intelligence.</p>
                </div>
            </footer>
        </div>
    );
}
