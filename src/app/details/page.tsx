"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { GlassCard, RomBadge, SectionHeader } from "@/components/ui/deadzone";
import { deviceCounts, devices, siteLinks } from "@/data/deadzone-registry";
import { AlertTriangle, Archive, BookOpen, CheckCircle2, Cpu, Download, Github, History, MessageCircle, ShieldAlert, ShieldCheck, Smartphone, Users } from "lucide-react";
import Link from "next/link";

const counts = deviceCounts();

const hubCards = [
    { title: "Changelog", copy: "Release notes appear per registered build in the download selector. Empty builds never invent changelogs.", href: "/download", icon: History, accent: "cyan" as const },
    { title: "Installation Guide", copy: "Codename verification, bootloader reminders, backup warnings, and flash script discipline.", href: "/installation", icon: BookOpen, accent: "blue" as const },
    { title: "Supported Devices", copy: `${devices.length} device codenames are registered across MTK and Snapdragon targets.`, href: "/devices", icon: Smartphone, accent: "purple" as const },
    { title: "Community Chat", copy: "Support and discussion entry points stay in the community area.", href: siteLinks.community, icon: MessageCircle, accent: "cyan" as const },
    { title: "GitHub Releases", copy: "Configured when public release links exist. No fake release URL is generated.", href: siteLinks.github, icon: Github, accent: "blue" as const },
    { title: "PixelDrain Archive", copy: siteLinks.pixeldrainArchive ? "Archive configured for public mirrors." : "Coming soon. PixelDrain links appear only from real ROM records.", href: siteLinks.pixeldrainArchive || "/download", icon: Archive, accent: "gold" as const },
    { title: "Acknowledgments", copy: "Credits for MEZO, testers, contributors, and the broader Android/Xiaomi development ecosystem.", href: "/team", icon: Users, accent: "purple" as const },
    { title: "Flash Safety", copy: "Risk guidance stays visible before users open mirrors.", href: "/download", icon: ShieldAlert, accent: "red" as const },
];

const checklist = [
    "Unlocked bootloader",
    "Exact codename verification",
    "Backup all important data",
    "Battery level recommendation followed",
    "Correct flash script selected",
    "Changelog read before flashing",
];

const guardrails = [
    ["No fake mirrors", "PixelDrain, GitHub, and backup buttons appear only when a registered ROM record has the matching URL."],
    ["Codename first", "The download flow repeats the exact codename so users do not confuse similar Xiaomi, Redmi, POCO, or Pad variants."],
    ["Checksums when available", "SHA-256 values are shown only when stored in release metadata."],
    ["Clear risky flashing warning", "Custom ROM flashing can wipe data and wrong packages can brick or damage a device."],
    ["Not affiliated", "DeadZone is not affiliated with Xiaomi, Google, or MediaTek."],
];

export default function DetailsPage() {
    return (
        <main className="relative min-h-screen">
            <Starfield />
            <Navbar />

            <section className="px-6 pb-20 pt-36">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader eyebrow="ROM Hub" title={<>DeadZone install and <span className="text-gradient">support center</span>.</>} description="A production-ready hub for changelogs, install safety, device support, configured links, community, and acknowledgments." align="center" />

                    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                        <GlassCard accent="purple" className="p-5"><p className="text-4xl font-black text-white">{counts.mtk}</p><p className="mt-2 text-xs font-black uppercase tracking-[0.22em] text-purple-200">MTK Devices</p></GlassCard>
                        <GlassCard accent="blue" className="p-5"><p className="text-4xl font-black text-white">{counts.snapdragon}</p><p className="mt-2 text-xs font-black uppercase tracking-[0.22em] text-blue-200">Snapdragon Devices</p></GlassCard>
                        <GlassCard accent="cyan" className="p-5"><p className="text-4xl font-black text-white">{counts.total}</p><p className="mt-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Total Devices</p></GlassCard>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {hubCards.map((card) => (
                            <Link key={card.title} href={card.href} className="group h-full">
                                <GlassCard accent={card.accent} className="h-full p-6 transition-colors group-hover:border-cyan-300/40">
                                    <card.icon className="mb-6 h-8 w-8" />
                                    <h3 className="text-xl font-black text-white">{card.title}</h3>
                                    <p className="mt-3 text-sm leading-7 text-zinc-400">{card.copy}</p>
                                </GlassCard>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                        <GlassCard accent="cyan" className="p-7">
                            <RomBadge accent="cyan">Install Checklist</RomBadge>
                            <h2 className="mt-5 text-3xl font-black text-white">Before flashing DeadZone</h2>
                            <div className="mt-6 grid gap-3">
                                {checklist.map((item) => (
                                    <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm font-bold text-white">
                                        <CheckCircle2 className="h-5 w-5 shrink-0 text-cyan-300" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </GlassCard>

                        <GlassCard accent="red" className="p-7">
                            <RomBadge accent="red">Guardrails</RomBadge>
                            <h2 className="mt-5 text-3xl font-black text-white">Safety and release integrity</h2>
                            <div className="mt-6 grid gap-3">
                                {guardrails.map(([title, copy]) => (
                                    <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                        <h3 className="flex items-center gap-2 text-sm font-black text-white"><ShieldCheck className="h-4 w-4 text-red-200" /> {title}</h3>
                                        <p className="mt-2 text-sm leading-6 text-zinc-400">{copy}</p>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    </div>

                    <div className="mt-8 grid gap-5 lg:grid-cols-2">
                        <GlassCard accent="gold" className="p-7">
                            <RomBadge accent="gold">Links</RomBadge>
                            <h2 className="mt-5 text-3xl font-black text-white">Configured resources only</h2>
                            <div className="mt-6 space-y-3">
                                <Link href={siteLinks.github} className="flex min-h-12 items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm font-bold text-white"><span className="flex items-center gap-2"><Github className="h-4 w-4 text-cyan-300" /> GitHub</span><span className="text-zinc-500">Configured</span></Link>
                                <Link href="/download" className="flex min-h-12 items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm font-bold text-white"><span className="flex items-center gap-2"><Download className="h-4 w-4 text-cyan-300" /> PixelDrain Archive</span><span className="text-zinc-500">{siteLinks.pixeldrainArchive ? "Configured" : "Coming soon"}</span></Link>
                            </div>
                        </GlassCard>

                        <GlassCard accent="red" className="p-7">
                            <RomBadge accent="red">Flash Warning</RomBadge>
                            <h2 className="mt-5 text-3xl font-black text-white">Custom ROM work carries risk.</h2>
                            <p className="mt-4 text-sm leading-7 text-zinc-300">
                                Flashing can wipe data. Wrong codename builds can brick or damage a device. Backups, bootloader unlock, exact codename checks, and the correct flash script are required before installation.
                            </p>
                            <div className="mt-5 flex gap-3 rounded-2xl border border-red-300/20 bg-red-500/10 p-4">
                                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-100" />
                                <p className="text-sm leading-6 text-red-50/85">DeadZone is not affiliated with Xiaomi, Google, or MediaTek.</p>
                            </div>
                        </GlassCard>
                    </div>

                    <GlassCard accent="blue" className="mt-8 p-7">
                        <RomBadge accent="blue">Product Identity</RomBadge>
                        <div className="mt-5 grid gap-4 md:grid-cols-3">
                            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Name</p><p className="mt-1 text-lg font-black text-white">DeadZone</p></div>
                            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Developer</p><p className="mt-1 text-lg font-black text-white">MEZO</p></div>
                            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Product</p><p className="mt-1 text-lg font-black text-white">DeadZone HyperOS Engineering</p></div>
                        </div>
                        <p className="mt-5 flex items-center gap-2 text-sm leading-7 text-zinc-400"><Cpu className="h-4 w-4 text-cyan-300" /> Stable is the free/public channel. Legend is the premium channel. Gaming and EPiC cover performance and enhanced feature tracks.</p>
                    </GlassCard>
                </div>
            </section>

            <Footer />
        </main>
    );
}
