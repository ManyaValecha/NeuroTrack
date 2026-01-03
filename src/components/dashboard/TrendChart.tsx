import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { CRI_HISTORY } from '../../data/mockData';

export default function TrendChart() {
    return (
        <div className="p-6 rounded-2xl border border-slate-800 bg-surface/50 backdrop-blur-sm shadow-xl">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-white">Risk Trend Analysis</h3>
                <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">6 Month View</span>
            </div>

            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={CRI_HISTORY}>
                        <defs>
                            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                            itemStyle={{ color: '#bae6fd' }}
                        />
                        <Area type="monotone" dataKey="score" stroke="#0EA5E9" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
