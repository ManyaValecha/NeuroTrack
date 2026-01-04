import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Brain, Shield, ChevronRight } from 'lucide-react';

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative selection:bg-primary/30">
            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-accent/20 blur-[120px]" />
            </div>

            {/* Navbar */}
            <nav className="relative z-50 flex items-center justify-between px-8 py-6 md:px-16">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                        <Activity className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">NeuroTrack <span className="text-primary font-black italic">X</span></span>
                </div>
                <button
                    onClick={() => navigate('/onboarding')}
                    className="px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium tracking-wide"
                >
                    Login
                </button>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 container mx-auto px-6 h-[calc(100vh-100px)] flex flex-col items-center justify-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Next Gen Cognitive Analytics</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter mb-8 bg-gradient-to-br from-white via-white to-slate-500 bg-clip-text text-transparent">
                        Predictive <br />
                        <span className="text-primary">Neural Health.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                        NeuroTrack X leverages advanced Azure AI to detect early cognitive biomarkers through voice and interaction patterns.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <button
                            onClick={() => navigate('/onboarding')}
                            className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center gap-2"
                        >
                            Get Started
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="px-8 py-4 rounded-full border border-white/10 hover:bg-white/5 transition-all font-bold text-lg text-slate-300">
                            View Research
                        </button>
                    </div>
                </motion.div>

                {/* Feature Grid (Floating) */}
                <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {[
                        { icon: Brain, title: "Neural Analysis", desc: "Real-time phonation processing via Azure Speech Services." },
                        { icon: Activity, title: "Biomarker Tracking", desc: "Longitudinal tracking of cognitive decline indicators." },
                        { icon: Shield, title: "Clinical Grade", desc: "Secure, encrypted data handling compliant with healthcare standards." }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + (i * 0.1) }}
                            className="p-6 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors text-left"
                        >
                            <feature.icon className="w-8 h-8 text-primary mb-4" />
                            <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
