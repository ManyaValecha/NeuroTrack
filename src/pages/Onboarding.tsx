import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { Activity, User, Calendar, Users, ArrowRight, ShieldCheck, UserCog } from 'lucide-react';

export default function Onboarding() {
    const { setUser } = useUser();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: 'Male',
        role: 'user' as 'admin' | 'user'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.age) return;

        const userData = {
            name: formData.name,
            age: parseInt(formData.age),
            gender: formData.gender,
            id: formData.role === 'admin' ? `ADM-${Math.floor(Math.random() * 900) + 100}` : `P-${Math.floor(Math.random() * 9000) + 1000}`,
            role: formData.role,
            criHistory: []
        };

        setUser(userData);
        navigate('/app');
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[radial-gradient(circle_at_0%_0%,_#0c4a6e_0%,_transparent_50%),_radial-gradient(circle_at_100%_100%,_#1e1b4b_0%,_transparent_50%)] opactity-50" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-xl"
            >
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                        className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(14,165,233,0.4)]"
                    >
                        <Activity className="w-10 h-10 text-white" />
                    </motion.div>
                    <h1 className="text-4xl font-black text-white italic tracking-tight mb-3">
                        NeuroTrack <span className="text-primary font-black">X</span>
                    </h1>
                    <p className="text-slate-500 uppercase font-black tracking-[0.3em] text-[10px]">Clinical Registration Sequence</p>
                </div>

                <div className="glass-hud p-10 rounded-4xl border border-white/5 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-6">
                            {/* Name Input */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Full Legal Name</label>
                                <div className="relative group">
                                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="e.g. Sarah Chen"
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            {/* Role Selection */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Account Type</label>
                                <div className="relative group">
                                    <UserCog className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                                    <select
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'user' })}
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium"
                                    >
                                        <option value="user" className="bg-[#020617]">Patient</option>
                                        <option value="admin" className="bg-[#020617]">Clinician / Admin</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                {/* Age Input */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Age</label>
                                    <div className="relative group">
                                        <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                                        <input
                                            type="number"
                                            required
                                            value={formData.age}
                                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                            placeholder="65"
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                {/* Gender Select */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Biological Gender</label>
                                    <div className="relative group">
                                        <Users className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                                        <select
                                            value={formData.gender}
                                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium"
                                        >
                                            <option value="Male" className="bg-[#020617]">Male</option>
                                            <option value="Female" className="bg-[#020617]">Female</option>
                                            <option value="Other" className="bg-[#020617]">Other</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full py-5 bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group active:scale-[0.98]"
                            >
                                Initialize Clinical Profile
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-center gap-2 text-[10px] text-slate-600 font-bold uppercase tracking-widest">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        Azure Secure Federated Environment
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
