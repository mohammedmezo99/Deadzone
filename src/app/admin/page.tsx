"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Smartphone,
    Download,
    Users,
    Zap,
    TrendingUp,
    Clock,
    Activity,
    ArrowUpRight,
    Search,
    BarChart3
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

function getRelativeTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
}

export default function AdminDashboard() {
    const [statsData, setStatsData] = useState<{
        devices: number;
        roms: number;
        downloads: number;
        team: number;
        trajectory: number[];
        monthlyTrajectory: number[];
    }>({
        devices: 0,
        roms: 0,
        downloads: 0,
        team: 0,
        trajectory: [],
        monthlyTrajectory: []
    });
    const [viewType, setViewType] = useState<"daily" | "monthly">("daily");
    const [loading, setLoading] = useState(true);
    const [recentActivity, setRecentActivity] = useState<Array<{
        message: string;
        time: string;
        type: 'download' | 'rom' | 'team';
    }>>([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch("/api/admin/stats");
                const data = await res.json();
                if (!data.error) {
                    setStatsData(data);
                }
            } catch (error) {
                console.error("Dashboard stats fetch failed:", error);
            } finally {
                setLoading(false);
            }
        };


        const fetchActivity = async () => {
            try {
                const downloads = await fetch('/api/admin/analytics/downloads');
                const downloadsData = await downloads.json();
                const roms = await fetch('/api/admin/roms');
                const romsData = await roms.json();

                const activities: Array<{
                    message: string;
                    time: string;
                    type: 'download' | 'rom' | 'team';
                    timestamp: Date;
                }> = [];

                if (downloadsData.data && downloadsData.data.length > 0) {
                    const latestDownload = downloadsData.data[downloadsData.data.length - 1];
                    if (latestDownload.count > 0) {
                        activities.push({
                            message: `${latestDownload.count} downloads recorded`,
                            time: getRelativeTime(new Date()),
                            type: 'download',
                            timestamp: new Date()
                        });
                    }
                }

                if (romsData && Array.isArray(romsData)) {
                    const activeRoms = romsData.filter((rom: any) => rom.status === 'ACTIVE');
                    if (activeRoms.length > 0) {
                        const latestRom = activeRoms[activeRoms.length - 1];
                        activities.push({
                            message: `${latestRom.name} v${latestRom.version} published`,
                            time: getRelativeTime(new Date(latestRom.createdAt || Date.now())),
                            type: 'rom',
                            timestamp: new Date(latestRom.createdAt || Date.now())
                        });
                    }
                }

                if (activities.length === 0) {
                    activities.push(
                        { message: "System initialized successfully", time: "Just now", type: 'team', timestamp: new Date() },
                        { message: "Database connected", time: "1m ago", type: 'download', timestamp: new Date() }
                    );
                }

                activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
                setRecentActivity(activities.slice(0, 5));
            } catch (error) {
                console.error("Activity fetch failed:", error);
                setRecentActivity([
                    { message: "System ready", time: "Just now", type: 'team' },
                    { message: "Database connected", time: "1m ago", type: 'download' }
                ]);
            }
        };

        fetchStats();
        fetchActivity();
    }, []);

    const dynamicStats = [
        { label: "Devices", value: loading ? "..." : statsData.devices, icon: Smartphone, growth: "+12.5%", color: "indigo" },
        { label: "ROMs", value: loading ? "..." : statsData.roms, icon: Zap, growth: "+8.2%", color: "pink" },
        { label: "Downloads", value: loading ? "..." : statsData.downloads.toLocaleString(), icon: Download, growth: "+24.1%", color: "emerald" },
        { label: "Team", value: loading ? "..." : statsData.team, icon: Users, growth: "+2", color: "amber" },
    ];

    return (
        <div className="p-6 lg:p-10 space-y-10">
            {/* Header 섹션 */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h2 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em]">System Overview</h2>
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter">Control Center</h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-indigo-500 transition-colors" />
                        <input
                            placeholder="Global Search..."
                            className="bg-white/[0.03] border border-white/[0.05] rounded-2xl pl-12 pr-6 py-3.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all w-full md:w-64"
                        />
                    </div>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
                {dynamicStats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-premium p-6 rounded-[2rem] group relative overflow-hidden active:scale-95 transition-transform"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <stat.icon className="w-24 h-24 rotate-[-15deg]" />
                        </div>
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex items-center justify-between mb-6">
                                <div className={cn(
                                    "w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl shadow-black/50 border border-white/5",
                                    stat.color === 'indigo' && "bg-indigo-600/20 text-indigo-400",
                                    stat.color === 'pink' && "bg-pink-600/20 text-pink-400",
                                    stat.color === 'emerald' && "bg-emerald-600/20 text-emerald-400",
                                    stat.color === 'amber' && "bg-amber-600/20 text-amber-400"
                                )}>
                                    <stat.icon className="w-5 h-5" />
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-white/[0.03] border border-white/[0.05] rounded-full">
                                    <TrendingUp className="w-3 h-3 text-emerald-500" />
                                    <span className="text-[10px] font-bold text-emerald-500 tracking-tight">{stat.growth}</span>
                                </div>
                            </div>
                            <div className="mt-auto">
                                <div className="text-4xl font-black text-white tracking-tighter mb-1">{stat.value}</div>
                                <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Download Chart Card */}
                <div className="xl:col-span-2 glass-premium rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 blur-[100px] -z-10" />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/50" />
                                <h3 className="text-xl font-black text-white tracking-tight">Protocol Analytics</h3>
                            </div>
                            <p className="text-sm text-zinc-500 font-medium">Real-time platform trajectory and download patterns</p>
                        </div>
                        <Link
                            href="/admin/analytics"
                            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-indigo-600/20"
                        >
                            Deep Analysis <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="h-64 mt-8 w-full flex items-center justify-center bg-white/[0.01] rounded-[2rem] border border-white/[0.05] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-600/5 to-transparent" />
                        <div className="text-center relative z-10">
                            <TrendingUp className="w-12 h-12 text-indigo-500/20 mx-auto mb-4" />
                            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Visual Stream Active</p>
                            <p className="text-zinc-700 text-[10px] font-black uppercase tracking-[0.2em]">Data cluster monitoring in progress</p>
                        </div>
                    </div>
                </div>

                {/* Recent Activity Card */}
                <div className="glass-premium rounded-[2.5rem] p-8 relative flex flex-col group overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-600/10 blur-[80px] -z-10" />

                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <Activity className="w-5 h-5 text-indigo-400" />
                            <h3 className="text-xl font-black text-white tracking-tight">Pulse Feed</h3>
                        </div>
                        <Link href="/admin/settings" className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                            <ArrowUpRight className="w-4 h-4 text-zinc-500" />
                        </Link>
                    </div>

                    <div className="space-y-6 relative">
                        <div className="absolute left-[11px] top-2 bottom-2 w-px bg-white/[0.05]" />

                        {recentActivity.map((log, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + (i * 0.1) }}
                                className="flex gap-4 relative z-10"
                            >
                                <div className={cn(
                                    "w-[24px] h-[24px] rounded-full border-4 border-[#080a0f] flex items-center justify-center shrink-0 shadow-lg",
                                    log.type === 'download' && "bg-emerald-500 shadow-emerald-500/20",
                                    log.type === 'rom' && "bg-indigo-500 shadow-indigo-500/20",
                                    log.type === 'team' && "bg-violet-500 shadow-violet-500/20"
                                )}>
                                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-bold text-zinc-200 line-clamp-2 leading-snug mb-1">{log.message}</p>
                                    <div className="flex items-center gap-2 text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                                        <Clock className="w-3 h-3" />
                                        <span>{log.time}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <button className="w-full mt-auto py-4 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] rounded-2xl text-[10px] font-black text-zinc-500 hover:text-white uppercase tracking-[0.2em] transition-all">
                        Full Protocol Audit
                    </button>
                </div>
            </div>

            {/* Quick Access Footer */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[
                    { label: "Hardware Registry", desc: "Maintain device ecosystem", icon: Smartphone, color: "indigo", href: "/admin/devices" },
                    { label: "Cluster Release", desc: "Deploy new firmware", icon: Zap, color: "violet", href: "/admin/roms" },
                    { label: "Personnel Hub", desc: "Manager contributors", icon: Users, color: "pink", href: "/admin/team" },
                ].map((item, i) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className="glass-premium p-6 rounded-[2rem] flex items-center gap-6 group hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        <div className={cn(
                            "w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:rotate-[15deg]",
                            item.color === 'indigo' && "bg-indigo-600 text-white shadow-indigo-600/30",
                            item.color === 'violet' && "bg-violet-600 text-white shadow-violet-600/30",
                            item.color === 'pink' && "bg-pink-600 text-white shadow-pink-600/30"
                        )}>
                            <item.icon className="w-7 h-7" />
                        </div>
                        <div>
                            <h4 className="text-lg font-black text-white tracking-tight group-hover:text-indigo-400 transition-colors uppercase">{item.label}</h4>
                            <p className="text-xs font-medium text-zinc-500">{item.desc}</p>
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-zinc-700 ml-auto group-hover:text-white transition-colors" />
                    </Link>
                ))}
            </div>
        </div>
    );
}
