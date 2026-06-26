"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Settings, Database, Server, Bell, Shield, Info, Layout, Check, Loader2, Cpu, Globe, Terminal, HardDrive, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
    const [heroText, setHeroText] = useState("DeadZone v2.0 Now Available");
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch("/api/admin/settings");
                const data = await res.json();
                if (data.heroAlertText) setHeroText(data.heroAlertText);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleSaveHero = async () => {
        setIsSaving(true);
        setSaveSuccess(false);
        try {
            const res = await fetch("/api/admin/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ key: "heroAlertText", value: heroText }),
            });
            if (res.ok) {
                setSaveSuccess(true);
                setTimeout(() => setSaveSuccess(false), 3000);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="p-6 lg:p-10 space-y-10">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-indigo-500 font-black text-[10px] uppercase tracking-[0.3em] mb-2">
                        <Terminal className="w-3 h-3" />
                        Infrastructure Parameters
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter">System Core</h1>
                    <p className="text-zinc-500 text-sm font-medium mt-1">Configure global variables and monitor cluster health.</p>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 bg-white/[0.03] border border-white/[0.05] rounded-[1.5rem]">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Mainframe Stable</span>
                </div>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                {/* Site Configuration */}
                <div className="xl:col-span-8 space-y-10">
                    <section className="glass-premium rounded-[3rem] p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                            <Layout className="w-48 h-48 rotate-[15deg]" />
                        </div>

                        <div className="relative z-10 flex items-center gap-3 mb-10">
                            <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border border-indigo-600/20 flex items-center justify-center text-indigo-400">
                                <Globe className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-black text-white tracking-tight">Mainframe Display</h3>
                        </div>

                        <div className="relative z-10 space-y-10">
                            <div className="space-y-4 group">
                                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] ml-1 group-focus-within:text-indigo-400 transition-colors">
                                    Broadcast Signal (Hero Alert)
                                </label>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <input
                                        value={heroText}
                                        onChange={e => setHeroText(e.target.value)}
                                        placeholder="e.g. DeadZone v2.0 Now Available"
                                        className="flex-1 px-6 py-5 bg-white/[0.03] border border-white/[0.05] rounded-[1.5rem] text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-bold placeholder:text-zinc-800"
                                    />
                                    <button
                                        onClick={handleSaveHero}
                                        disabled={isSaving || isLoading}
                                        className="px-10 py-5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 text-white rounded-[1.5rem] font-black uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-600/20 active:scale-95"
                                    >
                                        {isSaving ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : saveSuccess ? (
                                            <>Transmitted <Check className="w-5 h-5" /></>
                                        ) : (
                                            "Transmit"
                                        )}
                                    </button>
                                </div>
                                <p className="text-[10px] text-zinc-600 font-medium italic ml-1 leading-relaxed max-w-lg">
                                    This signal will be broadcasted to the homepage pulse node, notifying all active clients of high-priority system updates.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Cluster Nodes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { icon: Database, title: "Data Clusters", desc: "Neon & Supabase S3 synchronized.", status: "OPTIMIZED", color: "indigo" },
                            { icon: Server, title: "Compute Nodes", desc: "8 remote build distribution vectors.", status: "BALANCED", color: "indigo" },
                            { icon: Shield, title: "Security Layers", desc: "End-to-end RSA encryption active.", status: "SECURE", color: "emerald" },
                            { icon: Bell, title: "Signal Dispatch", desc: "Global webhook event bus status.", status: "WAITING", color: "zinc" },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-premium p-8 rounded-[2.5rem] group hover:border-indigo-500/30 transition-all cursor-default"
                            >
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center justify-between">
                                        <div className="w-14 h-14 bg-white/[0.03] border border-white/[0.05] rounded-2xl flex items-center justify-center text-zinc-500 group-hover:text-indigo-400 transition-colors shadow-black/50 shadow-xl">
                                            <item.icon className="w-7 h-7" />
                                        </div>
                                        <div className={cn(
                                            "px-3 py-1.5 rounded-xl border text-[9px] font-black tracking-widest uppercase",
                                            item.color === 'indigo' ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" :
                                                item.color === 'emerald' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                                    "bg-zinc-800 text-zinc-500 border-white/5"
                                        )}>
                                            {item.status}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-white tracking-tight mb-2">{item.title}</h3>
                                        <p className="text-sm text-zinc-500 font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Info Sidebar */}
                <div className="xl:col-span-4 space-y-8">
                    <div className="p-10 glass-premium rounded-[3.5rem] relative overflow-hidden border-indigo-500/20 bg-indigo-500/[0.02]">
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full" />

                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-indigo-600/10 border border-indigo-600/20 rounded-[1.5rem] flex items-center justify-center text-indigo-400 mb-8 shadow-2xl">
                                <Cpu className="w-8 h-8" />
                            </div>
                            <h4 className="text-2xl font-black text-white tracking-tighter mb-4">Core v2.1.0</h4>
                            <div className="space-y-6">
                                <p className="text-zinc-500 text-sm font-medium leading-relaxed">
                                    All system-level configurations are currently synchronized with the <span className="text-indigo-400 font-bold">`deadzone-web-config`</span> private cluster during the migration to Neon DB.
                                </p>

                                <div className="space-y-4">
                                    {[
                                        { label: "Storage", icon: HardDrive, val: "0.8 TB used" },
                                        { label: "Traffic", icon: Globe, val: "42k requests/hr" },
                                        { label: "Access", icon: Lock, val: "Identity v3 Active" }
                                    ].map((stat, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/[0.03]">
                                            <div className="flex items-center gap-3">
                                                <stat.icon className="w-4 h-4 text-zinc-600" />
                                                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{stat.label}</span>
                                            </div>
                                            <span className="text-[11px] font-bold text-white tracking-tight">{stat.val}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className="w-full py-4 px-6 border border-white/5 rounded-2xl text-[10px] font-black text-zinc-600 uppercase tracking-widest hover:text-white hover:bg-white/5 transition-all">
                                    View Full Component Health
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 rounded-[2.5rem] border border-dashed border-zinc-800 flex flex-col items-center justify-center text-center">
                        <div className="w-12 h-12 bg-white/[0.02] rounded-2xl flex items-center justify-center text-zinc-800 mb-4">
                            <Database className="w-6 h-6" />
                        </div>
                        <h5 className="text-sm font-black text-zinc-600 tracking-widest uppercase">Encryption Node</h5>
                        <p className="text-[10px] text-zinc-700 font-bold mt-1">AES-256 GCM cluster active</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
