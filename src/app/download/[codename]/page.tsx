"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronLeft,
    Download,
    Info,
    ShieldCheck,
    Terminal,
    History,
    Cpu,
    Smartphone,
    Github,
    Link as LinkIcon,
    Fingerprint,
    AlertTriangle,
    Server,
    HardDriveDownload,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PremiumButton } from "@/components/ui/premium-button";
import { GlassCard, RomBadge, StatusBadge } from "@/components/ui/deadzone";
import { findDeadZoneDevice } from "@/data/deadzone-devices";

const servers = ["PixelDrain", "GitHub Release", "Backup Mirror"];

function platformLabel(device: any, rom?: any) {
    const text = `${rom?.platform || ""} ${rom?.soc || ""} ${device?.chipset || ""} ${device?.soc || ""}`.toLowerCase();
    if (text.includes("snapdragon") || text.includes("qualcomm")) return "Snapdragon";
    if (text.includes("mtk") || text.includes("mediatek") || text.includes("dimensity") || text.includes("helio")) return "MTK";
    return rom?.platform || device?.platform || "HyperOS 3";
}

function normalizeDevice(data: any, codename: string) {
    const fallback = findDeadZoneDevice(codename);
    if (!data || data.error) {
        return fallback ? {
            ...fallback,
            id: fallback.codename,
            chipset: fallback.soc,
            roms: [],
            fromFallback: true,
        } : null;
    }

    const soc = fallback?.soc || (String(data.chipset || "").toLowerCase().includes("mtk") ? "MTK" : "Snapdragon");
    return {
        ...data,
        name: data.name || fallback?.name,
        brand: data.brand || fallback?.brand,
        soc,
        chipset: data.chipset || soc,
        platform: fallback?.platform || data.platform || "HyperOS 3 / Global ROM Base / CN features",
        status: data.status === "INACTIVE" ? "coming_soon" : fallback?.status || "supported",
        roms: Array.isArray(data.roms) ? data.roms : [],
    };
}

function InfoRow({ label, value }: { label: string; value?: React.ReactNode }) {
    return (
        <div className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">{label}</span>
            <span className="break-all text-right text-sm font-bold text-white">{value || "Not set"}</span>
        </div>
    );
}

function serverUrl(rom: any, server: string) {
    if (server === "PixelDrain") return rom.pixeldrainUrl || "";
    if (server === "GitHub Release") return rom.githubRunUrl || rom.downloadUrl || "";
    return rom.downloadUrl || "";
}

function DeviceHeroVisual({ soc }: { soc?: string }) {
    const isMtk = soc === "MTK";
    return (
        <div className={cn("relative flex min-h-[260px] items-center justify-center overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-br", isMtk ? "from-purple-400/30 via-fuchsia-500/10 to-cyan-300/20" : "from-blue-400/30 via-cyan-500/10 to-fuchsia-300/20")}>
            <div className="absolute inset-0 deadzone-grid opacity-35" />
            <div className="relative h-40 w-20 rounded-[1.9rem] border border-white/25 bg-black/60 p-1.5 shadow-2xl shadow-black/70">
                <div className="h-full rounded-[1.45rem] border border-white/10 bg-gradient-to-b from-white/10 via-cyan-400/10 to-fuchsia-500/10">
                    <div className="mx-auto mt-3 h-1 w-7 rounded-full bg-white/35" />
                    <div className="mx-3 mt-8 h-20 rounded-2xl border border-cyan-300/20 bg-cyan-300/10" />
                </div>
            </div>
        </div>
    );
}

export default function DeviceDetailPage({ params }: { params: { codename: string } }) {
    const [device, setDevice] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedRom, setSelectedRom] = useState<any>(null);
    const [selectedServer, setSelectedServer] = useState(servers[0]);
    const [isDownloading, setIsDownloading] = useState(false);

    useEffect(() => {
        const fetchDevice = async () => {
            try {
                const res = await fetch(`/api/devices/${params.codename}`);
                const data = await res.json();
                const normalized = normalizeDevice(data, params.codename);
                setDevice(normalized);
                if (normalized?.roms?.length > 0) setSelectedRom(normalized.roms[0]);
            } catch (error) {
                console.error("Device fetch failed:", error);
                const normalized = normalizeDevice(null, params.codename);
                setDevice(normalized);
            } finally {
                setLoading(false);
            }
        };
        fetchDevice();
    }, [params.codename]);

    const activeDownloadUrl = selectedRom ? serverUrl(selectedRom, selectedServer) : "";

    const handleDownload = async () => {
        if (!selectedRom || !activeDownloadUrl) return;
        setIsDownloading(true);
        try {
            await fetch("/api/downloads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ romId: selectedRom.id }),
            });
        } catch (err) {
            console.error("Tracking failed", err);
        } finally {
            setIsDownloading(false);
        }
        window.open(activeDownloadUrl, "_blank");
    };

    if (loading) {
        return (
            <main className="min-h-screen relative">
                <Starfield />
                <Navbar />
                <div className="mx-auto max-w-7xl px-6 pb-20 pt-32">
                    <div className="mb-12 h-8 w-48 animate-pulse rounded-xl bg-white/5" />
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        <div className="h-[420px] animate-pulse rounded-[2rem] bg-white/5 lg:col-span-1" />
                        <div className="h-[620px] animate-pulse rounded-[2rem] bg-white/5 lg:col-span-2" />
                    </div>
                </div>
            </main>
        );
    }

    if (!device) {
        return (
            <main className="min-h-screen relative flex flex-col items-center justify-center px-6 text-center">
                <Starfield />
                <h1 className="mb-4 text-4xl font-black text-white">Device Not Found</h1>
                <p className="mb-8 text-zinc-500">The requested device could not be located in the DeadZone catalog.</p>
                <Link href="/download" className="rounded-2xl bg-cyan-400 px-8 py-4 font-bold text-slate-950">
                    Back to Download Center
                </Link>
            </main>
        );
    }

    const hasRoms = (device.roms?.length || 0) > 0;
    const accent = device.soc === "MTK" ? "purple" : "blue";

    return (
        <main className="min-h-screen relative">
            <Starfield />
            <Navbar />

            <div className="mx-auto max-w-7xl px-6 pb-20 pt-32">
                <Link href="/download" className="mb-10 flex w-fit items-center gap-2 text-zinc-500 transition-colors hover:text-white">
                    <ChevronLeft className="h-5 w-5" />
                    <span className="text-sm font-black uppercase tracking-[0.16em]">Back to Downloads</span>
                </Link>

                <GlassCard accent={accent} className="mb-8 p-5 md:p-7">
                    <div className="grid gap-7 lg:grid-cols-[360px_1fr]">
                        <DeviceHeroVisual soc={device.soc} />
                        <div className="flex flex-col justify-between gap-8">
                            <div>
                                <div className="mb-5 flex flex-wrap gap-2">
                                    <RomBadge accent={accent}>{device.soc}</RomBadge>
                                    <RomBadge accent="cyan">Global Base</RomBadge>
                                    <RomBadge accent="magenta">China Base</RomBadge>
                                    <RomBadge accent="blue">HyperOS 3</RomBadge>
                                    <RomBadge accent="cyan">Fastboot ZIP</RomBadge>
                                    <StatusBadge comingSoon={!hasRoms} stable={hasRoms} />
                                </div>
                                <h1 className="text-4xl font-black leading-tight text-white md:text-6xl">{device.name}</h1>
                                <p className="mt-3 font-mono text-xs uppercase tracking-[0.28em] text-zinc-500">{device.codename}</p>
                            </div>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                                <InfoRow label="SoC" value={device.chipset || device.soc} />
                                <InfoRow label="Platform" value={platformLabel(device, selectedRom)} />
                                <InfoRow label="Status" value={hasRoms ? "Builds available" : "Coming Soon"} />
                                <InfoRow label="Builds" value={device.roms?.length || 0} />
                            </div>
                        </div>
                    </div>
                </GlassCard>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[360px_1fr]">
                    <div className="space-y-6">
                        <GlassCard accent={accent} className="p-6">
                            <h3 className="mb-4 flex items-center gap-2 font-black text-white">
                                <HardDriveDownload className="h-5 w-5 text-cyan-300" /> ROM Version
                            </h3>
                            {hasRoms ? (
                                <div className="grid gap-3">
                                    {device.roms.map((rom: any) => (
                                        <button
                                            key={rom.id}
                                            onClick={() => setSelectedRom(rom)}
                                            className={cn(
                                                "min-h-16 rounded-2xl border p-4 text-left transition-all",
                                                selectedRom?.id === rom.id ? "border-cyan-300/40 bg-cyan-400/15 text-white" : "border-white/10 bg-white/[0.04] text-zinc-400 hover:text-white"
                                            )}
                                        >
                                            <span className="block text-xs font-black uppercase tracking-[0.16em]">{rom.flavor || "DeadZone"}</span>
                                            <span className="mt-1 block text-sm font-bold">v{rom.version}</span>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm leading-7 text-zinc-400">No ROM versions are registered for this codename yet.</p>
                            )}
                        </GlassCard>

                        <GlassCard accent="cyan" className="p-6">
                            <h3 className="mb-4 flex items-center gap-2 font-black text-white">
                                <Server className="h-5 w-5 text-cyan-300" /> Download Server
                            </h3>
                            <div className="grid gap-3">
                                {servers.map((server) => {
                                    const available = selectedRom ? Boolean(serverUrl(selectedRom, server)) : false;
                                    return (
                                        <button
                                            key={server}
                                            onClick={() => available && setSelectedServer(server)}
                                            disabled={!available}
                                            className={cn(
                                                "min-h-12 rounded-2xl border px-4 text-left text-xs font-black uppercase tracking-[0.14em] transition-colors disabled:cursor-not-allowed",
                                                selectedServer === server && available ? "border-cyan-300/35 bg-cyan-400/12 text-white" : "border-white/10 bg-white/[0.04] text-zinc-500",
                                                available && selectedServer !== server && "hover:text-zinc-200"
                                            )}
                                        >
                                            {server} {!available && <span className="text-zinc-600">/ unavailable</span>}
                                        </button>
                                    );
                                })}
                            </div>
                        </GlassCard>

                        <GlassCard accent="cyan" className="p-6">
                            <h3 className="mb-3 flex items-center gap-2 font-black text-white">
                                <ShieldCheck className="h-5 w-5 text-cyan-300" /> Device Info
                            </h3>
                            <div className="space-y-3">
                                <InfoRow label="Codename" value={device.codename} />
                                <InfoRow label="Device name" value={device.name} />
                                <InfoRow label="SoC" value={device.chipset || device.soc} />
                                <InfoRow label="Platform" value={device.platform} />
                                <InfoRow label="Status" value={hasRoms ? "Supported" : "Coming Soon"} />
                            </div>
                        </GlassCard>
                    </div>

                    <div className="space-y-7">
                        {hasRoms ? (
                            <AnimatePresence mode="wait">
                                {selectedRom && (
                                    <motion.div
                                        key={selectedRom.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="space-y-7"
                                    >
                                        <GlassCard accent="cyan" className="p-6 md:p-8">
                                            <div className="mb-8 flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                                                <div>
                                                    <div className="mb-4 flex flex-wrap gap-2">
                                                        <RomBadge>{selectedRom.flavor ? `DeadZone ${selectedRom.flavor}` : "DeadZone ROM"}</RomBadge>
                                                        <StatusBadge stable={selectedRom.isStable} test={selectedRom.isTestBuild} />
                                                        {selectedRom.flashType && <RomBadge className="border-white/10 bg-white/[0.04] text-zinc-200">{selectedRom.flashType}</RomBadge>}
                                                    </div>
                                                    <h2 className="text-3xl font-black text-white md:text-5xl">DeadZone v{selectedRom.version}</h2>
                                                    <p className="mt-3 text-sm text-zinc-500">Released {new Date(selectedRom.releaseDate).toLocaleDateString()}</p>
                                                </div>
                                                {activeDownloadUrl ? (
                                                    <PremiumButton onClick={handleDownload} loading={isDownloading} icon={<Download className="h-5 w-5" />}>
                                                        Download Build
                                                    </PremiumButton>
                                                ) : (
                                                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                                                        No server link
                                                    </div>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                                                <div>
                                                    <h4 className="mb-4 flex items-center gap-2 font-black text-white">
                                                        <History className="h-5 w-5 text-cyan-300" /> Changelog
                                                    </h4>
                                                    <div className="min-h-[220px] rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-sm leading-7 text-zinc-300 whitespace-pre-line">
                                                        {selectedRom.changelog || "No changelog provided for this release."}
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="mb-4 flex items-center gap-2 font-black text-white">
                                                        <Terminal className="h-5 w-5 text-cyan-300" /> Build Information
                                                    </h4>
                                                    <div className="space-y-3">
                                                        <InfoRow label="Android" value={selectedRom.androidVersion} />
                                                        <InfoRow label="Platform" value={selectedRom.platform || platformLabel(device, selectedRom)} />
                                                        <InfoRow label="SoC" value={selectedRom.soc || device.chipset} />
                                                        <InfoRow label="File size" value={selectedRom.fileSize} />
                                                        <InfoRow label="Type" value={selectedRom.type} />
                                                    </div>
                                                </div>
                                            </div>
                                        </GlassCard>

                                        <GlassCard accent="blue" className="p-6 md:p-8">
                                            <h3 className="mb-6 flex items-center gap-3 text-2xl font-black text-white">
                                                <LinkIcon className="h-6 w-6 text-cyan-300" /> Release Links
                                            </h3>
                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                {selectedRom.pixeldrainUrl && (
                                                    <a href={selectedRom.pixeldrainUrl} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-cyan-300/35">
                                                        <Download className="mb-4 h-6 w-6 text-cyan-300" />
                                                        <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">PixelDrain</p>
                                                        <p className="mt-2 break-all text-sm font-bold text-white">{selectedRom.pixeldrainUrl}</p>
                                                    </a>
                                                )}
                                                {selectedRom.githubRunUrl && (
                                                    <a href={selectedRom.githubRunUrl} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-cyan-300/35">
                                                        <Github className="mb-4 h-6 w-6 text-cyan-300" />
                                                        <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">GitHub Release</p>
                                                        <p className="mt-2 break-all text-sm font-bold text-white">{selectedRom.githubRunUrl}</p>
                                                    </a>
                                                )}
                                                {selectedRom.downloadUrl && selectedRom.downloadUrl !== selectedRom.pixeldrainUrl && selectedRom.downloadUrl !== selectedRom.githubRunUrl && (
                                                    <a href={selectedRom.downloadUrl} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-cyan-300/35">
                                                        <LinkIcon className="mb-4 h-6 w-6 text-cyan-300" />
                                                        <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">Backup Mirror</p>
                                                        <p className="mt-2 break-all text-sm font-bold text-white">{selectedRom.downloadUrl}</p>
                                                    </a>
                                                )}
                                            </div>
                                            {selectedRom.sha256 && (
                                                <div className="mt-4 rounded-2xl border border-white/10 bg-black/35 p-5">
                                                    <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                                                        <Fingerprint className="h-4 w-4 text-cyan-300" /> SHA-256
                                                    </div>
                                                    <p className="break-all font-mono text-xs leading-6 text-zinc-300">{selectedRom.sha256}</p>
                                                </div>
                                            )}
                                        </GlassCard>

                                        <GlassCard accent="purple" className="p-6 md:p-8">
                                            <h3 className="mb-6 flex items-center gap-3 text-2xl font-black text-white">
                                                <Info className="h-6 w-6 text-cyan-300" /> Installation Notes
                                            </h3>
                                            <div className="text-sm leading-8 text-zinc-300 whitespace-pre-line">
                                                {selectedRom.installationGuide || (
                                                    `1. Back up all important data.
2. Confirm this build matches ${device.name} (${device.codename}).
3. Unlock the bootloader and boot into the required flashing environment.
4. Flash the DeadZone package using the listed flash type.
5. Verify boot, then restore data only after the first setup is complete.`
                                                )}
                                            </div>
                                            <div className="mt-6 flex gap-3 rounded-2xl border border-red-400/20 bg-red-500/10 p-4">
                                                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-200" />
                                                <p className="text-sm leading-6 text-red-50/80">Flash at your own risk. Backup required. Unlocked bootloader required.</p>
                                            </div>
                                        </GlassCard>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        ) : (
                            <GlassCard accent={accent} className="p-8 text-center md:p-12">
                                <RomBadge accent="slate">Coming Soon</RomBadge>
                                <h3 className="mt-5 text-2xl font-black text-white">No Builds Registered</h3>
                                <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-zinc-500">
                                    DeadZone builds for this hardware are not published yet. Device information remains visible, and no fake PixelDrain, GitHub, or backup mirror links are shown.
                                </p>
                            </GlassCard>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
