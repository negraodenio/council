"use client";

import { useState } from "react";

const plans = [
    {
        name: "Free",
        price: "0",
        period: "",
        description: "Try the ACP Protocol",
        features: [
            "2 sessions / month",
            "All 7 AI models",
            "3-round debate",
            "Basic report",
        ],
        cta: "Get started",
        href: "/login",
        highlighted: false,
        priceId: null,
    },
    {
        name: "Pro",
        price: "29",
        period: "/month",
        description: "For founders & consultants",
        features: [
            "30 sessions / month",
            "All 7 AI models",
            "3-round debate",
            "Full PDF reports",
            "Score evolution charts",
            "Priority processing",
        ],
        cta: "Start Pro",
        href: null,
        highlighted: true,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || null,
    },
    {
        name: "Team",
        price: "99",
        period: "/month",
        description: "For teams & agencies",
        features: [
            "Unlimited sessions",
            "All 7 AI models",
            "3-round debate",
            "Full PDF reports",
            "Score evolution charts",
            "Priority processing",
            "Team sharing (up to 5)",
            "API access",
            "GitHub integration",
        ],
        cta: "Start Team",
        href: null,
        highlighted: false,
        priceId: process.env.NEXT_PUBLIC_STRIPE_TEAM_PRICE_ID || null,
    },
];

export function PricingCards() {
    const [loading, setLoading] = useState<string | null>(null);

    async function handleCheckout(priceId: string, planName: string) {
        setLoading(planName);
        try {
            const res = await fetch("/api/stripe/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ priceId }),
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert(data.error || "Something went wrong.");
            }
        } catch {
            alert("Something went wrong.");
        } finally {
            setLoading(null);
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {plans.map((plan) => (
                <div
                    key={plan.name}
                    className={`rounded-2xl p-8 text-left flex flex-col ${
                        plan.highlighted
                            ? "border-2 border-neutral-900 shadow-lg relative"
                            : "border border-neutral-200"
                    }`}
                >
                    {plan.highlighted && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-xs px-4 py-1 rounded-full">
                            Most popular
                        </span>
                    )}

                    <h3 className="font-bold text-lg mb-1">{plan.name}</h3>
                    <p className="text-sm text-neutral-400 mb-4">{plan.description}</p>

                    <div className="mb-6">
                        <span className="text-4xl font-bold">{"\u20AC"}{plan.price}</span>
                        <span className="text-neutral-400 text-sm">{plan.period}</span>
                    </div>

                    <ul className="space-y-3 mb-8 flex-1">
                        {plan.features.map((f) => (
                            <li key={f} className="flex items-center gap-2 text-sm text-neutral-600">
                                <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                {f}
                            </li>
                        ))}
                    </ul>

                    {plan.href ? (
                        <a
                            href={plan.href}
                            className={`block text-center py-3 rounded-lg text-sm font-medium transition ${
                                plan.highlighted
                                    ? "bg-neutral-900 text-white hover:bg-neutral-800"
                                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                            }`}
                        >
                            {plan.cta}
                        </a>
                    ) : (
                        <button
                            onClick={() => plan.priceId && handleCheckout(plan.priceId, plan.name)}
                            disabled={loading === plan.name || !plan.priceId}
                            className={`block w-full text-center py-3 rounded-lg text-sm font-medium transition disabled:opacity-50 ${
                                plan.highlighted
                                    ? "bg-neutral-900 text-white hover:bg-neutral-800"
                                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                            }`}
                        >
                            {loading === plan.name ? "Redirecting..." : plan.priceId ? plan.cta : "Coming soon"}
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}