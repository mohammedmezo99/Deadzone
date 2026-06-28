"use client";

import { Crown, Download, Gem, MessageCircle, ShieldCheck, Sparkles, Smartphone, Zap } from "lucide-react";
import { MembershipCard } from "@/components/MembershipCard";
import { Footer } from "@/components/footer";
import { MaintenanceBanner } from "@/components/maintenance-banner";
import { Navbar } from "@/components/navbar";
import { Starfield } from "@/components/starfield";
import { PremiumButton } from "@/components/ui/premium-button";
import { GlassCard, PlatformPill, RomBadge, SectionHeader } from "@/components/ui/deadzone";
import { supportedDevices } from "@/data/devices";
import { premiumRomStyles, romStyles } from "@/data/styles";
import { officialLinks, siteLinks } from "@/lib/links";

const counts = {
    devices: supportedDevices.length,
    styles: romStyles.length,
    premium: premiumRomStyles.length,
};

const spotlightCards = [
    {
        title: "DeadZone Lite",
        copy: "The official public build line: clean, fast, polished, and designed for everyday HyperOS performance.",
        accent: "cyan" as const,
    },
    {
        title: "Premium Membership",
        copy: "Unlock GamingPlus, Legend, and Ninja with a more exclusive DeadZone experience shaped around your device.",
        accent: "gold" as const,
    },
    {
        title: "Official Access",
        copy: "Explore public builds, check supported devices, and contact MEZO directly for premium membership or build requests.",
        accent: "magenta" as const,
    },
];

const featureCards = [
    "DeadZone is a premium HyperOS ROM project by Mohammed MEZO.",
    "DeadZone Lite is the public build line for fast access and clean releases.",
    "Premium Membership unlocks GamingPlus, Legend, and Ninja.",
    "Supported devices span Xiaomi, Redmi, POCO, MIX, Fold, and Pad families.",
];

export default function Home() {
    return (
        <main className="page-shell">
            <Starfield />
            <Navbar />

            <section className="relative px-6 pb-20 pt-36 md:pt-40">
                <div className="pointer-events-none absolute inset-x-0 top-8 h-[640px] bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(217,70,239,0.16),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.14),transparent_30%)]" />
                <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1.08fr_0.92fr]">
                    <div className="relative z-10 lg:col-span-2">
                        <MaintenanceBanner />
                    </div>

                    <div className="relative z-10">
                        <RomBadge accent="cyan">Official Public Site</RomBadge>
                        <h1 className="mt-6 max-w-5xl text-5xl font-black leading-[0.94] tracking-tight text-white md:text-7xl">
                            DeadZone is a premium <span className="text-gradient">HyperOS ROM project</span> by MEZO.
                        </h1>
                        <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-300 md:text-lg">
                            DeadZone Lite is the public build line for polished daily use, while Premium Membership unlocks GamingPlus, Legend, and Ninja for a more exclusive DeadZone experience.
                        </p>

                        <div className="mt-7 flex flex-wrap gap-3">
                            <RomBadge accent="cyan">DeadZone Lite Public Builds</RomBadge>
                            <RomBadge accent="blue">Xiaomi • Redmi • POCO</RomBadge>
                            <RomBadge accent="magenta">GamingPlus • Legend • Ninja</RomBadge>
                        </div>

                        <div className="mt-9 grid gap-3 sm:flex sm:flex-wrap">
                            <PremiumButton href={siteLinks.downloads} icon={<Download className="h-5 w-5" />}>
                                Explore Builds
                            </PremiumButton>
                            <PremiumButton href={siteLinks.devices} variant="secondary" icon={<Smartphone className="h-5 w-5" />}>
                                Supported Devices
                            </PremiumButton>
                            <PremiumButton href={officialLinks.contactMezo} external variant="legend" icon={<Gem className="h-5 w-5" />}>
                                Get Premium Membership
                            </PremiumButton>
                        </div>
                    </div>

                    <MembershipCard />
                </div>
            </section>

            <section className="px-6 pb-6">
                <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
                    <GlassCard accent="cyan" className="p-6">
                        <p className="text-5xl font-black text-white">{counts.devices}</p>
                        <p className="mt-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Supported Devices</p>
                    </GlassCard>
                    <GlassCard accent="blue" className="p-6">
                        <p className="text-5xl font-black text-white">{counts.styles}</p>
                        <p className="mt-2 text-xs font-black uppercase tracking-[0.22em] text-blue-200">ROM Styles</p>
                    </GlassCard>
                    <GlassCard accent="magenta" className="p-6">
                        <p className="text-5xl font-black text-white">{counts.premium}</p>
                        <p className="mt-2 text-xs font-black uppercase tracking-[0.22em] text-fuchsia-200">Premium Styles</p>
                    </GlassCard>
                </div>
            </section>

            <section className="px-6 py-14">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        eyebrow="DeadZone Identity"
                        title="A public DeadZone experience built for official discovery."
                        description="The site is focused on clean build access, supported devices, premium membership, and official community channels."
                        align="center"
                    />

                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {featureCards.map((copy, index) => (
                            <GlassCard key={copy} accent={index === 1 ? "cyan" : index === 2 ? "gold" : index === 3 ? "blue" : "magenta"} className="h-full p-6">
                                {index === 0 ? <ShieldCheck className="mb-6 h-8 w-8" /> : index === 1 ? <Sparkles className="mb-6 h-8 w-8" /> : index === 2 ? <Gem className="mb-6 h-8 w-8" /> : <Zap className="mb-6 h-8 w-8" />}
                                <p className="text-sm leading-7 text-zinc-300">{copy}</p>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 py-14">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        eyebrow="Styles"
                        title="DeadZone Lite for public users. GamingPlus, Legend, and Ninja for members."
                        description="DeadZone Lite is the public line, while Premium Membership unlocks the three premium DeadZone experiences."
                        align="center"
                    />

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {romStyles.map((style) => (
                            <GlassCard key={style.id} accent={style.accent} className="h-full p-6">
                                <RomBadge accent={style.accent}>{style.type === "public" ? "Public" : "Premium"}</RomBadge>
                                <h3 className="mt-5 text-2xl font-black text-white">{style.name}</h3>
                                <p className="mt-3 text-sm leading-7 text-zinc-300">{style.shortDescription}</p>
                                <ul className="mt-5 space-y-2 text-sm text-zinc-400">
                                    {style.features.map((feature) => (
                                        <li key={feature}>{feature}</li>
                                    ))}
                                </ul>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 py-14">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        eyebrow="Official Requests"
                        title="Clean request guidance for public users."
                        description="Use a valid Recovery OTA ROM .zip link for build requests, or check an existing codename directly with MEZO."
                        align="center"
                    />

                    <div className="grid gap-5 md:grid-cols-2">
                        <GlassCard accent="cyan" className="p-6">
                            <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Build Request Command</p>
                            <p className="mt-4 font-mono text-lg font-black text-white">/mezo &lt;OTA_ROM_LINK&gt;</p>
                            <p className="mt-3 text-sm leading-7 text-zinc-300">Use a valid Recovery OTA ROM .zip link.</p>
                        </GlassCard>
                        <GlassCard accent="blue" className="p-6">
                            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-200">Existing Builds Command</p>
                            <p className="mt-4 font-mono text-lg font-black text-white">/mezo &lt;codename&gt;</p>
                            <p className="mt-3 text-sm leading-7 text-zinc-300">Example: <span className="font-mono text-white">/mezo zircon</span></p>
                        </GlassCard>
                    </div>
                </div>
            </section>

            <section className="px-6 pb-24 pt-14">
                <div className="mx-auto max-w-6xl">
                    <GlassCard accent="gold" className="p-7 md:p-9">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div className="max-w-3xl">
                                <h2 className="text-3xl font-black text-white">Official channels, premium support, and public builds in one place.</h2>
                                <p className="mt-4 text-sm leading-7 text-zinc-300">
                                    Contact MEZO directly for premium membership, follow official updates, and join the DeadZone discussion group for community support and public device coverage.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <a href={officialLinks.contactMezo} target="_blank" rel="noopener noreferrer">
                                    <PlatformPill accent="gold"><MessageCircle className="mr-2 h-4 w-4" /> Contact MEZO</PlatformPill>
                                </a>
                                <a href={officialLinks.officialUpdates} target="_blank" rel="noopener noreferrer">
                                    <PlatformPill accent="cyan"><Sparkles className="mr-2 h-4 w-4" /> Official Updates</PlatformPill>
                                </a>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </section>

            <Footer />
        </main>
    );
}
