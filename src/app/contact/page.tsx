"use client";

import { useState } from "react";
import { Check, Copy, Crown, MessageCircle, Send, Smartphone } from "lucide-react";
import { Footer } from "@/components/footer";
import { MaintenanceBanner } from "@/components/maintenance-banner";
import { Navbar } from "@/components/navbar";
import { Starfield } from "@/components/starfield";
import { PremiumButton } from "@/components/ui/premium-button";
import { GlassCard, RomBadge, SectionHeader } from "@/components/ui/deadzone";
import { officialLinks } from "@/lib/links";

const supportTemplate = `Device Name:
Codename:
ROM Version:
Android Version:
DeadZone Style:
Problem Details:
Screenshot / Log:`;

export default function ContactPage() {
    const [copied, setCopied] = useState(false);

    async function copySupportTemplate() {
        try {
            await navigator.clipboard.writeText(supportTemplate);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Support template copy failed:", error);
        }
    }

    return (
        <main className="page-shell">
            <Starfield />
            <Navbar />

            <section className="px-6 pb-20 pt-36">
                <div className="mx-auto max-w-6xl">
                    <MaintenanceBanner />

                    <SectionHeader
                        eyebrow="Contact"
                        title="Contact MEZO for premium membership, build requests, and official support."
                        description="Use the official DeadZone contact flow below. Keep build requests simple and use a valid Recovery OTA ROM .zip link for the cleanest request path."
                        align="center"
                    />

                    <div className="mb-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                        <GlassCard accent="gold" className="p-6 md:p-8">
                            <RomBadge accent="gold">Direct Contact</RomBadge>
                            <h2 className="mt-5 text-3xl font-black text-white md:text-4xl">MEZO is the official point of contact.</h2>
                            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300 md:text-base">
                                Use the official Telegram contact for premium membership, build request guidance, and direct public support routing.
                            </p>
                            <div className="mt-6">
                                <PremiumButton href={officialLinks.contactMezo} external icon={<MessageCircle className="h-4 w-4" />} className="text-xs">
                                    Contact MEZO
                                </PremiumButton>
                            </div>
                        </GlassCard>

                        <GlassCard accent="magenta" className="p-6 md:p-8">
                            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-fuchsia-200">Premium Membership</p>
                            <h2 className="mt-3 text-2xl font-black text-white">Unlock GamingPlus, Legend, and Ninja.</h2>
                            <p className="mt-4 text-sm leading-7 text-zinc-300">
                                Premium Membership is handled directly through MEZO. Use the official contact link to ask about access and availability.
                            </p>
                            <div className="mt-6">
                                <PremiumButton href={officialLinks.contactMezo} external variant="legend" icon={<Crown className="h-4 w-4" />} className="w-full text-xs">
                                    Get Premium Membership
                                </PremiumButton>
                            </div>
                        </GlassCard>
                    </div>

                    <GlassCard accent="cyan" className="mb-10 p-6 md:p-8">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                            <div className="max-w-3xl">
                                <RomBadge accent="cyan">Support Report Template</RomBadge>
                                <h2 className="mt-5 text-3xl font-black text-white md:text-4xl">Send complete issue reports for faster DeadZone support checks.</h2>
                                <p className="mt-4 text-sm leading-7 text-zinc-300 md:text-base">
                                    Include the exact device details below before sending your report to MEZO.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                                <PremiumButton
                                    onClick={copySupportTemplate}
                                    icon={copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    className="text-xs"
                                >
                                    {copied ? "Copied Support Template" : "Copy Support Template"}
                                </PremiumButton>
                                <PremiumButton href={officialLinks.contactMezo} external variant="legend" icon={<MessageCircle className="h-4 w-4" />} className="text-xs">
                                    Contact MEZO
                                </PremiumButton>
                                <PremiumButton href="/devices" variant="secondary" icon={<Smartphone className="h-4 w-4" />} className="text-xs">
                                    View Supported Devices
                                </PremiumButton>
                            </div>
                        </div>

                        <div className="mt-6 rounded-[1.6rem] border border-white/10 bg-black/30 p-5">
                            <pre className="whitespace-pre-wrap font-mono text-sm leading-7 text-zinc-200">{supportTemplate}</pre>
                        </div>

                        <div className="mt-4 rounded-[1.35rem] border border-amber-300/20 bg-amber-400/10 px-4 py-3 text-sm leading-6 text-amber-100">
                            Reports without device codename and clear problem details cannot be checked properly.
                        </div>

                        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                            <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4">
                                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Device Name</p>
                                <p className="mt-2 text-sm font-bold text-white">Your exact device model</p>
                            </div>
                            <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4">
                                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Codename</p>
                                <p className="mt-2 font-mono text-sm text-white">Required for issue checking</p>
                            </div>
                            <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4">
                                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">DeadZone Style</p>
                                <p className="mt-2 text-sm font-bold text-white">Lite / GamingPlus / Legend / Ninja</p>
                            </div>
                            <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4">
                                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Screenshot / Log</p>
                                <p className="mt-2 text-sm font-bold text-white">Attach visual proof or full logs</p>
                            </div>
                        </div>
                    </GlassCard>

                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        <GlassCard accent="cyan" className="p-6">
                            <RomBadge accent="cyan">Build Request</RomBadge>
                            <h2 className="mt-5 text-2xl font-black text-white">Fastest Command</h2>
                            <p className="mt-3 font-mono text-lg font-black text-white">/mezo &lt;OTA_ROM_LINK&gt;</p>
                            <p className="mt-3 text-sm leading-7 text-zinc-300">Use a valid Recovery OTA ROM .zip link.</p>
                        </GlassCard>

                        <GlassCard accent="blue" className="p-6">
                            <RomBadge accent="blue">Existing Builds</RomBadge>
                            <h2 className="mt-5 text-2xl font-black text-white">Codename Check</h2>
                            <p className="mt-3 font-mono text-lg font-black text-white">/mezo &lt;codename&gt;</p>
                            <p className="mt-3 text-sm leading-7 text-zinc-300">Example: <span className="font-mono text-white">/mezo zircon</span></p>
                        </GlassCard>

                        <GlassCard accent="purple" className="p-6">
                            <RomBadge accent="purple">Official Links</RomBadge>
                            <h2 className="mt-5 text-2xl font-black text-white">Stay inside the official channels.</h2>
                            <div className="mt-4 space-y-3 text-sm">
                                <a href={officialLinks.officialUpdates} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white transition hover:border-cyan-300/30">
                                    <Send className="h-4 w-4 text-cyan-200" />
                                    Official Updates
                                </a>
                                <a href={officialLinks.discussionGroup} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white transition hover:border-cyan-300/30">
                                    <Smartphone className="h-4 w-4 text-cyan-200" />
                                    Discussion Group
                                </a>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
