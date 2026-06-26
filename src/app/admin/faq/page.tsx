"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, HelpCircle, Search, Edit2, Trash2, X, Loader2, MessageSquare, Shield, Globe, Terminal } from "lucide-react";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function AdminFaqPage() {
    const [faqs, setFaqs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        question: "",
        answer: "",
        category: "",
        order: 0,
    });

    const fetchFaqs = async () => {
        try {
            const res = await fetch("/api/admin/faq");
            const data = await res.json();
            if (Array.isArray(data)) setFaqs(data);
        } catch (error) {
            console.error("Fetch FAQs failed:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFaqs();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const url = editingId ? `/api/admin/faq/${editingId}` : "/api/admin/faq";
            const method = editingId ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setIsModalOpen(false);
                setEditingId(null);
                setFormData({ question: "", answer: "", category: "", order: 0 });
                fetchFaqs();
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
            const res = await fetch(`/api/admin/faq/${id}`, { method: "DELETE" });
            if (res.ok) fetchFaqs();
        } catch (error) {
            console.error(error);
        }
    };

    const filteredFaqs = faqs.filter(f =>
        f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 lg:p-10 space-y-10">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-indigo-500 font-black text-[10px] uppercase tracking-[0.3em] mb-2">
                        <MessageSquare className="w-3 h-3" />
                        Knowledge Base
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter">FAQ Management</h1>
                    <p className="text-zinc-500 text-sm font-medium mt-1">Manage frequently asked questions and community documentation.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[1.5rem] font-black uppercase text-xs tracking-widest transition-all shadow-2xl shadow-indigo-600/20 active:scale-95 group"
                >
                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" /> Add FAQ Entry
                </button>
            </header>

            {/* Search & Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search questions or categories..."
                        className="w-full pl-14 pr-6 py-4 bg-white/[0.03] border border-white/[0.05] rounded-[1.5rem] text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-4 px-6 py-4 bg-white/[0.03] border border-white/[0.05] rounded-[1.5rem]">
                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Active nodes:</span>
                    <span className="text-sm font-black text-indigo-400">{filteredFaqs.length}</span>
                </div>
            </div>

            {/* FAQ Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {loading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-64 glass-premium rounded-[2.5rem] animate-pulse" />
                    ))
                ) : filteredFaqs.length === 0 ? (
                    <div className="col-span-full py-20 text-center glass-premium rounded-[2.5rem]">
                        <HelpCircle className="w-12 h-12 text-zinc-800 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-zinc-500">No entries identified</h3>
                        <p className="text-sm text-zinc-600">Initialize a new entry to expand the knowledge base.</p>
                    </div>
                ) : (
                    filteredFaqs.map((faq, i) => (
                        <motion.div
                            key={faq.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="glass-premium rounded-[2.5rem] p-7 group hover:border-indigo-500/30 transition-all relative overflow-hidden flex flex-col justify-between"
                        >
                            <div className="relative z-10 space-y-5">
                                <div className="flex justify-between items-start">
                                    <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                        {faq.category}
                                    </span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setEditingId(faq.id);
                                                setFormData({
                                                    question: faq.question,
                                                    answer: faq.answer,
                                                    category: faq.category,
                                                    order: faq.order,
                                                });
                                                setIsModalOpen(true);
                                            }}
                                            className="p-2 hover:bg-white/5 rounded-xl text-zinc-500 hover:text-white transition-colors"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(faq.id)}
                                            className="p-2 hover:bg-red-500/10 rounded-xl text-zinc-500 hover:text-red-400 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-black text-white tracking-tight mb-3 group-hover:text-indigo-400 transition-colors line-clamp-2">{faq.question}</h3>
                                    <p className="text-zinc-500 text-sm font-medium line-clamp-3 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>

                            <div className="relative z-10 flex items-center justify-between pt-5 mt-5 border-t border-white/[0.03]">
                                <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                                    Sequence Index: {faq.order}
                                </div>
                                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full group-hover:scale-150 transition-transform shadow-lg shadow-indigo-500/50" />
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
                            className="relative w-full max-w-2xl glass-premium rounded-[2.5rem] p-8 md:p-12 overflow-y-auto max-h-[90vh] custom-scrollbar"
                        >
                            <div className="flex justify-between items-start mb-10">
                                <div>
                                    <div className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] mb-2 flex items-center gap-2">
                                        <Shield className="w-3 h-3" /> Entry Protocol v1.4
                                    </div>
                                    <h2 className="text-3xl font-black text-white tracking-tighter">{editingId ? "Modify FAQ" : "Register FAQ"}</h2>
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
                                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">Question Ingress</label>
                                    <input
                                        required
                                        value={formData.question}
                                        onChange={e => setFormData({ ...formData, question: e.target.value })}
                                        placeholder="Type the inquiry designation..."
                                        className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-bold placeholder:text-zinc-800"
                                    />
                                </div>

                                <div className="space-y-3 group">
                                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">Knowledge Payload</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={formData.answer}
                                        onChange={e => setFormData({ ...formData, answer: e.target.value })}
                                        placeholder="Define the official system response..."
                                        className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.5rem] px-6 py-5 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-medium resize-none placeholder:text-zinc-800"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3 group">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">Category Tag</label>
                                        <input
                                            required
                                            value={formData.category}
                                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                                            placeholder="e.g. CORE"
                                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-black uppercase tracking-widest"
                                        />
                                    </div>
                                    <div className="space-y-3 group">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">Sequence Vector</label>
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
                                        <>{editingId ? "Commit Changes" : "Initialize Entry"} <Terminal className="w-4 h-4" /></>
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
