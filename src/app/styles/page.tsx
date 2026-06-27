"use client";

import { Crown, MonitorSmartphone, Sparkles, Zap } from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Starfield } from "@/components/starfield";
import { PremiumButton } from "@/components/ui/premium-button";
import { GlassCard, RomBadge, SectionHeader } from "@/components/ui/deadzone";
import { premiumRomStyles, publicRomStyle, romStyles } from "@/data/styles";
import { officialLinks, siteLinks } from "@/lib/links";

const showcaseCards = [
    {
        name: "DeadZone Lite",
        android: "A13 / A14 / A15 / A16",
        hyperOs: "OS1 / OS2 / OS3",
        bestFor: "Public users, clean daily use, stable experience",
        screenshots: ["Home Screen", "Settings", "Control Center", "About Phone"],
        status: "Public",
        actionLabel: "View Builds",
        actionHref: "/downloads?style=Lite",
        actionExternal: false,
        accent: "cyan" as const,
    },
    {
        name: "DeadZone GamingPlus",
        android: "A13 / A14 / A15 / A16",
        hyperOs: "OS1 / OS2 / OS3",
        bestFor: "Gaming users, smoother response, performance feel",
        screenshots: ["Gaming UI", "Home Screen", "Control Center", "Performance Style"],
        status: "Premium",
        actionLabel: "Contact MEZO",
        actionHref: officialLinks.contactMezo,
        actionExternal: true,
        accent: "magenta" as const,
    },
    {
        name: "DeadZone Legend",
        android: "A13 / A14 / A15 / A16",
        hyperOs: "OS1 / OS2 / OS3",
        bestFor: "Balanced users, polished visuals, daily-driver reliability",
        screenshots: ["Home Screen", "Settings", "Icons", "System UI"],
        status: "Premium",
        actionLabel: "Contact MEZO",
        actionHref: officialLinks.contactMezo,
        actionExternal: true,
        accent: "gold" as const,
    },
    {
        name: "DeadZone Ninja",
        android: "A13 / A14 / A15 / A16",
        hyperOs: "OS1 / OS2 / OS3",
        bestFor: "Exclusive users, advanced patches, stronger DeadZone identity",
        screenshots: ["Control Center", "Lockscreen", "Settings", "Ninja Identity"],
        status: "Premium",
        actionLabel: "Contact MEZO",
        actionHref: officialLinks.contactMezo,
        actionExternal: true,
        accent: "purple" as const,
    },
];

export default function StylesPage() {
    return (
        <main className="page-shell">
            <Starfield />
            <Navbar />

            <section className="px-6 pb-20 pt-36">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        eyebrow="ROM Styles"
                        title="Four DeadZone styles, one clean public path, three premium unlocks."
                        description="DeadZone Lite is the public line. Premium Membership unlocks GamingPlus, Legend, and Ninja for users who want a more exclusive DeadZone experience."
                        align="center"
                    />

                    <div className="mb-10 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
                        <GlassCard accent="cyan" className="p-6 md:p-8">
                            <RomBadge accent="cyan">Public Style</RomBadge>
                            <h2 className="mt-5 text-3xl font-black text-white md:text-4xl">{publicRomStyle.name}</h2>
                            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300 md:text-base">{publicRomStyle.shortDescription}</p>
                            <ul className="mt-6 space-y-3 text-sm text-zinc-300">
                                {publicRomStyle.features.map((feature) => (
                                    <li key={feature}>{feature}</li>
                                ))}
                            </ul>
                            <div className="mt-6">
                                <PremiumButton href={siteLinks.downloads} icon={<Sparkles className="h-4 w-4" />} className="text-xs">
                                    Explore Builds
                                </PremiumButton>
                            </div>
                        </GlassCard>

                        <GlassCard accent="gold" className="p-6 md:p-8">
                            <RomBadge accent="gold">Premium Membership</RomBadge>
                            <h2 className="mt-5 text-3xl font-black text-white md:text-4xl">GamingPlus, Legend, and Ninja.</h2>
                            <p className="mt-4 text-sm leading-7 text-zinc-300 md:text-base">
                                Premium Membership is the access point to the full premium DeadZone lineup, designed for users who want a more distinctive, more exclusive experience.
                            </p>
                            <div className="mt-6 grid gap-3 sm:grid-cols-3">
                                {premiumRomStyles.map((style) => (
                                    <div key={style.id} className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4">
                                        <p className="text-sm font-black text-white">{style.name}</p>
                                        <p className="mt-2 text-xs leading-6 text-zinc-400">{style.shortDescription}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6">
                                <PremiumButton href={officialLinks.contactMezo} external variant="legend" icon={<Crown className="h-4 w-4" />} className="text-xs">
                                    Get Premium Membership
                                </PremiumButton>
                            </div>
                        </GlassCard>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {romStyles.map((style) => (
                            <GlassCard key={style.id} accent={style.accent} className="h-full p-6">
                                <RomBadge accent={style.accent}>{style.type === "public" ? "Public" : "Premium"}</RomBadge>
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

                    <GlassCard accent="magenta" className="mt-10 p-7 md:p-8">
                        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                            <div className="max-w-3xl">
                                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-fuchsia-200">Premium Direction</p>
                                <h2 className="mt-3 text-3xl font-black text-white">Make the premium lineup the next step after DeadZone Lite.</h2>
                                <p className="mt-4 text-sm leading-7 text-zinc-300">
                                    DeadZone Lite gets users into the ecosystem. GamingPlus, Legend, and Ninja position Premium Membership as the upgrade path.
                                </p>
                            </div>
                            <PremiumButton href={officialLinks.contactMezo} external icon={<Zap className="h-4 w-4" />} className="text-xs">
                                Contact MEZO
                            </PremiumButton>
                        </div>
                    </GlassCard>

                    <section className="mt-10">
                        <SectionHeader
                            eyebrow="DeadZone Builds Showcase"
                            title="DeadZone Builds Showcase"
                            description="Explore DeadZone styles and system previews for supported Xiaomi, Redmi, and POCO devices."
                            align="center"
                        />

                        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                            {showcaseCards.map((card) => (
                                <GlassCard key={card.name} accent={card.accent} className="h-full p-6 md:p-7">
                                    <div className="flex flex-col gap-5">
                                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                            <div>
                                                <RomBadge accent={card.accent}>{card.status}</RomBadge>
                                                <h2 className="mt-5 text-3xl font-black text-white">{card.name}</h2>
                                            </div>
                                            <div className="flex h-14 w-14 items-center justify-center rounded-[1.4rem] border border-white/10 bg-white/[0.05] text-white">
                                                <MonitorSmartphone className="h-6 w-6" />
                                            </div>
                                        </div>

                                        <div className="grid gap-3 sm:grid-cols-2">
                                            <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4">
                                                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">DeadZone System / Style</p>
                                                <p className="mt-2 text-lg font-black text-white">{card.name}</p>
                                            </div>
                                            <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4">
                                                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Status</p>
                                                <p className="mt-2 text-lg font-black text-white">{card.status}</p>
                                            </div>
                                            <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4">
                                                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Android Support</p>
                                                <p className="mt-2 text-sm font-bold text-white">{card.android}</p>
                                            </div>
                                            <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4">
                                                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">HyperOS Support</p>
                                                <p className="mt-2 text-sm font-bold text-white">{card.hyperOs}</p>
                                            </div>
                                            <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4 sm:col-span-2">
                                                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Best For</p>
                                                <p className="mt-2 text-sm leading-7 text-zinc-300">{card.bestFor}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-cyan-200">Screenshot Preview Slots</p>
                                            <div className="mt-4 grid grid-cols-2 gap-3">
                                                {card.screenshots.map((label) => (
                                                    <div key={label} className="rounded-[1.4rem] border border-dashed border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4">
                                                        <div className="flex aspect-[4/3] items-center justify-center rounded-[1.1rem] border border-white/10 bg-black/30">
                                                            <span className="text-center text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400">{label}</span>
                                                        </div>
                                                        <p className="mt-3 text-xs font-bold text-white">{label}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                            <p className="max-w-3xl text-sm leading-7 text-zinc-400">
                                                Screenshots may vary depending on device codename, ROM version, Android version, HyperOS version, and DeadZone style.
                                            </p>
                                            <PremiumButton
                                                href={card.actionHref}
                                                external={card.actionExternal}
                                                variant={card.status === "Public" ? "primary" : "legend"}
                                                icon={card.status === "Public" ? <Sparkles className="h-4 w-4" /> : <Crown className="h-4 w-4" />}
                                                className="text-xs"
                                            >
                                                {card.actionLabel}
                                            </PremiumButton>
                                        </div>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    </section>
                </div>
            </section>

            <Footer />
        </main>
    );
}
