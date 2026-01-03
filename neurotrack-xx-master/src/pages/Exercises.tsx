import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, Trophy, RotateCcw, Play, ChevronRight, Hash, Layers } from 'lucide-react';
import { cn } from '../lib/utils';

// --- Pattern Recall Game ---
const PatternRecall = () => {
    const [pattern, setPattern] = useState<number[]>([]);
    const [userInput, setUserInput] = useState<number[]>([]);
    const [level, setLevel] = useState(1);
    const [gameState, setGameState] = useState<'idle' | 'showing' | 'playing' | 'failed'>('idle');
    const [score, setScore] = useState(0);

    const startLevel = useCallback((l: number) => {
        const newPattern = Array.from({ length: l + 2 }, () => Math.floor(Math.random() * 9));
        setPattern(newPattern);
        setGameState('showing');
        setUserInput([]);

        // Show pattern with delay
        setTimeout(() => setGameState('playing'), (l + 2) * 800 + 500);
    }, []);

    const handleCellClick = (idx: number) => {
        if (gameState !== 'playing') return;

        const nextInput = [...userInput, idx];
        setUserInput(nextInput);

        if (idx !== pattern[userInput.length]) {
            setGameState('failed');
            return;
        }

        if (nextInput.length === pattern.length) {
            setScore(s => s + level * 100);
            setLevel(l => l + 1);
            setTimeout(() => startLevel(level + 1), 1000);
        }
    };

    return (
        <div className="glass-hud p-8 rounded-3xl border border-white/5 space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                        <Hash className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold">Pattern Recall</h3>
                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Acoustic Memory Support</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-[10px] text-slate-500 uppercase font-black">Score</p>
                    <p className="text-xl font-black text-primary">{score}</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3 aspect-square max-w-[300px] mx-auto">
                {Array.from({ length: 9 }).map((_, i) => {
                    return (
                        <motion.button
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleCellClick(i)}
                            className={cn(
                                "w-full aspect-square rounded-2xl border transition-all duration-300",
                                gameState === 'playing' ? "bg-white/5 border-white/10 hover:border-primary/50" : "bg-white/[0.02] border-white/5",
                                gameState === 'showing' && pattern.includes(i) ? "animate-pulse bg-primary/20 border-primary" : ""
                            )}
                        />
                    );
                })}
            </div>

            {gameState === 'idle' && (
                <button
                    onClick={() => startLevel(1)}
                    className="w-full py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2"
                >
                    <Play className="w-4 h-4" /> Start Exercise
                </button>
            )}

            {gameState === 'failed' && (
                <div className="text-center space-y-4">
                    <p className="text-rose-400 font-bold">Sequence Interrupted</p>
                    <button
                        onClick={() => { setLevel(1); setScore(0); startLevel(1); }}
                        className="w-full py-4 bg-white/5 text-white rounded-2xl font-bold border border-white/10 flex items-center justify-center gap-2"
                    >
                        <RotateCcw className="w-4 h-4" /> Retry
                    </button>
                </div>
            )}
        </div>
    );
};

// --- Semantic Matching Game ---
const SemanticMatching = () => {
    const pairs = [
        { id: 1, term: 'Stethoscope', match: 'Heart Rate' },
        { id: 2, term: 'Scalpel', match: 'Surgery' },
        { id: 3, term: 'Syringe', match: 'Vaccine' },
        { id: 4, term: 'Thermometer', match: 'Temperature' },
    ];

    const [shuffled, setShuffled] = useState<{ id: number, val: string, type: 'term' | 'match' }[]>([]);
    const [selected, setSelected] = useState<number | null>(null);
    const [solved, setSolved] = useState<number[]>([]);

    useEffect(() => {
        const terms = pairs.map(p => ({ id: p.id, val: p.term, type: 'term' as const }));
        const matches = pairs.map(p => ({ id: p.id, val: p.match, type: 'match' as const }));
        setShuffled([...terms, ...matches].sort(() => Math.random() - 0.5));
    }, []);

    const handleClick = (idx: number) => {
        if (solved.includes(shuffled[idx].id)) return;

        if (selected === null) {
            setSelected(idx);
        } else {
            if (selected === idx) {
                setSelected(null);
                return;
            }

            if (shuffled[selected].id === shuffled[idx].id && shuffled[selected].type !== shuffled[idx].type) {
                setSolved(s => [...s, shuffled[idx].id]);
                setSelected(null);
            } else {
                setSelected(idx);
            }
        }
    };

    return (
        <div className="glass-hud p-8 rounded-3xl border border-white/5 space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                        <Layers className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold">Semantic Matching</h3>
                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Linguistic Cognitive Load</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {shuffled.map((item, i) => (
                    <motion.button
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleClick(i)}
                        className={cn(
                            "p-4 rounded-xl border text-sm font-medium transition-all",
                            solved.includes(item.id)
                                ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-500 opacity-50"
                                : selected === i
                                    ? "bg-accent/20 border-accent text-white"
                                    : "bg-white/5 border-white/10 text-slate-300 hover:border-white/20"
                        )}
                    >
                        {item.val}
                    </motion.button>
                ))}
            </div>

            {solved.length === pairs.length && (
                <div className="flex items-center justify-center gap-3 text-emerald-500 font-bold animate-bounce">
                    <Trophy className="w-5 h-5" />
                    Exercise Complete!
                </div>
            )}
        </div>
    );
};

export default function Exercises() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white italic tracking-tight">Neuro-Exercises</h1>
                    <p className="text-slate-500 uppercase font-black tracking-[0.3em] text-[10px] mt-1">Cognitive Rehabilitation Suite</p>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 border border-white/10">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Azure AI Personalized</span>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <PatternRecall />
                <SemanticMatching />
            </div>

            <div className="glass-hud p-6 rounded-3xl border border-white/5 bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                        <Brain className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold">Daily Cognitive Score</h4>
                        <p className="text-xs text-slate-400">Your performance is within 85th percentile of clinical benchmarks.</p>
                    </div>
                </div>
                <ChevronRight className="w-6 h-6 text-slate-600" />
            </div>
        </div>
    );
}
