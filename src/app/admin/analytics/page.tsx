"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Activity,
    TrendingUp,
    Users,
    MousePointer2,
    Calendar,
    ArrowUpRight,
    Search,
    Download
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { cn } from "@/lib/utils";

export default function AnalyticsPage() {
    const [analyticsData, setAnalyticsData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalVisits: 0,
        todayVisits: 0,
        peakVisits: 0
    });

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await fetch("/api/admin/analytics");
                const data = await res.json();
                setAnalyticsData(data);

                if (data.length > 0) {
                    const total = data.reduce((acc: number, curr: any) => acc + curr.count, 0);
                    const today = data[data.length - 1]?.count || 0;
                    const peak = Math.max(...data.map((d: any) => d.count));
                    setStats({ totalVisits: total, todayVisits: today, peakVisits: peak });
                }
            } catch (error) {
                console.error("Analytics fetch failed:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    const cards = [
        { label: "Total Sessions", value: stats.totalVisits.toLocaleString(), icon: Activity, color: "indigo" },
        { label: "Today's Pulse", value: stats.todayVisits, icon: Users, color: "emerald" },
        { label: "Peak Trajectory", value: stats.peakVisits, icon: TrendingUp, color: "violet" },
    ];

    return (
        <div className="p-6 lg:p-10 space-y-10">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 font-display">
                <div className="space-y-1">
                    <h2 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em]">Protocol Analytics</h2>
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter">Traffic Monitoring</h1>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => window.location.reload()}
                        className="p-3 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] rounded-2xl text-zinc-400 hover:text-white transition-all"
                    >
                        <Activity className="w-5 h-5" />
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {cards.map((card, i) => (
                    <motion.div
                        key={card.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-premium p-8 rounded-[2.5rem] relative overflow-hidden group"
                    >
                        <div className="relative z-10">
                            <div className={cn(
                                "w-12 h-12 rounded-2xl flex items-center justify-center mb-6",
                                card.color === "indigo" && "bg-indigo-600/20 text-indigo-400",
                                card.color === "emerald" && "bg-emerald-600/20 text-emerald-400",
                                card.color === "violet" && "bg-violet-600/20 text-violet-400"
                            )}>
                                <card.icon className="w-5 h-5" />
                            </div>
                            <div className="text-4xl font-black text-white tracking-tighter mb-1">{card.value}</div>
                            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{card.label}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="glass-premium rounded-[3rem] p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/5 blur-[120px] -z-10" />

                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h3 className="text-2xl font-black text-white tracking-tight mb-2">Visitor Trajectory</h3>
                        <p className="text-sm text-zinc-500 font-medium">Daily traffic volume for the past 14 days</p>
                    </div>
                </div>

                <div className="h-[400px] w-full">
                    {loading || analyticsData.length === 0 ? (
                        <div className="h-full w-full flex items-center justify-center bg-white/[0.01] rounded-[2rem] border border-white/[0.05]">
                            <div className="text-center space-y-4">
                                <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mx-auto" />
                                <p className="text-zinc-600 text-xs font-black uppercase tracking-widest">Hydrating data stream...</p>
                            </div>
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={analyticsData}>
                                <defs>
                                    <linearGradient id="colorPulse" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                                <XAxis
                                    dataKey="date"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#52525b', fontSize: 10, fontWeight: 900 }}
                                    tickFormatter={(str) => {
                                        const parts = str.split('-');
                                        return `${parts[1]}/${parts[2]}`;
                                    }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#52525b', fontSize: 10, fontWeight: 900 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#0a0b10',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        borderRadius: '20px',
                                        fontSize: '12px',
                                        fontWeight: 'black',
                                        padding: '16px'
                                    }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#6366f1"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorPulse)"
                                    animationDuration={2000}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-premium p-8 rounded-[2.5rem]">
                    <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-indigo-400" /> Timeframe Control
                    </h4>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                        System is currently monitoring traffic on a rolling 14-day protocol. Deep history is stored in the cloud core.
                    </p>
                    <div className="flex gap-2">
                        <span className="px-4 py-2 bg-indigo-600/20 text-indigo-400 rounded-xl text-[10px] font-black uppercase">14 Days Activity</span>
                    </div>
                </div>
                <div className="glass-premium p-8 rounded-[2.5rem] flex flex-col justify-center">
                    <h4 className="text-sm font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                        <MousePointer2 className="w-4 h-4 text-emerald-400" /> Retention Pulse
                    </h4>
                    <div className="flex items-center gap-4">
                        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "84%" }}
                                transition={{ duration: 2, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-indigo-600 to-emerald-500"
                            />
                        </div>
                        <span className="text-xl font-black text-white italic">84%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
