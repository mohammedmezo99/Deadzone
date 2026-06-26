"use client";

import { motion } from "framer-motion";
import { Crown, Download, Gem, MessageCircle, ShieldCheck, Sparkles, Smartphone } from "lucide-react";
import { useRouter } from "next/navigation";
import { Footer } from "@/components/footer";
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

const highlights = [
    {
        title: "DeadZone Lite",
        copy: "The public DeadZone build line focused on clean performance, fast updates, and a polished daily HyperOS experience.",
        accent: "cyan" as const,
    },
    {
        title: "Premium Membership",
        copy: "Unlock GamingPlus, Legend, and Ninja with direct support and a premium DeadZone experience shaped around your device.",
        accent: "gold" as const,
    },
    {
        title: "MEZO Request Flow",
        copy: "Use a valid Recovery OTA ROM .zip link with /mezo <OTA_ROM_LINK>, or check existing builds with /mezo <codename>.",
        accent: "purple" as const,
    },
];

const featureCards = [
    "DeadZone Lite is the public build line.",
    "Premium Membership unlocks GamingPlus, Legend, and Ninja.",
    "Use /mezo <OTA_ROM_LINK> for the fastest clean build request flow.",
    "Use /mezo <codename> to check existing builds.",
];

export default function Home() {
    const router = useRouter();

    return (
        <main className="relative min-h-screen">
            <Starfield />
            <Navbar />

            <section className="px-6 pb-16 pt-36">
                <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                    <div>
                        <RomBadge accent="cyan">DeadZone by Mohammed MEZO</RomBadge>
                        <h1 className="mt-6 max-w-5xl text-5xl font-black leading-[0.98] tracking-tight text-white md:text-7xl">
                            DeadZone Lite for the public.
                            <span className="block text-gradient">Premium styles for members.</span>
                        </h1>
                        <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-300 md:text-lg">
                            DeadZone is a premium HyperOS ROM project by Mohammed MEZO. DeadZone Lite is the public build line, while Premium Membership unlocks GamingPlus, Legend, and Ninja.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <PremiumButton onClick={() => router.push(siteLinks.downloads)} icon={<Download className="h-5 w-5" />}>
                                Explore Builds
                            </PremiumButton>
                            <PremiumButton variant="secondary" onClick={() => router.push(siteLinks.devices)} icon={<Smartphone className="h-5 w-5" />}>
                                Supported Devices
                            </PremiumButton>
                            <PremiumButton variant="secondary" onClick={() => router.push(siteLinks.premium)} icon={<Gem className="h-5 w-5" />}>
                                Get Premium Membership
                            </PremiumButton>
                        </div>
                    </div>

                    <GlassCard accent="purple" className="p-6 md:p-7">
                        <div className="mb-5 flex items-center justify-between">
                            <RomBadge accent="gold">Premium Membership</RomBadge>
                            <Crown className="h-6 w-6 text-amber-200" />
                        </div>
                        <div className="grid gap-4">
                            {highlights.map((item, index) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 18 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08 }}
                                >
                                    <GlassCard accent={item.accent} className="p-5">
                                        <h2 className="text-xl font-black text-white">{item.title}</h2>
                                        <p className="mt-3 text-sm leading-7 text-zinc-300">{item.copy}</p>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </div>
                    </GlassCard>
                </div>
            </section>

            <section className="px-6 py-10">
                <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
                    <GlassCard accent="purple" className="p-6"><p className="text-5xl font-black text-white">{counts.styles}</p><p className="mt-2 text-xs font-black uppercase tracking-[0.22em] text-purple-200">ROM Styles</p></GlassCard>
                    <GlassCard accent="blue" className="p-6"><p className="text-5xl font-black text-white">{counts.premium}</p><p className="mt-2 text-xs font-black uppercase tracking-[0.22em] text-blue-200">Premium Styles</p></GlassCard>
                    <GlassCard accent="cyan" className="p-6"><p className="text-5xl font-black text-white">{counts.devices}</p><p className="mt-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Supported Devices</p></GlassCard>
                </div>
            </section>

            <section className="px-6 py-14">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        eyebrow="Public Direction"
                        title="A public DeadZone website built for downloads, styles, and community."
                        description="This site is focused on public DeadZone discovery. No private infrastructure, build pipeline, or internal management wording belongs here."
                        align="center"
                    />
                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {featureCards.map((copy, index) => (
                            <motion.div
                                key={copy}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <GlassCard accent={index === 1 ? "gold" : index === 2 ? "purple" : index === 3 ? "blue" : "cyan"} className="h-full p-6">
                                    <ShieldCheck className="mb-6 h-8 w-8" />
                                    <p className="text-sm leading-7 text-zinc-300">{copy}</p>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 py-14">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        eyebrow="Styles"
                        title="One public style. Three premium styles."
                        description="DeadZone Lite is public. GamingPlus, Legend, and Ninja are part of Premium Membership."
                        align="center"
                    />
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {romStyles.map((style) => (
                            <GlassCard key={style.id} accent={style.accent} className="h-full p-6">
                                <RomBadge accent={style.accent}>
                                    {style.type === "public" ? "Public" : "Premium"}
                                </RomBadge>
                                <h3 className="mt-5 text-2xl font-black text-white">{style.name}</h3>
                                <p className="mt-3 text-sm leading-7 text-zinc-400">{style.shortDescription}</p>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 py-14">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        eyebrow="Official Commands"
                        title="Request a build or check an existing codename."
                        description="Use a valid Recovery OTA ROM .zip link for the fastest clean build request flow."
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

            <section className="px-6 py-14 pb-24">
                <div className="mx-auto max-w-5xl">
                    <GlassCard accent="red" className="p-7 md:p-8">
                        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h2 className="text-2xl font-black text-white">Stay with the official DeadZone channels.</h2>
                                <p className="mt-3 text-sm leading-7 text-zinc-300">
                                    Contact MEZO directly, follow official updates, and join the discussion group for support, screenshots, and device announcements.
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
