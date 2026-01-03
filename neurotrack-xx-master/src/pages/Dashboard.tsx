import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CRIGauge from '../components/dashboard/CRIGauge';
import TrendChart from '../components/dashboard/TrendChart';
import RiskRadar from '../components/dashboard/RiskRadar';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import { listClinicalRecords } from '../lib/azure-storage';
import { patientData, type PatientRecord } from '../data/patient-data';
import { Database, Search, Shield, Zap, Users, Loader2, Plus, Activity } from 'lucide-react';
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

export default function Dashboard() {
    const navigate = useNavigate();
    const [records, setRecords] = useState<PatientRecord[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadRecords = async () => {
            setIsLoading(true);
            try {
                const data = await listClinicalRecords();
                // Combine with default patient data for a rich explorer experience
                const combined = [...data as PatientRecord[], ...patientData];
                // Remove duplicates by ID (if any)
                const unique = combined.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
                setRecords(unique);
            } catch (error) {
                console.error("Failed to load records", error);
                setRecords(patientData);
            } finally {
                setIsLoading(false);
            }
        };
        loadRecords();
    }, []);

    const filteredRecords = records.filter((r: PatientRecord) =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-10 relative"
        >
            <LiveNeuralStream />
            {/* HUD Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'System Accuracy', value: '98.4%', icon: Shield, color: 'text-primary' },
                    { label: 'Latency (Avg)', value: '142ms', icon: Zap, color: 'text-accent' },
                    { label: 'Live Data Nodes', value: records.length.toString(), icon: Database, color: 'text-secondary' },
                    { label: 'Active Monitors', value: '1,242', icon: Users, color: 'text-success' }
                ].map((stat, i) => (
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
                        <div className="mt-4 flex items-center gap-2">
                            <div className="flex-1 h-[2px] bg-white/5 rounded-full overflow-hidden">
                                <div className={cn("h-full w-2/3 bg-current opacity-50", stat.color)} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                {/* Left Column: Primary Diagnostics (8 cols) */}
                <div className="xl:col-span-8 space-y-8">
                    <motion.div variants={item} className="glass-hud p-8 rounded-4xl border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
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

                {/* Right Column: Status & Action (4 cols) */}
                <div className="xl:col-span-4 space-y-8">
                    <motion.div variants={item} className="glass-hud p-8 rounded-4xl border border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
                        <CRIGauge score={records.length > 0 ? records[0].status * 100 : 32} />
                    </motion.div>

                    <motion.div variants={item} className="glass-hud p-8 rounded-4xl border border-white/5 relative group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <h4 className="text-xl font-bold text-white mb-3">Assessment Protocol</h4>
                        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                            Initialize the next cognitive biomarker sequence. High-fidelity voice sampling will be analyzed by Azure ML.
                        </p>
                        <button
                            onClick={() => navigate('/assessment')}
                            className="w-full py-4 bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white rounded-2xl font-bold transition-all shadow-lg shadow-primary/20 active:scale-[0.98] flex items-center justify-center gap-2 group"
                        >
                            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                            Begin Assessment
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Federated Dataset: Large HUD Table */}
            <motion.section
                variants={item}
                className="glass-hud rounded-4xl border border-white/5 overflow-hidden shadow-2xl"
            >
                <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/[0.02]">
                    <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shadow-[0_0_20px_rgba(34,211,238,0.1)] border border-accent/20">
                            <Database size={28} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-white italic tracking-tight">Data Lake Explorer</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Azure Clinical Data Stream • Live Verification</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Search clinical records..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-slate-900/50 border border-white/10 rounded-2xl py-3 pl-12 pr-6 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/50 w-full md:w-80 transition-all font-medium"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto min-h-[400px]">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-32 space-y-4">
                            <Loader2 className="w-12 h-12 text-primary animate-spin" />
                            <p className="text-sm font-black text-slate-500 uppercase tracking-widest">Synchronizing with Azure Data Lake...</p>
                        </div>
                    ) : records.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-32 space-y-6 text-center px-10">
                            <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-slate-700">
                                <Database size={40} />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-white mb-2">No Live Data Detected</h4>
                                <p className="text-sm text-slate-500 max-w-sm">
                                    The clinical registry is currently empty. Initialize an assessment to populate the Data Lake with neural biomarkers.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/5 text-slate-500 text-[10px] uppercase font-black tracking-[0.2em]">
                                    <th className="px-8 py-6">Patient ID</th>
                                    <th className="px-8 py-6">Demographics</th>
                                    <th className="px-8 py-6">Biomarkers (Acoustic)</th>
                                    <th className="px-8 py-6">ML Diagnostics</th>
                                    <th className="px-8 py-6 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredRecords.map((record: PatientRecord) => (
                                    <tr key={record.id} className="hover:bg-white/[0.03] transition-all group cursor-pointer">
                                        <td className="px-8 py-6">
                                            <span className="font-mono text-xs text-primary font-bold">{record.id}</span>
                                            <p className="text-base font-bold text-white mt-1 group-hover:text-glow-primary transition-all">{record.name}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="text-sm text-slate-300 font-medium">
                                                {record.age}Y • <span className="text-slate-500">{record.gender}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex gap-3">
                                                <div className="glass-hud px-3 py-1.5 rounded-xl text-[10px] font-mono text-slate-300 border border-white/5">
                                                    DUR: {record.duration_sec}s
                                                </div>
                                                <div className="glass-hud px-3 py-1.5 rounded-xl text-[10px] font-mono text-accent border border-accent/10">
                                                    MFCC1: {record.mfcc_1}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className={cn(
                                                "inline-flex items-center gap-3 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest",
                                                record.status === 1 ? "bg-rose-500/10 text-rose-500 border border-rose-500/20" : "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                                            )}>
                                                <div className={cn("w-2 h-2 rounded-full", record.status === 1 ? "bg-rose-500 animate-pulse" : "bg-emerald-500")} />
                                                {record.status === 1 ? "Positive" : "Healthy Control"}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <p className="text-xs font-mono text-slate-500 group-hover:text-slate-300 transition-colors uppercase font-bold">{record.lastAssessment}</p>
                                            <p className="text-[10px] text-slate-600 mt-1">Verified Node</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className="p-6 bg-white/[0.02] text-center border-t border-white/5">
                    <button className="text-primary text-[10px] font-black uppercase tracking-[0.2em] hover:text-accent transition-colors">
                        Expand Regional Registry ({records.length} Nodes)
                    </button>
                </div>
            </motion.section>
        </motion.div>
    );
}
