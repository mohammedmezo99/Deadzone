"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Shield, ShieldCheck, Edit2, Github, Terminal, UserPlus, Fingerprint, Lock, Globe } from "lucide-react";

export default function UserManagementPage() {
    return (
        <div className="p-6 lg:p-10 space-y-10">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-indigo-500 font-black text-[10px] uppercase tracking-[0.3em] mb-2">
                        <Fingerprint className="w-3 h-3" />
                        Access & Permissions
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter">Identity Control</h1>
                    <p className="text-zinc-500 text-sm font-medium mt-1">Manage core developers, administrators, and peripheral access.</p>
                </div>
                <button
                    disabled
                    className="flex items-center gap-3 px-8 py-4 bg-zinc-800 text-zinc-500 rounded-[1.5rem] font-black uppercase text-xs tracking-widest transition-all cursor-not-allowed border border-white/[0.05]"
                >
                    <UserPlus className="w-4 h-4" /> Provision Identity
                </button>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Team Roster */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] flex items-center gap-2">
                            <ShieldCheck className="text-indigo-500 w-3 h-3" /> Core Infrastructure Team
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { name: "Adi", role: "LEAD DEVELOPER", email: "adi@projectmove.com", github: "mohammadadi" },
                            { name: "Neon Team", role: "DATABASE OPS", email: "neon@projectmove.com", github: "neon-db" }
                        ].map((user, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-premium p-6 rounded-[2.5rem] group hover:border-indigo-500/30 transition-all relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Shield className="w-24 h-24 rotate-[-15deg]" />
                                </div>

                                <div className="relative z-10 flex items-center gap-5 mb-6">
                                    <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center font-black text-white shadow-2xl shadow-indigo-500/20 text-xl border border-white/10">
                                        {user.name[0]}
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-black text-white text-lg tracking-tight truncate">{user.name}</h4>
                                        <span className="text-[9px] font-black text-indigo-400 tracking-[0.2em] uppercase">{user.role}</span>
                                    </div>
                                </div>

                                <div className="relative z-10 space-y-4">
                                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.03]">
                                        <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">Encrypted Identity</div>
                                        <div className="text-[11px] font-bold text-zinc-400 truncate">{user.email}</div>
                                    </div>

                                    <div className="flex gap-3">
                                        <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/[0.03] hover:bg-white/[0.05] rounded-[1rem] text-zinc-500 hover:text-white transition-all border border-white/[0.05]">
                                            <Github className="w-4 h-4" /> <span className="text-[10px] font-black tracking-widest uppercase">Profile</span>
                                        </button>
                                        <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-[1rem] text-indigo-400 transition-all border border-indigo-500/10">
                                            <Edit2 className="w-4 h-4" /> <span className="text-[10px] font-black tracking-widest uppercase">Modify</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="glass-premium p-8 rounded-[2.5rem] border-dashed border-zinc-800 flex flex-col items-center justify-center text-center py-16">
                        <div className="w-16 h-16 bg-white/[0.02] rounded-3xl flex items-center justify-center mb-6 text-zinc-700">
                            <UserPlus className="w-8 h-8" />
                        </div>
                        <h4 className="text-lg font-black text-zinc-500 tracking-tight">Expand Protocol X</h4>
                        <p className="text-zinc-600 text-sm font-medium mt-1 mb-8 max-w-xs">New developer onboarding is currently handled via specialized invitation tokens.</p>
                        <button disabled className="px-8 py-3 bg-zinc-900 text-zinc-700 rounded-xl text-[10px] font-black uppercase tracking-widest cursor-not-allowed border border-white/[0.02]">
                            Generate Token
                        </button>
                    </div>
                </div>

                {/* System Status / RBAC */}
                <div className="space-y-6">
                    <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] flex items-center gap-2">
                        <Terminal className="text-indigo-500 w-3 h-3" /> Authority Nodes
                    </h3>

                    <div className="glass-premium p-8 rounded-[3rem] space-y-8 relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-600/10 blur-[80px] rounded-full" />

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-600/20 flex items-center justify-center text-indigo-400">
                                    <Lock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-white font-black tracking-tight">RBAC Active</h4>
                                    <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Level 4 Clearance</p>
                                </div>
                            </div>

                            <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                                The Role-Based Access Control system is currently enforcing strict data isolation between development and production environments.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {[
                                { label: "Supabase Auth", status: "SYNCED" },
                                { label: "Neon DB", status: "STABLE" },
                                { label: "RSA 4096", status: "ACTIVE" }
                            ].map((node, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-black/20 border border-white/[0.05]">
                                    <span className="text-[11px] font-black text-zinc-400 uppercase tracking-widest">{node.label}</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                        <span className="text-[9px] font-black text-emerald-500 tracking-widest">{node.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4">
                            <div className="p-6 rounded-3xl bg-indigo-600/10 border border-indigo-600/20 text-center">
                                <Globe className="w-6 h-6 text-indigo-400 mx-auto mb-3" />
                                <h4 className="text-white font-black text-sm tracking-tight mb-1">Global Provisioning</h4>
                                <p className="text-zinc-500 text-[10px] font-medium leading-normal italic">
                                    Integration with DeadZone Global ID system is 82% complete.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
