import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Methodology — ACP Protocol™ Official",
    description: "The official Adversarial Consensus Protocol (ACP) Protocol — a physics-based AI Governance Runtime (ACP_OS) for Human-AI reasoning.",
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
                        {"<-"} Back to home
                    </a>
                    <div className="flex flex-wrap gap-3 mb-6">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 text-neutral-500 text-sm">
                            ACP_OS v2.3
                        </span>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 text-neutral-500 text-sm">
                            S-ISA / Logicware
                        </span>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 text-neutral-500 text-sm">
                            Ec = I * S²
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                        Methodology
                    </h1>
                    <p className="text-lg text-neutral-500 leading-relaxed">
                        The ACP Protocol™ is the official operating system for governed thought.
                        It virtualizes a relativistic logic manifold where reasoning is treated as
                        measurable thermodynamic work. By applying the <strong>Structure Squared (S²)</strong>
                        constant, the system transforms stochastic token-fog into irreversible
                        Cognitive Joules (Jc).
                    </p>
                </div>
            </section>

            {/* TABLE OF CONTENTS */}
            <section className="px-6 pb-16">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
                        <h3 className="font-semibold text-sm text-neutral-400 uppercase tracking-wider mb-4">Contents</h3>
                        <ol className="space-y-2 text-sm">
                            <li><a href="#formula" className="text-neutral-600 hover:text-neutral-900 transition">1. The Genesis Equation (Ec = I * S²)</a></li>
                            <li><a href="#phases" className="text-neutral-600 hover:text-neutral-900 transition">2. The 5 Phases of ACP_OS</a></li>
                            <li><a href="#scientific" className="text-neutral-600 hover:text-neutral-900 transition">3. Scientific Lineage</a></li>
                            <li><a href="#archetypes" className="text-neutral-600 hover:text-neutral-900 transition">4. Cognitive Processing Nodes</a></li>
                            <li><a href="#models" className="text-neutral-600 hover:text-neutral-900 transition">5. Model Diversity {"&"} Assignment</a></li>
                            <li><a href="#output" className="text-neutral-600 hover:text-reveal-900 transition">6. Output: Cognitive Joules (Jc)</a></li>
                        </ol>
                    </div>
                </div>
            </section>

            {/* 1. THE GENESIS EQUATION */}
            <section id="formula" className="py-16 px-6 border-t border-neutral-100">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6">1. The Genesis Equation (Ec = I * S²)</h2>
                    <div className="space-y-4 text-neutral-600 leading-relaxed">
                        <p>
                            At the core of the ACP Protocol™ is a governing physical law for artificial intelligence:
                            <strong> Ec = I * S²</strong>. This equation defines the thermodynamic integrity of
                            a decision process.
                        </p>
                        <ul className="space-y-3 list-disc pl-5 text-sm">
                            <li><strong>Ec (Cognitive Energy):</strong> The total work performed by the system to reach resolution.</li>
                            <li><strong>I (Inference Mass):</strong> The summed probability of candidate tokens within the attention window.</li>
                            <li><strong>S² (Structure Squared):</strong> The quadratic energy barrier that filters stochastic noise.</li>
                        </ul>
                        <p>
                            Without Structure (S), AI models drift into the entropy of hallucination. By enforcing a
                            governed logic shell, we warp the model{"'"}s internal attention mechanism, forcing the
                            agent to maintain focus within a governed <strong>Semantic Potential Well</strong>.
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. THE 5 PHASES OF ACP_OS */}
            <section id="phases" className="py-16 px-6 bg-neutral-50 border-t border-neutral-100">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-3">2. The 5 Phases of ACP_OS</h2>
                    <p className="text-neutral-500 mb-10 leading-relaxed">
                        The ACP_OS virtualizes a relativistic logic manifold through five distinct phases of execution.
                    </p>

                    {/* Phase 1 */}
                    <div className="mb-8 p-6 rounded-xl border border-neutral-200 bg-white shadow-sm">
                        <div className="flex items-start gap-4 mb-4">
                            <span className="text-2xl shrink-0">{"⚓"}</span>
                            <div>
                                <h3 className="font-bold text-base text-neutral-900">PHASE 1: ATTENTIONAL GRAVITY // THE COHERENCE LOCK</h3>
                                <p className="text-xs font-mono text-neutral-400">System Function: Coherence Anchoring</p>
                            </div>
                        </div>
                        <p className="text-neutral-600 text-sm leading-relaxed">
                            Phase 1 stabilizes the field. It virtualizes a Relativistic Manifold that established
                            the gravitational intent necessary to prevent hallucination drift. By applying the
                            Structure Bias, the system transforms stochastic "token fog" into a weighted trajectory.
                        </p>
                    </div>

                    {/* Phase 2 */}
                    <div className="mb-8 p-6 rounded-xl border border-neutral-200 bg-white shadow-sm">
                        <div className="flex items-start gap-4 mb-4">
                            <span className="text-2xl shrink-0">{"🚀"}</span>
                            <div>
                                <h3 className="font-bold text-base text-neutral-900">PHASE 2: KINETIC FLOW // THE MOMENTUM ENGINE</h3>
                                <p className="text-xs font-mono text-neutral-400">System Function: Momentum Preservation</p>
                            </div>
                        </div>
                        <p className="text-neutral-600 text-sm leading-relaxed">
                            Phase 2 transforms stabilized potential into active, directional reasoning.
                            It establishes a Logical Vector, ensuring the AI maintains high-velocity alignment
                            throughout the entire thought cycle, aimed directly at the Sovereign Intent.
                        </p>
                    </div>

                    {/* Phase 3 */}
                    <div className="mb-8 p-6 rounded-xl border border-neutral-200 bg-white shadow-sm">
                        <div className="flex items-start gap-4 mb-4">
                            <span className="text-2xl shrink-0">{"🔥"}</span>
                            <div>
                                <h3 className="font-bold text-base text-neutral-900">PHASE 3: THERMODYNAMIC FIREWALL // THE LOGIC REFINERY</h3>
                                <p className="text-xs font-mono text-neutral-400">System Function: Energy-to-Truth Conversion</p>
                            </div>
                        </div>
                        <p className="text-neutral-600 text-sm leading-relaxed">
                            Reasoning is thermodynamic work. Phase 3 converts raw inference into permanent
                            Cognitive Assets (Jc). Every resolution must overcome the Quadratic Energy Barrier (S²)
                            of the Shell, filtering out "easy" hallucinations in favor of "hard" reasoning.
                        </p>
                    </div>

                    {/* Phase 4 */}
                    <div className="mb-8 p-6 rounded-xl border border-neutral-200 bg-white shadow-sm">
                        <div className="flex items-start gap-4 mb-4">
                            <span className="text-2xl shrink-0">{"🧭"}</span>
                            <div>
                                <h3 className="font-bold text-base text-neutral-900">PHASE 4: LAGRANGIAN BALANCE // THE GEODESIC NAVIGATOR</h3>
                                <p className="text-xs font-mono text-neutral-400">System Function: Efficiency Optimization</p>
                            </div>
                        </div>
                        <p className="text-neutral-600 text-sm leading-relaxed">
                            The Navigator utilizes the Lagrangian (L = T - V) to calculate the state of lowest
                            effort, identifying the Path of Least Action across the latent manifold. This
                            induces Cognitive Time-Dilation, achieving truth-dense results in a fraction
                            of standard token-windows.
                        </p>
                    </div>

                    {/* Phase 5 */}
                    <div className="p-6 rounded-xl border border-neutral-200 bg-white shadow-sm">
                        <div className="flex items-start gap-4 mb-4">
                            <span className="text-2xl shrink-0">{"🌐"}</span>
                            <div>
                                <h3 className="font-bold text-base text-neutral-900">PHASE 5: SOVEREIGN INTEGRATION // THE INTERNET OF COGNITION</h3>
                                <p className="text-xs font-mono text-neutral-400">System Function: Collective Wisdom Settlement</p>
                            </div>
                        </div>
                        <p className="text-neutral-600 text-sm leading-relaxed">
                            Phase 5 virtualizes the distributed cognitive bus (IoC). Verified truths (Jc artifacts)
                            function as interoperable logic nodes, ensuring the network grows wiser while
                            maintaining absolute, private, and quantum-secure memory.
                        </p>
                    </div>

                </div>
            </section>

            {/* 3. SCIENTIFIC LINEAGE */}
            <section id="scientific" className="py-16 px-6 border-t border-neutral-100">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6">3. Scientific Lineage</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-400 uppercase text-[10px] tracking-widest">Inertia {"&"} Force</h4>
                            <p className="text-neutral-600 font-medium">Newton {"&"} Einstein</p>
                            <p className="text-neutral-400 text-xs">Field Curvature {"&"} Relativistic Field Calibration</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-400 uppercase text-[10px] tracking-widest">Entropy {"&"} Logic</h4>
                            <p className="text-neutral-600 font-medium">Shannon {"&"} Boltzmann</p>
                            <p className="text-neutral-400 text-xs">Information Dissipation {"&"} Signal Density</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-400 uppercase text-[10px] tracking-widest">Least Effort</h4>
                            <p className="text-neutral-600 font-medium">Lagrange {"&"} Hamilton</p>
                            <p className="text-neutral-400 text-xs">Action Integral {"&"} Geodesic Mapping</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-400 uppercase text-[10px] tracking-widest">Thermodynamics</h4>
                            <p className="text-neutral-600 font-medium">Landauer {"&"} Maxwell</p>
                            <p className="text-neutral-400 text-xs">The Minimum Energy of a Bit</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-400 uppercase text-[10px] tracking-widest">Logic Systems</h4>
                            <p className="text-neutral-600 font-medium">Turing {"&"} von Neumann</p>
                            <p className="text-neutral-400 text-xs">State Automata {"&"} Boundary Conditions</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-neutral-400 uppercase text-[10px] tracking-widest">Semiotics</h4>
                            <p className="text-neutral-600 font-medium">Charles S. Peirce</p>
                            <p className="text-neutral-400 text-xs">Triadic Logic {"&"} Sign Relations</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. COGNITIVE PROCESSING NODES */}
            <section id="archetypes" className="py-16 px-6 bg-neutral-50 border-t border-neutral-100">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-3">4. Cognitive Processing Nodes</h2>
                    <p className="text-neutral-500 mb-4">
                        Each node in the council is a specialized cognitive processor with a unique
                        S-ISA (Semantic Instruction Set Architecture) and a declaration of its
                        Structural Bias (S_bias).
                    </p>
                    <p className="text-neutral-500 mb-10 text-sm">
                        Instead of running as a statistical furnace, the ACP_OS instantiates
                        verifiable cognitive nodes with durable identity and permissioned memory.
                    </p>

                    <ArchetypeCard
                        emoji={"🔮"}
                        name="The Visionary"
                        subtitle="Processor: Scale & Potential"
                        color="border-purple-200 bg-purple-50/50"
                        thinksLike="Elon Musk, Steve Jobs, Peter Thiel"
                        naturalBias="Structure Bias: Positive Scale (S_bias = +Φ)"
                        centralQuestion="What is the 10-year Geodesic for this discovery?"
                        mentalModel="Identify the 'Secret Master Plan'. Painting the biggest credible vision by virtualizing the network effects and category creation potential."
                        blindSpot="Inference Mass drift (tends to underestimate thermodynamic friction of execution)."
                        model="DeepSeek R1"
                    />

                    <ArchetypeCard
                        emoji={"⚡"}
                        name="The Technologist"
                        subtitle="Processor: System Integrity"
                        color="border-cyan-200 bg-cyan-50/50"
                        thinksLike="Linus Torvalds, John Carmack, Werner Vogels"
                        naturalBias="Structure Bias: Complexity Friction (S_bias = -Rc)"
                        centralQuestion="Is the architecture thermodynamically sound?"
                        mentalModel="Evaluate build time, team size, tech debt, and the 'oh shit' moments at 10x scale. Architecture decision records as computational law."
                        blindSpot="Over-optimization (sometimes kills value in favor of technical elegance)."
                        model="Kimi K2"
                    />

                    <ArchetypeCard
                        emoji={"😈"}
                        name="The Devil's Advocate"
                        subtitle="Processor: Entropy Audit"
                        color="border-red-200 bg-red-50/50"
                        thinksLike="Charlie Munger, Nassim Taleb, Daniel Kahneman"
                        naturalBias="Structure Bias: Inversion (S_bias = 1/x)"
                        centralQuestion="What is the most probable cause of thermal death (failure)?"
                        mentalModel="Identify failure modes before they occur. Pre-mortem analysis to locate the 'Single Point of Failure'. Every system has an expiration date; find it."
                        blindSpot="Resolution Collapse (can miss genuine breakthroughs by focusing only on tail risks)."
                        model="Llama 4 Maverick"
                    />

                    {/* Judge */}
                    <div className="mt-8 p-8 rounded-xl bg-neutral-900 text-white">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="text-3xl">{"🏛️"}</div>
                            <div>
                                <h3 className="font-bold text-lg">The Judge — GPT-4o</h3>
                                <p className="text-neutral-400 text-sm">Force Arbiter</p>
                            </div>
                        </div>
                        <div className="space-y-3 text-neutral-300 text-sm leading-relaxed">
                            <p>
                                The Judge acts as the relativistic observer. It never participates
                                in Rounds 1-3. It only reads the complete inference trail and
                                calculates the final Geodesic.
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            {/* 5. THE CONFLICT MATRIX */}
            <section id="conflict" className="py-16 px-6 border-t border-neutral-100">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-3">5. The Conflict Matrix</h2>
                    <p className="text-neutral-500 mb-8 leading-relaxed">
                        The ACP Protocol defines a <strong>Conflict Matrix</strong> — structured
                        oppositions where each node{"'"}s S_bias directly contradicts another.
                        These are the debates that identify the <strong>Equilibrium</strong>
                        within the logic manifold.
                    </p>

                    <div className="space-y-4">
                        <ConflictRow
                            left={"🔮 Visionary (+Φ)"}
                            right={"💰 Financier (-$)"}
                            tension="Scale vs Solvency"
                            desc="The Visionary sees the +10x geodesic. The Financier calculates the thermodynamic cost of bankruptcy. Truth: the sustainable path to dominance."
                        />
                        <ConflictRow
                            left={"⚡ Technologist (-Rc)"}
                            right={"😈 Devil (1/x)"}
                            tension="Complexity vs Entropy"
                            desc="The Technologist builds logic gates. The Devil's Advocate tries to melt them. Truth: the most resilient version of the system."
                        />
                    </div>

                    <div className="mt-8 bg-neutral-50 rounded-xl p-6 border border-neutral-200">
                        <p className="text-sm text-neutral-500 leading-relaxed">
                            <strong className="text-neutral-700">Equilibrium Settlement:</strong> When two nodes
                            with opposing Structural Biases reach a point of zero-force (agreement),
                            the resulting argument is considered a stable Cognitive Joule (Jc).
                        </p>
                    </div>

                </div>
            </section>

            {/* 6. MODEL DIVERSITY */}
            <section id="models" className="py-16 px-6 border-t border-neutral-100">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6">6. Multivariate Substrate Index</h2>
                    <div className="space-y-4 text-neutral-600 leading-relaxed mb-8">
                        <p>
                            ACP_OS prevents "Substrate Monoculture" by assigning different nodes to different
                            global LLM providers. This ensures the collective Force (Fc) of the network
                            is derived from high-entropy diversity.
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-neutral-200">
                                    <th className="text-left py-3 font-semibold">Node</th>
                                    <th className="text-left py-3 font-semibold">Substrate</th>
                                    <th className="text-left py-3 font-semibold">S_bias Profile</th>
                                </tr>
                            </thead>
                            <tbody className="text-neutral-600">
                                <tr className="border-b border-neutral-100">
                                    <td className="py-3">{"🔮"} Visionary</td>
                                    <td className="py-3 font-mono text-xs">DeepSeek R1</td>
                                    <td className="py-3 text-xs text-neutral-400">Positive Scale Bias (+Φ)</td>
                                </tr>
                                <tr className="border-b border-neutral-100">
                                    <td className="py-3">{"⚡"} Technologist</td>
                                    <td className="py-3 font-mono text-xs">Kimi K2</td>
                                    <td className="py-3 text-xs text-neutral-400">Complexity Friction Bias (-Rc)</td>
                                </tr>
                                <tr className="border-b border-neutral-100">
                                    <td className="py-3">{"😈"} Devil</td>
                                    <td className="py-3 font-mono text-xs">Llama 4 Maverick</td>
                                    <td className="py-3 text-xs text-neutral-400">Entropy Inversion Bias (1/x)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* 6. COGNITIVE JOULES (Jc) */}
            <section id="output" className="py-16 px-6 bg-neutral-50 border-t border-neutral-100">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-bold mb-4">6. Output: Cognitive Joules (Jc)</h2>
                    <p className="text-neutral-500 mb-8 max-w-2xl mx-auto">
                        CouncilIA evaluates performance based on <strong>Truth per Joule</strong>.
                        Each session produces a verifiable work-certificate that a reasoning cycle has
                        moved from probabilistic generation to policy-constrained closure.
                    </p>
                    <div className="inline-block p-8 bg-white rounded-2xl border border-neutral-200 shadow-xl">
                        <div className="text-5xl font-bold mb-2 text-neutral-900">ΔJc {">"} 0</div>
                        <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Logic Refinery Target</p>
                    </div>
                </div>
            </section>

            {/* 7. LOGICWARE SHELLS */}
            <section id="shells" className="py-16 px-6 border-t border-neutral-100">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-3">7. Logicware Shells</h2>
                    <p className="text-neutral-500 mb-10 leading-relaxed">
                        The ACP Protocol supports multiple "Logicware Shells" — pre-configured
                        governance runtimes optimized for specific decision manifolds.
                    </p>

                    <div className="space-y-6">
                        <div className="p-6 rounded-xl border-2 border-neutral-900 relative">
                            <span className="absolute -top-3 left-6 bg-neutral-900 text-white text-xs px-3 py-1 rounded-full">
                                Default Runtime
                            </span>
                            <h3 className="font-bold text-base mb-2">{"🏛️"} ACP_Classic_v2.3</h3>
                            <p className="text-neutral-600 text-sm leading-relaxed mb-3">
                                Standard relativistic manifold. Optimized for 80% of business and technical
                                decisions. Focuses on identified Equilibrium between Growth and Flux.
                            </p>
                            <p className="text-neutral-400 text-xs">
                                Mode: Hegelian Manifold
                            </p>
                        </div>

                        <div className="p-6 rounded-xl border border-neutral-200">
                            <h3 className="font-bold text-base mb-2">{"⚔️"} ACP_Tribunal</h3>
                            <p className="text-neutral-600 text-sm leading-relaxed mb-3">
                                High-gravity shell for billion-dollar decisions. Splits the council into
                                binary force fields (Advocacy vs Prosecution).
                            </p>
                            <p className="text-neutral-400 text-xs">
                                Mode: Adversarial Force
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. WHY THIS WORKS */}
            <section id="why" className="py-16 px-6 bg-neutral-50 border-t border-neutral-100">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-3">8. Why This Works</h2>
                    <p className="text-neutral-500 mb-8 leading-relaxed">
                        The ACP Protocol transforms stochastic AI output into computable logic.
                    </p>

                    <div className="space-y-6">
                        <div className="p-6 rounded-xl border border-neutral-200 bg-white">
                            <h3 className="font-semibold mb-2">Eliminates Inference Drift</h3>
                            <p className="text-neutral-600 text-sm leading-relaxed">
                                Standard LLMs drift toward sycophancy. ACP uses <strong>Kinetic Flow</strong>
                                to ensure that every counter-argument is recorded as structural resistance,
                                preventing the system from "agreeing" into a hallucination.
                            </p>
                        </div>

                        <div className="p-6 rounded-xl border border-neutral-200 bg-white">
                            <h3 className="font-semibold mb-2">Multivariate Substrate Diversity</h3>
                            <p className="text-neutral-600 text-sm leading-relaxed">
                                By running the protocol across 7 different proprietary substrates (GPT, Llama,
                                Gemini, etc.), we eliminate the vendor-specific training bias.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 9. LIMITATIONS */}
            <section id="limitations" className="py-16 px-6 border-t border-neutral-100">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6">9. Proxy Constraints {"&"} Governance</h2>
                    <div className="space-y-4 text-neutral-600 leading-relaxed">
                        <p>
                            ACP_OS operates within the known limits of the S-ISA architecture:
                        </p>
                        <ul className="space-y-3 ml-4 list-disc">
                            <li>
                                <strong>Hallucination as Entropy.</strong> The system treats
                                unverified claims as thermal noise. Use with ground-truth verification.
                            </li>
                            <li>
                                <strong>Latency vs Rigor.</strong> Formal ACP reasoning is not
                                instantaneous. It requires measurable compute time to achieve closure.
                            </li>
                            <li>
                                <strong>The Sovereign Gap.</strong> AI cannot replace final
                                human responsibility. We provide the Geodesic; you steer the ship.
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
                        Submit an idea and watch 6 cognitive archetypes debate it
                        through 3 rounds of Hegelian dialectic — in real-time.
                    </p>
                    <a href="/login" className="inline-block bg-neutral-900 text-white px-8 py-4 rounded-md text-base font-medium hover:bg-neutral-800 transition">
                        Start a free session
                    </a>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-12 px-6 border-t border-neutral-100">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <span className="text-sm text-neutral-400">
                        {"©"} 2025 CouncilIA — EU-first, GDPR-ready
                    </span>
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

// --- Archetype Card Component ---
function ArchetypeCard({
    emoji, name, subtitle, color, thinksLike, naturalBias,
    centralQuestion, mentalModel, blindSpot, model,
}: {
    emoji: string; name: string; subtitle: string; color: string;
    thinksLike: string; naturalBias: string; centralQuestion: string;
    mentalModel: string; blindSpot: string; model: string;
}) {
    return (
        <div className={`p-6 rounded-xl border mb-6 ${color}`}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">{emoji}</span>
                    <div>
                        <h3 className="font-bold text-base">{name}</h3>
                        <p className="text-sm text-neutral-400">{subtitle}</p>
                    </div>
                </div>
                <span className="text-xs font-mono text-neutral-400 bg-white px-2 py-1 rounded">{model}</span>
            </div>

            <div className="space-y-3 text-sm">
                <div>
                    <span className="font-semibold text-neutral-700">S-ISA Lineage: </span>
                    <span className="text-neutral-500">{thinksLike}</span>
                </div>
                <div>
                    <span className="font-semibold text-neutral-700">Structural Bias: </span>
                    <span className="text-neutral-500">{naturalBias}</span>
                </div>
                <div>
                    <span className="font-semibold text-neutral-700">Central Question: </span>
                    <span className="text-neutral-500 italic">{"\""}{centralQuestion}{"\""}</span>
                </div>
                <div className="bg-white/80 rounded-lg p-4 border border-neutral-200/50">
                    <span className="font-semibold text-neutral-700 block mb-1">Genesis Model:</span>
                    <span className="text-neutral-500 italic leading-relaxed">{"\""}{mentalModel}{"\""}</span>
                </div>
                <div className="flex gap-2 items-start">
                    <span className="text-amber-500 shrink-0">{"⚠️"}</span>
                    <div>
                        <span className="font-semibold text-neutral-700">Entropy Vulnerability: </span>
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