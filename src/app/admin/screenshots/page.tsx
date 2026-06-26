"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Image as ImageIcon, Edit2, Trash2, X, Loader2, Shield, Camera, Layout, Terminal, Box } from "lucide-react";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function AdminScreenshotsPage() {
    const [screenshots, setScreenshots] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        imageUrl: "",
        description: "",
        category: "",
        order: 0,
    });

    const fetchScreenshots = async () => {
        try {
            const res = await fetch("/api/admin/screenshots");
            const data = await res.json();
            if (Array.isArray(data)) setScreenshots(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchScreenshots();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const url = editingId ? `/api/admin/screenshots/${editingId}` : "/api/admin/screenshots";
            const method = editingId ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setIsModalOpen(false);
                setEditingId(null);
                setFormData({ title: "", imageUrl: "", description: "", category: "", order: 0 });
                fetchScreenshots();
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
            const res = await fetch(`/api/admin/screenshots/${id}`, { method: "DELETE" });
            if (res.ok) fetchScreenshots();
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
                        <Camera className="w-3 h-3" />
                        Visual Assets
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter">Gallery Records</h1>
                    <p className="text-zinc-500 text-sm font-medium mt-1">Curate the high-fidelity visual documentation for DeadZone.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[1.5rem] font-black uppercase text-xs tracking-widest transition-all shadow-2xl shadow-indigo-600/20 active:scale-95 group"
                >
                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" /> Register Snapshot
                </button>
            </header>

            {/* Signal Stats */}
            <div className="flex items-center gap-4 px-6 py-4 bg-white/[0.03] border border-white/[0.05] rounded-[1.5rem] w-fit">
                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Active nodes:</span>
                <span className="text-sm font-black text-indigo-400">{screenshots.length}</span>
            </div>

            {/* Screenshots Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {loading ? (
                    Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="aspect-[9/16] glass-premium rounded-[2.5rem] animate-pulse" />
                    ))
                ) : screenshots.length === 0 ? (
                    <div className="col-span-full py-32 text-center glass-premium rounded-[3rem]">
                        <ImageIcon className="w-16 h-16 text-zinc-800 mx-auto mb-6" />
                        <h3 className="text-xl font-bold text-zinc-500 tracking-tight">Gallery Empty</h3>
                        <p className="text-zinc-600 text-sm font-medium mt-1">Initialize visual documentation to populate this sector.</p>
                    </div>
                ) : (
                    screenshots.map((screenshot, i) => (
                        <motion.div
                            key={screenshot.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="group relative glass-premium overflow-hidden rounded-[2.5rem] border-white/5 hover:border-indigo-500/30 transition-all duration-700"
                        >
                            <div className="aspect-[9/19] relative overflow-hidden">
                                <img
                                    src={screenshot.imageUrl}
                                    alt={screenshot.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#030406] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />

                                <div className="absolute top-6 right-6 flex flex-col gap-2 items-end">
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                                        <button
                                            onClick={() => {
                                                setEditingId(screenshot.id);
                                                setFormData({ ...screenshot });
                                                setIsModalOpen(true);
                                            }}
                                            className="p-3 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl text-white hover:bg-indigo-600 transition-colors shadow-2xl"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(screenshot.id)}
                                            className="p-3 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl text-red-400 hover:bg-red-500 hover:text-white transition-colors shadow-2xl"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    {screenshot.category && (
                                        <span className="px-3 py-1 bg-indigo-500/20 backdrop-blur-xl border border-indigo-500/20 rounded-full text-[8px] font-black uppercase tracking-widest text-indigo-400">
                                            {screenshot.category}
                                        </span>
                                    )}
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-8 space-y-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-xl font-black text-white tracking-tight leading-tight">{screenshot.title}</h3>
                                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                                        <Terminal className="w-3 h-3" /> Vector: {screenshot.order}
                                    </p>
                                </div>
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
                                        <Shield className="w-3 h-3" /> Visual Protocol v2.0
                                    </div>
                                    <h2 className="text-3xl font-black text-white tracking-tighter">{editingId ? "Modify Snapshot" : "Register Snapshot"}</h2>
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
                                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">Snapshot Designation</label>
                                    <input
                                        required
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="Dynamic Island Preview"
                                        className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-bold placeholder:text-zinc-800"
                                    />
                                </div>

                                <div className="space-y-3 group">
                                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">Asset Source URL</label>
                                    <input
                                        required
                                        value={formData.imageUrl}
                                        onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                                        placeholder="https://cdn.projectmove.com/sh_01.jpg"
                                        className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-medium placeholder:text-zinc-800"
                                    />
                                </div>

                                <div className="space-y-3 group">
                                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">Context Documentation</label>
                                    <textarea
                                        rows={3}
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Detail the features showcased in this capture..."
                                        className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.5rem] px-6 py-5 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-medium resize-none placeholder:text-zinc-800"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3 group">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">Category Sector</label>
                                        <input
                                            value={formData.category}
                                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                                            placeholder="e.g. SYSTEM UI"
                                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-black uppercase tracking-widest"
                                        />
                                    </div>
                                    <div className="space-y-3 group">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">Order Vector</label>
                                        <input
                                            type="number"
                                            value={formData.order}
                                            onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-mono font-bold"
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
                                        <>{editingId ? "Update Metadata" : "Authorize Record"} <Box className="w-4 h-4" /></>
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
