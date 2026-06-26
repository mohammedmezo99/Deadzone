"use client";

import { Mail, MessageCircle, Send } from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Starfield } from "@/components/starfield";
import { GlassCard, RomBadge, SectionHeader } from "@/components/ui/deadzone";
import { officialLinks } from "@/data/deadzone-registry";

export default function ContactPage() {
    return (
        <main className="relative min-h-screen">
            <Starfield />
            <Navbar />

            <section className="px-6 pb-20 pt-36">
                <div className="mx-auto max-w-5xl">
                    <SectionHeader
                        eyebrow="Contact"
                        title="Contact MEZO for premium access, build requests, and official support."
                        description="Use the official DeadZone channels below. Keep build requests simple and use a valid Recovery OTA ROM .zip link for the fastest clean process."
                        align="center"
                    />

                    <div className="grid gap-5 md:grid-cols-3">
                        <GlassCard accent="gold" className="p-6">
                            <RomBadge accent="gold">Direct</RomBadge>
                            <h2 className="mt-5 text-2xl font-black text-white">Contact MEZO</h2>
                            <p className="mt-3 text-sm leading-7 text-zinc-300">Premium membership, build requests, and direct communication.</p>
                            <a href={officialLinks.contact} target="_blank" rel="noopener noreferrer" className="mt-6 flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-5 text-xs font-black uppercase tracking-[0.16em] text-slate-950">
                                <MessageCircle className="h-4 w-4" /> Open Telegram
                            </a>
                        </GlassCard>

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
                    </div>

                    <GlassCard accent="purple" className="mt-8 p-7">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                                <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-purple-200"><Send className="h-4 w-4" /> Official Updates</p>
                                <a href={officialLinks.updates} target="_blank" rel="noopener noreferrer" className="mt-3 block text-sm font-bold text-white">{officialLinks.updates}</a>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                                <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-purple-200"><Mail className="h-4 w-4" /> Discussion Group</p>
                                <a href={officialLinks.discussion} target="_blank" rel="noopener noreferrer" className="mt-3 block text-sm font-bold text-white">{officialLinks.discussion}</a>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </section>

            <Footer />
        </main>
    );
}
