"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
    AlertCircle,
    CalendarDays,
    Check,
    CheckCircle2,
    Clock3,
    Copy,
    Download,
    FileText,
    FolderSearch,
    HardDriveDownload,
    Layers3,
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
import { publicBuilds, type PublicBuildsResponse } from "@/lib/builds";
import { buildDownloadsPath, officialLinks } from "@/lib/links";
import { cn } from "@/lib/utils";
import type { BuildItem } from "@/types";

const styleFilters = ["All", "Lite", "GamingPlus", "Legend", "Ninja"] as const;
const androidFilters = ["All", "A13", "A14", "A15", "A16"] as const;
const hyperOsFilters = ["All", "OS1", "OS2", "OS3"] as const;
const statusFilters = ["All", "Available", "Coming Soon", "Building", "Failed"] as const;

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

function normalizeAndroidFilter(version?: string) {
    if (!version) return "";
    const match = version.match(/(13|14|15|16)/);
    return match ? `A${match[1]}` : "";
}

function normalizeHyperOsFilter(version?: string) {
    if (!version) return "";
    const match = version.match(/(1|2|3)/);
    return match ? `OS${match[1]}` : "";
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
    const resolvedStyle = styleFilters.includes(requestedStyle as (typeof styleFilters)[number])
        ? requestedStyle as (typeof styleFilters)[number]
        : initialStyle;

    const [query, setQuery] = useState(initialCodename);
    const [activeStyle, setActiveStyle] = useState<(typeof styleFilters)[number]>(initialStyle);
    const [activeAndroid, setActiveAndroid] = useState<(typeof androidFilters)[number]>("All");
    const [activeHyperOs, setActiveHyperOs] = useState<(typeof hyperOsFilters)[number]>("All");
    const [activeStatus, setActiveStatus] = useState<(typeof statusFilters)[number]>("All");
    const [rows, setRows] = useState<BuildItem[]>(initialBuilds);
    const [loading, setLoading] = useState(initialBuilds.length === 0);
    const [hasError, setHasError] = useState(false);
    const [copiedValue, setCopiedValue] = useState("");

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
                const params = new URLSearchParams();
                if (requestedCodename) params.set("codename", requestedCodename);
                const endpoint = params.toString() ? `/api/builds?${params.toString()}` : "/api/builds";
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

    const latestUpdate = useMemo(() => {
        const timestamps = rows
            .map((build) => build.updatedAt ? new Date(build.updatedAt).getTime() : 0)
            .filter((value) => value > 0);
        return timestamps.length ? new Date(Math.max(...timestamps)).toLocaleDateString("en-US") : "Not listed";
    }, [rows]);

    const filteredBuilds = useMemo(() => {
        const needle = query.trim().toLowerCase();

        return rows.filter((build) => {
            const matchesSearch =
                !needle ||
                [
                    build.deviceName,
                    build.codename,
                    build.romVersion,
                    build.style,
                    build.androidVersion || "",
                    build.hyperOsVersion || "",
                ].some((field) => field.toLowerCase().includes(needle));

            const matchesStyle = activeStyle === "All" || build.style === activeStyle;
            const matchesAndroid = activeAndroid === "All" || normalizeAndroidFilter(build.androidVersion) === activeAndroid;
            const matchesHyperOs = activeHyperOs === "All" || normalizeHyperOsFilter(build.hyperOsVersion) === activeHyperOs;
            const matchesStatus = activeStatus === "All" || build.status === activeStatus;

            return matchesSearch && matchesStyle && matchesAndroid && matchesHyperOs && matchesStatus;
        });
    }, [activeAndroid, activeHyperOs, activeStatus, activeStyle, query, rows]);

    const availableCount = useMemo(() => rows.filter((build) => build.status === "Available").length, [rows]);
    const visibleCount = filteredBuilds.length;
    const uniqueStyles = useMemo(() => new Set(rows.map((build) => build.style)).size, [rows]);

    async function copyCommand(codename: string) {
        const command = `/mezo ${codename}`;

        try {
            await navigator.clipboard.writeText(command);
            setCopiedValue(command);
            window.setTimeout(() => {
                setCopiedValue((current) => (current === command ? "" : current));
            }, 2000);
        } catch (error) {
            console.error("Copy command failed:", error);
        }
    }

    function resetFilters() {
        setQuery(requestedCodename || "");
        setActiveStyle(resolvedStyle);
        setActiveAndroid("All");
        setActiveHyperOs("All");
        setActiveStatus("All");
    }

    const emptyTitle = requestedCodename
        ? `No public builds found for codename: ${requestedCodename}`
        : "No public builds found for this filter view.";

    const hasActiveFilters =
        query.trim().length > 0 ||
        activeStyle !== "All" ||
        activeAndroid !== "All" ||
        activeHyperOs !== "All" ||
        activeStatus !== "All";

    return (
        <main className="page-shell">
            <Starfield />
            <Navbar />

            <section className="px-6 pb-20 pt-36">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        eyebrow="Downloads Hub"
                        title="DeadZone Downloads"
                        description="Find official DeadZone builds by device codename, ROM version, Android version, HyperOS version, and style."
                        align="center"
                    />

                    <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        <GlassCard accent="cyan" className="p-6">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-4xl font-black text-white">{availableCount}</p>
                                    <p className="mt-2 text-[11px] font-black uppercase tracking-[0.24em] text-cyan-200">Available Builds</p>
                                </div>
                                <HardDriveDownload className="h-6 w-6 text-cyan-200" />
                            </div>
                        </GlassCard>
                        <GlassCard accent="blue" className="p-6">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-4xl font-black text-white">{supportedDevices.length}</p>
                                    <p className="mt-2 text-[11px] font-black uppercase tracking-[0.24em] text-blue-200">Supported Devices</p>
                                </div>
                                <Smartphone className="h-6 w-6 text-blue-200" />
                            </div>
                        </GlassCard>
                        <GlassCard accent="magenta" className="p-6">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-4xl font-black text-white">{uniqueStyles}</p>
                                    <p className="mt-2 text-[11px] font-black uppercase tracking-[0.24em] text-fuchsia-200">DeadZone Styles</p>
                                </div>
                                <Layers3 className="h-6 w-6 text-fuchsia-200" />
                            </div>
                        </GlassCard>
                        <GlassCard accent="gold" className="p-6">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-xl font-black text-white">{latestUpdate}</p>
                                    <p className="mt-2 text-[11px] font-black uppercase tracking-[0.24em] text-amber-200">Latest Update</p>
                                </div>
                                <CalendarDays className="h-6 w-6 text-amber-200" />
                            </div>
                        </GlassCard>
                    </div>

                    <div className="mb-8 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
                        <GlassCard accent="cyan" className="relative overflow-hidden p-6 md:p-8">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_46%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.16),transparent_42%)]" />
                            <div className="relative z-10">
                                <RomBadge accent="cyan">Official Downloads Hub</RomBadge>
                                <h2 className="mt-5 text-3xl font-black text-white md:text-4xl">
                                    Search builds fast, filter hard, and move straight into the correct DeadZone package.
                                </h2>
                                <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-300 md:text-base">
                                    Search by device name, codename, ROM version, or style, then narrow the list by Android, HyperOS, and build status before downloading or requesting support.
                                </p>
                            </div>
                        </GlassCard>

                        <GlassCard accent="magenta" className="p-6 md:p-8">
                            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-fuchsia-200">Support Actions</p>
                            <h2 className="mt-3 text-2xl font-black text-white">Request a build or jump into the correct support path.</h2>
                            <div className="mt-6 grid gap-3">
                                <PremiumButton href={officialLinks.contactMezo} external icon={<Smartphone className="h-4 w-4" />} className="w-full text-xs">
                                    Contact MEZO
                                </PremiumButton>
                                <PremiumButton href="/devices" variant="secondary" icon={<Smartphone className="h-4 w-4" />} className="w-full text-xs">
                                    View Supported Devices
                                </PremiumButton>
                                <PremiumButton href="/contact" variant="secondary" icon={<FileText className="h-4 w-4" />} className="w-full text-xs">
                                    Support Template
                                </PremiumButton>
                            </div>
                        </GlassCard>
                    </div>

                    <GlassCard accent="blue" className="sticky top-24 z-20 mb-10 p-4 md:p-5 shadow-[0_22px_60px_rgba(2,5,10,0.34)]">
                        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_1fr]">
                            <div className="relative xl:col-span-2">
                                <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
                                <input
                                    value={query}
                                    onChange={(event) => setQuery(event.target.value)}
                                    placeholder="Search by device name, codename, ROM version, or style..."
                                    className="min-h-14 w-full rounded-2xl border border-white/10 bg-white/[0.05] py-4 pl-14 pr-5 text-white outline-none transition focus:border-cyan-300/45 focus:ring-2 focus:ring-cyan-500/20"
                                />
                            </div>

                            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4 xl:col-span-2">
                                <select
                                    value={activeStyle}
                                    onChange={(event) => setActiveStyle(event.target.value as (typeof styleFilters)[number])}
                                    className="min-h-14 rounded-2xl border border-white/10 bg-white/[0.05] px-4 text-sm font-bold text-white outline-none"
                                >
                                    {styleFilters.map((filter) => <option key={filter} value={filter} className="bg-[#0a1018]">{filter === "All" ? "Style: All" : filter}</option>)}
                                </select>
                                <select
                                    value={activeAndroid}
                                    onChange={(event) => setActiveAndroid(event.target.value as (typeof androidFilters)[number])}
                                    className="min-h-14 rounded-2xl border border-white/10 bg-white/[0.05] px-4 text-sm font-bold text-white outline-none"
                                >
                                    {androidFilters.map((filter) => <option key={filter} value={filter} className="bg-[#0a1018]">{filter === "All" ? "Android: All" : filter}</option>)}
                                </select>
                                <select
                                    value={activeHyperOs}
                                    onChange={(event) => setActiveHyperOs(event.target.value as (typeof hyperOsFilters)[number])}
                                    className="min-h-14 rounded-2xl border border-white/10 bg-white/[0.05] px-4 text-sm font-bold text-white outline-none"
                                >
                                    {hyperOsFilters.map((filter) => <option key={filter} value={filter} className="bg-[#0a1018]">{filter === "All" ? "HyperOS: All" : filter}</option>)}
                                </select>
                                <select
                                    value={activeStatus}
                                    onChange={(event) => setActiveStatus(event.target.value as (typeof statusFilters)[number])}
                                    className="min-h-14 rounded-2xl border border-white/10 bg-white/[0.05] px-4 text-sm font-bold text-white outline-none"
                                >
                                    {statusFilters.map((filter) => <option key={filter} value={filter} className="bg-[#0a1018]">{filter === "All" ? "Status: All" : filter}</option>)}
                                </select>
                            </div>

                            <div className="xl:col-span-2 flex justify-end">
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    disabled={!hasActiveFilters}
                                    className="flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-5 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:border-cyan-300/30 disabled:cursor-not-allowed disabled:opacity-45"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        </div>
                    </GlassCard>

                    {loading ? (
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <GlassCard key={index} accent="slate" className="h-[500px] animate-pulse p-5" />
                            ))}
                        </div>
                    ) : filteredBuilds.length ? (
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {filteredBuilds.map((build) => {
                                const StatusIcon = getStatusIcon(build.status);
                                const statusAccent = getStatusAccent(build.status);
                                const command = `/mezo ${build.codename}`;
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
                                                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">DeadZone Style</p>
                                                <p className="mt-1 text-sm font-bold text-white">{build.style}</p>
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
                                                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">ROM Version</p>
                                                <p className="mt-1 text-sm font-bold text-white">{build.romVersion}</p>
                                            </div>
                                            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Region</p>
                                                <p className="mt-1 text-sm font-bold text-white">{build.region || "Not listed"}</p>
                                            </div>
                                            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Build Date</p>
                                                <p className="mt-1 text-sm font-bold text-white">{build.updatedAt ? new Date(build.updatedAt).toLocaleDateString("en-US") : "Not listed"}</p>
                                            </div>
                                            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">File Size</p>
                                                <p className="mt-1 text-sm font-bold text-white">{build.fileSize || "Not listed"}</p>
                                            </div>
                                        </div>

                                        {build.sha256 && (
                                            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">SHA256 / Hash</p>
                                                <p className="mt-1 break-all font-mono text-xs text-zinc-200">{build.sha256}</p>
                                            </div>
                                        )}

                                        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Command</p>
                                            <p className="mt-1 font-mono text-sm text-white">{command}</p>
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

                                            <button
                                                type="button"
                                                onClick={() => copyCommand(build.codename)}
                                                className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:border-cyan-300/30"
                                            >
                                                {copiedValue === command ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                                {copiedValue === command ? "Copied Command" : "Copy Command"}
                                            </button>

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

                                            <a
                                                href={officialLinks.contactMezo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex min-h-12 items-center justify-center rounded-2xl border border-fuchsia-300/20 bg-fuchsia-400/10 px-4 text-xs font-black uppercase tracking-[0.16em] text-fuchsia-100 transition hover:border-fuchsia-300/40 hover:bg-fuchsia-400/16"
                                            >
                                                Contact MEZO
                                            </a>
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
                            <FolderSearch className="mx-auto mb-4 h-10 w-10 text-zinc-500" />
                            <h3 className="text-xl font-black text-white">{emptyTitle}</h3>
                            <p className="mt-3 text-sm leading-7 text-zinc-400">
                                {requestedCodename
                                    ? "You can request a build using Telegram."
                                    : "Adjust your filters or request a build using Telegram."}
                            </p>
                            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                                {requestedCodename && (
                                    <PremiumButton
                                        onClick={() => copyCommand(requestedCodename)}
                                        icon={copiedValue === `/mezo ${requestedCodename}` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                        className="text-xs"
                                    >
                                        {copiedValue === `/mezo ${requestedCodename}` ? "Copied Command" : "Copy Command"}
                                    </PremiumButton>
                                )}
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
