import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export default function CRIGauge({ score }: { score: number }) {
    // Score 0-100. Low is good.
    // 0-20: Healthy (Green)
    // 21-40: Monitoring (Yellow)
    // 41+: Risk (Red)

    let color = "text-emerald-500";
    let bg = "bg-emerald-500/10";
    let label = "Healthy Range";

    if (score > 20) { color = "text-amber-500"; bg = "bg-amber-500/10"; label = "Monitoring"; }
    if (score > 40) { color = "text-rose-500"; bg = "bg-rose-500/10"; label = "Review Needed"; }

    const circumference = 2 * Math.PI * 40; // r=40
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className={cn("relative p-6 rounded-2xl border border-slate-800 backdrop-blur-sm bg-surface/30 flex flex-col items-center", bg)}>
            <h3 className="text-sm font-medium text-slate-400 mb-4">Cognitive Risk Index (CRI)</h3>

            <div className="relative w-48 h-48 flex items-center justify-center">
                {/* Background Circle */}
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="96"
                        cy="96"
                        r="40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-slate-800"
                    />
                    {/* Progress Circle */}
                    <motion.circle
                        cx="96"
                        cy="96"
                        r="40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        className={color}
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={cn("text-4xl font-bold", color)}>{score}</span>
                    <span className="text-xs text-slate-500 uppercase tracking-wider mt-1">{label}</span>
                </div>
            </div>

            <p className="text-xs text-center text-slate-400 mt-2">
                Based on longitudinal speech analysis.<br />Lower score is better.
            </p>
        </div>
    );
}
