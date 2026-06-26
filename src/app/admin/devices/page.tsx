"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Smartphone, Search, MoreVertical, Edit2, Trash2, Cpu, X, Loader2, Globe, Shield, Activity } from "lucide-react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export default function DevicesPage() {
    const [devices, setDevices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Modal & Form State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        codename: "",
        brand: "",
        chipset: "",
        description: "",
        image: "",
    });
    const [editingId, setEditingId] = useState<string | null>(null);

    const fetchDevices = async () => {
        try {
            const res = await fetch("/api/admin/devices");
            const data = await res.json();
            if (Array.isArray(data)) {
                setDevices(data);
            } else {
                setDevices([]);
            }
        } catch (error) {
            console.error("Failed to fetch devices:", error);
            setDevices([]);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchDevices();
    }, []);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const url = editingId ? `/api/admin/devices/${editingId}` : "/api/admin/devices";
            const method = editingId ? "PUT" : "POST";

            const res = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setIsModalOpen(false);
                setEditingId(null);
                setFormData({ name: "", codename: "", brand: "", chipset: "", description: "", image: "" });
                fetchDevices();
            } else {
                const errData = await res.json();
                alert(`Failed: ${errData.error}`);
            }
        } catch (err) {
            console.error(err);
            alert("Database connection error.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this device? This will also delete all associated ROMs.")) return;
        try {
            const res = await fetch(`/api/admin/devices/${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchDevices();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const filteredDevices = devices.filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.codename.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 lg:p-10 space-y-10">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-indigo-500 font-black text-[10px] uppercase tracking-[0.3em] mb-2">
                        <Shield className="w-3 h-3" />
                        Hardware Registry
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter">Device Nodes</h1>
                    <p className="text-zinc-500 text-sm font-medium mt-1">Manage supported hardware for the DeadZone ecosystem.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[1.5rem] font-black uppercase text-xs tracking-widest transition-all shadow-2xl shadow-indigo-600/20 active:scale-95 group"
                >
                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" /> Register Node
                </button>
            </header>

            {/* Search & Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search by device name or codename..."
                        className="w-full pl-14 pr-6 py-4 bg-white/[0.03] border border-white/[0.05] rounded-[1.5rem] text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-4 px-6 py-4 bg-white/[0.03] border border-white/[0.05] rounded-[1.5rem]">
                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Active nodes:</span>
                    <span className="text-sm font-black text-indigo-400">{filteredDevices.length}</span>
                </div>
            </div>

            {/* Device Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {loading ? (
                    Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="h-64 glass-premium rounded-[2.5rem] animate-pulse" />
                    ))
                ) : filteredDevices.length === 0 ? (
                    <div className="col-span-full py-20 text-center glass-premium rounded-[2.5rem]">
                        <Smartphone className="w-12 h-12 text-zinc-800 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-zinc-500">No nodes identified</h3>
                        <p className="text-sm text-zinc-600">Register a new device to start deployment.</p>
                    </div>
                ) : (
                    filteredDevices.map((device, i) => (
                        <motion.div
                            key={device.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="glass-premium rounded-[2.5rem] p-6 group hover:border-indigo-500/30 transition-all relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Smartphone className="w-32 h-32 rotate-[-15deg]" />
                            </div>

                            <div className="relative z-10 space-y-6">
                                <div className="flex justify-between items-start">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-600/20 flex items-center justify-center text-indigo-400 shadow-xl shadow-black/50">
                                        <Smartphone className="w-6 h-6" />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setEditingId(device.id);
                                                setFormData({
                                                    name: device.name,
                                                    codename: device.codename,
                                                    brand: device.brand,
                                                    chipset: device.chipset,
                                                    description: device.description || "",
                                                    image: device.image || "",
                                                });
                                                setIsModalOpen(true);
                                            }}
                                            className="p-2 hover:bg-white/5 rounded-xl text-zinc-500 hover:text-white transition-colors"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(device.id)}
                                            className="p-2 hover:bg-red-500/10 rounded-xl text-zinc-500 hover:text-red-400 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-black text-white tracking-tight mb-1 group-hover:text-indigo-400 transition-colors">{device.name}</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">{device.brand}</span>
                                        <div className="w-1 h-1 bg-indigo-500 rounded-full" />
                                        <code className="text-[10px] font-mono text-indigo-400 font-bold tracking-tighter">{device.codename}</code>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.03]">
                                        <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                                            <Cpu className="w-3 h-3" /> SoC
                                        </div>
                                        <div className="text-[11px] font-bold text-zinc-300 truncate">{device.chipset}</div>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.03]">
                                        <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                                            <Activity className="w-3 h-3" /> Builds
                                        </div>
                                        <div className="text-[13px] font-black text-white">{device._count?.roms || 0}</div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                    <span className={cn(
                                        "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border",
                                        device.status === 'ACTIVE'
                                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-lg shadow-emerald-500/10"
                                            : "bg-zinc-500/10 text-zinc-500 border-zinc-500/20"
                                    )}>
                                        {device.status}
                                    </span>
                                    <button className="flex items-center gap-2 p-2 px-4 rounded-xl hover:bg-white/5 transition-colors text-[10px] font-bold text-zinc-500 hover:text-white uppercase tracking-widest">
                                        Audit Logs <MoreVertical className="w-3 h-3" />
                                    </button>
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
                                setFormData({ name: "", codename: "", brand: "", chipset: "", description: "", image: "" });
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
                                        <Globe className="w-3 h-3" /> Protocol X-71
                                    </div>
                                    <h2 className="text-3xl font-black text-white tracking-tighter">{editingId ? "Modify Node" : "Register Node"}</h2>
                                </div>
                                <button
                                    onClick={() => { setIsModalOpen(false); setEditingId(null); }}
                                    className="p-3 hover:bg-white/5 rounded-2xl text-zinc-500 hover:text-white transition-all active:scale-90"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleRegister} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3 group">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">Node Designation</label>
                                        <input
                                            required
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="e.g. Poco F5"
                                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-bold placeholder:text-zinc-800"
                                        />
                                    </div>
                                    <div className="space-y-3 group">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">Registry Codename</label>
                                        <input
                                            required
                                            value={formData.codename}
                                            onChange={e => setFormData({ ...formData, codename: e.target.value })}
                                            placeholder="e.g. marble"
                                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-mono font-bold placeholder:text-zinc-800 tracking-tighter"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3 group">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">Manufacturer</label>
                                        <input
                                            required
                                            value={formData.brand}
                                            onChange={e => setFormData({ ...formData, brand: e.target.value })}
                                            placeholder="e.g. XIAOMI"
                                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-bold placeholder:text-zinc-800"
                                        />
                                    </div>
                                    <div className="space-y-3 group">
                                        <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">SoC Architecture</label>
                                        <input
                                            required
                                            value={formData.chipset}
                                            onChange={e => setFormData({ ...formData, chipset: e.target.value })}
                                            placeholder="e.g. Snapdragon 7+ Gen 2"
                                            className="w-full bg-white/[0.03] border border-white/[0.05] rounded-[1.25rem] px-5 py-4 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-bold placeholder:text-zinc-800"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3 group">
                                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest opacity-80 group-focus-within:text-indigo-400 group-focus-within:opacity-100 transition-all">Documentation Hub</label>
                                    <textarea
                                        rows={4}
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Technical specifications and node specific notes..."
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
                                        <>{editingId ? "Update Node Specs" : "Commit Registry"} <Shield className="w-4 h-4" /></>
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
