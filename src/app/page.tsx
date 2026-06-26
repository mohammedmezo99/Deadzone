"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { GlassCard, NeonDivider, PlatformPill, RomBadge, SectionHeader } from "@/components/ui/deadzone";
import { PremiumButton } from "@/components/ui/premium-button";
import { deviceCounts, devices, romStyles, siteLinks } from "@/data/deadzone-registry";
import { AlertTriangle, BatteryCharging, Cpu, Gamepad2, Gauge, Layers3, RadioTower, ShieldCheck, Smartphone, Sparkles, TerminalSquare, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const counts = deviceCounts();

const features = [
    { title: "System Optimized", icon: Zap, accent: "cyan" as const, copy: "HyperOS responsiveness, background behavior, and daily UI smoothness are treated as engineering targets." },
    { title: "Gaming Focused", icon: Gamepad2, accent: "magenta" as const, copy: "Performance-first tuning paths for devices that can handle sharper thermals and lower interaction latency." },
    { title: "Stability First", icon: ShieldCheck, accent: "blue" as const, copy: "Release pages center status, codename verification, changelogs, and clear install notes before downloads." },
    { title: "Battery Optimization", icon: BatteryCharging, accent: "gold" as const, copy: "Balanced runtime defaults keep endurance visible without hiding the tradeoffs of custom ROM flashing." },
    { title: "CN Features Integration", icon: Sparkles, accent: "purple" as const, copy: "Global ROM base positioning with CN feature integration and DeadZone identity layered on top." },
    { title: "Safe Flash Guidance", icon: AlertTriangle, accent: "red" as const, copy: "Warnings stay visible: backup required, bootloader unlock required, and wrong codename can damage hardware." },
];

const channels = [
    { name: "Stable", accent: "cyan" as const, copy: "Free and public daily-driver channel focused on balanced behavior and release clarity." },
    { name: "Legend", accent: "gold" as const, copy: "Premium polished channel for users who want the most refined DeadZone experience." },
    { name: "Gaming", accent: "magenta" as const, copy: "Performance and gaming tuning channel for latency-aware builds and sharper profiles." },
    { name: "EPiC", accent: "purple" as const, copy: "Enhanced feature channel for power-user additions and expressive HyperOS polish." },
];

function EngineeringHud() {
    return (
        <GlassCard accent="red" className="p-5 md:p-7">
            <div className="mb-5 flex items-center justify-between">
                <RomBadge accent="red">MEZO LAB</RomBadge>
                <TerminalSquare className="h-6 w-6 text-amber-200" />
            </div>
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/40 p-5">
                <div className="deadzone-grid absolute inset-0 opacity-40" />
                <div className="relative grid gap-4">
                    {["HyperOS 3 base validation", "CN feature integration", "Codename gated release flow", "Checksum-ready build records"].map((line, index) => (
                        <div key={line} className="grid grid-cols-[34px_1fr_auto] items-center gap-3">
                            <span className="font-mono text-[10px] font-black text-red-200">0{index + 1}</span>
                            <div className="h-2 overflow-hidden rounded-full bg-white/10">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${82 - index * 9}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                    className="h-full rounded-full bg-gradient-to-r from-red-400 via-amber-300 to-cyan-300"
                                />
                            </div>
                            <span className="text-right text-xs font-bold text-zinc-300">{line}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
                <PlatformPill accent="purple"><RadioTower className="mr-2 h-4 w-4" /> MTK</PlatformPill>
                <PlatformPill accent="blue"><Cpu className="mr-2 h-4 w-4" /> SD</PlatformPill>
                <PlatformPill accent="gold"><Gauge className="mr-2 h-4 w-4" /> ROM</PlatformPill>
            </div>
        </GlassCard>
    );
}

export default function Home() {
    const router = useRouter();

    return (
        <main className="relative min-h-screen">
            <Starfield />
            <Navbar />

            <section className="px-6 pb-16 pt-36">
                <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1fr_460px]">
                    <div>
                        <RomBadge accent="red">DeadZone by MEZO</RomBadge>
                        <h1 className="mt-6 max-w-5xl text-5xl font-black leading-[0.98] tracking-tight text-white md:text-7xl">
                            DeadZone HyperOS Engineering
                        </h1>
                        <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-300 md:text-lg">
                            Premium HyperOS 3 ROM engineering on a Global ROM base with CN feature integration, smoothness, gaming focus, and stability-first release guidance for Snapdragon and MTK devices.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <PremiumButton onClick={() => router.push("/download")}>Download ROMs</PremiumButton>
                            <PremiumButton variant="secondary" onClick={() => router.push("/devices")}>Supported Devices</PremiumButton>
                            <PremiumButton variant="secondary" onClick={() => router.push(siteLinks.telegram)}>Join Telegram</PremiumButton>
                        </div>
                    </div>
                    <EngineeringHud />
                </div>
            </section>

            <section className="px-6 py-10">
                <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
                    <GlassCard accent="purple" className="p-6"><p className="text-5xl font-black text-white">{counts.mtk}</p><p className="mt-2 text-xs font-black uppercase tracking-[0.22em] text-purple-200">MTK Devices</p></GlassCard>
                    <GlassCard accent="blue" className="p-6"><p className="text-5xl font-black text-white">{counts.snapdragon}</p><p className="mt-2 text-xs font-black uppercase tracking-[0.22em] text-blue-200">Snapdragon Devices</p></GlassCard>
                    <GlassCard accent="cyan" className="p-6"><p className="text-5xl font-black text-white">{counts.total}</p><p className="mt-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Total Devices</p></GlassCard>
                </div>
            </section>

            {counts.legendReady > 0 && (
                <section className="px-6 py-8">
                    <div className="mx-auto max-w-7xl">
                        <GlassCard accent="gold" className="p-6">
                            <p className="text-4xl font-black text-white">{counts.legendReady}</p>
                            <p className="mt-2 text-xs font-black uppercase tracking-[0.22em] text-amber-200">Legend Ready Devices</p>
                        </GlassCard>
                    </div>
                </section>
            )}

            <section className="px-6 py-14">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader eyebrow="Engineering Features" title="Built like a ROM portal, not a placeholder." description="DeadZone keeps the cyberpunk edge while making release data, safety notes, and device status easy to trust." align="center" />
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {features.map((feature, index) => (
                            <motion.div key={feature.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }}>
                                <GlassCard accent={feature.accent} className="h-full p-6">
                                    <feature.icon className="mb-6 h-8 w-8" />
                                    <h3 className="text-xl font-black text-white">{feature.title}</h3>
                                    <p className="mt-3 text-sm leading-7 text-zinc-400">{feature.copy}</p>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 py-14">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader eyebrow="ROM Channels" title="Stable, Legend, Gaming, EPiC." description="Every channel has a clear role. Stable stays free/public; Legend is the premium polish channel." align="center" />
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {channels.map((channel) => (
                            <GlassCard key={channel.name} accent={channel.accent} className="h-full p-6">
                                <RomBadge accent={channel.accent}>DeadZone {channel.name}</RomBadge>
                                <h3 className="mt-5 text-2xl font-black text-white">{channel.name}</h3>
                                <p className="mt-3 text-sm leading-7 text-zinc-400">{channel.copy}</p>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 py-14">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader eyebrow="Registry" title="Device matrix powered by DeadZone data." description={`${devices.length} codenames are registered locally. Download buttons appear only when real build records exist.`} align="center" />
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                        {romStyles.map((style) => <PlatformPill key={style} accent={style === "Legend" ? "gold" : style === "Gaming" ? "magenta" : style === "EPiC" ? "purple" : "cyan"}><Layers3 className="mr-2 h-4 w-4" /> {style}</PlatformPill>)}
                    </div>
                </div>
            </section>

            <NeonDivider />

            <section className="px-6 py-14 pb-24">
                <div className="mx-auto max-w-5xl">
                    <GlassCard accent="red" className="p-7 md:p-8">
                        <div className="flex flex-col gap-5 md:flex-row">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-red-300/25 bg-red-500/10">
                                <Smartphone className="h-7 w-7 text-red-100" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-white">Flash at your own risk.</h2>
                                <p className="mt-3 text-sm leading-7 text-zinc-300">
                                    Flashing can wipe data. Wrong codename packages can brick or damage a device. Back up your files, unlock the bootloader, verify the exact codename, keep enough battery, and read the changelog before installing.
                                </p>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </section>

            <Footer />
        </main>
    );
}
