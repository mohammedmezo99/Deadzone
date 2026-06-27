"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { RotateCcw, Search, Smartphone } from "lucide-react";
import { DeviceImage } from "@/components/device-image";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Starfield } from "@/components/starfield";
import { GlassCard, RomBadge, SectionHeader } from "@/components/ui/deadzone";
import { deviceCategories, supportedDevices } from "@/data/devices";
import { officialLinks } from "@/lib/links";
import { cn } from "@/lib/utils";

const filters = ["All", ...deviceCategories] as const;

export default function DevicesPage() {
    const [query, setQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");

    const filteredDevices = useMemo(() => {
        const needle = query.trim().toLowerCase();

        return supportedDevices.filter((device) => {
            const matchesSearch =
                !needle ||
                [device.name, device.codename, device.brand, device.category, ...(device.aliases || [])].some((field) => field.toLowerCase().includes(needle));

            const matchesCategory = activeFilter === "All" || device.category === activeFilter;

            return matchesSearch && matchesCategory;
        });
    }, [activeFilter, query]);

    const groupedDevices = useMemo(() => {
        return deviceCategories
            .map((category) => ({
                category,
                devices: filteredDevices.filter((device) => device.category === category),
            }))
            .filter((group) => group.devices.length > 0);
    }, [filteredDevices]);

    const categoryCounts = useMemo(() => {
        return deviceCategories.map((category) => ({
            category,
            count: supportedDevices.filter((device) => device.category === category).length,
        }));
    }, []);

    const hasActiveFilters = query.trim().length > 0 || activeFilter !== "All";

    function resetFilters() {
        setQuery("");
        setActiveFilter("All");
    }

    return (
        <main className="page-shell bg-mesh">
            <Starfield />
            <Navbar />

            <section className="px-6 pb-20 pt-36">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        eyebrow="Supported Devices"
                        title={<><span className="text-gradient">DeadZone Device Gallery</span><br />Full supported lineup, organized for fast browsing.</>}
                        description="Explore the complete public DeadZone catalog with polished device visuals, clean family grouping, and direct access to available builds."
                        align="center"
                    />

                    <div className="mb-8 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
                        <GlassCard accent="cyan" className="relative overflow-hidden p-6 md:p-8">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_46%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.16),transparent_42%)]" />
                            <div className="relative z-10 flex flex-col gap-8">
                                <div className="max-w-2xl">
                                    <RomBadge accent="cyan">Public Supported Lineup</RomBadge>
                                    <h2 className="mt-5 max-w-3xl text-3xl font-black tracking-tight text-white md:text-4xl">
                                        Premium device coverage across Xiaomi, Redmi, POCO, and tablet families.
                                    </h2>
                                    <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300 md:text-base">
                                        Search by name, codename, or alias, move across series instantly, and jump into build availability without leaving the gallery.
                                    </p>
                                </div>

                                <div className="grid gap-4 md:grid-cols-3">
                                    <div className="rounded-[1.75rem] border border-cyan-300/20 bg-black/30 p-5 backdrop-blur-xl">
                                        <p className="text-4xl font-black text-white">{supportedDevices.length}</p>
                                        <p className="mt-2 text-[11px] font-black uppercase tracking-[0.24em] text-cyan-200">Supported Devices</p>
                                    </div>
                                    <div className="rounded-[1.75rem] border border-blue-300/20 bg-black/30 p-5 backdrop-blur-xl">
                                        <p className="text-4xl font-black text-white">{deviceCategories.length}</p>
                                        <p className="mt-2 text-[11px] font-black uppercase tracking-[0.24em] text-blue-200">Organized Families</p>
                                    </div>
                                    <div className="rounded-[1.75rem] border border-fuchsia-300/20 bg-black/30 p-5 backdrop-blur-xl">
                                        <p className="text-4xl font-black text-white">{filteredDevices.length}</p>
                                        <p className="mt-2 text-[11px] font-black uppercase tracking-[0.24em] text-fuchsia-200">Current Results</p>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard accent="magenta" className="p-6 md:p-8">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-[11px] font-black uppercase tracking-[0.24em] text-fuchsia-200">Category Coverage</p>
                                    <h2 className="mt-3 text-2xl font-black text-white">Browse by family</h2>
                                </div>
                                <RomBadge accent="magenta">{groupedDevices.length} visible</RomBadge>
                            </div>
                            <div className="mt-6 grid gap-3">
                                {categoryCounts.map((item) => (
                                    <div key={item.category} className="flex items-center justify-between rounded-[1.35rem] border border-white/10 bg-white/[0.04] px-4 py-3">
                                        <p className="pr-4 text-sm font-bold text-white">{item.category}</p>
                                        <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-200">
                                            {item.count}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    </div>

                    <GlassCard accent="blue" className="sticky top-24 z-20 mb-10 p-4 md:p-5 shadow-[0_22px_60px_rgba(2,5,10,0.34)]">
                        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto_auto] xl:items-center">
                            <div className="relative">
                                <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
                                <input
                                    value={query}
                                    onChange={(event) => setQuery(event.target.value)}
                                    placeholder="Search by device name, codename, alias, brand, or category..."
                                    className="min-h-14 w-full rounded-2xl border border-white/10 bg-white/[0.05] py-4 pl-14 pr-5 text-white outline-none transition focus:border-cyan-300/45 focus:ring-2 focus:ring-cyan-500/20"
                                />
                            </div>

                            <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
                                {filters.map((filter) => {
                                    const count = filter === "All"
                                        ? supportedDevices.length
                                        : supportedDevices.filter((device) => device.category === filter).length;

                                    return (
                                        <button
                                            key={filter}
                                            onClick={() => setActiveFilter(filter)}
                                            className={cn(
                                                "min-h-14 shrink-0 rounded-2xl border px-4 text-xs font-black uppercase tracking-[0.14em] transition",
                                                activeFilter === filter
                                                    ? "border-cyan-300/50 bg-cyan-400 text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.24)]"
                                                    : "border-white/10 bg-white/[0.04] text-zinc-300 hover:border-fuchsia-300/30 hover:text-white"
                                            )}
                                        >
                                            {filter}
                                            <span className={cn("ml-2 rounded-full px-2 py-0.5 text-[10px]", activeFilter === filter ? "bg-slate-950/12 text-slate-950" : "bg-white/10 text-zinc-400")}>
                                                {count}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                onClick={resetFilters}
                                disabled={!hasActiveFilters}
                                className="flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:border-cyan-300/30 disabled:cursor-not-allowed disabled:opacity-45"
                            >
                                <RotateCcw className="h-4 w-4" />
                                Reset Filters
                            </button>
                        </div>
                    </GlassCard>

                    {groupedDevices.length ? (
                        <div className="space-y-12">
                            {groupedDevices.map((group) => (
                                <section key={group.category}>
                                    <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                                        <div>
                                            <p className="text-[11px] font-black uppercase tracking-[0.26em] text-cyan-200">Category</p>
                                            <h2 className="mt-2 text-2xl font-black text-white md:text-3xl">{group.category}</h2>
                                        </div>
                                        <RomBadge accent="blue">{group.devices.length} devices</RomBadge>
                                    </div>

                                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-3">
                                        {group.devices.map((device, index) => (
                                            <GlassCard
                                                key={device.codename}
                                                accent="cyan"
                                                className="group border-white/10 transition duration-300 hover:-translate-y-1.5 hover:border-cyan-300/35 hover:shadow-[0_28px_80px_rgba(8,145,178,0.18)]"
                                            >
                                                <div className="p-4 md:p-5">
                                                    <DeviceImage
                                                        codename={device.codename}
                                                        name={device.name}
                                                        src={device.image}
                                                        alt={`${device.name} render`}
                                                        className="border-cyan-300/15 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_48%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))] shadow-inner shadow-cyan-400/5"
                                                        imageClassName="p-4 md:p-5"
                                                        priority={index < 3}
                                                    />

                                                    <div className="mt-5 flex items-start justify-between gap-4">
                                                        <div>
                                                            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-cyan-200">{device.brand}</p>
                                                            <h3 className="mt-2 text-xl font-black leading-tight text-white">{device.name}</h3>
                                                        </div>
                                                        <RomBadge accent="cyan" className="border-emerald-300/35 bg-emerald-400/10 text-emerald-100 shadow-emerald-500/10">
                                                            Supported
                                                        </RomBadge>
                                                    </div>

                                                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                                        <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-3.5">
                                                            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Codename</p>
                                                            <p className="mt-2 font-mono text-xs uppercase tracking-[0.22em] text-white">{device.codename}</p>
                                                        </div>
                                                        <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-3.5">
                                                            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Category</p>
                                                            <p className="mt-2 text-sm font-bold text-white">{device.category}</p>
                                                        </div>
                                                        <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-3.5 sm:col-span-2">
                                                            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Aliases</p>
                                                            <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-zinc-200">
                                                                {device.aliases?.join(" / ") || "Primary codename listing"}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                                        <Link
                                                            href={`/downloads?codename=${device.codename}`}
                                                            className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-4 text-xs font-black uppercase tracking-[0.16em] text-slate-950 transition hover:bg-cyan-300"
                                                        >
                                                            <Smartphone className="h-4 w-4" />
                                                            Check Builds
                                                        </Link>
                                                        <a
                                                            href={officialLinks.contactMezo}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex min-h-12 items-center justify-center rounded-2xl border border-fuchsia-300/20 bg-fuchsia-400/10 px-4 text-xs font-black uppercase tracking-[0.16em] text-fuchsia-100 transition hover:border-fuchsia-300/40 hover:bg-fuchsia-400/16"
                                                        >
                                                            Contact MEZO
                                                        </a>
                                                    </div>
                                                </div>
                                            </GlassCard>
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>
                    ) : (
                        <GlassCard accent="slate" className="p-10 text-center">
                            <Smartphone className="mx-auto mb-4 h-10 w-10 text-zinc-500" />
                            <h3 className="text-xl font-black text-white">No devices match this view</h3>
                            <p className="mt-2 text-sm text-zinc-400">Adjust the search, switch categories, or reset filters to return to the full supported lineup.</p>
                        </GlassCard>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
