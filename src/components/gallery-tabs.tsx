"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Images, MessageCircle, Sparkles } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { PremiumButton } from "@/components/ui/premium-button";
import { GlassCard, RomBadge } from "@/components/ui/deadzone";
import type { GalleryImage } from "@/lib/gallery";
import { officialLinks, siteLinks } from "@/lib/links";
import { cn } from "@/lib/utils";

type GallerySection = "lite" | "gamingplus" | "legend" | "ninja";

const sections: Array<{ id: GallerySection; label: string; accent: "cyan" | "magenta" | "gold" | "purple" }> = [
    { id: "lite", label: "DeadZone Lite", accent: "cyan" },
    { id: "gamingplus", label: "DeadZone GamingPlus", accent: "magenta" },
    { id: "legend", label: "DeadZone Legend", accent: "gold" },
    { id: "ninja", label: "DeadZone Ninja", accent: "purple" },
];

const emptyStateCopy: Record<Exclude<GallerySection, "lite">, string> = {
    gamingplus: "GamingPlus screenshots coming soon.",
    legend: "Legend screenshots coming soon.",
    ninja: "Ninja screenshots coming soon.",
};

export function GalleryTabs({ liteImages }: { liteImages: GalleryImage[] }) {
    const [activeSection, setActiveSection] = useState<GallerySection>("lite");
    const [current, setCurrent] = useState(0);
    const thumbRef = useRef<HTMLDivElement>(null);

    const prev = useCallback(() => {
        setCurrent((value) => (value === 0 ? liteImages.length - 1 : value - 1));
    }, [liteImages.length]);

    const next = useCallback(() => {
        setCurrent((value) => (value === liteImages.length - 1 ? 0 : value + 1));
    }, [liteImages.length]);

    useEffect(() => {
        if (activeSection !== "lite") {
            return;
        }

        const handler = (event: KeyboardEvent) => {
            if (event.key === "ArrowLeft") prev();
            if (event.key === "ArrowRight") next();
        };

        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [activeSection, next, prev]);

    useEffect(() => {
        const container = thumbRef.current;
        if (!container || activeSection !== "lite") {
            return;
        }

        const activeThumb = container.children[current] as HTMLElement | undefined;
        activeThumb?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }, [activeSection, current]);

    useEffect(() => {
        setCurrent(0);
    }, [activeSection]);

    const currentShot = liteImages[current];

    return (
        <div className="mt-10">
            <div className="flex flex-wrap justify-center gap-3">
                {sections.map((section) => {
                    const active = section.id === activeSection;

                    return (
                        <button
                            key={section.id}
                            type="button"
                            onClick={() => setActiveSection(section.id)}
                            className={cn(
                                "rounded-2xl border px-5 py-3 text-xs font-black uppercase tracking-[0.18em] transition-all",
                                active
                                    ? "border-cyan-300/35 bg-cyan-400/10 text-white shadow-[0_0_24px_rgba(34,211,238,0.16)]"
                                    : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-white"
                            )}
                            aria-pressed={active}
                        >
                            {section.label}
                        </button>
                    );
                })}
            </div>

            <div className="mt-8 space-y-6">
                <section id="lite-gallery" className={activeSection === "lite" ? "block" : "hidden"} aria-hidden={activeSection !== "lite"}>
                        <GlassCard accent="cyan" className="overflow-hidden p-4 md:p-6">
                            <div className="mb-6 text-center">
                                <RomBadge accent="cyan">Screenshots</RomBadge>
                                <h2 className="mt-4 text-3xl font-black text-white md:text-4xl">DeadZone Lite</h2>
                                <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-zinc-400">
                                    Explore the full public DeadZone Lite screenshot set with complete previews for supported devices.
                                </p>
                            </div>

                            <div className="relative rounded-[1.9rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_32%),linear-gradient(180deg,rgba(5,10,18,0.96),rgba(2,5,10,0.92))] px-4 pb-6 pt-6 shadow-[0_0_80px_rgba(34,211,238,0.08)] backdrop-blur-2xl md:px-8 md:pb-8 md:pt-8">
                                <button
                                    type="button"
                                    onClick={prev}
                                    aria-label="Previous screenshot"
                                    className="absolute left-3 top-[45%] z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/80 backdrop-blur-md transition-all hover:border-cyan-300/40 hover:bg-black/80 hover:text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>

                                <div className="mx-auto flex min-h-[420px] max-w-4xl items-center justify-center">
                                    <div className="relative w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/40">
                                        <div className="flex min-h-[420px] items-center justify-center p-3 sm:p-4 md:min-h-[700px]">
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={currentShot.src}
                                                    initial={{ opacity: 0, scale: 0.985 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.985 }}
                                                    transition={{ duration: 0.25, ease: "easeInOut" }}
                                                    className="relative h-full w-full"
                                                >
                                                    <div className="relative h-[420px] w-full sm:h-[520px] md:h-[700px]">
                                                        <Image
                                                            src={currentShot.src}
                                                            alt={currentShot.alt}
                                                            fill
                                                            priority={current < 3}
                                                            sizes="(max-width: 768px) 100vw, 1200px"
                                                            className="object-contain"
                                                        />
                                                    </div>
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={next}
                                    aria-label="Next screenshot"
                                    className="absolute right-3 top-[45%] z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/80 backdrop-blur-md transition-all hover:border-cyan-300/40 hover:bg-black/80 hover:text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>

                                <div className="mt-5 flex flex-col items-center gap-2">
                                    <p className="font-mono text-sm font-bold tracking-[0.22em] text-white">
                                        {current + 1} <span className="text-zinc-500">/</span> {liteImages.length}
                                    </p>
                                    <p className="text-xs text-zinc-400">{currentShot.alt}</p>
                                </div>

                                <div ref={thumbRef} className="mt-5 flex gap-2 overflow-x-auto px-1 scrollbar-hide">
                                    {liteImages.map((image, index) => (
                                        <button
                                            key={image.src}
                                            type="button"
                                            onClick={() => setCurrent(index)}
                                            aria-label={`View ${image.alt}`}
                                            className={cn(
                                                "relative h-20 w-[54px] flex-none overflow-hidden rounded-xl border transition-all duration-200 sm:h-24 sm:w-[66px]",
                                                index === current
                                                    ? "border-cyan-400/60 opacity-100 shadow-[0_0_14px_rgba(34,211,238,0.22)] ring-1 ring-cyan-400/30"
                                                    : "border-white/10 opacity-50 hover:border-white/20 hover:opacity-80"
                                            )}
                                        >
                                            <Image src={image.src} alt={image.alt} fill sizes="66px" className="object-contain" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard accent="cyan" className="mt-6 p-6 md:p-8">
                            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                                <div className="max-w-2xl">
                                    <h3 className="text-2xl font-black text-white">Get DeadZone Lite</h3>
                                    <p className="mt-3 text-sm leading-7 text-zinc-400">
                                        Public Lite builds can be requested through the DeadZone Telegram bot for supported devices.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <PremiumButton href="/downloads?style=Lite" className="px-5 py-3 text-xs">
                                        View Lite Builds
                                    </PremiumButton>
                                    <PremiumButton href={siteLinks.devices} variant="secondary" className="px-5 py-3 text-xs">
                                        Supported Devices
                                    </PremiumButton>
                                    <PremiumButton href={officialLinks.contactMezo} external variant="secondary" className="px-5 py-3 text-xs">
                                        Contact MEZO
                                    </PremiumButton>
                                </div>
                            </div>
                        </GlassCard>
                </section>

                <section className={activeSection === "gamingplus" ? "block" : "hidden"} aria-hidden={activeSection !== "gamingplus"}>
                    <GlassCard accent="magenta" className="p-6 md:p-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-cyan-200">
                                <Images className="h-6 w-6" />
                            </div>
                            <h2 className="mt-5 text-3xl font-black text-white">
                                DeadZone GamingPlus
                            </h2>
                            <p className="mt-4 text-sm leading-7 text-zinc-400">
                                {emptyStateCopy.gamingplus}
                            </p>
                            <div className="mt-6 flex flex-wrap justify-center gap-3">
                                <PremiumButton href={officialLinks.contactMezo} external icon={<MessageCircle className="h-4 w-4" />} className="text-xs">
                                    Contact MEZO
                                </PremiumButton>
                                <PremiumButton href={siteLinks.premium} variant="secondary" icon={<Sparkles className="h-4 w-4" />} className="text-xs">
                                    View Premium
                                </PremiumButton>
                            </div>
                        </div>
                    </GlassCard>
                </section>

                <section className={activeSection === "legend" ? "block" : "hidden"} aria-hidden={activeSection !== "legend"}>
                    <GlassCard accent="gold" className="p-6 md:p-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-cyan-200">
                                <Images className="h-6 w-6" />
                            </div>
                            <h2 className="mt-5 text-3xl font-black text-white">DeadZone Legend</h2>
                            <p className="mt-4 text-sm leading-7 text-zinc-400">{emptyStateCopy.legend}</p>
                            <div className="mt-6 flex flex-wrap justify-center gap-3">
                                <PremiumButton href={officialLinks.contactMezo} external icon={<MessageCircle className="h-4 w-4" />} className="text-xs">
                                    Contact MEZO
                                </PremiumButton>
                                <PremiumButton href={siteLinks.premium} variant="secondary" icon={<Sparkles className="h-4 w-4" />} className="text-xs">
                                    View Premium
                                </PremiumButton>
                            </div>
                        </div>
                    </GlassCard>
                </section>

                <section className={activeSection === "ninja" ? "block" : "hidden"} aria-hidden={activeSection !== "ninja"}>
                    <GlassCard accent="purple" className="p-6 md:p-8">
                        <div className="mx-auto max-w-3xl text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-cyan-200">
                                <Images className="h-6 w-6" />
                            </div>
                            <h2 className="mt-5 text-3xl font-black text-white">DeadZone Ninja</h2>
                            <p className="mt-4 text-sm leading-7 text-zinc-400">{emptyStateCopy.ninja}</p>
                            <div className="mt-6 flex flex-wrap justify-center gap-3">
                                <PremiumButton href={officialLinks.contactMezo} external icon={<MessageCircle className="h-4 w-4" />} className="text-xs">
                                    Contact MEZO
                                </PremiumButton>
                                <PremiumButton href={siteLinks.premium} variant="secondary" icon={<Sparkles className="h-4 w-4" />} className="text-xs">
                                    View Premium
                                </PremiumButton>
                            </div>
                        </div>
                    </GlassCard>
                </section>
            </div>
        </div>
    );
}
