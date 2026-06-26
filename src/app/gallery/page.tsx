"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { GlassCard, RomBadge, SectionHeader } from "@/components/ui/deadzone";
import { GalleryCategory, GalleryItem, galleryItems } from "@/data/deadzone-registry";
import { cn } from "@/lib/utils";
import { Image as ImageIcon, MonitorSmartphone, Settings, SlidersHorizontal, TerminalSquare, X, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const categories: Array<"All" | GalleryCategory> = ["All", "Interface", "System", "Performance", "Tools", "Install"];

const comingSoonItems: GalleryItem[] = [
    { title: "Interface Preview", category: "Interface", image: "", description: "Screenshots for DeadZone interface surfaces are coming soon." },
    { title: "System Panels", category: "System", image: "", description: "Build identity, settings, and core HyperOS panels will appear here when captured." },
    { title: "Performance Views", category: "Performance", image: "", description: "Gaming and performance captures will be published with real ROM media." },
    { title: "DeadZone Tools", category: "Tools", image: "", description: "Utility screenshots will be added after tool surfaces are ready." },
    { title: "Install Flow", category: "Install", image: "", description: "Install guidance visuals will be added without using external copyrighted images." },
];

const icons = {
    Interface: MonitorSmartphone,
    System: Settings,
    Performance: Zap,
    Tools: TerminalSquare,
    Install: SlidersHorizontal,
};

function normalizeScreenshot(item: any): GalleryItem {
    return {
        title: item?.title || "DeadZone screenshot",
        category: categories.includes(item?.category) && item.category !== "All" ? item.category : "Interface",
        image: item?.imageUrl || item?.image || "",
        description: item?.description || "",
    };
}

export default function GalleryPage() {
    const [items, setItems] = useState<GalleryItem[]>(galleryItems);
    const [activeCategory, setActiveCategory] = useState<"All" | GalleryCategory>("All");
    const [loading, setLoading] = useState(true);
    const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

    useEffect(() => {
        async function loadScreenshots() {
            try {
                const response = await fetch("/api/screenshots");
                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) setItems(data.map(normalizeScreenshot));
            } catch (error) {
                console.error("Screenshot registry fetch failed:", error);
            } finally {
                setLoading(false);
            }
        }
        loadScreenshots();
    }, []);

    const source = items.length ? items : comingSoonItems;
    const usingPlaceholder = !loading && items.length === 0;
    const filtered = useMemo(() => activeCategory === "All" ? source : source.filter((item) => item.category === activeCategory), [activeCategory, source]);

    return (
        <main className="relative min-h-screen">
            <Starfield />
            <Navbar />

            <section className="px-6 pb-20 pt-36">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader eyebrow="Gallery" title={<>DeadZone visual <span className="text-gradient">archive</span>.</>} description="Real screenshots render from the dashboard when available. Until then, the gallery shows a polished coming-soon structure." align="center" />

                    {usingPlaceholder && (
                        <GlassCard accent="gold" className="mb-8 p-6 text-center">
                            <h3 className="text-xl font-black text-white">Screenshots are coming soon</h3>
                            <p className="mx-auto mt-2 max-w-2xl text-sm leading-7 text-zinc-400">No local ROM screenshots are registered yet. This page does not use ProjectZK or external copyrighted media.</p>
                        </GlassCard>
                    )}

                    <div className="mb-10 flex flex-wrap justify-center gap-3">
                        {categories.map((category) => (
                            <button key={category} onClick={() => setActiveCategory(category)} className={cn("min-h-11 rounded-2xl px-5 text-xs font-black uppercase tracking-[0.16em] transition-colors", activeCategory === category ? "bg-cyan-400 text-slate-950" : "border border-white/10 bg-white/[0.04] text-zinc-400 hover:text-white")}>{category}</button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {Array.from({ length: 8 }).map((_, index) => <GlassCard key={index} accent="slate" className="aspect-[9/13] animate-pulse" />)}
                        </div>
                    ) : filtered.length ? (
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {filtered.map((item, index) => {
                                const Icon = icons[item.category] || ImageIcon;
                                const hasImage = Boolean(item.image);
                                return (
                                    <motion.button key={`${item.title}-${index}`} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} onClick={() => hasImage && setLightbox(item)} className="group h-full text-left">
                                        <GlassCard accent={item.category === "Performance" ? "magenta" : item.category === "Install" ? "blue" : item.category === "Tools" ? "gold" : "cyan"} className="h-full overflow-hidden p-0">
                                            <div className="relative aspect-[9/13] overflow-hidden">
                                                {hasImage ? (
                                                    <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                                ) : (
                                                    <div className="flex h-full flex-col justify-between bg-gradient-to-br from-red-500/12 via-cyan-400/8 to-amber-300/12 p-5">
                                                        <div className="deadzone-grid absolute inset-0 opacity-40" />
                                                        <div className="relative flex items-center justify-between">
                                                            <RomBadge accent="red">{item.category}</RomBadge>
                                                            <Icon className="h-6 w-6 text-white/75" />
                                                        </div>
                                                        <div className="relative rounded-[1.5rem] border border-white/10 bg-black/40 p-4">
                                                            <div className="mb-4 h-2 w-24 rounded-full bg-red-300/30" />
                                                            <div className="space-y-3">
                                                                <div className="h-3 rounded-full bg-cyan-300/20" />
                                                                <div className="h-3 w-2/3 rounded-full bg-amber-300/20" />
                                                                <div className="h-20 rounded-2xl border border-white/10 bg-white/[0.04]" />
                                                            </div>
                                                        </div>
                                                        <div className="relative">
                                                            <h3 className="text-2xl font-black text-white">{item.title}</h3>
                                                            <p className="mt-2 text-sm leading-6 text-zinc-300">{item.description}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            {hasImage && (
                                                <div className="p-5">
                                                    <RomBadge accent="cyan">{item.category}</RomBadge>
                                                    <h3 className="mt-3 text-lg font-black text-white">{item.title}</h3>
                                                    {item.description && <p className="mt-2 text-sm leading-6 text-zinc-400">{item.description}</p>}
                                                </div>
                                            )}
                                        </GlassCard>
                                    </motion.button>
                                );
                            })}
                        </div>
                    ) : (
                        <GlassCard accent="slate" className="p-10 text-center">
                            <h3 className="text-xl font-black text-white">No gallery items in this category</h3>
                            <p className="mt-2 text-sm text-zinc-500">Choose another category or upload screenshots from the admin dashboard.</p>
                        </GlassCard>
                    )}
                </div>
            </section>

            {lightbox && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 p-6 backdrop-blur-md" onClick={() => setLightbox(null)}>
                    <button className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white" onClick={() => setLightbox(null)} aria-label="Close screenshot">
                        <X className="h-6 w-6" />
                    </button>
                    <div className="w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
                        <img src={lightbox.image} alt={lightbox.title} className="mx-auto max-h-[78vh] w-auto rounded-3xl" />
                        <div className="mt-6 text-center">
                            <RomBadge accent="cyan">{lightbox.category}</RomBadge>
                            <h3 className="mt-3 text-2xl font-black text-white">{lightbox.title}</h3>
                            {lightbox.description && <p className="mt-2 text-zinc-400">{lightbox.description}</p>}
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </main>
    );
}
