import type { Metadata } from "next";
import { Activity, Bot, Download, MessageCircle, Settings2, Wrench } from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Starfield } from "@/components/starfield";
import { PremiumButton } from "@/components/ui/premium-button";
import { GlassCard, RomBadge, SectionHeader } from "@/components/ui/deadzone";
import { officialLinks } from "@/lib/links";

export const metadata: Metadata = {
    title: "DeadZone Status | Build System and Support",
    description: "Check DeadZone build system, Telegram bot, downloads, premium support, and maintenance status.",
    alternates: {
        canonical: "/status",
    },
};

const statusCards = [
    {
        title: "Build System",
        status: "Online",
        description: "DeadZone build requests are currently available for supported devices.",
        accent: "cyan" as const,
        icon: Settings2,
    },
    {
        title: "Telegram Bot",
        status: "Online",
        description: "The /mezo command is available for public Lite requests.",
        accent: "blue" as const,
        icon: Bot,
    },
    {
        title: "Downloads",
        status: "Online",
        description: "Public build downloads and codename filtering are available.",
        accent: "cyan" as const,
        icon: Download,
    },
    {
        title: "Premium Support",
        status: "Online",
        description: "GamingPlus, Legend, and Ninja requests are available through MEZO.",
        accent: "gold" as const,
        icon: MessageCircle,
    },
    {
        title: "Maintenance",
        status: "Active",
        description: "MEZO is currently checking reported issues and improving the website experience.",
        accent: "magenta" as const,
        icon: Wrench,
    },
];

export default function StatusPage() {
    return (
        <main className="page-shell">
            <Starfield />
            <Navbar />

            <section className="px-6 pb-20 pt-36">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        eyebrow="Status"
                        title="DeadZone Status"
                        description="Check the current status of DeadZone services, build requests, downloads, and support."
                        align="center"
                    />

                    <div className="mb-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {statusCards.map((card) => (
                            <GlassCard key={card.title} accent={card.accent} className="h-full p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <RomBadge accent={card.accent}>{card.status}</RomBadge>
                                        <h2 className="mt-5 text-2xl font-black text-white">{card.title}</h2>
                                    </div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white">
                                        <card.icon className="h-5 w-5" />
                                    </div>
                                </div>
                                <p className="mt-4 text-sm leading-7 text-zinc-300">{card.description}</p>
                            </GlassCard>
                        ))}
                    </div>

                    <GlassCard accent="blue" className="p-7 md:p-9">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div className="max-w-4xl">
                                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-cyan-200">How to report an issue</p>
                                <h2 className="mt-3 text-3xl font-black text-white">How to report an issue</h2>
                                <p className="mt-4 text-sm leading-7 text-zinc-300 md:text-base">
                                    If you are facing a problem, please include your device name, codename, ROM version, Android version, DeadZone style, and full problem details.
                                </p>
                                <div className="mt-5 flex flex-wrap gap-2">
                                    {["Online", "Active", "Limited", "Offline"].map((label) => (
                                        <RomBadge key={label} accent={label === "Online" ? "cyan" : label === "Active" ? "magenta" : label === "Limited" ? "gold" : "red"}>
                                            {label}
                                        </RomBadge>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                                <PremiumButton href={officialLinks.contactMezo} external icon={<MessageCircle className="h-4 w-4" />} className="text-xs">
                                    Contact MEZO
                                </PremiumButton>
                                <PremiumButton href="/contact" variant="secondary" icon={<Activity className="h-4 w-4" />} className="text-xs">
                                    Support Template
                                </PremiumButton>
                                <PremiumButton href="/devices" variant="secondary" icon={<Download className="h-4 w-4" />} className="text-xs">
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
