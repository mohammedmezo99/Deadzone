"use client";

import { MessageCircle, Shield, Sparkles, Users } from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Starfield } from "@/components/starfield";
import { GlassCard, RomBadge, SectionHeader } from "@/components/ui/deadzone";
import { officialLinks } from "@/data/deadzone-registry";

const communityCards = [
    { title: "Contact MEZO", href: officialLinks.contact, copy: "Direct contact for premium membership and official DeadZone requests.", accent: "gold" as const },
    { title: "Discussion Group", href: officialLinks.discussion, copy: "Community chat, support, and general DeadZone discussion.", accent: "cyan" as const },
    { title: "Official Updates", href: officialLinks.updates, copy: "Announcements, release updates, and official channel posts.", accent: "blue" as const },
    { title: "Screenshots Cloud", href: officialLinks.screenshots, copy: "Public screenshot drops and visual previews from the project.", accent: "purple" as const },
    { title: "Supported Devices", href: officialLinks.supportedDevices, copy: "Official supported-device reference shared in the community.", accent: "magenta" as const },
    { title: "Group Rules", href: officialLinks.groupRules, copy: "Read the rules before posting or requesting support in the group.", accent: "red" as const },
];

export default function CommunityPage() {
    return (
        <main className="relative min-h-screen">
            <Starfield />
            <Navbar />

            <section className="px-6 pb-20 pt-36">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        eyebrow="Community"
                        title="Official DeadZone Telegram channels and public links."
                        description="Stay inside the official DeadZone network for updates, screenshots, group discussion, supported-device references, and direct contact with MEZO."
                        align="center"
                    />

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {communityCards.map((card) => (
                            <GlassCard key={card.title} accent={card.accent} className="p-6">
                                <RomBadge accent={card.accent}>Official</RomBadge>
                                <h2 className="mt-5 text-2xl font-black text-white">{card.title}</h2>
                                <p className="mt-3 text-sm leading-7 text-zinc-300">{card.copy}</p>
                                <a href={card.href} target="_blank" rel="noopener noreferrer" className="mt-6 flex min-h-12 items-center justify-center rounded-2xl bg-white/[0.06] px-5 text-xs font-black uppercase tracking-[0.16em] text-white">
                                    Open Link
                                </a>
                            </GlassCard>
                        ))}
                    </div>

                    <GlassCard accent="cyan" className="mt-10 p-7">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h2 className="text-2xl font-black text-white">Public community only.</h2>
                                <p className="mt-3 text-sm leading-7 text-zinc-300">
                                    This public site is for marketing, downloads, devices, styles, premium membership, and official community links.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <RomBadge accent="cyan"><Users className="mr-2 h-4 w-4" /> Discussion</RomBadge>
                                <RomBadge accent="blue"><Sparkles className="mr-2 h-4 w-4" /> Updates</RomBadge>
                                <RomBadge accent="gold"><MessageCircle className="mr-2 h-4 w-4" /> MEZO</RomBadge>
                                <RomBadge accent="red"><Shield className="mr-2 h-4 w-4" /> Rules</RomBadge>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </section>

            <Footer />
        </main>
    );
}
