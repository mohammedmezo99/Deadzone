"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Smartphone } from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Starfield } from "@/components/starfield";
import { GlassCard, RomBadge, SectionHeader } from "@/components/ui/deadzone";
import { deviceCategories, supportedDevices } from "@/data/devices";
import { cn } from "@/lib/utils";

const filters = ["All", ...deviceCategories] as const;
const deviceCount = supportedDevices.length;

export default function DevicesPage() {
    const [query, setQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");

    const filtered = useMemo(() => {
        const needle = query.trim().toLowerCase();

        return supportedDevices.filter((device) => {
            const matchesSearch =
                !needle ||
                [device.codename, device.name, device.brand, device.category, ...(device.aliases || [])].some((field) => field.toLowerCase().includes(needle));

            const matchesFilter =
                activeFilter === "All" ||
                device.category === activeFilter;

            return matchesSearch && matchesFilter;
        });
    }, [activeFilter, query]);

    return (
        <main className="relative min-h-screen">
            <Starfield />
            <Navbar />

            <section className="px-6 pb-20 pt-36">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        eyebrow="Supported Devices"
                        title="Search the public DeadZone device catalog."
                        description="Browse supported codenames by family, check category coverage, and jump straight to public build results."
                        align="center"
                    />

                    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                        <GlassCard accent="purple" className="p-5"><p className="text-4xl font-black text-white">{deviceCount}</p><p className="mt-2 text-xs font-black uppercase tracking-[0.22em] text-purple-200">Supported Devices</p></GlassCard>
                        <GlassCard accent="blue" className="p-5"><p className="text-4xl font-black text-white">{deviceCategories.length}</p><p className="mt-2 text-xs font-black uppercase tracking-[0.22em] text-blue-200">Categories</p></GlassCard>
                        <GlassCard accent="cyan" className="p-5"><p className="text-4xl font-black text-white">{filtered.length}</p><p className="mt-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Current Results</p></GlassCard>
                    </div>

                    <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_auto]">
                        <div className="relative">
                            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-600" />
                            <input
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Search device name, codename, alias, brand, or category..."
                                className="min-h-14 w-full rounded-2xl border border-white/10 bg-white/[0.05] py-4 pl-14 pr-5 text-white outline-none focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-500/20"
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                            {filters.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={cn(
                                        "min-h-14 shrink-0 rounded-2xl px-5 text-xs font-black uppercase tracking-[0.14em]",
                                        activeFilter === filter ? "bg-cyan-400 text-slate-950" : "border border-white/10 bg-white/[0.04] text-zinc-400 hover:text-white"
                                    )}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    {filtered.length ? (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {filtered.map((device) => (
                                <GlassCard key={device.codename} accent="cyan" className="p-5">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h3 className="text-lg font-black text-white">{device.name}</h3>
                                            <p className="mt-2 font-mono text-xs uppercase tracking-[0.24em] text-zinc-500">{device.codename}</p>
                                        </div>
                                        <RomBadge accent="cyan">Supported</RomBadge>
                                    </div>
                                    <div className="mt-5 grid grid-cols-1 gap-3 text-sm">
                                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3"><p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Category</p><p className="mt-1 font-bold text-white">{device.category}</p></div>
                                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3"><p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Supported</p><p className="mt-1 font-bold text-white">Yes</p></div>
                                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3"><p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Aliases</p><p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-white">{device.aliases?.join(" / ") || "None listed"}</p></div>
                                    </div>
                                    <Link href={`/downloads?codename=${device.codename}`} className="mt-5 flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-4 text-xs font-black uppercase tracking-[0.16em] text-slate-950">
                                        <Smartphone className="h-4 w-4" /> Check Builds
                                    </Link>
                                </GlassCard>
                            ))}
                        </div>
                    ) : (
                        <GlassCard accent="slate" className="p-10 text-center">
                            <Smartphone className="mx-auto mb-4 h-10 w-10 text-zinc-500" />
                            <h3 className="text-xl font-black text-white">No devices match this view</h3>
                            <p className="mt-2 text-sm text-zinc-500">Adjust the search or category filter to continue browsing supported devices.</p>
                        </GlassCard>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
