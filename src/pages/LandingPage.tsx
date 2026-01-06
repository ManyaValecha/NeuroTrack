import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Activity, Brain, Mic, Zap, ArrowRight, Github } from 'lucide-react';
import Footer from '../components/layout/Footer';

export default function LandingPage() {
    const navigate = useNavigate();
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    return (
        <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden selection:bg-primary/30 font-sans">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 md:px-16 bg-[#020617]/80 backdrop-blur-lg border-b border-white/5">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                            <Activity className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">NeuroTrack <span className="text-primary font-black italic">X</span></span>
                    </div>
                    <div className="flex items-center gap-6">
                        <button className="hidden md:block text-sm text-slate-400 hover:text-white transition-colors">Technology</button>
                        <button className="hidden md:block text-sm text-slate-400 hover:text-white transition-colors">Research</button>
                        <button
                            onClick={() => navigate('/onboarding')}
                            className="px-6 py-2 rounded-full bg-white/10 border border-white/10 hover:bg-white/20 transition-all text-sm font-medium tracking-wide"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
                {/* Parallax Background Elements */}
                <motion.div style={{ y: y1 }} className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] rounded-full bg-primary/20 blur-[120px] opacity-50 pointer-events-none" />
                <motion.div style={{ y: y2 }} className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-accent/20 blur-[120px] opacity-50 pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Next Gen Cognitive Analytics</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black italic tracking-tighter mb-8 leading-[0.9]">
                            Predictive <br />
                            <span className="bg-gradient-to-r from-primary via-blue-400 to-accent bg-clip-text text-transparent">Neural Health.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                            Advanced biomarkers for early neurodegenerative detection. <br className="hidden md:block" />
                            Powered by <span className="text-white font-bold">Azure Cognitive Services</span>.
                        </p>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                            <button
                                onClick={() => navigate('/onboarding')}
                                className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center gap-2"
                            >
                                Get Started
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="px-8 py-4 rounded-full border border-white/10 hover:bg-white/5 transition-all font-bold text-lg text-slate-300 flex items-center gap-2">
                                <Github className="w-5 h-5" />
                                Open Source
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500"
                >
                    <span className="text-xs font-black uppercase tracking-widest mb-2 block text-center">Scroll</span>
                    <div className="w-[1px] h-8 bg-gradient-to-b from-slate-500 to-transparent mx-auto" />
                </motion.div>
            </section>

            {/* Features Grid */}
            <section className="py-32 relative z-10 bg-[#020617]">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-24">
                        <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter text-white mb-6">Clinical Grade Telemetry</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">Our platform leverages three distinct Azure AI pipelines to triangulate cognitive health with unprecedented accuracy.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Mic, title: "Acoustic Biomarkers", desc: "Analyzes phonation, jitter, and speech rate deviations.", color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20" },
                            { icon: Brain, title: "Semantic Density", desc: "OpenAI GPT-4 evaluates linguistic complexity and coherence.", color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
                            { icon: Zap, title: "Predictive Scoring", desc: "Azure ML models forecast risk trajectories based on longitudinal data.", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className={`p-8 rounded-4xl border ${feature.border} ${feature.bg} hover:scale-[1.02] transition-transform duration-300`}
                            >
                                <feature.icon className={`w-12 h-12 ${feature.color} mb-6`} />
                                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                                <p className="text-slate-400 leading-relaxed font-medium">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-32 relative overflow-hidden border-t border-white/5">
                <div className="absolute inset-0 bg-white/[0.02]" />
                <div className="container mx-auto px-6 max-w-6xl relative z-10">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                                The Process
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white mb-8">
                                Frictionless <br />
                                Assessment.
                            </h2>
                            <div className="space-y-8">
                                {[
                                    { step: "01", title: "Initialize Sequence", desc: "Patient logs in and performs a 2-minute Guided Voice Assessment." },
                                    { step: "02", title: "Neural Processing", desc: "Audio is encrypted and streamed to Azure Cloud for multi-vector analysis." },
                                    { step: "03", title: "Clinical Insight", desc: "Instant Cognitive Risk Index (CRI) score generated for clinician review." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6">
                                        <span className="text-xl font-black text-slate-700 font-mono">{item.step}</span>
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                                            <p className="text-slate-400">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-[4/5] rounded-4xl bg-gradient-to-br from-slate-900 to-black border border-white/10 relative overflow-hidden flex items-center justify-center p-8">
                                {/* Abstract Visual representation of the app's analysis */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(14,165,233,0.1)_0%,_transparent_70%)]" />
                                <div className="space-y-4 w-full relative z-10 opacity-80">
                                    <div className="h-2 w-3/4 bg-white/10 rounded-full animate-pulse" />
                                    <div className="h-2 w-1/2 bg-white/10 rounded-full animate-pulse delay-75" />
                                    <div className="h-2 w-5/6 bg-white/10 rounded-full animate-pulse delay-150" />
                                    <div className="p-4 mt-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                                                <Brain size={16} />
                                            </div>
                                            <span className="text-lg font-bold text-white">Analysis Complete</span>
                                        </div>
                                        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                            <div className="w-[85%] bg-emerald-500 h-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}

