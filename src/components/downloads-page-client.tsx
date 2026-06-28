"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
    ArrowRight,
    Check,
    Copy,
    RotateCcw,
    Search,
    Smartphone,
} from "lucide-react";
import { DeviceImage } from "@/components/device-image";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Starfield } from "@/components/starfield";
import { GlassCard, RomBadge, SectionHeader } from "@/components/ui/deadzone";
import { supportedDevices } from "@/data/supported-devices";
import { hasPublishedFile } from "@/lib/builds";
import type { BuildItem } from "@/types";

const categoryFilters = ["All", "Xiaomi", "Redmi", "POCO", "Pad", "MIX", "Civi", "Unknown"] as const;
const chipsetFilters = ["All", "Snapdragon", "MediaTek", "Unknown"] as const;
const statusFilters = ["All", "Active", "Supported", "Inactive"] as const;
const styleFilters = ["All", "Lite", "GamingPlus", "Legend", "Ninja"] as const;
const visibleStep = 24;
const requestTelegramLink = "https://t.me/xDeadZoneh";

function getStatusAccent(status: (typeof supportedDevices)[number]["status"]) {
    if (status === "Active") return "cyan";
    if (status === "Inactive") return "red";
    return "blue";
}

function getBuildStatusAccent(status: BuildItem["status"]) {
    if (status === "Available") return "gold";
    if (status === "Processing Metadata" || status === "Metadata Incomplete") return "magenta";
    if (status === "Upload Pending" || status === "Building") return "blue";
    if (status === "Failed") return "red";
    return "slate";
}

export function DownloadsPageClient({
    initialCodename = "",
    initialStyle = "All",
    builds = [],
}: {
    initialCodename?: string;
    initialStyle?: (typeof styleFilters)[number];
    builds?: BuildItem[];
}) {
    const [query, setQuery] = useState(initialCodename);
    const [activeCategory, setActiveCategory] = useState<(typeof categoryFilters)[number]>("All");
    const [activeChipset, setActiveChipset] = useState<(typeof chipsetFilters)[number]>("All");
    const [activeStatus, setActiveStatus] = useState<(typeof statusFilters)[number]>("All");
    const [activeStyle, setActiveStyle] = useState<(typeof styleFilters)[number]>(initialStyle);
    const [visibleCount, setVisibleCount] = useState(visibleStep);
    const [copiedCodename, setCopiedCodename] = useState("");

    useEffect(() => {
        setQuery(initialCodename);
    }, [initialCodename]);

    useEffect(() => {
        setActiveStyle(initialStyle);
    }, [initialStyle]);

    const buildStateByCodename = useMemo(() => {
        const states = new Map<string, BuildItem["status"]>();

        for (const build of builds) {
            if (!build.codename) continue;
            const status = hasPublishedFile(build) ? "Available" : build.status;
            const current = states.get(build.codename);

            if (status === "Available" || !current) {
                states.set(build.codename, status);
                continue;
            }

            if (current !== "Available") {
                states.set(build.codename, status);
            }
        }

        return states;
    }, [builds]);

    const filteredDevices = useMemo(() => {
        const needle = query.trim().toLowerCase();

        return supportedDevices.filter((device) => {
            const matchesSearch =
                !needle ||
                [device.name, device.codename, device.category, device.family, device.chipset, ...device.aliases].some((field) =>
                    field.toLowerCase().includes(needle),
                );

            const matchesCategory = activeCategory === "All" || device.category === activeCategory;
            const matchesChipset = activeChipset === "All" || device.chipset === activeChipset;
            const matchesStatus = activeStatus === "All" || device.status === activeStatus;
            const matchesStyle = activeStyle === "All" || device.supportedStyles.includes(activeStyle);

            return matchesSearch && matchesCategory && matchesChipset && matchesStatus && matchesStyle;
        });
    }, [activeCategory, activeChipset, activeStatus, activeStyle, query]);

    const visibleDevices = useMemo(() => filteredDevices.slice(0, visibleCount), [filteredDevices, visibleCount]);
    const hasMore = visibleDevices.length < filteredDevices.length;

    const stats = useMemo(() => ({
        supportedDevices: supportedDevices.length,
        activeDevices: supportedDevices.filter((device) => device.status === "Active").length,
        availableBuilds: builds.filter((build) => hasPublishedFile(build)).length,
        premiumStyles: 3,
    }), [builds]);

    function loadMore() {
        setVisibleCount((current) => current + visibleStep);
    }

    function resetFilters() {
        setQuery(initialCodename);
        setActiveCategory("All");
        setActiveChipset("All");
        setActiveStatus("All");
        setActiveStyle(initialStyle);
        setVisibleCount(visibleStep);
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
        <main className="page-shell">
            <Starfield />
            <Navbar />

            <section className="px-6 pb-20 pt-36">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        eyebrow="Download Center"
                        title="DeadZone Download Center"
                        description="Browse supported Xiaomi, Redmi, POCO, and Pad devices. Select your device to view DeadZone builds, ROM status, and request options."
                        align="center"
                    />

                    <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        <GlassCard accent="cyan" className="p-6">
                            <p className="text-4xl font-black text-white">{stats.supportedDevices}</p>
                            <p className="mt-2 text-[11px] font-black uppercase tracking-[0.24em] text-cyan-200">Supported Devices</p>
                        </GlassCard>
                        <GlassCard accent="blue" className="p-6">
                            <p className="text-4xl font-black text-white">{stats.activeDevices}</p>
                            <p className="mt-2 text-[11px] font-black uppercase tracking-[0.24em] text-blue-200">Active Devices</p>
                        </GlassCard>
                        <GlassCard accent="magenta" className="p-6">
                            <p className="text-4xl font-black text-white">{stats.availableBuilds}</p>
                            <p className="mt-2 text-[11px] font-black uppercase tracking-[0.24em] text-fuchsia-200">Available Builds</p>
                        </GlassCard>
                        <GlassCard accent="gold" className="p-6">
                            <p className="text-4xl font-black text-white">{stats.premiumStyles}</p>
                            <p className="mt-2 text-[11px] font-black uppercase tracking-[0.24em] text-amber-200">Premium Styles</p>
                        </GlassCard>
                    </div>

                    <div className="mb-8 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
                        <GlassCard accent="cyan" className="relative overflow-hidden p-6 md:p-8">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_46%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.16),transparent_42%)]" />
                            <div className="relative z-10">
                                <RomBadge accent="cyan">DeadZone Device Index</RomBadge>
                                <h2 className="mt-5 text-3xl font-black tracking-tight text-white md:text-4xl">
                                    Search by device name, alias, or codename, then move straight into the correct DeadZone device page.
                                </h2>
                                <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-300 md:text-base">
                                    Filter by category, chipset, status, and style without breaking the canonical DeadZone downloads query routes.
                                </p>
                            </div>
                        </GlassCard>

                        <GlassCard accent="magenta" className="p-6 md:p-8">
                            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-fuchsia-200">Fast Actions</p>
                            <h2 className="mt-3 text-2xl font-black text-white">Jump from browse to device detail without losing your query context.</h2>
                            <div className="mt-6 grid gap-3">
                                <Link
                                    href="/devices"
                                    className="flex min-h-12 items-center justify-center rounded-2xl bg-cyan-400 px-4 text-xs font-black uppercase tracking-[0.16em] text-slate-950 transition hover:bg-cyan-300"
                                >
                                    View Supported Devices
                                </Link>
                                <a
                                    href={requestTelegramLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex min-h-12 items-center justify-center rounded-2xl border border-fuchsia-300/20 bg-fuchsia-400/10 px-4 text-xs font-black uppercase tracking-[0.16em] text-fuchsia-100 transition hover:border-fuchsia-300/40 hover:bg-fuchsia-400/16"
                                >
                                    Request on Telegram
                                </a>
                            </div>
                        </GlassCard>
                    </div>

                    <GlassCard accent="blue" className="sticky top-24 z-20 mb-10 p-4 md:p-5 shadow-[0_22px_60px_rgba(2,5,10,0.34)]">
                        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_1fr]">
                            <div className="relative xl:col-span-2">
                                <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
                                <input
                                    value={query}
                                    onChange={(event) => {
                                        setQuery(event.target.value);
                                        setVisibleCount(visibleStep);
                                    }}
                                    placeholder="Search by device name, alias, or codename..."
                                    className="min-h-14 w-full rounded-2xl border border-white/10 bg-white/[0.05] py-4 pl-14 pr-5 text-white outline-none transition focus:border-cyan-300/45 focus:ring-2 focus:ring-cyan-500/20"
                                />
                            </div>

                            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4 xl:col-span-2">
                                <select
                                    value={activeCategory}
                                    onChange={(event) => {
                                        setActiveCategory(event.target.value as (typeof categoryFilters)[number]);
                                        setVisibleCount(visibleStep);
                                    }}
                                    className="min-h-14 rounded-2xl border border-white/10 bg-white/[0.05] px-4 text-sm font-bold text-white outline-none"
                                >
                                    {categoryFilters.map((filter) => <option key={filter} value={filter} className="bg-[#0a1018]">{filter === "All" ? "Category: All" : filter}</option>)}
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
                                    value={activeStatus}
                                    onChange={(event) => {
                                        setActiveStatus(event.target.value as (typeof statusFilters)[number]);
                                        setVisibleCount(visibleStep);
                                    }}
                                    className="min-h-14 rounded-2xl border border-white/10 bg-white/[0.05] px-4 text-sm font-bold text-white outline-none"
                                >
                                    {statusFilters.map((filter) => <option key={filter} value={filter} className="bg-[#0a1018]">{filter === "All" ? "Status: All" : filter}</option>)}
                                </select>
                                <select
                                    value={activeStyle}
                                    onChange={(event) => {
                                        setActiveStyle(event.target.value as (typeof styleFilters)[number]);
                                        setVisibleCount(visibleStep);
                                    }}
                                    className="min-h-14 rounded-2xl border border-white/10 bg-white/[0.05] px-4 text-sm font-bold text-white outline-none"
                                >
                                    {styleFilters.map((filter) => <option key={filter} value={filter} className="bg-[#0a1018]">{filter === "All" ? "Style: All" : filter}</option>)}
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
                                {visibleDevices.map((device, index) => {
                                    const buildStatus = buildStateByCodename.get(device.codename);
                                    const isBuildReady = buildStatus === "Available";
                                    const isBuildProcessing = Boolean(buildStatus && buildStatus !== "Available");
                                    const isQueryFocus = initialCodename === device.codename;

                                    return (
                                        <GlassCard
                                            key={device.codename}
                                            accent={isQueryFocus ? "gold" : "cyan"}
                                            className="group relative border-white/10 transition duration-300 hover:-translate-y-1.5 hover:border-cyan-300/35 hover:shadow-[0_28px_80px_rgba(8,145,178,0.18)]"
                                        >
                                            <Link
                                                href={`/downloads/${device.codename}`}
                                                aria-label={`Open ${device.name} details`}
                                                className="absolute inset-0 z-0 rounded-[2rem]"
                                            />

                                            <div className="relative z-10 p-4 md:p-5">
                                                <DeviceImage
                                                    codename={device.codename}
                                                    name={device.name}
                                                    src={device.image || undefined}
                                                    alt={`${device.name} render`}
                                                    className="border-cyan-300/15 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_48%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))] shadow-inner shadow-cyan-400/5"
                                                    imageClassName="p-4 md:p-5"
                                                    priority={index < 6}
                                                />

                                                <div className="mt-5 flex items-start justify-between gap-4">
                                                    <div>
                                                        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-cyan-200">DeadZone Builds</p>
                                                        <h3 className="mt-2 text-xl font-black leading-tight text-white">{device.name}</h3>
                                                        {device.aliases.length > 0 && (
                                                            <p className="mt-2 text-sm text-zinc-300">{device.aliases.join(" / ")}</p>
                                                        )}
                                                    </div>
                                                    <RomBadge accent={getStatusAccent(device.status)}>{device.status}</RomBadge>
                                                </div>

                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    <RomBadge accent="blue">{device.category}</RomBadge>
                                                    <RomBadge accent="slate">{device.family}</RomBadge>
                                                    <RomBadge accent={device.chipset === "MediaTek" ? "magenta" : device.chipset === "Snapdragon" ? "cyan" : "slate"}>
                                                        {device.chipset}
                                                    </RomBadge>
                                                    {isBuildReady && <RomBadge accent="gold">Available Build</RomBadge>}
                                                    {isBuildProcessing && buildStatus && <RomBadge accent={getBuildStatusAccent(buildStatus)}>Build Processing</RomBadge>}
                                                </div>

                                                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                                    <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-3.5">
                                                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Codename</p>
                                                        <p className="mt-2 font-mono text-xs uppercase tracking-[0.22em] text-white">{device.codename}</p>
                                                    </div>
                                                    <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-3.5">
                                                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Status</p>
                                                        <p className="mt-2 text-sm font-bold text-white">{device.status}</p>
                                                    </div>
                                                </div>

                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {device.supportedStyles.map((style) => (
                                                        <RomBadge
                                                            key={`${device.codename}-${style}`}
                                                            accent={style === "Lite" ? "cyan" : style === "GamingPlus" ? "blue" : style === "Legend" ? "gold" : "magenta"}
                                                        >
                                                            {style}
                                                        </RomBadge>
                                                    ))}
                                                </div>

                                                <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                                                    <Link
                                                        href={`/downloads/${device.codename}`}
                                                        className="relative z-20 flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-4 text-xs font-black uppercase tracking-[0.16em] text-slate-950 transition hover:bg-cyan-300"
                                                    >
                                                        <ArrowRight className="h-4 w-4" />
                                                        Open Details
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            event.stopPropagation();
                                                            copyTelegramCommand(device.codename);
                                                        }}
                                                        className="relative z-20 flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:border-cyan-300/30"
                                                    >
                                                        {copiedCodename === device.codename ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                                        {copiedCodename === device.codename ? "Copied Command" : "Copy Command"}
                                                    </button>
                                                    <a
                                                        href={requestTelegramLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(event) => event.stopPropagation()}
                                                        className="relative z-20 flex min-h-12 items-center justify-center rounded-2xl border border-fuchsia-300/20 bg-fuchsia-400/10 px-4 text-xs font-black uppercase tracking-[0.16em] text-fuchsia-100 transition hover:border-fuchsia-300/40 hover:bg-fuchsia-400/16 sm:col-span-2 xl:col-span-1"
                                                    >
                                                        Request on Telegram
                                                    </a>
                                                </div>
                                            </div>
                                        </GlassCard>
                                    );
                                })}
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
