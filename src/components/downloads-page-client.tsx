"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
    AlertCircle,
    CheckCircle2,
    Clock3,
    Download,
    FileText,
    Search,
    Smartphone,
    Wrench,
    XCircle,
} from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Starfield } from "@/components/starfield";
import { PremiumButton } from "@/components/ui/premium-button";
import { GlassCard, RomBadge, SectionHeader } from "@/components/ui/deadzone";
import { supportedDevices } from "@/data/devices";
import { officialLinks } from "@/lib/links";
import { cn } from "@/lib/utils";
import type { PublicBuildsResponse } from "@/lib/builds";
import type { BuildItem } from "@/types";

const styleFilters = ["All", "Lite", "GamingPlus", "Legend", "Ninja"] as const;

function getStatusAccent(status: BuildItem["status"]) {
    if (status === "Available") return "cyan";
    if (status === "Coming Soon") return "blue";
    if (status === "Building") return "gold";
    return "red";
}

function getStatusIcon(status: BuildItem["status"]) {
    if (status === "Available") return CheckCircle2;
    if (status === "Coming Soon") return Clock3;
    if (status === "Building") return Wrench;
    return XCircle;
}

export function DownloadsPageClient({
    initialBuilds = [],
    initialCodename = "",
    initialStyle = "All",
}: {
    initialBuilds?: BuildItem[];
    initialCodename?: string;
    initialStyle?: (typeof styleFilters)[number];
}) {
    const searchParams = useSearchParams();
    const requestedCodename = (searchParams.get("codename") || "").trim().toLowerCase();
    const requestedStyle = (searchParams.get("style") || "").trim();
    const resolvedStyle = styleFilters.includes(requestedStyle as (typeof styleFilters)[number]) ? requestedStyle as (typeof styleFilters)[number] : initialStyle;

    const [query, setQuery] = useState(initialCodename);
    const [activeStyle, setActiveStyle] = useState<(typeof styleFilters)[number]>(initialStyle);
    const [rows, setRows] = useState<BuildItem[]>(initialBuilds);
    const [loading, setLoading] = useState(initialBuilds.length === 0);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setQuery(requestedCodename || initialCodename);
    }, [initialCodename, requestedCodename]);

    useEffect(() => {
        setActiveStyle(resolvedStyle);
    }, [resolvedStyle]);

    useEffect(() => {
        setRows(initialBuilds);
        setLoading(initialBuilds.length === 0);
    }, [initialBuilds]);

    useEffect(() => {
        async function loadBuilds() {
            setLoading(true);
            setHasError(false);

            try {
                const endpoint = requestedCodename ? `/api/builds?codename=${encodeURIComponent(requestedCodename)}` : "/api/builds";
                const response = await fetch(endpoint, { cache: "no-store" });
                const data = await response.json() as PublicBuildsResponse;

                setRows(Array.isArray(data?.builds) ? data.builds : []);
                setHasError(data?.ok === false);
            } catch (error) {
                console.error("DeadZone builds fetch failed:", error);
                setRows([]);
                setHasError(true);
            } finally {
                setLoading(false);
            }
        }

        loadBuilds();
    }, [requestedCodename]);

    const filteredBuilds = useMemo(() => {
        const needle = query.trim().toLowerCase();

        return rows.filter((build) => {
            const matchesSearch =
                !needle ||
                [build.deviceName, build.codename, build.romVersion, build.androidVersion || "", build.hyperOsVersion || ""].some((field) =>
                    field.toLowerCase().includes(needle)
                );

            const matchesStyle = activeStyle === "All" || build.style === activeStyle;
            return matchesSearch && matchesStyle;
        });
    }, [activeStyle, query, rows]);

    const requestedDevices = useMemo(
        () => (requestedCodename ? supportedDevices.filter((device) => device.codename === requestedCodename) : []),
        [requestedCodename],
    );

    const availableCount = useMemo(() => rows.filter((build) => build.status === "Available").length, [rows]);
    const visibleCount = filteredBuilds.length;

    const emptyTitle = requestedCodename
        ? `No public builds found for codename: ${requestedCodename}`
        : "No public builds found yet";
    const emptyDescription = requestedCodename
        ? "No public builds found for this device yet. You can request a build using Telegram."
        : "No public builds found for this device yet. You can request a build using Telegram.";

    return (
        <main className="page-shell">
            <Starfield />
            <Navbar />

            <section className="px-6 pb-20 pt-36">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        eyebrow="Downloads"
                        title={<><span className="text-gradient">DeadZone Downloads</span><br />Public builds, premium styles, and clear status tracking.</>}
                        description="Browse DeadZone releases by device name or codename, filter by style, and check build availability before you open a download or changelog."
                        align="center"
                    />

                    <div className="mb-8 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
                        <GlassCard accent="cyan" className="relative overflow-hidden p-6 md:p-8">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_46%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.16),transparent_42%)]" />
                            <div className="relative z-10 flex flex-col gap-8">
                                <div className="max-w-3xl">
                                    <RomBadge accent="cyan">DeadZone Build Index</RomBadge>
                                    <h2 className="mt-5 text-3xl font-black tracking-tight text-white md:text-4xl">
                                        Search builds, inspect status, and move between Lite and premium DeadZone styles.
                                    </h2>
                                    <p className="mt-4 text-sm leading-7 text-zinc-300 md:text-base">
                                        This page keeps DeadZone downloads usable even when a device has no public package yet, with explicit status cards and direct Telegram request paths.
                                    </p>
                                </div>

                                <div className="grid gap-4 md:grid-cols-3">
                                    <div className="rounded-[1.75rem] border border-cyan-300/20 bg-black/30 p-5 backdrop-blur-xl">
                                        <p className="text-4xl font-black text-white">{rows.length}</p>
                                        <p className="mt-2 text-[11px] font-black uppercase tracking-[0.24em] text-cyan-200">Tracked Builds</p>
                                    </div>
                                    <div className="rounded-[1.75rem] border border-blue-300/20 bg-black/30 p-5 backdrop-blur-xl">
                                        <p className="text-4xl font-black text-white">{availableCount}</p>
                                        <p className="mt-2 text-[11px] font-black uppercase tracking-[0.24em] text-blue-200">Available Now</p>
                                    </div>
                                    <div className="rounded-[1.75rem] border border-fuchsia-300/20 bg-black/30 p-5 backdrop-blur-xl">
                                        <p className="text-4xl font-black text-white">{visibleCount}</p>
                                        <p className="mt-2 text-[11px] font-black uppercase tracking-[0.24em] text-fuchsia-200">Visible Results</p>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard accent="magenta" className="p-6 md:p-8">
                            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-fuchsia-200">Request Flow</p>
                            <h2 className="mt-3 text-2xl font-black text-white">Use the public page first, then request missing builds.</h2>
                            <p className="mt-4 text-sm leading-7 text-zinc-300">
                                DeadZone keeps the public lineup visible here. If a package is not ready, contact MEZO on Telegram or review the supported device list before requesting it.
                            </p>

                            <div className="mt-6 grid gap-3">
                                <PremiumButton href={officialLinks.contactMezo} external icon={<Smartphone className="h-4 w-4" />} className="w-full text-xs">
                                    Contact MEZO
                                </PremiumButton>
                                <PremiumButton href="/devices" variant="secondary" icon={<Smartphone className="h-4 w-4" />} className="w-full text-xs">
                                    View Supported Devices
                                </PremiumButton>
                            </div>
                        </GlassCard>
                    </div>

                    <GlassCard accent="blue" className="sticky top-24 z-20 mb-10 p-4 md:p-5 shadow-[0_22px_60px_rgba(2,5,10,0.34)]">
                        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center">
                            <div className="relative">
                                <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
                                <input
                                    value={query}
                                    onChange={(event) => setQuery(event.target.value)}
                                    placeholder="Search by device name or codename..."
                                    className="min-h-14 w-full rounded-2xl border border-white/10 bg-white/[0.05] py-4 pl-14 pr-5 text-white outline-none transition focus:border-cyan-300/45 focus:ring-2 focus:ring-cyan-500/20"
                                />
                            </div>

                            <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
                                {styleFilters.map((filter) => {
                                    const count = filter === "All" ? rows.length : rows.filter((build) => build.style === filter).length;

                                    return (
                                        <button
                                            key={filter}
                                            onClick={() => setActiveStyle(filter)}
                                            className={cn(
                                                "min-h-14 shrink-0 rounded-2xl border px-4 text-xs font-black uppercase tracking-[0.14em] transition",
                                                activeStyle === filter
                                                    ? "border-cyan-300/50 bg-cyan-400 text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.24)]"
                                                    : "border-white/10 bg-white/[0.04] text-zinc-300 hover:border-fuchsia-300/30 hover:text-white"
                                            )}
                                        >
                                            {filter}
                                            <span className={cn("ml-2 rounded-full px-2 py-0.5 text-[10px]", activeStyle === filter ? "bg-slate-950/12 text-slate-950" : "bg-white/10 text-zinc-400")}>
                                                {count}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </GlassCard>

                    {(requestedDevices.length > 0 || requestedCodename || activeStyle !== "All") && (
                        <GlassCard accent="slate" className="mb-8 p-6">
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <RomBadge accent="blue">Active Filters</RomBadge>
                                    <h2 className="mt-4 text-2xl font-black text-white">
                                        {requestedDevices.length > 0 ? requestedDevices.map((device) => device.name).join(" / ") : "Downloads Filtered View"}
                                    </h2>
                                    <p className="mt-2 text-sm text-zinc-400">
                                        Codename: <span className="font-mono text-white">{requestedCodename || "all"}</span>
                                        {" • "}
                                        Style: <span className="font-mono text-white">{activeStyle}</span>
                                    </p>
                                </div>
                                <Link
                                    href="/downloads"
                                    className="flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-5 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:border-cyan-300/30"
                                >
                                    Clear Filters
                                </Link>
                            </div>
                        </GlassCard>
                    )}

                    {loading ? (
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <GlassCard key={index} accent="slate" className="h-[420px] animate-pulse p-5" />
                            ))}
                        </div>
                    ) : filteredBuilds.length ? (
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {filteredBuilds.map((build) => {
                                const StatusIcon = getStatusIcon(build.status);
                                const statusAccent = getStatusAccent(build.status);
                                const canDownload = build.status === "Available" && Boolean(build.downloadUrl);

                                return (
                                    <GlassCard key={build.id} accent={statusAccent} className="h-full p-6">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <RomBadge accent={statusAccent}>{build.style}</RomBadge>
                                                <h2 className="mt-5 text-2xl font-black text-white">{build.deviceName}</h2>
                                                <p className="mt-2 font-mono text-xs uppercase tracking-[0.24em] text-zinc-500">{build.codename}</p>
                                            </div>
                                            <div className={cn("inline-flex h-12 w-12 items-center justify-center rounded-2xl border bg-white/[0.05]", statusAccent === "cyan" ? "border-cyan-300/25 text-cyan-200" : statusAccent === "blue" ? "border-blue-300/25 text-blue-200" : statusAccent === "gold" ? "border-amber-300/25 text-amber-200" : "border-red-300/25 text-red-200")}>
                                                <StatusIcon className="h-5 w-5" />
                                            </div>
                                        </div>

                                        <div className="mt-5 grid grid-cols-2 gap-3">
                                            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">ROM Version</p>
                                                <p className="mt-1 text-sm font-bold text-white">{build.romVersion}</p>
                                            </div>
                                            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Build Status</p>
                                                <p className="mt-1 text-sm font-bold text-white">{build.status}</p>
                                            </div>
                                            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Android Version</p>
                                                <p className="mt-1 text-sm font-bold text-white">{build.androidVersion || "Not listed"}</p>
                                            </div>
                                            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">HyperOS Version</p>
                                                <p className="mt-1 text-sm font-bold text-white">{build.hyperOsVersion || "Not listed"}</p>
                                            </div>
                                            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">DeadZone Style</p>
                                                <p className="mt-1 text-sm font-bold text-white">{build.style}</p>
                                            </div>
                                            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Updated</p>
                                                <p className="mt-1 text-sm font-bold text-white">{build.updatedAt ? new Date(build.updatedAt).toLocaleDateString("en-US") : "Not listed"}</p>
                                            </div>
                                        </div>

                                        {build.sha256 && (
                                            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">SHA256</p>
                                                <p className="mt-1 break-all font-mono text-xs text-zinc-200">{build.sha256}</p>
                                            </div>
                                        )}

                                        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Filename</p>
                                            <p className="mt-1 break-all text-sm font-bold text-white">{build.filename || "Package not published yet"}</p>
                                        </div>

                                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                            {canDownload ? (
                                                <a
                                                    href={build.downloadUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-4 text-xs font-black uppercase tracking-[0.16em] text-slate-950 transition hover:bg-cyan-300"
                                                >
                                                    <Download className="h-4 w-4" />
                                                    Download
                                                </a>
                                            ) : (
                                                <div className="flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-center text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                                                    Download Unavailable
                                                </div>
                                            )}

                                            {build.changelogUrl ? (
                                                <a
                                                    href={build.changelogUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:border-fuchsia-300/30"
                                                >
                                                    <FileText className="h-4 w-4" />
                                                    Changelog
                                                </a>
                                            ) : (
                                                <div className="flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-center text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                                                    Changelog Pending
                                                </div>
                                            )}
                                        </div>
                                    </GlassCard>
                                );
                            })}
                        </div>
                    ) : hasError && rows.length === 0 ? (
                        <GlassCard accent="red" className="p-10 text-center">
                            <AlertCircle className="mx-auto mb-4 h-10 w-10 text-red-200" />
                            <h3 className="text-xl font-black text-white">DeadZone downloads are temporarily unavailable.</h3>
                            <p className="mt-2 text-sm text-zinc-300">Please try again shortly, or contact MEZO if you need direct Telegram support.</p>
                        </GlassCard>
                    ) : (
                        <GlassCard accent="slate" className="p-10 text-center">
                            <Smartphone className="mx-auto mb-4 h-10 w-10 text-zinc-500" />
                            <h3 className="text-xl font-black text-white">{emptyTitle}</h3>
                            <p className="mt-3 text-sm leading-7 text-zinc-400">{emptyDescription}</p>
                            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                                <PremiumButton href={officialLinks.contactMezo} external icon={<Smartphone className="h-4 w-4" />} className="text-xs">
                                    Contact MEZO
                                </PremiumButton>
                                <PremiumButton href="/devices" variant="secondary" icon={<Smartphone className="h-4 w-4" />} className="text-xs">
                                    View Supported Devices
                                </PremiumButton>
                            </div>
                        </GlassCard>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
