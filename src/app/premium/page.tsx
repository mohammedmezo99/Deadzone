"use client";

import { Crown, MessageCircle, Sparkles } from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Starfield } from "@/components/starfield";
import { GlassCard, RomBadge, SectionHeader } from "@/components/ui/deadzone";
import { premiumRomStyles, publicRomStyle } from "@/data/styles";
import { officialLinks } from "@/lib/links";

export default function PremiumPage() {
    return (
        <main className="relative min-h-screen">
            <Starfield />
            <Navbar />

            <section className="px-6 pb-20 pt-36">
                <div className="mx-auto max-w-6xl">
                    <SectionHeader
                        eyebrow="Premium Membership"
                        title="Unlock the premium side of DeadZone."
                        description="Premium Membership unlocks GamingPlus, Legend, and Ninja. Contact MEZO directly for access."
                        align="center"
                    />

                    <div className="grid gap-5 md:grid-cols-3">
                        {premiumRomStyles.map((style) => (
                            <GlassCard key={style.id} accent={style.accent} className="p-6">
                                <RomBadge accent={style.accent}>Premium</RomBadge>
                                <h2 className="mt-5 text-2xl font-black text-white">{style.name}</h2>
                                <p className="mt-3 text-sm leading-7 text-zinc-300">{style.shortDescription}</p>
                            </GlassCard>
                        ))}
                    </div>

                    <GlassCard accent="gold" className="mt-8 p-8">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h2 className="text-3xl font-black text-white">Ready for Premium Membership?</h2>
                                <p className="mt-3 text-sm leading-7 text-zinc-300">
                                    Contact MEZO to unlock GamingPlus, Legend, and Ninja. Premium membership keeps the public site simple while giving members access to the premium DeadZone lineup.
                                </p>
                            </div>
                            <a href={officialLinks.contactMezo} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-6 text-xs font-black uppercase tracking-[0.16em] text-slate-950">
                                <MessageCircle className="h-4 w-4" /> Contact MEZO
                            </a>
                        </div>
                    </GlassCard>

                    <div className="mt-8 grid gap-5 md:grid-cols-2">
                        <GlassCard accent="cyan" className="p-6">
                            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-200"><Sparkles className="h-4 w-4" /> Public Style</p>
                            <p className="mt-4 text-2xl font-black text-white">{publicRomStyle.name}</p>
                        </GlassCard>
                        <GlassCard accent="purple" className="p-6">
                            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-purple-200"><Crown className="h-4 w-4" /> Premium Unlocks</p>
                            <p className="mt-4 text-2xl font-black text-white">{premiumRomStyles.map((style) => style.name).join(", ")}</p>
                        </GlassCard>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
