"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Users, Search, Edit2, Trash2, X, Loader2, Link as LinkIcon, Globe, Github, Twitter, Send, Fingerprint, Shield, Terminal } from "lucide-react";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function AdminTeamPage() {
    const [team, setTeam] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        role: "",
        country: "",
        image: "",
        bio: "",
        github: "",
        telegram: "",
        twitter: "",
        website: "",
    });

    const fetchTeam = async () => {
        try {
            const res = await fetch("/api/admin/team");
            const data = await res.json();
            if (Array.isArray(data)) setTeam(data);
        } catch (error) {
            console.error("Fetch team failed:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeam();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const url = editingId ? `/api/admin/team/${editingId}` : "/api/admin/team";
            const method = editingId ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setIsModalOpen(false);
                setEditingId(null);
                setFormData({ name: "", role: "", country: "", image: "", bio: "", github: "", telegram: "", twitter: "", website: "" });
                fetchTeam();
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
            const res = await fetch(`/api/admin/team/${id}`, { method: "DELETE" });
            if (res.ok) fetchTeam();
        } catch (error) {
            console.error(error);
        }
    };

    const filteredTeam = team.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 lg:p-10 space-y-10">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-indigo-500 font-black text-[10px] uppercase tracking-[0.3em] mb-2">
                        <Users className="w-3 h-3" />
                        DeadZone Contributors
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter">Team Roster</h1>
                    <p className="text-zinc-500 text-sm font-medium mt-1">Manage the core developers and creators behind the ecosystem.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[1.5rem] font-black uppercase text-xs tracking-widest transition-all shadow-2xl shadow-indigo-600/20 active:scale-95 group"
                >
                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" /> Recruit Contributor
                </button>
            </header>

            {/* Search Bar */}
            <div className="relative group max-w-2xl">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors w-4 h-4" />
                <input
                    type="text"
                    placeholder="Search contributors..."
                    className="w-full pl-14 pr-6 py-4 bg-white/[0.03] border border-white/[0.05] rounded-[1.5rem] text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {loading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-80 glass-premium rounded-[3rem] animate-pulse" />
                    ))
                ) : filteredTeam.length === 0 ? (
                    <div className="col-span-full py-20 text-center glass-premium rounded-[3rem]">
                        <Users className="w-12 h-12 text-zinc-800 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-zinc-500">No personnel identified</h3>
                        <p className="text-sm text-zinc-600">Add a member to start detailing the team infrastructure.</p>
                    </div>
                ) : (
                    filteredTeam.map((member, i) => (
                        <motion.div
                            key={member.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="glass-premium rounded-[3rem] p-8 group hover:border-indigo-500/30 transition-all relative overflow-hidden flex flex-col justify-between"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Fingerprint className="w-32 h-32 rotate-[-15deg]" />
                            </div>

                            <div className="relative z-10 space-y-6">
                                <div className="flex justify-between items-start">
                                    <div className="w-20 h-20 rounded-[2rem] bg-zinc-800 border-2 border-white/5 overflow-hidden shadow-2xl relative">
                                        {member.image ? (
                                            <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-zinc-700 bg-indigo-600/5">
                                                <Users className="w-8 h-8" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-indigo-600/10 mix-blend-overlay" />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setEditingId(member.id);
                                                setFormData({ ...member });
                                                setIsModalOpen(true);
                                            }}
                                            className="p-2.5 hover:bg-white/5 rounded-2xl text-zinc-500 hover:text-white transition-colors"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(member.id)}
                                            className="p-2.5 hover:bg-red-500/10 rounded-2xl text-zinc-500 hover:text-red-400 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-indigo-400 transition-colors">{member.name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{member.role}</span>
                                        <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                                            <Globe className="w-3 h-3" /> {member.country || "GLOBAL"}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-zinc-500 text-sm font-medium line-clamp-3 leading-relaxed">
                                    {member.bio || "No profile documentation provided."}
                                </p>
                            </div>

                            <div className="relative z-10 flex items-center gap-3 pt-6 mt-6 border-t border-white/[0.03]">
                                {member.github && (
                                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-white/5 rounded-lg text-zinc-500 hover:text-white transition-colors">
                                        <Github className="w-4 h-4" />
                                    </a>
                                )}
                                {member.twitter && (
                                    <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-white/5 rounded-lg text-zinc-500 hover:text-white transition-colors">
                                        <Twitter className="w-4 h-4" />
                                    </a>
                                )}
                                {member.telegram && (
                                    <a href={member.telegram} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-white/5 rounded-lg text-zinc-500 hover:text-white transition-colors">
                                        <Send className="w-4 h-4" />
                                    </a>
                                )}
                                {member.website && (
                                    <a href={member.website} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-white/5 rounded-lg text-zinc-500 hover:text-white transition-colors">
                                        <LinkIcon className="w-4 h-4" />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))
                )}
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
                                        <Shield className="w-3 h-3" /> Identity Protocol v2.1
                                    </div>
                                    <h2 className="text-3xl font-black text-white tracking-tighter">{editingId ? "Modify Profile" : "Recruit Member"}</h2>
                                </div>
                                <button
                                    onClick={() => { setIsModalOpen(false); setEditingId(null); }}
                                    className="p-3 hover:bg-white/5 rounded-2xl text-zinc-500 hover:text-white transition-all active:scale-90"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3 group">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">Identity Designation</label>
                                        <input
                                            required
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="John Doe"
                                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-bold placeholder:text-zinc-800"
                                        />
                                    </div>
                                    <div className="space-y-3 group">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">Operational Role</label>
                                        <input
                                            required
                                            value={formData.role}
                                            onChange={e => setFormData({ ...formData, role: e.target.value })}
                                            placeholder="Lead Architect"
                                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-bold placeholder:text-zinc-800"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3 group">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">Physical Origin</label>
                                        <input
                                            value={formData.country}
                                            onChange={e => setFormData({ ...formData, country: e.target.value })}
                                            placeholder="e.g. Indonesia"
                                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-bold placeholder:text-zinc-800"
                                        />
                                    </div>
                                    <div className="space-y-3 group">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">Avatar Asset Link</label>
                                        <input
                                            value={formData.image}
                                            onChange={e => setFormData({ ...formData, image: e.target.value })}
                                            placeholder="https://..."
                                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-medium placeholder:text-zinc-800"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3 group">
                                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">Identity Documentation (Bio)</label>
                                    <textarea
                                        rows={4}
                                        value={formData.bio}
                                        onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                        placeholder="Outline technical background and project focus..."
                                        className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.5rem] px-6 py-5 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-medium resize-none placeholder:text-zinc-800"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3 group">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">GitHub Node</label>
                                        <input
                                            value={formData.github}
                                            onChange={e => setFormData({ ...formData, github: e.target.value })}
                                            placeholder="https://github.com/..."
                                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-medium placeholder:text-zinc-800"
                                        />
                                    </div>
                                    <div className="space-y-3 group">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">Telegram Vector</label>
                                        <input
                                            value={formData.telegram}
                                            onChange={e => setFormData({ ...formData, telegram: e.target.value })}
                                            placeholder="https://t.me/..."
                                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-medium placeholder:text-zinc-800"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3 group">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">Twitter Signal</label>
                                        <input
                                            value={formData.twitter}
                                            onChange={e => setFormData({ ...formData, twitter: e.target.value })}
                                            placeholder="https://twitter.com/..."
                                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-medium placeholder:text-zinc-800"
                                        />
                                    </div>
                                    <div className="space-y-3 group">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">Personal Website</label>
                                        <input
                                            value={formData.website}
                                            onChange={e => setFormData({ ...formData, website: e.target.value })}
                                            placeholder="https://..."
                                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-medium placeholder:text-zinc-800"
                                        />
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
                                        <>{editingId ? "Update Metadata" : "Authorize Identity"} <Terminal className="w-4 h-4" /></>
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
