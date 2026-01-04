import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, Sparkles, User, Loader2 } from 'lucide-react';
import OpenAI from 'openai';
import { cn } from '../../lib/utils';

export default function FloatingChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
        { role: 'assistant', content: "hello user" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const openaiKey = import.meta.env.VITE_AZURE_OPENAI_KEY;
            const openaiEndpoint = import.meta.env.VITE_AZURE_OPENAI_ENDPOINT;

            if (!openaiKey || !openaiEndpoint) {
                throw new Error("Azure OpenAI not configured");
            }

            const cleanEndpoint = openaiEndpoint.endsWith('/') ? openaiEndpoint.slice(0, -1) : openaiEndpoint;

            // Note: The 'openai' package version 4.x+ supports Azure OpenAI, 
            // but the baseURL + defaultQuery approach is a valid alternative for some versions.
            // Let's try to ensure the URL is formed correctly.
            const deploymentName = import.meta.env.VITE_AZURE_OPENAI_DEPLOYMENT || 'gpt-4o';
            const client = new OpenAI({
                apiKey: openaiKey,
                baseURL: `${cleanEndpoint}/openai/deployments/${deploymentName}`,
                defaultQuery: { 'api-version': '2024-08-01-preview' },
                defaultHeaders: { 'api-key': openaiKey },
                dangerouslyAllowBrowser: true
            });

            const response = await client.chat.completions.create({
                model: deploymentName,
                messages: [
                    { role: 'system', content: 'You are NeuroTrack X Assistant, a clinical AI. Assist clinicians with cognitive biomarker analysis, diagnostic steps, and platform navigation. Be professional, concise, and medical-focused.' },
                    ...messages,
                    { role: 'user', content: userMessage }
                ]
            });

            const assistantMessage = response.choices[0].message.content || "I'm sorry, I couldn't process that request.";
            setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
        } catch (error: any) {
            console.error("Chat Error:", error);
            // Fallback / Offline Mode
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: "I'm currently unable to connect to the Azure Neural Cloud. \n\nHowever, I can still assist you with:\n• Navigating the NeuroTrack Dashboard\n• Understanding CRI Scores\n• Reviewing local patient records\n\nPlease check your network connection for full diagnostic capabilities."
                }]);
            }, 1000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="absolute bottom-20 right-0 w-[400px] h-[600px] glass-hud rounded-4xl border border-white/10 shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 bg-gradient-to-r from-primary/10 to-accent/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                                    <Bot size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-black italic tracking-tight">Assistant</h4>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center text-slate-400 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
                        >
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "flex gap-3 max-w-[85%]",
                                        msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                                    )}
                                >
                                    <div className={cn(
                                        "w-8 h-8 rounded-xl shrink-0 flex items-center justify-center border",
                                        msg.role === 'user' ? "bg-accent/10 border-accent/20 text-accent" : "bg-primary/10 border-primary/20 text-primary"
                                    )}>
                                        {msg.role === 'user' ? <User size={16} /> : <Sparkles size={16} />}
                                    </div>
                                    <div className={cn(
                                        "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                                        msg.role === 'user'
                                            ? "bg-accent/10 text-white rounded-tr-none border border-accent/10"
                                            : "bg-white/5 text-slate-300 rounded-tl-none border border-white/5"
                                    )}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
                                        <Loader2 size={16} className="animate-spin" />
                                    </div>
                                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-slate-500 italic text-sm">
                                        Analyzing clinical state...
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSend} className="p-6 border-t border-white/5 bg-white/[0.02]">
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type clinical query..."
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-slate-600"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 shadow-lg shadow-primary/20"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-16 h-16 rounded-3xl flex items-center justify-center shadow-2xl transition-all duration-500 group relative",
                    isOpen
                        ? "bg-rose-500 text-white rotate-90"
                        : "bg-gradient-to-br from-primary to-accent text-white"
                )}
            >
                {isOpen ? <X size={32} /> : <MessageSquare size={32} />}
                {!isOpen && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#020617] animate-bounce" />
                )}
            </motion.button>
        </div>
    );
}
