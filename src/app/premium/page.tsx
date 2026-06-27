"use client";

import { Crown, Gem, MessageCircle, ShieldCheck, Sparkles, Swords } from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Starfield } from "@/components/starfield";
import { PremiumButton } from "@/components/ui/premium-button";
import { GlassCard, RomBadge, SectionHeader } from "@/components/ui/deadzone";
import { officialLinks } from "@/lib/links";

const premiumCards = [
    {
        name: "GamingPlus",
        accent: "magenta" as const,
        icon: Swords,
        copy: "Best for users who want a gaming-focused DeadZone experience with smoother response, performance feel, and optimized daily use.",
    },
    {
        name: "Legend",
        accent: "gold" as const,
        icon: ShieldCheck,
        copy: "Best for users who want a balanced premium experience with stability, clean visuals, polished UI, and daily-driver reliability.",
    },
    {
        name: "Ninja",
        accent: "purple" as const,
        icon: Crown,
        copy: "Best for users who want the most exclusive DeadZone identity with advanced patches, deeper system-level feel, and a stronger premium experience.",
    },
];

const comparisonRows = [
    { feature: "Public Access", values: ["Yes", "No", "No", "No"] },
    { feature: "Premium Access", values: ["No", "Yes", "Yes", "Yes"] },
    { feature: "Gaming Focus", values: ["Basic", "High", "Medium", "High"] },
    { feature: "Daily Stability", values: ["High", "Medium", "High", "Medium"] },
    { feature: "Visual Identity", values: ["Basic", "Premium", "Premium", "Exclusive"] },
    { feature: "Advanced Patches", values: ["Basic", "Medium", "Medium", "High"] },
    { feature: "Direct Support", values: ["Basic", "Premium", "Premium", "Premium"] },
    { feature: "Best For", values: ["Public users", "Gamers", "Daily users", "Exclusive users"] },
];

export default function PremiumPage() {
    return (
        <main className="page-shell">
            <Starfield />
            <Navbar />

            <section className="px-6 pb-20 pt-36">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        eyebrow="Premium Access"
                        title="DeadZone Premium"
                        description="Unlock GamingPlus, Legend, and Ninja builds with premium DeadZone access by MEZO."
                        align="center"
                    />

                    <div className="mb-10 grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
                        <GlassCard accent="gold" className="relative overflow-hidden p-7 md:p-9">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.16),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.12),transparent_36%)]" />
                            <div className="relative z-10">
                                <RomBadge accent="gold">DeadZone Premium</RomBadge>
                                <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">
                                    Premium DeadZone access built around GamingPlus, Legend, and Ninja.
                                </h1>
                                <p className="mt-5 max-w-3xl text-sm leading-8 text-zinc-300 md:text-base">
                                    Move beyond the public line and get access to premium DeadZone styles that target gaming feel, visual polish, and stronger exclusive identity through MEZO.
                                </p>

                                <div className="mt-7 flex flex-wrap gap-3">
                                    <PremiumButton href={officialLinks.contactMezo} external variant="legend" icon={<MessageCircle className="h-4 w-4" />} className="text-xs">
                                        Contact MEZO
                                    </PremiumButton>
                                    <PremiumButton href="/styles" variant="secondary" icon={<Sparkles className="h-4 w-4" />} className="text-xs">
                                        View Styles
                                    </PremiumButton>
                                    <PremiumButton href="/devices" variant="secondary" icon={<Gem className="h-4 w-4" />} className="text-xs">
                                        View Supported Devices
                                    </PremiumButton>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard accent="cyan" className="p-7 md:p-9">
                            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-cyan-200">Premium Summary</p>
                            <h2 className="mt-3 text-2xl font-black text-white">Choose the premium DeadZone direction that fits your device and usage style.</h2>
                            <div className="mt-6 grid gap-4">
                                <div className="rounded-[1.45rem] border border-white/10 bg-white/[0.04] p-4">
                                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Premium Styles</p>
                                    <p className="mt-2 text-lg font-black text-white">GamingPlus • Legend • Ninja</p>
                                </div>
                                <div className="rounded-[1.45rem] border border-white/10 bg-white/[0.04] p-4">
                                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Support Path</p>
                                    <p className="mt-2 text-sm leading-7 text-zinc-300">Premium styles are available through MEZO with device-specific access based on compatibility and support status.</p>
                                </div>
                                <div className="rounded-[1.45rem] border border-white/10 bg-white/[0.04] p-4">
                                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Style Screenshots</p>
                                    <a href="/styles" className="mt-2 inline-flex text-sm font-bold text-cyan-200 transition hover:text-cyan-100">
                                        View style screenshots
                                    </a>
                                </div>
                            </div>
                        </GlassCard>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3">
                        {premiumCards.map((card) => (
                            <GlassCard key={card.name} accent={card.accent} className="h-full p-6">
                                <RomBadge accent={card.accent}>Premium</RomBadge>
                                <div className="mt-5 flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white">
                                        <card.icon className="h-5 w-5" />
                                    </div>
                                    <h2 className="text-2xl font-black text-white">{card.name}</h2>
                                </div>
                                <p className="mt-4 text-sm leading-7 text-zinc-300">{card.copy}</p>
                            </GlassCard>
                        ))}
                    </div>

                    <section className="mt-10">
                        <SectionHeader
                            eyebrow="Comparison"
                            title="Pick the right DeadZone access level for your device and usage style."
                            description="Compare the public line against GamingPlus, Legend, and Ninja before requesting premium access."
                            align="center"
                        />

                        <GlassCard accent="blue" className="overflow-hidden p-0">
                            <div className="hidden overflow-x-auto lg:block">
                                <table className="w-full min-w-[920px]">
                                    <thead>
                                        <tr className="border-b border-white/10 bg-white/[0.04] text-left">
                                            {["Feature", "Lite", "GamingPlus", "Legend", "Ninja"].map((heading) => (
                                                <th key={heading} className="px-6 py-5 text-[11px] font-black uppercase tracking-[0.22em] text-cyan-200">
                                                    {heading}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {comparisonRows.map((row, index) => (
                                            <tr key={row.feature} className={index !== comparisonRows.length - 1 ? "border-b border-white/10" : ""}>
                                                <td className="px-6 py-5 text-sm font-black text-white">{row.feature}</td>
                                                {row.values.map((value) => (
                                                    <td key={`${row.feature}-${value}`} className="px-6 py-5 text-sm text-zinc-300">
                                                        {value}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="grid gap-4 p-5 lg:hidden">
                                {comparisonRows.map((row) => (
                                    <div key={row.feature} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
                                        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-200">{row.feature}</p>
                                        <div className="mt-4 grid gap-2 sm:grid-cols-2">
                                            {["Lite", "GamingPlus", "Legend", "Ninja"].map((label, index) => (
                                                <div key={`${row.feature}-${label}`} className="rounded-[1.2rem] border border-white/10 bg-black/20 p-3">
                                                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500">{label}</p>
                                                    <p className="mt-2 text-sm font-bold text-white">{row.values[index]}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    </section>

                    <GlassCard accent="magenta" className="mt-10 p-7 md:p-9">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div className="max-w-4xl">
                                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-fuchsia-200">Get Premium Access</p>
                                <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">Get Premium Access</h2>
                                <p className="mt-4 text-sm leading-7 text-zinc-300 md:text-base">
                                    Premium styles are available through MEZO. Contact MEZO to request GamingPlus, Legend, or Ninja access.
                                </p>
                                <p className="mt-4 text-sm leading-7 text-zinc-400">
                                    Premium builds depend on device support, ROM version, Android version, HyperOS version, and codename compatibility.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                                <PremiumButton href={officialLinks.contactMezo} external variant="legend" icon={<MessageCircle className="h-4 w-4" />} className="text-xs">
                                    Contact MEZO
                                </PremiumButton>
                                <PremiumButton href="/styles" variant="secondary" icon={<Sparkles className="h-4 w-4" />} className="text-xs">
                                    View Styles
                                </PremiumButton>
                                <PremiumButton href="/devices" variant="secondary" icon={<Gem className="h-4 w-4" />} className="text-xs">
                                    View Supported Devices
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
