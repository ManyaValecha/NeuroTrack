import { Link, useLocation, Outlet } from 'react-router-dom';
import { LayoutDashboard, Mic, BarChart2, Activity, Globe, ShieldCheck, Brain } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';
import FloatingChat from './FloatingChat';
import Footer from './Footer';

export default function AppLayout() {
    const location = useLocation();
    const { user, clearUser } = useUser();
    const initials = user?.name.split(' ').map(n => n[0]).join('').toUpperCase() || '??';

    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/app' },
        { icon: Mic, label: 'Assessment', path: '/app/assessment' },
        { icon: BarChart2, label: 'Analytics', path: '/app/analytics' },
        { icon: Brain, label: 'Exercises', path: '/app/exercises' },
    ];

    return (
        <div className="min-h-screen bg-background text-slate-100 flex overflow-hidden font-sans">
            {/* HUD Status Bar (Top) */}
            <div className="fixed top-0 left-64 right-0 h-1 hidden md:flex items-center justify-between px-6 z-50">
                <div className="h-full w-full bg-gradient-to-r from-primary via-secondary to-accent opacity-30 animate-pulse" />
            </div>

            {/* Sidebar - Desktop */}
            <aside className="hidden md:flex flex-col w-72 glass-hud border-r border-white/5 p-8 relative z-20">
                <div className="flex items-center gap-4 mb-12">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_20px_rgba(14,165,233,0.4)]">
                        <Activity className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <span className="text-xl font-bold tracking-tight text-white block">
                            NeuroTrack <span className="text-primary font-black italic">X</span>
                        </span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Cognitive Intelligence</span>
                    </div>
                </div>

                <nav className="flex-1 space-y-3">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                                    isActive
                                        ? "text-white bg-white/5 border border-white/10 shadow-xl"
                                        : "text-slate-400 hover:text-white hover:bg-white/[0.02]"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNavTab"
                                        className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-primary rounded-full shadow-[0_0_10px_#0EA5E9]"
                                        initial={false}
                                    />
                                )}
                                <Icon className={cn("w-5 h-5 relative z-10", isActive ? "text-primary" : "text-slate-500 group-hover:text-slate-300")} />
                                <span className="relative z-10 font-medium tracking-wide">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Profile HUD */}
                <div className="space-y-6 mt-auto pt-6 border-t border-white/5">
                    <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 relative group">
                        <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-primary font-black border border-white/10 shrink-0">
                            {initials}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-bold text-white truncate">{user?.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <p className="text-[10px] text-slate-500 uppercase font-black">
                                    {user?.role === 'admin' ? 'Admin' : 'Patient'} • Online
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={clearUser}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                            title="Reset Session"
                        >
                            ×
                        </button>
                    </div>

                    <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-white/5 space-y-3">
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                            <ShieldCheck className="w-3 h-3 text-emerald-500" />
                            Azure Secure Core
                        </div>
                        <div className="h-1.5 w-full bg-slate-700/50 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-primary"
                                initial={{ width: 0 }}
                                animate={{ width: "85%" }}
                                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                            />
                        </div>
                        <p className="text-[9px] text-slate-500 leading-tight">Processing longitudinal biomarkers with 256-bit encryption.</p>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 relative overflow-y-auto scroll-smooth bg-[#020617]">
                <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10 bg-[radial-gradient(circle_at_0%_0%,_#0c4a6e_0%,_transparent_50%),_radial-gradient(circle_at_100%_100%,_#1e1b4b_0%,_transparent_50%)] opactity-50" />

                {/* HUD Header */}
                <header className="sticky top-0 z-30 flex items-center justify-between px-10 py-6 glass-hud border-b border-white/5">
                    <div className="flex items-center gap-6">
                        <div className="h-8 w-[1px] bg-white/10" />
                        <div className="flex items-center gap-3">
                            <Globe className="w-4 h-4 text-slate-500" />
                            <span className="text-xs font-mono text-slate-500">Region: SE-ASIA-O1</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-[10px] text-slate-500 font-bold uppercase">System Uptime</p>
                            <p className="text-xs font-mono text-emerald-500 uppercase">99.98% Local Node</p>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        </div>
                    </div>
                </header>

                <div className="p-6 md:p-10 max-w-7xl mx-auto pb-24 md:pb-10">
                    <Outlet />
                </div>
                <Footer />
            </main>

            {/* Global floating AI assistant */}
            <FloatingChat />
        </div>
    );
}
