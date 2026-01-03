import { Activity, Play } from 'lucide-react';
import { RECENT_ACTIVITY } from '../../data/mockData';
import { cn } from '../../lib/utils';

export default function ActivityFeed() {
    return (
        <div className="p-6 rounded-2xl border border-slate-800 bg-surface/50 backdrop-blur-sm shadow-xl h-full">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
                {RECENT_ACTIVITY.map((item) => (
                    <div key={item.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
                        <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                            item.type === 'assessment' ? "bg-primary/20 text-primary" : "bg-purple-500/20 text-purple-500"
                        )}>
                            {item.type === 'assessment' ? <Activity size={16} /> : <Play size={16} />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-200">
                                {item.type === 'assessment' ? 'Speech Assessment' : 'Cognitive Exercise'}
                            </p>
                            <p className="text-xs text-slate-500">{item.date}</p>
                        </div>
                        <div className="text-right">
                            <div className={cn(
                                "px-2 py-1 rounded text-[10px] font-bold uppercase",
                                item.result?.includes('Elevated') ? "bg-red-500/10 text-red-400" : "bg-primary/10 text-primary"
                            )}>
                                {item.result}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
