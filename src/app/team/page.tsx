"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { motion } from "framer-motion";
import { Github, Twitter, Send, Globe, Users } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function TeamPage() {
    const [team, setTeam] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const res = await fetch("/api/team");
                const data = await res.json();
                if (Array.isArray(data)) setTeam(data);
            } catch (error) {
                console.error("Fetch team failed:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTeam();
    }, []);

    return (
        <main className="min-h-screen relative">
            <Starfield />
            <Navbar />

            <section className="pt-40 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
                        >
                            <Users className="w-3.5 h-3.5" /> The Core Crew
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white"
                        >
                            Meet the <span className="text-blue-500">Innovators</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-zinc-500 text-lg max-w-2xl mx-auto"
                        >
                            The passionate team working daily to push the boundaries of what's possible on your device.
                        </motion.p>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="h-80 rounded-[2.5rem] bg-white/5 animate-pulse border border-white/5" />
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-24">
                            {/* Top Tier: Founders & Co-Founders */}
                            <div className="flex flex-wrap justify-center gap-10 max-w-5xl mx-auto">
                                {team
                                    .filter(m => m.role.toLowerCase().includes("founder"))
                                    .map((member, i) => (
                                        <TeamCard key={member.id} member={member} isFounder={true} delay={i * 0.1} />
                                    ))}
                            </div>

                            {/* Second Tier: The Rest of the Crew */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                                {team
                                    .filter(m => !m.role.toLowerCase().includes("founder"))
                                    .map((member, i) => (
                                        <TeamCard key={member.id} member={member} isFounder={false} delay={i * 0.05} />
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}

function TeamCard({ member, isFounder, delay }: { member: any, isFounder: boolean, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay }}
            className={cn(
                "relative group rounded-[2.5rem] transition-all duration-700",
                isFounder ? "w-full md:w-[340px]" : "w-full"
            )}
        >
            {/* Multi-layered Glow Border */}
            <div className={cn(
                "absolute -inset-[2px] rounded-[2.6rem] blur-sm transition-opacity duration-1000 group-hover:opacity-100",
                isFounder
                    ? "bg-gradient-to-br from-violet-500 via-cyan-400 to-amber-400 opacity-80"
                    : "bg-gradient-to-br from-indigo-500/50 to-cyan-500/50 opacity-0"
            )} />

            <div className="relative z-10 p-8 rounded-[2.5rem] bg-[#0A0B0F] border border-white/10 group-hover:border-white/20 transition-colors h-full flex flex-col items-center">
                {/* Avatar with circular gradient */}
                <div className="relative mb-6">
                    <div className={cn(
                        "absolute inset-0 rounded-full blur-2xl opacity-40 transition-all duration-700 group-hover:opacity-60",
                        isFounder ? "bg-cyan-400" : "bg-indigo-500"
                    )} />
                    <div className="w-24 h-24 rounded-full border-2 border-white/5 p-1.5 relative z-10 bg-zinc-900 shadow-2xl overflow-hidden">
                        {member.image ? (
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-700" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-3xl font-black text-zinc-800 uppercase">
                                {member.name[0]}
                            </div>
                        )}
                    </div>
                </div>

                <h3 className="text-2xl font-black text-white tracking-tighter mb-1 uppercase group-hover:text-cyan-400 transition-colors">
                    {member.name}
                </h3>

                <div className="flex items-center gap-1.5 mb-5 opacity-60">
                    <Globe className="w-2.5 h-2.5" />
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{member.country || "Global"}</span>
                </div>

                <div className={cn(
                    "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] mb-6",
                    isFounder
                        ? "bg-violet-600/20 text-violet-400 border border-violet-500/30"
                        : "bg-cyan-600/10 text-cyan-400 border border-cyan-500/20"
                )}>
                    {member.role}
                </div>

                {member.bio && (
                    <p className="text-center text-zinc-500 text-[12px] leading-relaxed mb-6 line-clamp-3">
                        {member.bio}
                    </p>
                )}

                {/* Footer Info Badge (e.g. Device) */}
                {member.website && (
                    <div className="w-full mt-auto mb-6 py-2 px-4 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center gap-2 group-hover:bg-white/10 transition-colors">
                        <span className="text-[10px] font-bold text-zinc-400 tracking-tight truncate max-w-full">
                            {member.website.replace(/^https?:\/\//i, '').replace(/\/$/, '')}
                        </span>
                    </div>
                )}

                {/* Social Links */}
                <div className="flex items-center justify-center gap-3">
                    {member.github && (
                        <a href={member.github} target="_blank" rel="noopener noreferrer" className="p-2.5 hover:bg-white/5 rounded-xl text-zinc-500 hover:text-white transition-all">
                            <Github className="w-4 h-4" />
                        </a>
                    )}
                    {member.telegram && (
                        <a href={member.telegram} target="_blank" rel="noopener noreferrer" className="p-2.5 hover:bg-white/5 rounded-xl text-zinc-500 hover:text-white transition-all">
                            <Send className="w-4 h-4" />
                        </a>
                    )}
                    {member.twitter && (
                        <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="p-2.5 hover:bg-white/5 rounded-xl text-zinc-500 hover:text-white transition-all">
                            <Twitter className="w-4 h-4" />
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
