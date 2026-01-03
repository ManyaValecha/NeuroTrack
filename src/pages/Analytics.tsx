import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, CheckCircle, Loader2 } from 'lucide-react';
import RiskRadar from '../components/dashboard/RiskRadar';
import TrendChart from '../components/dashboard/TrendChart';
import { getAIInsights, isAzureConfigured } from '../lib/azure';

export default function Analytics() {
    const [loading, setLoading] = useState(false);
    const [insights] = useState([
        {
            title: "Speech Rate Deviation",
            status: "warning",
            desc: "Your speech rate has slowed by 15% compared to your baseline from Jan 2023. This is a primary contributor to the risk score elevation.",
            impact: "High Impact"
        },
        {
            title: "Semantic Density",
            status: "good",
            desc: "Vocabulary richness remains stable. You are using complex sentence structures effectively.",
            impact: "Positive"
        },
        {
            title: "Pause Duration",
            status: "monitor",
            desc: "Slight increase in mid-sentence pauses. We will continue to monitor this for potential cognitive fatigue indicators.",
            impact: "Medium Impact"
        }
    ]);

    const interventions = [
        { title: "Verbal Fluency Exercise", duration: "5 min", type: "Daily" },
        { title: "Story Recall Challenge", duration: "10 min", type: "Twice Weekly" },
        { title: "Sleep Pattern Review", duration: "N/A", type: "Lifestyle" }
    ];

    const generateFreshInsights = async () => {
        if (!isAzureConfigured()) return;
        setLoading(true);
        try {
            // In a real flow, we'd pass the actual transcript from the assessment
            // For now, we use a simulation if needed, but the plumbing is here
            const aiResponse = await getAIInsights("Simulated transcript based on latest assessment data.");
            // Parse response and update state...
            console.log("Azure AI Response:", aiResponse);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-white">Clinical Analytics</h1>
                <p className="text-slate-400">Deep dive into cognitive biomarkers and intervention factors</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Charts Column */}
                <div className="space-y-8">
                    <TrendChart />
                    <RiskRadar />
                </div>

                {/* Insights Column */}
                <div className="space-y-8">

                    {/* Explainable AI Section */}
                    <div className="bg-surface/30 backdrop-blur-md rounded-2xl p-6 border border-slate-800">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <Brain className="text-purple-400" />
                                <h3 className="text-lg font-semibold text-white">Explainable AI Insights</h3>
                            </div>
                            {isAzureConfigured() && (
                                <button
                                    onClick={generateFreshInsights}
                                    disabled={loading}
                                    className="text-xs bg-primary/20 hover:bg-primary/30 text-primary px-3 py-1 rounded-full flex items-center gap-1 transition-colors"
                                >
                                    {loading ? <Loader2 size={12} className="animate-spin" /> : "Refresh (Azure OpenAI)"}
                                </button>
                            )}
                        </div>

                        <div className="space-y-4">
                            {insights.map((item, i) => (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    key={i}
                                    className="bg-slate-900/50 p-4 rounded-xl border border-slate-800"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-medium text-slate-200">{item.title}</h4>
                                        <span className={`text-[10px] px-2 py-1 rounded-full border ${item.status === 'warning' ? 'text-amber-400 border-amber-400/20 bg-amber-400/5' :
                                            item.status === 'good' ? 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5' :
                                                'text-blue-400 border-blue-400/20 bg-blue-400/5'
                                            }`}>
                                            {item.impact}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-400">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Recommendations */}
                    <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-2xl p-6 border border-white/5">
                        <div className="flex items-center gap-2 mb-6">
                            <TrendingUp className="text-primary" />
                            <h3 className="text-lg font-semibold text-white">Recommended Interventions</h3>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            {interventions.map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                            <CheckCircle size={16} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">{item.title}</p>
                                            <p className="text-xs text-slate-400">{item.type}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-mono text-slate-500">{item.duration}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
