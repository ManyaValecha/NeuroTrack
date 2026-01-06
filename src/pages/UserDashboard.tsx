import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CRIGauge from '../components/dashboard/CRIGauge';
import TrendChart from '../components/dashboard/TrendChart';
import RiskRadar from '../components/dashboard/RiskRadar';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import { useUser } from '../context/UserContext';
import { Plus, Activity, TrendingUp, Calendar, Target } from 'lucide-react';
import { cn } from '../lib/utils';
import LiveNeuralStream from '../components/dashboard/LiveNeuralStream';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function UserDashboard() {
    const navigate = useNavigate();
    const { user, getCurrentCRI } = useUser();
    const [currentCRI, setCurrentCRI] = useState(0);

    useEffect(() => {
        const cri = getCurrentCRI();
        setCurrentCRI(cri);
    }, [getCurrentCRI]);

    const userStats = [
        { label: 'Current CRI', value: currentCRI.toString(), icon: Target, color: currentCRI <= 20 ? 'text-emerald-500' : currentCRI <= 40 ? 'text-amber-500' : 'text-rose-500' },
        { label: 'Assessments Done', value: user?.criHistory?.length.toString() || '0', icon: Activity, color: 'text-primary' },
        { label: 'Last Assessment', value: user?.criHistory?.length ? user.criHistory[user.criHistory.length - 1].date : 'N/A', icon: Calendar, color: 'text-accent' },
        { label: 'Trend', value: getTrendDirection(), icon: TrendingUp, color: getTrendColor() }
    ];

    function getTrendDirection() {
        if (!user?.criHistory || user.criHistory.length < 2) return 'N/A';
        const recent = user.criHistory.slice(-2);
        const diff = recent[1].score - recent[0].score;
        if (diff < 0) return 'Improving';
        if (diff > 0) return 'Monitor';
        return 'Stable';
    }

    function getTrendColor() {
        const trend = getTrendDirection();
        if (trend === 'Improving') return 'text-emerald-500';
        if (trend === 'Monitor') return 'text-amber-500';
        return 'text-slate-400';
    }

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-10 relative"
        >
            <LiveNeuralStream />

            {/* Welcome Header */}
            <div className="glass-hud p-6 rounded-3xl border border-white/5">
                <h2 className="text-2xl font-black text-white italic mb-2">Welcome back, {user?.name}!</h2>
                <p className="text-slate-400 text-sm">Patient ID: <span className="font-mono text-primary">{user?.id}</span></p>
            </div>

            {/* Personal Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {userStats.map((stat, i) => (
                    <motion.div
                        key={i}
                        variants={item}
                        className="glass-hud p-6 rounded-3xl neon-border-primary relative overflow-hidden group hover:scale-[1.02] transition-transform"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-25 transition-opacity group-hover:rotate-12 duration-500">
                            <stat.icon size={48} />
                        </div>
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1 flex items-center gap-2">
                            <Activity size={10} className="text-primary animate-pulse" />
                            {stat.label}
                        </p>
                        <h4 className={cn("text-2xl font-black italic tracking-tight", stat.color)}>{stat.value}</h4>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                {/* Left Column: Charts */}
                <div className="xl:col-span-8 space-y-8">
                    <motion.div variants={item} className="glass-hud p-8 rounded-4xl border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                        <h3 className="text-xl font-bold text-white mb-4">My Progress</h3>
                        <TrendChart />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div variants={item} className="glass-hud p-8 rounded-4xl border border-white/5">
                            <RiskRadar />
                        </motion.div>
                        <motion.div variants={item} className="glass-hud p-8 rounded-4xl border border-white/5">
                            <ActivityFeed />
                        </motion.div>
                    </div>
                </div>

                {/* Right Column: CRI & Actions */}
                <div className="xl:col-span-4 space-y-8">
                    <motion.div variants={item} className="glass-hud p-8 rounded-4xl border border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
                        <CRIGauge score={currentCRI} />
                    </motion.div>

                    <motion.div variants={item} className="glass-hud p-8 rounded-4xl border border-white/5 relative group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <h4 className="text-xl font-bold text-white mb-3">Start Assessment</h4>
                        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                            Begin your next cognitive assessment. Voice analysis powered by Azure ML.
                        </p>
                        <button
                            onClick={() => navigate('/app/assessment')}
                            className="w-full py-4 bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white rounded-2xl font-bold transition-all shadow-lg shadow-primary/20 active:scale-[0.98] flex items-center justify-center gap-2 group"
                        >
                            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                            Begin Assessment
                        </button>
                    </motion.div>

                    <motion.div variants={item} className="glass-hud p-8 rounded-4xl border border-white/5 relative group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <h4 className="text-xl font-bold text-white mb-3">Brain Exercises</h4>

                        {(user?.exerciseScores?.['pattern_recall'] || user?.exerciseScores?.['semantic_matching']) ? (
                            <div className="mb-6 space-y-3 bg-white/5 p-4 rounded-xl border border-white/5">
                                <div className="flex justify-between text-sm items-center">
                                    <span className="text-slate-400 font-medium">Pattern Recall</span>
                                    <span className="text-accent font-black">{user.exerciseScores['pattern_recall'] || 0}</span>
                                </div>
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-accent" style={{ width: `${Math.min((user.exerciseScores['pattern_recall'] || 0) / 10, 100)}%` }} />
                                </div>
                                <div className="flex justify-between text-sm items-center mt-2">
                                    <span className="text-slate-400 font-medium">Semantic Match</span>
                                    <span className="text-primary font-black">{user.exerciseScores['semantic_matching'] || 0}</span>
                                </div>
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary" style={{ width: `${Math.min((user.exerciseScores['semantic_matching'] || 0) / 10, 100)}%` }} />
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                                Improve cognitive function with personalized exercises.
                            </p>
                        )}

                        <button
                            onClick={() => navigate('/app/exercises')}
                            className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                        >
                            {user?.exerciseScores ? 'Continue Training' : 'Try Exercises'}
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Personal History */}
            {user?.criHistory && user.criHistory.length > 0 && (
                <motion.section
                    variants={item}
                    className="glass-hud rounded-4xl border border-white/5 overflow-hidden shadow-2xl"
                >
                    <div className="p-8 border-b border-white/5 bg-white/[0.02]">
                        <h3 className="text-2xl font-black text-white italic tracking-tight">My Assessment History</h3>
                        <p className="text-slate-500 text-sm mt-1">{user.criHistory.length} assessment(s) completed</p>
                    </div>
                    <div className="p-8">
                        <div className="space-y-4">
                            {user.criHistory.slice().reverse().map((record, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                                    <div>
                                        <p className="text-white font-bold">{record.date}</p>
                                        <p className="text-xs text-slate-500 mt-1">Assessment ID: {record.assessmentId}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className={cn(
                                            "text-2xl font-black",
                                            record.score <= 20 ? "text-emerald-500" :
                                                record.score <= 40 ? "text-amber-500" :
                                                    "text-rose-500"
                                        )}>{record.score}</p>
                                        <p className="text-[10px] text-slate-500 uppercase font-bold">CRI Score</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>
            )}

            {/* First time user message */}
            {(!user?.criHistory || user.criHistory.length === 0) && (
                <motion.div
                    variants={item}
                    className="glass-hud p-10 rounded-4xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent text-center"
                >
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                        <Target className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Ready to Start?</h3>
                    <p className="text-slate-400 mb-6 max-w-md mx-auto">
                        Complete your first cognitive assessment to begin tracking your neural health with NeuroTrack X.
                    </p>
                    <button
                        onClick={() => navigate('/app/assessment')}
                        className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-2xl font-bold hover:scale-105 transition-transform shadow-xl shadow-primary/30"
                    >
                        Start First Assessment
                    </button>
                </motion.div>
            )}
        </motion.div>
    );
}
