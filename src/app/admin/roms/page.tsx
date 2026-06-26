"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Cpu, Download, Box, Calendar, X, Loader2, Edit2, Trash2, Shield, Activity, HardDrive, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const initialFormData = {
    deviceId: "",
    name: "",
    version: "",
    androidVersion: "",
    flavor: "",
    soc: "",
    platform: "",
    type: "OFFICIAL_STABLE",
    downloadUrl: "",
    githubRunUrl: "",
    pixeldrainUrl: "",
    sha256: "",
    fileSize: "",
    changelog: "",
    installationGuide: "",
    isStable: true,
    isTestBuild: false,
    flashType: "",
};

export default function RomsPage() {
    const [roms, setRoms] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Modal & Form State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [devices, setDevices] = useState<any[]>([]);
    const [formData, setFormData] = useState(initialFormData);
    const [editingId, setEditingId] = useState<string | null>(null);

    const fetchRoms = async () => {
        try {
            const res = await fetch("/api/admin/roms");
            const data = await res.json();
            if (Array.isArray(data)) {
                setRoms(data);
            } else {
                setRoms([]);
            }
        } catch (error) {
            console.error("Failed to fetch ROMs:", error);
            setRoms([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchDevices = async () => {
        try {
            const res = await fetch("/api/admin/devices");
            const data = await res.json();
            if (Array.isArray(data)) setDevices(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchRoms();
        fetchDevices();
    }, []);

    const handleDeploy = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const url = editingId ? `/api/admin/roms/${editingId}` : "/api/admin/roms";
            const method = editingId ? "PUT" : "POST";

            const res = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setIsModalOpen(false);
                setEditingId(null);
                setFormData(initialFormData);
                fetchRoms();
            } else {
                const errData = await res.json();
                alert(`Failed: ${errData.error}`);
            }
        } catch (err) {
            console.error(err);
            alert("SQL connection error.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this ROM version?")) return;
        try {
            const res = await fetch(`/api/admin/roms/${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchRoms();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const filteredRoms = roms.filter(r =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.device?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.version.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 lg:p-10 space-y-10">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-indigo-500 font-black text-[10px] uppercase tracking-[0.3em] mb-2">
                        <Terminal className="w-3 h-3" />
                        Build Infrastructure
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter">ROM Repository</h1>
                    <p className="text-zinc-500 text-sm font-medium mt-1">Manage firmware distributions and release cycles.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[1.5rem] font-black uppercase text-xs tracking-widest transition-all shadow-2xl shadow-indigo-600/20 active:scale-95 group"
                >
                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" /> Authorize Build
                </button>
            </header>

            {/* Search & Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search builds or devices..."
                        className="w-full pl-14 pr-6 py-4 bg-white/[0.03] border border-white/[0.05] rounded-[1.5rem] text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-4 px-6 py-4 bg-white/[0.03] border border-white/[0.05] rounded-[1.5rem]">
                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Active builds:</span>
                    <span className="text-sm font-black text-indigo-400">{filteredRoms.length}</span>
                </div>
            </div>

            {/* ROM Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {loading ? (
                    Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="h-72 glass-premium rounded-[2.5rem] animate-pulse" />
                    ))
                ) : filteredRoms.length === 0 ? (
                    <div className="col-span-full py-20 text-center glass-premium rounded-[2.5rem]">
                        <Box className="w-12 h-12 text-zinc-800 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-zinc-500">No builds detected</h3>
                        <p className="text-sm text-zinc-600">Authorize a new build to populate the repository.</p>
                    </div>
                ) : (
                    filteredRoms.map((rom, i) => (
                        <motion.div
                            key={rom.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="glass-premium rounded-[2.5rem] p-6 group hover:border-indigo-500/30 transition-all relative overflow-hidden flex flex-col justify-between"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Box className="w-32 h-32 rotate-[-15deg]" />
                            </div>

                            <div className="relative z-10 space-y-5">
                                <div className="flex justify-between items-start">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-600/20 flex items-center justify-center text-indigo-400 shadow-xl shadow-black/50">
                                        <Box className="w-6 h-6" />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setEditingId(rom.id);
                                                setFormData({
                                                    deviceId: rom.deviceId,
                                                    name: rom.name,
                                                    version: rom.version,
                                                    androidVersion: rom.androidVersion,
                                                    flavor: rom.flavor || "",
                                                    soc: rom.soc || "",
                                                    platform: rom.platform || "",
                                                    type: rom.type,
                                                    downloadUrl: rom.downloadUrl,
                                                    githubRunUrl: rom.githubRunUrl || "",
                                                    pixeldrainUrl: rom.pixeldrainUrl || "",
                                                    sha256: rom.sha256 || "",
                                                    fileSize: rom.fileSize || "",
                                                    changelog: rom.changelog || "",
                                                    installationGuide: rom.installationGuide || "",
                                                    isStable: rom.isStable ?? true,
                                                    isTestBuild: rom.isTestBuild ?? false,
                                                    flashType: rom.flashType || "",
                                                });
                                                setIsModalOpen(true);
                                            }}
                                            className="p-2 hover:bg-white/5 rounded-xl text-zinc-500 hover:text-white transition-colors"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(rom.id)}
                                            className="p-2 hover:bg-red-500/10 rounded-xl text-zinc-500 hover:text-red-400 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{rom.type.replace('_', ' ')}</span>
                                        <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">v{rom.version}</span>
                                    </div>
                                    <h3 className="text-xl font-black text-white tracking-tight group-hover:text-indigo-400 transition-colors">{rom.name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Cpu className="w-3.5 h-3.5 text-zinc-600" />
                                        <span className="text-[11px] font-bold text-zinc-400 truncate">{rom.device?.name || "Unknown"}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.03]">
                                        <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                                            <Download className="w-3 h-3" /> Binary
                                        </div>
                                        <div className="text-[11px] font-bold text-zinc-300 truncate">{rom.fileSize || "N/A"}</div>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.03]">
                                        <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                                            <Activity className="w-3 h-3" /> Hits
                                        </div>
                                        <div className="text-[13px] font-black text-white">{rom._count?.downloads || 0}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-10 flex items-center justify-between pt-5 mt-5 border-t border-white/[0.03]">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-3.5 h-3.5 text-zinc-600" />
                                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                                        {new Date(rom.releaseDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                                    <Activity className="w-3 h-3" />
                                    Stable
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
                            onClick={() => {
                                setIsModalOpen(false);
                                setEditingId(null);
                                setFormData(initialFormData);
                            }}
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
                                        <Shield className="w-3 h-3" /> Build Protocol v3.0
                                    </div>
                                    <h2 className="text-3xl font-black text-white tracking-tighter">{editingId ? "Modify Build" : "Authorize Build"}</h2>
                                </div>
                                <button
                                    onClick={() => { setIsModalOpen(false); setEditingId(null); }}
                                    className="p-3 hover:bg-white/5 rounded-2xl text-zinc-500 hover:text-white transition-all active:scale-90"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleDeploy} className="space-y-8">
                                <div className="space-y-3 group">
                                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">Target Hardware</label>
                                    <select
                                        required
                                        value={formData.deviceId}
                                        onChange={e => setFormData({ ...formData, deviceId: e.target.value })}
                                        className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-bold appearance-none custom-scrollbar"
                                    >
                                        <option value="" className="bg-[#030406] text-zinc-600">Identify node...</option>
                                        {devices.map(d => (
                                            <option key={d.id} value={d.id} className="bg-[#030406] text-white">
                                                {d.name.toUpperCase()} ({d.codename})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3 group">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">Build Designation</label>
                                        <input
                                            required
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="e.g. DeadZone v2 Stable"
                                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-bold"
                                        />
                                    </div>
                                    <div className="space-y-3 group">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">Version Vector</label>
                                        <input
                                            required
                                            value={formData.version}
                                            onChange={e => setFormData({ ...formData, version: e.target.value })}
                                            placeholder="e.g. 2.0.1"
                                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-mono font-bold tracking-tighter"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3 group">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">Android Core</label>
                                        <input
                                            required
                                            value={formData.androidVersion}
                                            onChange={e => setFormData({ ...formData, androidVersion: e.target.value })}
                                            placeholder="e.g. 14"
                                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-bold"
                                        />
                                    </div>
                                    <div className="space-y-3 group">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">Deployment Track</label>
                                        <select
                                            required
                                            value={formData.type}
                                            onChange={e => setFormData({ ...formData, type: e.target.value })}
                                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-bold appearance-none"
                                        >
                                            <option value="OFFICIAL_STABLE" className="bg-[#030406] text-white">OFFICIAL STABLE</option>
                                            <option value="COMMUNITY" className="bg-[#030406] text-white">COMMUNITY BUILD</option>
                                            <option value="EXPERIMENTAL" className="bg-[#030406] text-white">EXPERIMENTAL</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3 group">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">DeadZone Flavor</label>
                                        <select
                                            value={formData.flavor}
                                            onChange={e => setFormData({ ...formData, flavor: e.target.value })}
                                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-bold appearance-none"
                                        >
                                            <option value="" className="bg-[#030406] text-zinc-600">Select flavor...</option>
                                            <option value="Base" className="bg-[#030406] text-white">DeadZone Base</option>
                                            <option value="Gaming" className="bg-[#030406] text-white">DeadZone Gaming</option>
                                            <option value="EPiC" className="bg-[#030406] text-white">DeadZone EPiC</option>
                                            <option value="Legend" className="bg-[#030406] text-white">DeadZone Legend</option>
                                        </select>
                                    </div>
                                    <div className="space-y-3 group">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">Flash Type</label>
                                        <input
                                            value={formData.flashType}
                                            onChange={e => setFormData({ ...formData, flashType: e.target.value })}
                                            placeholder="e.g. Recovery, Fastboot"
                                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-bold"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3 group">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">SoC</label>
                                        <input
                                            value={formData.soc}
                                            onChange={e => setFormData({ ...formData, soc: e.target.value })}
                                            placeholder="e.g. Snapdragon 8 Gen 2, MTK Dimensity"
                                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-bold"
                                        />
                                    </div>
                                    <div className="space-y-3 group">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">Platform</label>
                                        <input
                                            value={formData.platform}
                                            onChange={e => setFormData({ ...formData, platform: e.target.value })}
                                            placeholder="e.g. Snapdragon, MTK"
                                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-bold"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3 group">
                                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">Payload Distribution Link</label>
                                    <input
                                        required
                                        type="url"
                                        value={formData.downloadUrl}
                                        onChange={e => setFormData({ ...formData, downloadUrl: e.target.value })}
                                        placeholder="https://github.com/DeadZon/... or https://pixeldrain.com/u/..."
                                        className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-medium"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3 group">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">GitHub Run URL</label>
                                        <input
                                            type="url"
                                            value={formData.githubRunUrl}
                                            onChange={e => setFormData({ ...formData, githubRunUrl: e.target.value })}
                                            placeholder="https://github.com/DeadZon/.../actions/runs/..."
                                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-3 group">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">PixelDrain URL</label>
                                        <input
                                            type="url"
                                            value={formData.pixeldrainUrl}
                                            onChange={e => setFormData({ ...formData, pixeldrainUrl: e.target.value })}
                                            placeholder="https://pixeldrain.com/u/..."
                                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3 group">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">Binary Magnitude</label>
                                        <input
                                            value={formData.fileSize}
                                            onChange={e => setFormData({ ...formData, fileSize: e.target.value })}
                                            placeholder="e.g. 2.4 GB"
                                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-mono font-bold"
                                        />
                                    </div>
                                    <div className="space-y-3 group">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">Deployment Vector (Guide)</label>
                                        <input
                                            value={formData.installationGuide}
                                            onChange={e => setFormData({ ...formData, installationGuide: e.target.value })}
                                            placeholder="e.g. Fastboot Mode"
                                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-bold"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3 group">
                                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">SHA-256</label>
                                    <input
                                        value={formData.sha256}
                                        onChange={e => setFormData({ ...formData, sha256: e.target.value })}
                                        placeholder="Checksum for release verification"
                                        className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-mono font-bold"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <label className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] text-sm font-bold text-zinc-300">
                                        <input
                                            type="checkbox"
                                            checked={formData.isStable}
                                            onChange={e => setFormData({ ...formData, isStable: e.target.checked })}
                                            className="h-4 w-4 accent-indigo-500"
                                        />
                                        Stable release
                                    </label>
                                    <label className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] text-sm font-bold text-zinc-300">
                                        <input
                                            type="checkbox"
                                            checked={formData.isTestBuild}
                                            onChange={e => setFormData({ ...formData, isTestBuild: e.target.checked })}
                                            className="h-4 w-4 accent-indigo-500"
                                        />
                                        Test build
                                    </label>
                                </div>

                                <div className="space-y-3 group">
                                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">Revision Changelog</label>
                                    <textarea
                                        rows={4}
                                        value={formData.changelog}
                                        onChange={e => setFormData({ ...formData, changelog: e.target.value })}
                                        placeholder="Outline technical modifications..."
                                        className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.5rem] px-6 py-5 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-medium resize-none placeholder:text-zinc-800"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-6 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 disabled:from-zinc-800 disabled:to-zinc-900 text-white rounded-[1.5rem] font-black uppercase text-xs tracking-[0.3em] transition-all shadow-xl shadow-indigo-600/20 active:scale-95 flex items-center justify-center gap-4"
                                >
                                    {isSubmitting ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>{editingId ? "Update Revision" : "Authorize Build"} <HardDrive className="w-4 h-4" /></>
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
