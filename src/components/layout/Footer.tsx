import { Activity } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="py-8 border-t border-white/5 bg-[#020617] relative z-10">
            <div className="container mx-auto px-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <Activity className="w-5 h-5 text-slate-600" />
                    <span className="text-lg font-bold text-slate-600 tracking-tight">NeuroTrack X</span>
                </div>
                <div className="flex items-center justify-center gap-6 mb-6 text-xs font-bold uppercase tracking-widest text-slate-700">
                    <a href="#" className="hover:text-slate-500 transition-colors">Privacy</a>
                    <a href="#" className="hover:text-slate-500 transition-colors">Terms</a>
                    <a href="#" className="hover:text-slate-500 transition-colors">Clinical Data</a>
                </div>
                <p className="text-slate-700 text-xs">
                    &copy; 2025 NeuroTrack Team. Built for Azure AI Hackathon.
                </p>
            </div>
        </footer>
    );
}
