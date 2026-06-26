"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Download, RadioTower, Send, ShieldCheck, Smartphone, Sparkles } from "lucide-react";
import { PremiumButton } from "./ui/premium-button";
import { useRouter } from "next/navigation";
import { GlassCard, PlatformPill, RomBadge } from "./ui/deadzone";
import { supportedDevices } from "@/data/devices";

const xiaomiFamilyCount = supportedDevices.filter((device) => device.category === "Xiaomi Series" || device.category === "Xiaomi MIX / Fold / Flip Series").length;
const redmiPocoCount = supportedDevices.length - xiaomiFamilyCount;

export function HeroSection() {
    const [heroAlert, setHeroAlert] = useState("Coming Soon / Premium Custom ROM");
    const router = useRouter();

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch("/api/settings");
                const data = await res.json();
                if (data.heroAlertText) setHeroAlert(data.heroAlertText);
            } catch (err) {
                console.error("Hero fetch failed", err);
            }
        };
        fetchSettings();
    }, []);

    return (
        <section className="relative overflow-hidden px-6 pb-16 pt-32 sm:pt-36 lg:pb-24">
            <div className="deadzone-grid pointer-events-none absolute inset-x-0 top-0 h-[760px] opacity-60" />
            <div className="pointer-events-none absolute left-1/2 top-20 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-cyan-400/15 blur-[120px] md:h-[620px] md:w-[620px]" />
            <div className="pointer-events-none absolute right-0 top-40 h-[300px] w-[300px] rounded-full bg-fuchsia-500/15 blur-[110px]" />

            <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-7 inline-flex items-center gap-3 rounded-full border border-cyan-300/25 bg-cyan-400/10 px-4 py-2 backdrop-blur-xl"
                    >
                        <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.95)]" />
                        <span className="text-[11px] font-black uppercase tracking-[0.22em] text-cyan-100">{heroAlert}</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08, duration: 0.7 }}
                        className="max-w-5xl text-5xl font-black leading-[0.9] tracking-tight text-white sm:text-6xl lg:text-8xl"
                    >
                        DeadZone <span className="text-gradient">HyperOS</span> Engineering.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.16, duration: 0.7 }}
                        className="mt-7 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg"
                    >
                        Premium custom ROM based on HyperOS, focused on smoothness, gaming, stability, and CN feature integration.
                    </motion.p>

                    <div className="mt-7 flex flex-wrap gap-3">
                        <RomBadge accent="cyan">Based on HyperOS 3</RomBadge>
                        <RomBadge accent="blue">Global ROM Base</RomBadge>
                        <RomBadge accent="magenta">CN Features Integration</RomBadge>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.24, duration: 0.7 }}
                        className="mt-9 grid gap-3 sm:flex sm:flex-wrap"
                    >
                        <PremiumButton onClick={() => router.push("/download")} icon={<Download className="h-5 w-5" />}>
                            Download ROMs
                        </PremiumButton>
                        <PremiumButton variant="secondary" onClick={() => router.push("/devices")} icon={<Smartphone className="h-5 w-5" />}>
                            View Supported Devices
                        </PremiumButton>
                        <PremiumButton variant="secondary" onClick={() => router.push("/community")} icon={<Send className="h-5 w-5" />}>
                            Join Telegram
                        </PremiumButton>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.18, duration: 0.8 }}
                    className="relative"
                >
                    <GlassCard accent="cyan" className="p-5 sm:p-6">
                        <div className="rounded-[1.5rem] border border-white/10 bg-black/45 p-5">
                            <div className="mb-6 flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm font-black uppercase tracking-[0.22em] text-white">Engineering HUD</p>
                                    <p className="text-xs text-zinc-500">DeadZone device matrix</p>
                                </div>
                                <RomBadge accent="gold">Legend Ready</RomBadge>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="rounded-2xl border border-purple-300/25 bg-purple-500/10 p-4">
                                    <RadioTower className="mb-4 h-6 w-6 text-purple-200" />
                                    <p className="text-3xl font-black text-white">{xiaomiFamilyCount}</p>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-200">Xiaomi Family</p>
                                </div>
                                <div className="rounded-2xl border border-blue-300/25 bg-blue-500/10 p-4">
                                    <Cpu className="mb-4 h-6 w-6 text-blue-200" />
                                    <p className="text-3xl font-black text-white">{redmiPocoCount}</p>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200">Redmi / POCO</p>
                                </div>
                            </div>

                            <div className="mt-4 grid gap-3">
                                <PlatformPill accent="cyan"><ShieldCheck className="mr-2 h-4 w-4" /> Stability pipeline</PlatformPill>
                                <PlatformPill accent="magenta"><Sparkles className="mr-2 h-4 w-4" /> Gaming / EPiC tuning</PlatformPill>
                                <PlatformPill accent="gold">DeadZone Legend gold channel</PlatformPill>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>
            </div>
        </section>
    );
}
