import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { RISK_FACTORS } from '../../data/mockData';

export default function RiskRadar() {
    return (
        <div className="p-6 rounded-2xl border border-slate-800 bg-surface/50 backdrop-blur-sm shadow-xl">
            <h3 className="text-lg font-semibold text-white mb-4">Speech Biomarkers</h3>
            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={RISK_FACTORS}>
                        <PolarGrid stroke="#334155" />
                        <PolarAngleAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                            name="Current"
                            dataKey="value"
                            stroke="#14b8a6"
                            strokeWidth={2}
                            fill="#14b8a6"
                            fillOpacity={0.4}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
