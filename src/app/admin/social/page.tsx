"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Link as LinkIcon, Edit2, Trash2, X, Loader2, Github, Send, Twitter, MessageCircle, Share2, Shield, Globe, Terminal, Activity } from "lucide-react";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, any> = {
    github: Github,
    telegram: Send,
    twitter: Twitter,
    discord: MessageCircle,
};

export default function AdminSocialPage() {
    const [links, setLinks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        platform: "",
        url: "",
        isActive: true,
    });

    const fetchLinks = async () => {
        try {
            const res = await fetch("/api/admin/social");
            const data = await res.json();
            if (Array.isArray(data)) setLinks(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLinks();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const method = editingId ? "PUT" : "POST";
            const body = editingId ? { id: editingId, ...formData } : formData;

            const res = await fetch("/api/admin/social", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                setIsModalOpen(false);
                setEditingId(null);
                setFormData({ platform: "", url: "", isActive: true });
                fetchLinks();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            const res = await fetch(`/api/admin/social?id=${id}`, { method: "DELETE" });
            if (res.ok) fetchLinks();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-6 lg:p-10 space-y-10">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-indigo-500 font-black text-[10px] uppercase tracking-[0.3em] mb-2">
                        <Share2 className="w-3 h-3" />
                        Community Hub
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter">Social Outposts</h1>
                    <p className="text-zinc-500 text-sm font-medium mt-1">Manage external communication nodes and community channels.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[1.5rem] font-black uppercase text-xs tracking-widest transition-all shadow-2xl shadow-indigo-600/20 active:scale-95 group"
                >
                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" /> Deploy Outpost
                </button>
            </header>

            {/* Links Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {loading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-56 glass-premium rounded-[2.5rem] animate-pulse" />
                    ))
                ) : links.length === 0 ? (
                    <div className="col-span-full py-20 text-center glass-premium rounded-[2.5rem]">
                        <Share2 className="w-12 h-12 text-zinc-800 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-zinc-500">No nodes connected</h3>
                        <p className="text-sm text-zinc-600">Secure a social node to initialize community connectivity.</p>
                    </div>
                ) : links.map((link, i) => {
                    const Icon = iconMap[link.platform.toLowerCase()] || LinkIcon;
                    return (
                        <motion.div
                            key={link.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="group glass-premium p-8 rounded-[2.5rem] hover:border-indigo-500/30 transition-all relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                                <Icon className="w-24 h-24 rotate-[-10deg]" />
                            </div>

                            <div className="relative z-10 flex items-start gap-5 mb-8">
                                <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-600/10 border border-indigo-600/20 flex items-center justify-center text-indigo-400 shadow-xl shadow-black/50">
                                    <Icon className="w-8 h-8" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-xl font-black text-white capitalize tracking-tight mb-1">{link.platform}</h3>
                                    <p className="text-[10px] font-bold text-zinc-500 truncate lowercase opacity-60">{link.url}</p>
                                </div>
                            </div>

                            <div className="relative z-10 flex items-center justify-between">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            setEditingId(link.id);
                                            setFormData({ platform: link.platform, url: link.url, isActive: link.isActive });
                                            setIsModalOpen(true);
                                        }}
                                        className="p-2.5 hover:bg-white/5 rounded-xl text-zinc-500 hover:text-white transition-colors border border-white/5"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(link.id)}
                                        className="p-2.5 hover:bg-red-500/10 rounded-xl text-zinc-500 hover:text-red-400 transition-colors border border-white/5"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className={cn(
                                    "flex items-center gap-2 px-3 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest",
                                    link.isActive ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-zinc-800 text-zinc-500 border-white/5"
                                )}>
                                    <span className={cn("w-1.5 h-1.5 rounded-full", link.isActive ? "bg-emerald-500 animate-pulse" : "bg-zinc-600")} />
                                    {link.isActive ? "Active" : "Offline"}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Modal Redesign */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-[#030406]/90 backdrop-blur-2xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl glass-premium rounded-[3rem] p-8 md:p-12 overflow-y-auto max-h-[90vh] custom-scrollbar"
                        >
                            <div className="flex justify-between items-start mb-10">
                                <div>
                                    <div className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] mb-2 flex items-center gap-2">
                                        <Shield className="w-3 h-3" /> Connectivity Protocol v1.1
                                    </div>
                                    <h2 className="text-3xl font-black text-white tracking-tighter">{editingId ? "Reconfigure Node" : "Deploy New Node"}</h2>
                                </div>
                                <button
                                    onClick={() => { setIsModalOpen(false); setEditingId(null); }}
                                    className="p-3 hover:bg-white/5 rounded-2xl text-zinc-500 hover:text-white transition-all active:scale-90"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-3 group">
                                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">Platform Vector</label>
                                    <select
                                        required
                                        value={formData.platform}
                                        onChange={e => setFormData({ ...formData, platform: e.target.value })}
                                        className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-black appearance-none"
                                    >
                                        <option value="" className="bg-[#030406] text-zinc-600">Select Frequency...</option>
                                        <option value="github" className="bg-[#030406] text-white">GITHUB</option>
                                        <option value="telegram" className="bg-[#030406] text-white">TELEGRAM</option>
                                        <option value="twitter" className="bg-[#030406] text-white">TWITTER / X</option>
                                        <option value="discord" className="bg-[#030406] text-white">DISCORD</option>
                                    </select>
                                </div>

                                <div className="space-y-3 group">
                                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">Node URL Address</label>
                                    <input
                                        required
                                        type="url"
                                        value={formData.url}
                                        onChange={e => setFormData({ ...formData, url: e.target.value })}
                                        placeholder="https://..."
                                        className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-medium"
                                    />
                                </div>

                                <div className="flex items-center gap-6 p-6 rounded-[1.5rem] bg-white/[0.03] border border-white/[0.05] group cursor-pointer" onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}>
                                    <div className={cn(
                                        "w-12 h-6 rounded-full relative transition-colors duration-500",
                                        formData.isActive ? "bg-indigo-600" : "bg-zinc-800"
                                    )}>
                                        <div className={cn(
                                            "absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-500 shadow-lg",
                                            formData.isActive ? "left-7" : "left-1"
                                        )} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white font-black text-sm uppercase tracking-tight">Active State</span>
                                        <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Visibility on peripheral sites</span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-6 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 disabled:from-zinc-800 disabled:to-zinc-900 text-white rounded-[1.5rem] font-black uppercase text-xs tracking-[0.3em] transition-all shadow-xl shadow-indigo-600/20 active:scale-95 flex items-center justify-center gap-4"
                                >
                                    {isSubmitting ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>{editingId ? "Finalize Configuration" : "Establish Link"} <Terminal className="w-4 h-4" /></>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
