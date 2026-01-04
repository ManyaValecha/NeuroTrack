import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Sparkles, Trophy, RotateCcw, Play, ChevronRight, Hash, Layers } from 'lucide-react';
import { cn } from '../lib/utils';

// --- Pattern Recall Game ---
const PatternRecall = () => {
    const [pattern, setPattern] = useState<number[]>([]);
    const [userInput, setUserInput] = useState<number[]>([]);
    const [level, setLevel] = useState(1);
    const [gameState, setGameState] = useState<'idle' | 'showing' | 'playing' | 'failed' | 'success'>('idle');
    const [score, setScore] = useState(0);
    const [showingIndex, setShowingIndex] = useState(-1);
    const [timer, setTimer] = useState(0);
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

    // Timer
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (gameState === 'playing') {
            interval = setInterval(() => setTimer(t => t + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [gameState]);

    const startLevel = useCallback((l: number) => {
        const newPattern = Array.from({ length: l + 2 }, () => Math.floor(Math.random() * 9));
        setPattern(newPattern);
        setGameState('showing');
        setUserInput([]);
        setShowingIndex(0);

        // Show pattern with sequential highlighting
        newPattern.forEach((_, i) => {
            setTimeout(() => setShowingIndex(i), i * 700);
        });

        setTimeout(() => {
            setShowingIndex(-1);
            setGameState('playing');
        }, (l + 2) * 700 + 300);
    }, []);

    const handleCellClick = (idx: number) => {
        if (gameState !== 'playing') return;

        const nextInput = [...userInput, idx];
        setUserInput(nextInput);

        // Check if correct
        if (idx !== pattern[userInput.length]) {
            setFeedback('wrong');
            setGameState('failed');
            setTimeout(() => setFeedback(null), 1000);
            return;
        }

        // Show correct feedback
        setFeedback('correct');
        setTimeout(() => setFeedback(null), 300);

        // Check if completed level
        if (nextInput.length === pattern.length) {
            setScore(s => s + level * 100);
            setGameState('success');
            setTimeout(() => {
                setLevel(l => l + 1);
                startLevel(level + 1);
            }, 1500);
        }
    };

    const restart = () => {
        setLevel(1);
        setScore(0);
        setTimer(0);
        startLevel(1);
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
                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <p className="text-[10px] text-slate-500 uppercase font-black">Level</p>
                        <p className="text-xl font-black text-accent">{level}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-slate-500 uppercase font-black">Score</p>
                        <p className="text-xl font-black text-primary">{score}</p>
                    </div>
                    {gameState === 'playing' && (
                        <div className="text-right">
                            <p className="text-[10px] text-slate-500 uppercase font-black">Time</p>
                            <p className="text-xl font-black text-emerald-500">{timer}s</p>
                        </div>
                    )}
                </div>
            </div>

            {gameState === 'showing' && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4"
                >
                    <p className="text-primary font-bold uppercase tracking-widest text-sm">Memorize the Pattern</p>
                    <p className="text-slate-500 text-xs mt-1">Position {showingIndex + 1} of {pattern.length}</p>
                </motion.div>
            )}

            <div className="grid grid-cols-3 gap-3 aspect-square max-w-[300px] mx-auto">
                {Array.from({ length: 9 }).map((_, i) => {
                    const isInPattern = pattern[showingIndex] === i && gameState === 'showing';
                    const isUserSelected = userInput.includes(i);

                    return (
                        <motion.button
                            key={i}
                            whileHover={gameState === 'playing' ? { scale: 1.05 } : {}}
                            whileTap={gameState === 'playing' ? { scale: 0.95 } : {}}
                            onClick={() => handleCellClick(i)}
                            className={cn(
                                "w-full aspect-square rounded-2xl border transition-all duration-300 flex items-center justify-center font-black text-2xl relative overflow-hidden",
                                gameState === 'idle' && "bg-white/[0.02] border-white/5",
                                gameState === 'playing' && !isUserSelected && "bg-white/5 border-white/10 hover:border-primary/50 hover:bg-white/10",
                                gameState === 'playing' && isUserSelected && "bg-primary/20 border-primary",
                                isInPattern && "bg-primary/30 border-primary animate-pulse shadow-[0_0_20px_rgba(14,165,233,0.5)]",
                                gameState === 'failed' && "opacity-50"
                            )}
                        >
                            {isInPattern && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="text-primary text-3xl font-black"
                                >
                                    {showingIndex + 1}
                                </motion.span>
                            )}
                            {isUserSelected && gameState === 'playing' && (
                                <span className="text-xs text-primary opacity-50">{userInput.indexOf(i) + 1}</span>
                            )}
                        </motion.button>
                    );
                })}
            </div>

            <AnimatePresence mode="wait">
                {gameState === 'idle' && (
                    <motion.button
                        key="start"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        onClick={() => startLevel(1)}
                        className="w-full py-4 bg-gradient-to-r from-primary to-accent text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                    >
                        <Play className="w-4 h-4" /> Start Exercise
                    </motion.button>
                )}

                {gameState === 'failed' && (
                    <motion.div
                        key="failed"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="text-center space-y-4"
                    >
                        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                            <p className="text-rose-400 font-bold text-lg">Sequence Interrupted</p>
                            <p className="text-slate-400 text-sm mt-1">Level {level} • Score: {score}</p>
                        </div>
                        <button
                            onClick={restart}
                            className="w-full py-4 bg-white/5 text-white rounded-2xl font-bold border border-white/10 flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                        >
                            <RotateCcw className="w-4 h-4" /> Try Again
                        </button>
                    </motion.div>
                )}

                {gameState === 'success' && (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="text-center p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20"
                    >
                        <p className="text-emerald-400 font-bold">Level Complete! 🎉</p>
                        <p className="text-slate-400 text-sm mt-1">Advancing to Level {level + 1}...</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {feedback === 'correct' && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl pointer-events-none"
                >
                    ✓
                </motion.div>
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
    const [wrongMatch, setWrongMatch] = useState<number[]>([]);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);

    useEffect(() => {
        const terms = pairs.map(p => ({ id: p.id, val: p.term, type: 'term' as const }));
        const matches = pairs.map(p => ({ id: p.id, val: p.match, type: 'match' as const }));
        setShuffled([...terms, ...matches].sort(() => Math.random() - 0.5));
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (gameStarted && solved.length < pairs.length) {
            interval = setInterval(() => setTimer(t => t + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [gameStarted, solved.length, pairs.length]);

    const handleClick = (idx: number) => {
        if (!gameStarted) setGameStarted(true);

        if (solved.includes(shuffled[idx].id)) return;
        if (wrongMatch.includes(idx)) return;

        if (selected === null) {
            setSelected(idx);
        } else {
            if (selected === idx) {
                setSelected(null);
                return;
            }

            // Check if match
            if (shuffled[selected].id === shuffled[idx].id && shuffled[selected].type !== shuffled[idx].type) {
                setSolved(s => [...s, shuffled[idx].id]);
                setScore(s => s + 100);
                setSelected(null);
            } else {
                // Wrong match - show feedback
                setWrongMatch([selected, idx]);
                setTimeout(() => {
                    setWrongMatch([]);
                    setSelected(null);
                }, 800);
            }
        }
    };

    const restart = () => {
        const terms = pairs.map(p => ({ id: p.id, val: p.term, type: 'term' as const }));
        const matches = pairs.map(p => ({ id: p.id, val: p.match, type: 'match' as const }));
        setShuffled([...terms, ...matches].sort(() => Math.random() - 0.5));
        setSolved([]);
        setSelected(null);
        setScore(0);
        setTimer(0);
        setGameStarted(false);
    };

    const isComplete = solved.length === pairs.length;

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
                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <p className="text-[10px] text-slate-500 uppercase font-black">Matched</p>
                        <p className="text-xl font-black text-accent">{solved.length}/{pairs.length}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-slate-500 uppercase font-black">Score</p>
                        <p className="text-xl font-black text-primary">{score}</p>
                    </div>
                    {gameStarted && !isComplete && (
                        <div className="text-right">
                            <p className="text-[10px] text-slate-500 uppercase font-black">Time</p>
                            <p className="text-xl font-black text-emerald-500">{timer}s</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {shuffled.map((item, i) => (
                    <motion.button
                        key={i}
                        whileHover={!solved.includes(item.id) ? { scale: 1.02 } : {}}
                        whileTap={!solved.includes(item.id) ? { scale: 0.98 } : {}}
                        onClick={() => handleClick(i)}
                        className={cn(
                            "p-4 rounded-xl border text-sm font-medium transition-all min-h-[60px] flex items-center justify-center",
                            solved.includes(item.id)
                                ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-500 opacity-50 cursor-not-allowed"
                                : wrongMatch.includes(i)
                                    ? "bg-rose-500/20 border-rose-500 text-rose-400 animate-pulse"
                                    : selected === i
                                        ? "bg-accent/20 border-accent text-white scale-[1.02] shadow-lg shadow-accent/20"
                                        : "bg-white/5 border-white/10 text-slate-300 hover:border-white/20 hover:bg-white/10"
                        )}
                        disabled={solved.includes(item.id) || wrongMatch.includes(i)}
                    >
                        {item.val}
                    </motion.button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {isComplete && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-4"
                    >
                        <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-accent/20 border border-emerald-500/30">
                            <Trophy className="w-12 h-12 text-emerald-500 animate-bounce" />
                            <div className="text-center">
                                <p className="text-emerald-400 font-black text-xl">Exercise Complete!</p>
                                <p className="text-slate-400 text-sm mt-1">Completed in {timer} seconds</p>
                                <p className="text-primary font-bold text-lg mt-2">Final Score: {score}</p>
                            </div>
                        </div>
                        <button
                            onClick={restart}
                            className="w-full py-4 bg-white/5 text-white rounded-2xl font-bold border border-white/10 flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                        >
                            <RotateCcw className="w-4 h-4" /> Play Again
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
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
