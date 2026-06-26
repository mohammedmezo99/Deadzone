"use client";

import { motion } from "framer-motion";
import { Mail, Search, CheckCircle2, MessageSquare, Shield, Terminal, Clock, Filter, ChevronRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function AdminContactPage() {
    const [submissions, setSubmissions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");

    const fetchSubmissions = async () => {
        try {
            const res = await fetch("/api/admin/contact");
            const data = await res.json();
            if (Array.isArray(data)) setSubmissions(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const handleUpdateStatus = async (id: string, status: string) => {
        try {
            await fetch("/api/admin/contact", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status }),
            });
            fetchSubmissions();
        } catch (error) {
            console.error(error);
        }
    };

    const filteredSubmissions = submissions.filter((s) => {
        const matchesStatus = filter === "all" || s.status === filter;
        const matchesType = typeFilter === "all" || s.type === typeFilter;
        return matchesStatus && matchesType;
    });

    return (
        <div className="p-6 lg:p-10 space-y-10">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-indigo-500 font-black text-[10px] uppercase tracking-[0.3em] mb-2">
                        <MessageSquare className="w-3 h-3" />
                        Inbound Intelligence
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter">Support Inbox</h1>
                    <p className="text-zinc-500 text-sm font-medium mt-1">Manage user queries, bug reports, and feature requests.</p>
                </div>
                <div className="flex items-center gap-4 px-6 py-4 bg-white/[0.03] border border-white/[0.05] rounded-[1.5rem]">
                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Unresolved:</span>
                    <span className="text-sm font-black text-indigo-400">{submissions.filter(s => s.status === 'new').length}</span>
                </div>
            </header>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="space-y-4 flex-1">
                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2 mb-2">
                        <Filter className="w-3 h-3" /> Status Vector
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {["all", "new", "read", "resolved"].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={cn(
                                    "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border",
                                    filter === status
                                        ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20"
                                        : "bg-white/[0.03] border-white/[0.05] text-zinc-500 hover:text-white hover:bg-white/[0.05]"
                                )}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="space-y-4 flex-1">
                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2 mb-2">
                        <Terminal className="w-3 h-3" /> Payload Type
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {["all", "bug", "feature", "general"].map((type) => (
                            <button
                                key={type}
                                onClick={() => setTypeFilter(type)}
                                className={cn(
                                    "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border",
                                    typeFilter === type
                                        ? "bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-600/20"
                                        : "bg-white/[0.03] border-white/[0.05] text-zinc-500 hover:text-white hover:bg-white/[0.05]"
                                )}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="glass-premium rounded-[2.5rem] overflow-hidden">
                {/* Desktop View: Table */}
                <div className="hidden xl:block overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/[0.05] bg-white/[0.01]">
                                <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Protocol Origin</th>
                                <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-center">Identity</th>
                                <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-center">Classification</th>
                                <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Subject Payload</th>
                                <th className="px-8 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-right">Operational State</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse"><td colSpan={5} className="h-20 bg-white/[0.01]" /></tr>
                                ))
                            ) : filteredSubmissions.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-20 text-center">
                                        <div className="text-zinc-600 font-black uppercase text-xs tracking-widest">No signals detected in this sector</div>
                                    </td>
                                </tr>
                            ) : filteredSubmissions.map((sub) => (
                                <tr key={sub.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-black">
                                                {sub.name[0]}
                                            </div>
                                            <span className="font-bold text-white whitespace-nowrap">{sub.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-zinc-500 text-center font-medium whitespace-nowrap text-xs">{sub.email}</td>
                                    <td className="px-8 py-6 text-center">
                                        <span className={cn(
                                            "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                                            sub.type === "bug" ? "bg-red-500/10 text-red-500 border-red-500/20" :
                                                sub.type === "feature" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                                                    "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                                        )}>
                                            {sub.type}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-zinc-400 max-w-xs truncate text-sm font-medium">{sub.subject}</td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-4">
                                            <span className={cn(
                                                "w-2 h-2 rounded-full",
                                                sub.status === "new" ? "bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]" :
                                                    sub.status === "read" ? "bg-indigo-500" : "bg-emerald-500"
                                            )} />
                                            <select
                                                value={sub.status}
                                                onChange={(e) => handleUpdateStatus(sub.id, e.target.value)}
                                                className="bg-white/[0.03] border border-white/[0.05] rounded-xl px-3 py-2 text-xs font-black text-zinc-400 focus:outline-none focus:border-indigo-500/50 appearance-none cursor-pointer hover:text-white transition-colors"
                                            >
                                                <option value="new" className="bg-[#030406]">NEW</option>
                                                <option value="read" className="bg-[#030406]">READ</option>
                                                <option value="resolved" className="bg-[#030406]">RESOLVED</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile View: Signal Cards */}
                <div className="xl:hidden divide-y divide-white/[0.05]">
                    {loading ? (
                        <div className="p-8 text-center text-zinc-500 animate-pulse">Scanning frequencies...</div>
                    ) : filteredSubmissions.length === 0 ? (
                        <div className="p-12 text-center text-zinc-600 font-black uppercase tracking-[0.2em] text-[10px]">Zero signals detected</div>
                    ) : (
                        filteredSubmissions.map((sub) => (
                            <div key={sub.id} className="p-8 space-y-6 group">
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex items-center gap-4 min-w-0">
                                        <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-600/20 flex items-center justify-center text-indigo-400 font-black text-xl">
                                            {sub.name[0]}
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="font-black text-white text-lg tracking-tight truncate mb-0.5">{sub.name}</h4>
                                            <span className="text-[10px] font-bold text-zinc-500 truncate block">{sub.email}</span>
                                        </div>
                                    </div>
                                    <span className={cn(
                                        "px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border shrink-0",
                                        sub.type === "bug" ? "bg-red-500/10 text-red-500 border-red-500/20" :
                                            sub.type === "feature" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                                                "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                                    )}>
                                        {sub.type}
                                    </span>
                                </div>

                                <div className="p-5 bg-white/[0.02] border border-white/[0.03] rounded-[1.5rem] relative">
                                    <div className="absolute -top-3 left-6 px-3 bg-[#030406] border border-white/[0.05] rounded-full text-[9px] font-black text-zinc-600 uppercase tracking-widest">Signal Subject</div>
                                    <p className="text-white font-medium text-sm leading-relaxed pt-1">{sub.subject}</p>
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                    <div className="flex items-center gap-3">
                                        <Clock className="w-3.5 h-3.5 text-zinc-600" />
                                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Recently Received</span>
                                    </div>
                                    <select
                                        value={sub.status}
                                        onChange={(e) => handleUpdateStatus(sub.id, e.target.value)}
                                        className="bg-indigo-600/10 border border-indigo-500/20 rounded-xl px-4 py-2 text-[10px] font-black text-indigo-400 focus:outline-none appearance-none cursor-pointer"
                                    >
                                        <option value="new">MARK NEW</option>
                                        <option value="read">MARK READ</option>
                                        <option value="resolved">RESOLVE</option>
                                    </select>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
