"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AlertCircle, Download, Search, Smartphone } from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Starfield } from "@/components/starfield";
import { GlassCard, RomBadge, SectionHeader } from "@/components/ui/deadzone";
import { supportedDevices } from "@/data/devices";
import { type PublicBuildsResponse } from "@/lib/builds";
import { officialLinks } from "@/lib/links";
import type { BuildItem } from "@/types";

export default function DownloadsPage() {
    const searchParams = useSearchParams();
    const requestedCodename = searchParams.get("codename")?.toLowerCase() || "";
    const [query, setQuery] = useState(requestedCodename);
    const [rows, setRows] = useState<BuildItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setQuery(requestedCodename);
    }, [requestedCodename]);

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
                console.error("Public builds fetch failed:", error);
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
        if (!needle) return rows;

        return rows.filter((build) =>
            [build.deviceName, build.codename, build.romVersion, build.region || "", build.android || ""].some((field) => field.toLowerCase().includes(needle))
        );
    }, [query, rows]);

    const requestedDevice = requestedCodename ? supportedDevices.find((device) => device.codename === requestedCodename) : null;

    return (
        <main className="relative min-h-screen">
            <Starfield />
            <Navbar />

            <section className="px-6 pb-20 pt-36">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        eyebrow="Downloads"
                        title="Latest DeadZone Lite Builds"
                        description="Browse public DeadZone Lite releases, filter by codename, and open clean download links when builds are available."
                        align="center"
                    />

                    <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_auto]">
                        <div className="relative">
                            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-600" />
                            <input
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Search device name, codename, region, or Android version..."
                                className="min-h-14 w-full rounded-2xl border border-white/10 bg-white/[0.05] py-4 pl-14 pr-5 text-white outline-none focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-500/20"
                            />
                        </div>
                        <a
                            href={officialLinks.contactMezo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex min-h-14 items-center justify-center rounded-2xl bg-cyan-400 px-5 text-xs font-black uppercase tracking-[0.14em] text-slate-950"
                        >
                            Request via MEZO
                        </a>
                    </div>

                    {requestedDevice && (
                        <GlassCard accent="blue" className="mb-8 p-5">
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <RomBadge accent="blue">Codename Filter</RomBadge>
                                    <h2 className="mt-4 text-2xl font-black text-white">{requestedDevice.name}</h2>
                                    <p className="mt-2 font-mono text-xs uppercase tracking-[0.24em] text-zinc-500">{requestedDevice.codename}</p>
                                </div>
                                <Link href="/devices" className="flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-5 text-xs font-black uppercase tracking-[0.14em] text-white">
                                    Browse Devices
                                </Link>
                            </div>
                        </GlassCard>
                    )}

                    {loading ? (
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <GlassCard key={index} accent="slate" className="h-[240px] animate-pulse p-5" />
                            ))}
                        </div>
                    ) : filteredBuilds.length ? (
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {filteredBuilds.map((build) => (
                                <GlassCard key={build.id} accent="cyan" className="p-6">
                                    <RomBadge accent="cyan">DeadZone Lite</RomBadge>
                                    <h2 className="mt-5 text-2xl font-black text-white">{build.deviceName}</h2>
                                    <p className="mt-2 font-mono text-xs uppercase tracking-[0.24em] text-zinc-500">{build.codename}</p>
                                    <div className="mt-5 grid grid-cols-2 gap-3">
                                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">ROM</p>
                                            <p className="mt-1 text-sm font-bold text-white">{build.romVersion}</p>
                                        </div>
                                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Android</p>
                                            <p className="mt-1 text-sm font-bold text-white">{build.android || "Not listed"}</p>
                                        </div>
                                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Region</p>
                                            <p className="mt-1 text-sm font-bold text-white">{build.region || "Not listed"}</p>
                                        </div>
                                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Updated</p>
                                            <p className="mt-1 text-sm font-bold text-white">{build.updatedAt ? new Date(build.updatedAt).toLocaleDateString() : "Not listed"}</p>
                                        </div>
                                    </div>
                                    <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Filename</p>
                                        <p className="mt-1 break-all text-sm font-bold text-white">{build.filename || "Not listed"}</p>
                                    </div>
                                    <div className="mt-6">
                                        <a href={build.downloadUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-5 text-xs font-black uppercase tracking-[0.16em] text-slate-950">
                                            <Download className="h-4 w-4" /> Download
                                        </a>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    ) : hasError ? (
                        <GlassCard accent="red" className="p-10 text-center">
                            <AlertCircle className="mx-auto mb-4 h-10 w-10 text-red-200" />
                            <h3 className="text-xl font-black text-white">Live public builds are temporarily unavailable.</h3>
                            <p className="mt-2 text-sm text-zinc-300">Try again shortly or request a build through MEZO.</p>
                        </GlassCard>
                    ) : (
                        <GlassCard accent="slate" className="p-10 text-center">
                            <Smartphone className="mx-auto mb-4 h-10 w-10 text-zinc-500" />
                            <h3 className="text-xl font-black text-white">
                                {requestedCodename
                                    ? "No public DeadZone Lite builds are listed for this codename yet. Use /mezo <OTA_ROM_LINK> to request one."
                                    : "No public DeadZone Lite builds are listed yet. Use /mezo <OTA_ROM_LINK> to request one."}
                            </h3>
                        </GlassCard>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
