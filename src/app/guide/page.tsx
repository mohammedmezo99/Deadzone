import type { Metadata } from "next";
import { AlertTriangle, CheckCircle2, ClipboardList, MessageCircle, ShieldCheck, Smartphone } from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Starfield } from "@/components/starfield";
import { PremiumButton } from "@/components/ui/premium-button";
import { GlassCard, RomBadge, SectionHeader } from "@/components/ui/deadzone";
import { officialLinks } from "@/lib/links";

export const metadata: Metadata = {
    title: "DeadZone Install Guide | Flashing and Support",
    description:
        "Read the DeadZone install guide before flashing builds. Check codename, ROM version, Android version, HyperOS base, and support requirements.",
    alternates: {
        canonical: "/guide",
    },
};

const flashChecklist = [
    "Backup your important data first.",
    "Confirm your exact device codename.",
    "Use only the correct ROM base for your device.",
    "Make sure your battery is above 50%.",
    "Do not flash a build made for another codename.",
    "Read the build notes before installing.",
    "Flashing custom ROM builds is done at your own risk.",
];

const infoChecklist = [
    "Device Name",
    "Codename",
    "ROM Version",
    "Android Version",
    "HyperOS Version",
    "Region",
    "DeadZone Style",
    "Screenshot or log if reporting a problem",
];

export default function GuidePage() {
    return (
        <main className="page-shell">
            <Starfield />
            <Navbar />

            <section className="px-6 pb-20 pt-36">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        eyebrow="Install Guide"
                        title="DeadZone Install Guide"
                        description="Read this guide before flashing any DeadZone build to avoid wrong device, wrong codename, or unsupported ROM issues."
                        align="center"
                    />

                    <div className="mb-10 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
                        <GlassCard accent="cyan" className="p-7 md:p-9">
                            <RomBadge accent="cyan">Before You Flash</RomBadge>
                            <h2 className="mt-5 text-3xl font-black text-white md:text-4xl">Before You Flash</h2>
                            <div className="mt-6 grid gap-3">
                                {flashChecklist.map((item) => (
                                    <div key={item} className="flex items-start gap-3 rounded-[1.35rem] border border-white/10 bg-white/[0.04] px-4 py-3">
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-200" />
                                        <p className="text-sm leading-7 text-zinc-300">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>

                        <GlassCard accent="blue" className="p-7 md:p-9">
                            <RomBadge accent="blue">Required Information</RomBadge>
                            <h2 className="mt-5 text-3xl font-black text-white md:text-4xl">Required Information</h2>
                            <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                {infoChecklist.map((item) => (
                                    <div key={item} className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4">
                                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Checklist</p>
                                        <p className="mt-2 text-sm font-bold text-white">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    </div>

                    <div className="mb-10 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
                        <GlassCard accent="magenta" className="p-7 md:p-9">
                            <RomBadge accent="magenta">How to Request DeadZone Lite</RomBadge>
                            <h2 className="mt-5 text-3xl font-black text-white md:text-4xl">How to Request DeadZone Lite</h2>
                            <p className="mt-4 text-sm leading-7 text-zinc-300 md:text-base">
                                Public Lite builds can be requested through the Telegram bot using:
                            </p>
                            <div className="mt-5 grid gap-4 md:grid-cols-2">
                                <div className="rounded-[1.45rem] border border-white/10 bg-white/[0.04] p-5">
                                    <p className="text-[11px] font-black uppercase tracking-[0.22em] text-fuchsia-200">OTA Request</p>
                                    <p className="mt-3 font-mono text-lg font-black text-white">/mezo &lt;OTA_ROM_LINK&gt;</p>
                                </div>
                                <div className="rounded-[1.45rem] border border-white/10 bg-white/[0.04] p-5">
                                    <p className="text-[11px] font-black uppercase tracking-[0.22em] text-fuchsia-200">Codename Check</p>
                                    <p className="mt-3 font-mono text-lg font-black text-white">/mezo &lt;codename&gt;</p>
                                </div>
                            </div>
                            <div className="mt-6">
                                <PremiumButton icon={<ClipboardList className="h-4 w-4" />} className="text-xs">
                                    Copy Command Example: /mezo zircon
                                </PremiumButton>
                            </div>
                        </GlassCard>

                        <GlassCard accent="gold" className="p-7 md:p-9">
                            <RomBadge accent="gold">Premium Styles</RomBadge>
                            <h2 className="mt-5 text-3xl font-black text-white md:text-4xl">Premium Styles</h2>
                            <p className="mt-4 text-sm leading-7 text-zinc-300 md:text-base">
                                GamingPlus, Legend, and Ninja are premium DeadZone styles. Contact MEZO to check availability for your device and ROM version.
                            </p>
                            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col">
                                <PremiumButton href={officialLinks.contactMezo} external variant="legend" icon={<MessageCircle className="h-4 w-4" />} className="text-xs">
                                    Contact MEZO
                                </PremiumButton>
                                <PremiumButton href="/premium" variant="secondary" icon={<ShieldCheck className="h-4 w-4" />} className="text-xs">
                                    View Premium
                                </PremiumButton>
                                <PremiumButton href="/styles" variant="secondary" icon={<Smartphone className="h-4 w-4" />} className="text-xs">
                                    View Styles
                                </PremiumButton>
                            </div>
                        </GlassCard>
                    </div>

                    <GlassCard accent="red" className="mb-10 p-7 md:p-9">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-red-300/25 bg-red-500/10 text-red-200">
                                <AlertTriangle className="h-5 w-5" />
                            </div>
                            <div>
                                <RomBadge accent="red">Important Warning</RomBadge>
                                <h2 className="mt-5 text-3xl font-black text-white md:text-4xl">Important Warning</h2>
                                <p className="mt-4 text-sm leading-7 text-zinc-300 md:text-base">
                                    Never flash a DeadZone build if the codename, ROM version, Android version, or HyperOS base does not match your device. Wrong files may cause bootloop or serious system issues.
                                </p>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard accent="blue" className="p-7 md:p-9">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div className="max-w-4xl">
                                <RomBadge accent="blue">Need Help</RomBadge>
                                <h2 className="mt-5 text-3xl font-black text-white md:text-4xl">Need Help</h2>
                                <p className="mt-4 text-sm leading-7 text-zinc-300 md:text-base">
                                    If you face any problem, send your device name, codename, ROM version, Android version, DeadZone style, full problem details, and screenshot or log.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                                <PremiumButton href="/contact" variant="secondary" icon={<ClipboardList className="h-4 w-4" />} className="text-xs">
                                    Support Template
                                </PremiumButton>
                                <PremiumButton href="/devices" variant="secondary" icon={<Smartphone className="h-4 w-4" />} className="text-xs">
                                    View Supported Devices
                                </PremiumButton>
                                <PremiumButton href="/downloads" icon={<CheckCircle2 className="h-4 w-4" />} className="text-xs">
                                    Check Downloads
                                </PremiumButton>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </section>

            <Footer />
        </main>
    );
}
