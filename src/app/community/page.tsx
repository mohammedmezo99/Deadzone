"use client";

import { MessageCircle, Shield, Sparkles, Users } from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Starfield } from "@/components/starfield";
import { PremiumButton } from "@/components/ui/premium-button";
import { GlassCard, RomBadge, SectionHeader } from "@/components/ui/deadzone";
import { officialLinks } from "@/lib/links";

const communityCards = [
    { title: "Discussion Group", href: officialLinks.discussionGroup, copy: "Community chat, support, and general DeadZone discussion.", accent: "cyan" as const },
    { title: "Official Updates", href: officialLinks.officialUpdates, copy: "Announcements, release updates, and the main official channel.", accent: "blue" as const },
    { title: "Screenshots Cloud", href: officialLinks.screenshotsCloud, copy: "Public screenshot drops, previews, and visual highlights from the project.", accent: "purple" as const },
    { title: "Supported Devices", href: officialLinks.supportedDevices, copy: "Official supported-device reference shared for the public community.", accent: "magenta" as const },
    { title: "Group Rules", href: officialLinks.groupRules, copy: "Read the rules before posting or requesting support in the discussion group.", accent: "red" as const },
    { title: "Contact MEZO", href: officialLinks.contactMezo, copy: "Direct contact for premium membership, guidance, and official build requests.", accent: "gold" as const },
];

export default function CommunityPage() {
    return (
        <main className="page-shell">
            <Starfield />
            <Navbar />

            <section className="px-6 pb-20 pt-36">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        eyebrow="Community"
                        title="Official DeadZone Telegram channels and public links."
                        description="Stay inside the official DeadZone network for updates, screenshots, support, public device references, and direct contact with MEZO."
                        align="center"
                    />

                    <div className="mb-10 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
                        <GlassCard accent="cyan" className="p-6 md:p-8">
                            <RomBadge accent="cyan">Official Channels</RomBadge>
                            <h2 className="mt-5 text-3xl font-black text-white md:text-4xl">Everything public and official in one place.</h2>
                            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300 md:text-base">
                                Use the community links below for support, update tracking, screenshot previews, premium membership access, and supported-device references.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <RomBadge accent="cyan"><Users className="mr-2 h-4 w-4" /> Discussion</RomBadge>
                                <RomBadge accent="blue"><Sparkles className="mr-2 h-4 w-4" /> Updates</RomBadge>
                                <RomBadge accent="gold"><MessageCircle className="mr-2 h-4 w-4" /> MEZO</RomBadge>
                                <RomBadge accent="red"><Shield className="mr-2 h-4 w-4" /> Rules</RomBadge>
                            </div>
                        </GlassCard>

                        <GlassCard accent="gold" className="p-6 md:p-8">
                            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-amber-200">Direct Access</p>
                            <h2 className="mt-3 text-2xl font-black text-white">Need premium membership or direct guidance?</h2>
                            <p className="mt-4 text-sm leading-7 text-zinc-300">
                                Contact MEZO directly for premium membership, build request guidance, or official support routing.
                            </p>
                            <div className="mt-6">
                                <PremiumButton href={officialLinks.contactMezo} external className="w-full text-xs">
                                    Contact MEZO
                                </PremiumButton>
                            </div>
                        </GlassCard>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {communityCards.map((card) => (
                            <GlassCard key={card.title} accent={card.accent} className="p-6">
                                <RomBadge accent={card.accent}>Official</RomBadge>
                                <h2 className="mt-5 text-2xl font-black text-white">{card.title}</h2>
                                <p className="mt-3 text-sm leading-7 text-zinc-300">{card.copy}</p>
                                <a href={card.href} target="_blank" rel="noopener noreferrer" className="mt-6 flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] px-5 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:border-cyan-300/30 hover:bg-white/[0.08]">
                                    Open Link
                                </a>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
