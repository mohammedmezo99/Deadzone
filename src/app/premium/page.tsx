"use client";

import { Crown, Gem, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Starfield } from "@/components/starfield";
import { PremiumButton } from "@/components/ui/premium-button";
import { GlassCard, RomBadge, SectionHeader } from "@/components/ui/deadzone";
import { premiumRomStyles, publicRomStyle } from "@/data/styles";
import { officialLinks } from "@/lib/links";

export default function PremiumPage() {
    return (
        <main className="page-shell">
            <Starfield />
            <Navbar />

            <section className="px-6 pb-20 pt-36">
                <div className="mx-auto max-w-6xl">
                    <SectionHeader
                        eyebrow="Premium Membership"
                        title="Unlock DeadZone Premium Membership and access GamingPlus, Legend, and Ninja."
                        description="Premium Membership is the exclusive upgrade path beyond DeadZone Lite, built for users who want a more elevated DeadZone experience."
                        align="center"
                    />

                    <GlassCard accent="gold" className="mb-10 p-7 md:p-10">
                        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                            <div>
                                <RomBadge accent="gold">Exclusive Access</RomBadge>
                                <h2 className="mt-5 text-4xl font-black text-white">Premium Membership makes the DeadZone lineup feel complete.</h2>
                                <p className="mt-4 text-sm leading-7 text-zinc-300 md:text-base">
                                    DeadZone Lite remains the public line. Premium Membership unlocks GamingPlus, Legend, and Ninja for users who want stronger identity, more exclusivity, and a premium-tier DeadZone experience.
                                </p>
                                <div className="mt-6 flex flex-wrap gap-3">
                                    <PremiumButton href={officialLinks.contactMezo} external variant="legend" icon={<Crown className="h-4 w-4" />} className="text-xs">
                                        Get Premium Membership
                                    </PremiumButton>
                                    <PremiumButton href="/styles" variant="secondary" icon={<Sparkles className="h-4 w-4" />} className="text-xs">
                                        View All Styles
                                    </PremiumButton>
                                </div>
                            </div>

                            <div className="grid gap-4">
                                <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5">
                                    <p className="text-[11px] font-black uppercase tracking-[0.24em] text-cyan-200">Public Entry Point</p>
                                    <p className="mt-3 text-2xl font-black text-white">{publicRomStyle.name}</p>
                                    <p className="mt-2 text-sm leading-7 text-zinc-400">{publicRomStyle.shortDescription}</p>
                                </div>
                                <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5">
                                    <p className="text-[11px] font-black uppercase tracking-[0.24em] text-amber-200">Premium Unlocks</p>
                                    <p className="mt-3 text-2xl font-black text-white">{premiumRomStyles.map((style) => style.name).join(" • ")}</p>
                                    <p className="mt-2 text-sm leading-7 text-zinc-400">Three premium DeadZone directions, one membership path.</p>
                                </div>
                            </div>
                        </div>
                    </GlassCard>

                    <div className="grid gap-5 md:grid-cols-3">
                        {premiumRomStyles.map((style) => (
                            <GlassCard key={style.id} accent={style.accent} className="p-6">
                                <RomBadge accent={style.accent}>Premium</RomBadge>
                                <h2 className="mt-5 text-2xl font-black text-white">{style.name}</h2>
                                <p className="mt-3 text-sm leading-7 text-zinc-300">{style.shortDescription}</p>
                                <ul className="mt-5 space-y-2 text-sm text-zinc-400">
                                    {style.features.map((feature) => (
                                        <li key={feature}>{feature}</li>
                                    ))}
                                </ul>
                            </GlassCard>
                        ))}
                    </div>

                    <div className="mt-10 grid gap-5 md:grid-cols-3">
                        <GlassCard accent="cyan" className="p-6">
                            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-200"><Gem className="h-4 w-4" /> Premium Value</p>
                            <p className="mt-4 text-sm leading-7 text-zinc-300">A stronger DeadZone identity for users who want to move beyond the public build line.</p>
                        </GlassCard>
                        <GlassCard accent="magenta" className="p-6">
                            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-fuchsia-200"><ShieldCheck className="h-4 w-4" /> Clean Access</p>
                            <p className="mt-4 text-sm leading-7 text-zinc-300">No cluttered flow. Contact MEZO directly and keep the public site focused and clear.</p>
                        </GlassCard>
                        <GlassCard accent="gold" className="p-6">
                            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-amber-200"><MessageCircle className="h-4 w-4" /> Official CTA</p>
                            <p className="mt-4 text-sm leading-7 text-zinc-300">Premium access, membership questions, and official guidance all route through MEZO.</p>
                        </GlassCard>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
