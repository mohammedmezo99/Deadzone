"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, Copy, RotateCcw, Search, Smartphone } from "lucide-react";
import { DeviceImage } from "@/components/device-image";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Starfield } from "@/components/starfield";
import { GlassCard, RomBadge, SectionHeader } from "@/components/ui/deadzone";
import { allDevices } from "@/data/deadzone-devices";
import { deviceCategories, supportedDevices } from "@/data/devices";
import { publicBuilds } from "@/lib/builds";
import { buildDownloadsPath, officialLinks } from "@/lib/links";
import { cn } from "@/lib/utils";

const familyFilters = ["All", ...deviceCategories] as const;
const brandFilters = ["All", "Xiaomi", "Redmi", "POCO"] as const;
const chipsetFilters = ["All", "Snapdragon", "MTK"] as const;
const availabilityFilters = ["All", "Build Ready", "Has Listing", "No Listing"] as const;
const visibleStep = 24;

export default function DevicesPage() {
    const [query, setQuery] = useState("");
    const [activeFamily, setActiveFamily] = useState<(typeof familyFilters)[number]>("All");
    const [activeBrand, setActiveBrand] = useState<(typeof brandFilters)[number]>("All");
    const [activeChipset, setActiveChipset] = useState<(typeof chipsetFilters)[number]>("All");
    const [activeAvailability, setActiveAvailability] = useState<(typeof availabilityFilters)[number]>("All");
    const [visibleCount, setVisibleCount] = useState(visibleStep);
    const [copiedCodename, setCopiedCodename] = useState("");

    const availableBuildCodenames = useMemo(
        () => new Set(publicBuilds.filter((build) => build.status === "Available").map((build) => build.codename)),
        [],
    );
    const listedBuildCodenames = useMemo(() => new Set(publicBuilds.map((build) => build.codename)), []);

    const enrichedDevices = useMemo(() => {
        return supportedDevices.map((device) => {
            const extended = allDevices.find((entry) => entry.codename === device.codename);
            const hasAvailableBuild = availableBuildCodenames.has(device.codename);
            const hasListing = listedBuildCodenames.has(device.codename);

            return {
                ...device,
                chipset: extended?.soc || null,
                buildAvailability: hasAvailableBuild ? "Build Ready" : hasListing ? "Has Listing" : "No Listing",
            };
        });
    }, [availableBuildCodenames, listedBuildCodenames]);

    const filteredDevices = useMemo(() => {
        const needle = query.trim().toLowerCase();

        return enrichedDevices.filter((device) => {
            const matchesSearch =
                !needle ||
                [device.name, device.codename, device.brand, device.category, device.chipset || "", ...(device.aliases || [])].some((field) =>
                    field.toLowerCase().includes(needle)
                );

            const matchesFamily = activeFamily === "All" || device.category === activeFamily;
            const matchesBrand = activeBrand === "All" || device.brand === activeBrand;
            const matchesChipset = activeChipset === "All" || device.chipset === activeChipset;
            const matchesAvailability = activeAvailability === "All" || device.buildAvailability === activeAvailability;

            return matchesSearch && matchesFamily && matchesBrand && matchesChipset && matchesAvailability;
        });
    }, [activeAvailability, activeBrand, activeChipset, activeFamily, enrichedDevices, query]);

    const visibleDevices = useMemo(() => filteredDevices.slice(0, visibleCount), [filteredDevices, visibleCount]);
    const buildReadyCount = useMemo(() => enrichedDevices.filter((device) => device.buildAvailability === "Build Ready").length, [enrichedDevices]);
    const hasMore = visibleDevices.length < filteredDevices.length;

    function resetFilters() {
        setQuery("");
        setActiveFamily("All");
        setActiveBrand("All");
        setActiveChipset("All");
        setActiveAvailability("All");
        setVisibleCount(visibleStep);
    }

    function loadMore() {
        setVisibleCount((current) => current + visibleStep);
    }

    async function copyTelegramCommand(codename: string) {
        const command = `/mezo ${codename}`;

        try {
            await navigator.clipboard.writeText(command);
            setCopiedCodename(codename);
            window.setTimeout(() => {
                setCopiedCodename((current) => (current === codename ? "" : current));
            }, 2000);
        } catch (error) {
            console.error("Copy command failed:", error);
        }
    }

    return (
        <main className="page-shell bg-mesh">
            <Starfield />
            <Navbar />

            <section className="px-6 pb-20 pt-36">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        eyebrow="Supported Devices"
                        title="DeadZone Supported Devices"
                        description="Browse supported Xiaomi, Redmi, POCO, and Pad devices. Search by device name, codename, or alias."
                        align="center"
                    />

                    <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        <GlassCard accent="cyan" className="p-6">
                            <p className="text-4xl font-black text-white">{supportedDevices.length}</p>
                            <p className="mt-2 text-[11px] font-black uppercase tracking-[0.24em] text-cyan-200">Supported Devices</p>
                        </GlassCard>
                        <GlassCard accent="blue" className="p-6">
                            <p className="text-4xl font-black text-white">{deviceCategories.length}</p>
                            <p className="mt-2 text-[11px] font-black uppercase tracking-[0.24em] text-blue-200">Organized Families</p>
                        </GlassCard>
                        <GlassCard accent="magenta" className="p-6">
                            <p className="text-4xl font-black text-white">{filteredDevices.length}</p>
                            <p className="mt-2 text-[11px] font-black uppercase tracking-[0.24em] text-fuchsia-200">Current Results</p>
                        </GlassCard>
                        <GlassCard accent="gold" className="p-6">
                            <p className="text-4xl font-black text-white">{buildReadyCount}</p>
                            <p className="mt-2 text-[11px] font-black uppercase tracking-[0.24em] text-amber-200">Build-Ready Devices</p>
                        </GlassCard>
                    </div>

                    <div className="mb-8 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
                        <GlassCard accent="cyan" className="relative overflow-hidden p-6 md:p-8">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_46%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.16),transparent_42%)]" />
                            <div className="relative z-10">
                                <RomBadge accent="cyan">DeadZone Device Index</RomBadge>
                                <h2 className="mt-5 text-3xl font-black tracking-tight text-white md:text-4xl">
                                    Search supported devices fast, confirm codename, then move straight into the right build route.
                                </h2>
                                <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-300 md:text-base">
                                    Use the filters below to narrow by family, brand, chipset, and known build availability without rendering the full device catalog at once.
                                </p>
                            </div>
                        </GlassCard>

                        <GlassCard accent="magenta" className="p-6 md:p-8">
                            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-fuchsia-200">Codename Helper</p>
                            <h2 className="mt-3 text-2xl font-black text-white">Not sure about your codename</h2>
                            <p className="mt-4 text-sm leading-7 text-zinc-300">
                                Check your device codename before requesting or flashing any build.
                            </p>
                            <div className="mt-6 grid gap-3">
                                <Link
                                    href="/guide"
                                    className="flex min-h-12 items-center justify-center rounded-2xl bg-cyan-400 px-4 text-xs font-black uppercase tracking-[0.16em] text-slate-950 transition hover:bg-cyan-300"
                                >
                                    Install Guide
                                </Link>
                                <Link
                                    href="/contact"
                                    className="flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:border-cyan-300/30"
                                >
                                    Support Template
                                </Link>
                            </div>
                        </GlassCard>
                    </div>

                    <GlassCard accent="blue" className="sticky top-24 z-20 mb-10 p-4 md:p-5 shadow-[0_22px_60px_rgba(2,5,10,0.34)]">
                        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center">
                            <div className="relative xl:col-span-2">
                                <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
                                <input
                                    value={query}
                                    onChange={(event) => {
                                        setQuery(event.target.value);
                                        setVisibleCount(visibleStep);
                                    }}
                                    placeholder="Search by device name, codename, or alias..."
                                    className="min-h-14 w-full rounded-2xl border border-white/10 bg-white/[0.05] py-4 pl-14 pr-5 text-white outline-none transition focus:border-cyan-300/45 focus:ring-2 focus:ring-cyan-500/20"
                                />
                            </div>

                            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4 xl:col-span-2">
                                <select
                                    value={activeFamily}
                                    onChange={(event) => {
                                        setActiveFamily(event.target.value as (typeof familyFilters)[number]);
                                        setVisibleCount(visibleStep);
                                    }}
                                    className="min-h-14 rounded-2xl border border-white/10 bg-white/[0.05] px-4 text-sm font-bold text-white outline-none"
                                >
                                    {familyFilters.map((filter) => <option key={filter} value={filter} className="bg-[#0a1018]">{filter === "All" ? "Family: All" : filter}</option>)}
                                </select>
                                <select
                                    value={activeBrand}
                                    onChange={(event) => {
                                        setActiveBrand(event.target.value as (typeof brandFilters)[number]);
                                        setVisibleCount(visibleStep);
                                    }}
                                    className="min-h-14 rounded-2xl border border-white/10 bg-white/[0.05] px-4 text-sm font-bold text-white outline-none"
                                >
                                    {brandFilters.map((filter) => <option key={filter} value={filter} className="bg-[#0a1018]">{filter === "All" ? "Brand: All" : filter}</option>)}
                                </select>
                                <select
                                    value={activeChipset}
                                    onChange={(event) => {
                                        setActiveChipset(event.target.value as (typeof chipsetFilters)[number]);
                                        setVisibleCount(visibleStep);
                                    }}
                                    className="min-h-14 rounded-2xl border border-white/10 bg-white/[0.05] px-4 text-sm font-bold text-white outline-none"
                                >
                                    {chipsetFilters.map((filter) => <option key={filter} value={filter} className="bg-[#0a1018]">{filter === "All" ? "Chipset: All" : filter}</option>)}
                                </select>
                                <select
                                    value={activeAvailability}
                                    onChange={(event) => {
                                        setActiveAvailability(event.target.value as (typeof availabilityFilters)[number]);
                                        setVisibleCount(visibleStep);
                                    }}
                                    className="min-h-14 rounded-2xl border border-white/10 bg-white/[0.05] px-4 text-sm font-bold text-white outline-none"
                                >
                                    {availabilityFilters.map((filter) => <option key={filter} value={filter} className="bg-[#0a1018]">{filter === "All" ? "Availability: All" : filter}</option>)}
                                </select>
                            </div>

                            <div className="xl:col-span-2 flex justify-end">
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:border-cyan-300/30"
                                >
                                    <RotateCcw className="h-4 w-4" />
                                    Reset Filters
                                </button>
                            </div>
                        </div>
                    </GlassCard>

                    {visibleDevices.length ? (
                        <>
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-3">
                                {visibleDevices.map((device, index) => (
                                    <GlassCard
                                        key={`${device.name}-${device.codename}`}
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
                                                priority={index < 6}
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

                                            <div className="mt-4 flex flex-wrap gap-2">
                                                <RomBadge accent={device.buildAvailability === "Build Ready" ? "cyan" : device.buildAvailability === "Has Listing" ? "gold" : "slate"}>
                                                    {device.buildAvailability}
                                                </RomBadge>
                                                {device.chipset && (
                                                    <RomBadge accent="blue">{device.chipset}</RomBadge>
                                                )}
                                            </div>

                                            <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                                <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-3.5">
                                                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Codename</p>
                                                    <p className="mt-2 font-mono text-xs uppercase tracking-[0.22em] text-white">{device.codename}</p>
                                                </div>
                                                <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-3.5">
                                                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Family / Category</p>
                                                    <p className="mt-2 text-sm font-bold text-white">{device.category}</p>
                                                </div>
                                                <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-3.5 sm:col-span-2">
                                                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Aliases</p>
                                                    <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-zinc-200">
                                                        {device.aliases?.join(" / ") || "Primary codename listing"}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                                                <Link
                                                    href={buildDownloadsPath({ codename: device.codename })}
                                                    className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-4 text-xs font-black uppercase tracking-[0.16em] text-slate-950 transition hover:bg-cyan-300"
                                                >
                                                    <Smartphone className="h-4 w-4" />
                                                    Check Builds
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => copyTelegramCommand(device.codename)}
                                                    className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:border-cyan-300/30"
                                                >
                                                    {copiedCodename === device.codename ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                                    {copiedCodename === device.codename ? "Copied Command" : "Copy Command"}
                                                </button>
                                                <a
                                                    href={officialLinks.contactMezo}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex min-h-12 items-center justify-center rounded-2xl border border-fuchsia-300/20 bg-fuchsia-400/10 px-4 text-xs font-black uppercase tracking-[0.16em] text-fuchsia-100 transition hover:border-fuchsia-300/40 hover:bg-fuchsia-400/16 sm:col-span-2 xl:col-span-1"
                                                >
                                                    Request Build
                                                </a>
                                            </div>
                                        </div>
                                    </GlassCard>
                                ))}
                            </div>

                            {hasMore && (
                                <div className="mt-8 flex justify-center">
                                    <button
                                        type="button"
                                        onClick={loadMore}
                                        className="flex min-h-12 items-center justify-center rounded-2xl bg-cyan-400 px-6 text-xs font-black uppercase tracking-[0.16em] text-slate-950 transition hover:bg-cyan-300"
                                    >
                                        Load More
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <GlassCard accent="slate" className="p-10 text-center">
                            <Smartphone className="mx-auto mb-4 h-10 w-10 text-zinc-500" />
                            <h3 className="text-xl font-black text-white">No devices match this view</h3>
                            <p className="mt-2 text-sm text-zinc-400">Adjust the search, switch filters, or reset the layout to return to the full supported lineup.</p>
                        </GlassCard>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
