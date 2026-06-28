"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Check,
    Copy,
    FileText,
    ShieldAlert,
    Smartphone,
} from "lucide-react";
import { DeviceImage } from "@/components/device-image";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Starfield } from "@/components/starfield";
import { PremiumButton } from "@/components/ui/premium-button";
import { GlassCard, RomBadge, SectionHeader } from "@/components/ui/deadzone";
import { deriveHyperOsVersion, hasPublishedFile } from "@/lib/builds";
import { officialLinks } from "@/lib/links";
import type { BuildItem } from "@/types";
import type { SupportedDevice } from "@/data/supported-devices";

const requestTelegramLink = "https://t.me/xDeadZoneh";

function styleAccent(style: BuildItem["style"] | SupportedDevice["supportedStyles"][number]) {
    if (style === "Lite") return "cyan";
    if (style === "GamingPlus") return "blue";
    if (style === "Legend") return "gold";
    return "magenta";
}

function statusAccent(status: BuildItem["status"] | SupportedDevice["status"]) {
    if (status === "Available" || status === "Active") return "cyan";
    if (status === "Coming Soon" || status === "Supported") return "blue";
    if (status === "Processing Metadata" || status === "Metadata Incomplete" || status === "ROM Link Available") return "magenta";
    if (status === "Upload Pending" || status === "Building") return "gold";
    return "red";
}

function getStyleTitle(style: BuildItem["style"]) {
    return style === "Lite" ? "DeadZone Lite Builds" : `DeadZone ${style} Builds`;
}

function getResolvedHyperOsVersion(build: BuildItem) {
    return build.hyperOsVersion || deriveHyperOsVersion(build.romVersion) || "";
}

export function DownloadDeviceDetailClient({
    device,
    builds,
    deadZoneVersion,
}: {
    device: SupportedDevice | null;
    builds: BuildItem[];
    deadZoneVersion: string;
}) {
    const [copiedValue, setCopiedValue] = useState("");

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

    if (!device) {
        return (
            <main className="page-shell">
                <Starfield />
                <Navbar />

                <section className="px-6 pb-20 pt-36">
                    <div className="mx-auto max-w-4xl">
                        <GlassCard accent="slate" className="p-10 text-center">
                            <ShieldAlert className="mx-auto mb-4 h-10 w-10 text-zinc-500" />
                            <h1 className="text-3xl font-black text-white">Device not found.</h1>
                            <p className="mt-3 text-sm leading-7 text-zinc-400">
                                The requested codename is not in the current DeadZone supported-device source of truth.
                            </p>
                            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                                <PremiumButton href="/downloads" icon={<ArrowLeft className="h-4 w-4" />} className="text-xs">
                                    Back to Download Center
                                </PremiumButton>
                                <PremiumButton href="/devices" variant="secondary" icon={<Smartphone className="h-4 w-4" />} className="text-xs">
                                    View Supported Devices
                                </PremiumButton>
                                <PremiumButton href={officialLinks.contactMezo} external variant="secondary" icon={<Smartphone className="h-4 w-4" />} className="text-xs">
                                    Contact MEZO
                                </PremiumButton>
                            </div>
                        </GlassCard>
                    </div>
                </section>

                <Footer />
            </main>
        );
    }

    const command = `/mezo ${device.codename}`;
    const hasAnyBuilds = builds.length > 0;
    const completeBuilds = builds.filter(hasPublishedFile);
    const incompleteBuilds = builds.filter((build) => !hasPublishedFile(build));
    const groupedIncompleteBuilds = incompleteBuilds.reduce<Record<string, BuildItem[]>>((groups, build) => {
        if (!groups[build.style]) {
            groups[build.style] = [];
        }
        groups[build.style].push(build);
        return groups;
    }, {});

    return (
        <main className="page-shell">
            <Starfield />
            <Navbar />

            <section className="px-6 pb-20 pt-36">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        eyebrow="Device Detail"
                        title={device.name}
                        description={`Codename ${device.codename}. Review DeadZone build status, supported styles, and request options for this device.`}
                    />

                    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                        <GlassCard accent="cyan" className="p-5 md:p-6">
                            <DeviceImage
                                codename={device.codename}
                                name={device.name}
                                src={device.image || undefined}
                                alt={`${device.name} device image`}
                                className="min-h-[320px] border-cyan-300/15 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_48%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))]"
                                imageClassName="p-8"
                                priority
                            />
                        </GlassCard>

                        <GlassCard accent="blue" className="p-6 md:p-8">
                            <div className="flex flex-wrap items-center gap-3">
                                <RomBadge accent={statusAccent(device.status)}>{device.status}</RomBadge>
                                <RomBadge accent="blue">{device.category}</RomBadge>
                                <RomBadge accent={device.chipset === "MediaTek" ? "magenta" : device.chipset === "Snapdragon" ? "cyan" : "slate"}>
                                    {device.chipset}
                                </RomBadge>
                            </div>

                            <h1 className="mt-5 text-3xl font-black text-white md:text-4xl">{device.name}</h1>
                            {device.aliases.length > 0 && (
                                <p className="mt-3 text-base text-zinc-300">{device.aliases.join(" / ")}</p>
                            )}

                            <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4">
                                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Codename</p>
                                    <p className="mt-2 font-mono text-sm uppercase tracking-[0.22em] text-white">{device.codename}</p>
                                </div>
                                <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4">
                                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Family</p>
                                    <p className="mt-2 text-sm font-bold text-white">{device.family}</p>
                                </div>
                            </div>

                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4">
                                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Category</p>
                                    <p className="mt-2 text-sm font-bold text-white">{device.category}</p>
                                </div>
                                <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4">
                                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Chipset</p>
                                    <p className="mt-2 text-sm font-bold text-white">{device.chipset}</p>
                                </div>
                            </div>

                            <div className="mt-4 rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4">
                                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">DeadZone Version</p>
                                <p className="mt-2 text-sm font-bold text-white">{deadZoneVersion}</p>
                            </div>

                            <div className="mt-5 flex flex-wrap gap-2">
                                {device.supportedStyles.map((style) => (
                                    <RomBadge key={`${device.codename}-${style}`} accent={styleAccent(style)}>
                                        {style}
                                    </RomBadge>
                                ))}
                            </div>

                            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                <button
                                    type="button"
                                    onClick={() => copyCommand(device.codename)}
                                    className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-4 text-xs font-black uppercase tracking-[0.16em] text-slate-950 transition hover:bg-cyan-300"
                                >
                                    {copiedValue === command ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    {copiedValue === command ? "Copied Command" : "Copy Command"}
                                </button>
                                <Link
                                    href="/contact"
                                    className="flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:border-cyan-300/30"
                                >
                                    Report Issue
                                </Link>
                                <a
                                    href={requestTelegramLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex min-h-12 items-center justify-center rounded-2xl border border-fuchsia-300/20 bg-fuchsia-400/10 px-4 text-xs font-black uppercase tracking-[0.16em] text-fuchsia-100 transition hover:border-fuchsia-300/40 hover:bg-fuchsia-400/16"
                                >
                                    Request on Telegram
                                </a>
                                <Link
                                    href="/downloads"
                                    className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:border-cyan-300/30"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to Download Center
                                </Link>
                            </div>
                        </GlassCard>
                    </div>

                    <div className="mt-10">
                        <SectionHeader
                            eyebrow="Build Catalog"
                            title="Available DeadZone Builds"
                            description="Review the current DeadZone build records for this device. File metadata and download actions only appear when a real public ROM file has been published."
                        />

                        {hasAnyBuilds ? (
                            <div className="space-y-6">
                                {completeBuilds.length > 0 && (
                                    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                                        {completeBuilds.map((build) => {
                                            const resolvedHyperOs = getResolvedHyperOsVersion(build);

                                            return (
                                                <GlassCard key={build.id} accent={styleAccent(build.style)} className="p-6">
                                                    <div className="flex flex-wrap items-center gap-3">
                                                        <RomBadge accent={styleAccent(build.style)}>{build.style}</RomBadge>
                                                        <RomBadge accent={statusAccent(build.status)}>{build.status}</RomBadge>
                                                    </div>

                                                    <div className="mt-5 grid grid-cols-2 gap-3 xl:grid-cols-3">
                                                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                                            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Android Version</p>
                                                            <p className="mt-1 text-sm font-bold text-white">{build.androidVersion || "Unknown"}</p>
                                                        </div>
                                                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                                            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">HyperOS Version</p>
                                                            <p className="mt-1 text-sm font-bold text-white">{resolvedHyperOs || "Not listed"}</p>
                                                        </div>
                                                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                                            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">ROM Version</p>
                                                            <p className="mt-1 text-sm font-bold text-white">{build.romVersion || "Not listed"}</p>
                                                        </div>
                                                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                                            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Region</p>
                                                            <p className="mt-1 text-sm font-bold text-white">{build.region || "Unknown"}</p>
                                                        </div>
                                                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                                            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">File Size</p>
                                                            <p className="mt-1 text-sm font-bold text-white">{build.fileSize}</p>
                                                        </div>
                                                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                                            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">DeadZone Version</p>
                                                            <p className="mt-1 text-sm font-bold text-white">{build.deadZoneVersion || deadZoneVersion}</p>
                                                        </div>
                                                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                                            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Build Date</p>
                                                            <p className="mt-1 text-sm font-bold text-white">{build.updatedAt ? new Date(build.updatedAt).toLocaleDateString("en-US") : "Unknown"}</p>
                                                        </div>
                                                    </div>

                                                    <div className="mt-4 space-y-3 rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4">
                                                        <div>
                                                            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Filename</p>
                                                            <p className="mt-1 break-all text-sm font-bold text-white">{build.filename}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">SHA256</p>
                                                            <p className="mt-1 break-all font-mono text-xs text-cyan-100">{build.sha256}</p>
                                                        </div>
                                                    </div>

                                                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                                                        <a
                                                            href={build.downloadUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-4 text-xs font-black uppercase tracking-[0.16em] text-slate-950 transition hover:bg-cyan-300"
                                                        >
                                                            Verified Download
                                                        </a>
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
                                                            <div className="hidden sm:block" />
                                                        )}
                                                        <button
                                                            type="button"
                                                            onClick={() => copyCommand(device.codename)}
                                                            className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:border-cyan-300/30"
                                                        >
                                                            {copiedValue === command ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                                            {copiedValue === command ? "Copied Command" : "Copy Command"}
                                                        </button>
                                                    </div>
                                                </GlassCard>
                                            );
                                        })}
                                    </div>
                                )}

                                {Object.entries(groupedIncompleteBuilds).map(([style, styleBuilds]) => (
                                    <GlassCard key={style} accent={styleAccent(style as BuildItem["style"])} className="p-6">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <RomBadge accent={styleAccent(style as BuildItem["style"])}>{style}</RomBadge>
                                            <h3 className="text-xl font-black text-white">{getStyleTitle(style as BuildItem["style"])}</h3>
                                        </div>

                                        <div className="mt-5 hidden rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500 md:grid md:grid-cols-[1.1fr_1.4fr_0.8fr_0.8fr_1fr_0.95fr] md:gap-3">
                                            <span>Region</span>
                                            <span>ROM Version</span>
                                            <span>Android</span>
                                            <span>HyperOS</span>
                                            <span>Status</span>
                                            <span>Action</span>
                                        </div>

                                        <div className="mt-3 space-y-3">
                                            {styleBuilds.map((build) => {
                                                const resolvedHyperOs = getResolvedHyperOsVersion(build);

                                                return (
                                                    <div
                                                        key={build.id}
                                                        className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4 md:grid md:grid-cols-[1.1fr_1.4fr_0.8fr_0.8fr_1fr_0.95fr] md:items-center md:gap-3"
                                                    >
                                                        <div className="md:hidden text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Region</div>
                                                        <p className="text-sm font-bold text-white">{build.region || "Unknown"}</p>

                                                        <div className="mt-3 md:mt-0">
                                                            <div className="md:hidden text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">ROM Version</div>
                                                            <p className="text-sm font-bold text-white">{build.romVersion || "Not listed"}</p>
                                                        </div>

                                                        <div className="mt-3 md:mt-0">
                                                            <div className="md:hidden text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Android</div>
                                                            <p className="text-sm font-bold text-white">{build.androidVersion || "Unknown"}</p>
                                                        </div>

                                                        <div className="mt-3 md:mt-0">
                                                            <div className="md:hidden text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">HyperOS</div>
                                                            <p className="text-sm font-bold text-white">{resolvedHyperOs || "Not listed"}</p>
                                                        </div>

                                                        <div className="mt-3 md:mt-0">
                                                            <div className="md:hidden text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Status</div>
                                                            <div className="space-y-1">
                                                                <RomBadge accent={statusAccent(build.status)}>{build.downloadUrl ? "ROM Link Available" : "Request Available"}</RomBadge>
                                                                {build.downloadUrl && <p className="text-xs text-zinc-400">Download link is available.</p>}
                                                            </div>
                                                        </div>

                                                        <div className="mt-4 flex gap-2 md:mt-0 md:flex-col">
                                                            {build.downloadUrl && (
                                                                <a
                                                                    href={build.downloadUrl}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="flex min-h-11 flex-1 items-center justify-center rounded-2xl bg-cyan-400 px-3 text-[11px] font-black uppercase tracking-[0.14em] text-slate-950 transition hover:bg-cyan-300"
                                                                >
                                                                    Open ROM Link
                                                                </a>
                                                            )}
                                                            <button
                                                                type="button"
                                                                onClick={() => copyCommand(device.codename)}
                                                                className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3 text-[11px] font-black uppercase tracking-[0.14em] text-white transition hover:border-cyan-300/30"
                                                            >
                                                                {copiedValue === command ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                                                {copiedValue === command ? "Copied" : "Copy Command"}
                                                            </button>
                                                            {!build.downloadUrl && (
                                                                <a
                                                                    href={requestTelegramLink}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="flex min-h-11 flex-1 items-center justify-center rounded-2xl border border-fuchsia-300/20 bg-fuchsia-400/10 px-3 text-[11px] font-black uppercase tracking-[0.14em] text-fuchsia-100 transition hover:border-fuchsia-300/40 hover:bg-fuchsia-400/16"
                                                                >
                                                                    Contact MEZO
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </GlassCard>
                                ))}

                                <GlassCard accent="slate" className="p-6">
                                    <h3 className="text-xl font-black text-white">Need help with this build?</h3>
                                    <p className="mt-3 text-sm text-zinc-300">
                                        Use the support links below for install guidance, template-based requests, or direct help from MEZO.
                                    </p>
                                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                                        <PremiumButton href={requestTelegramLink} external variant="secondary" icon={<Smartphone className="h-4 w-4" />} className="text-xs">
                                            Contact MEZO
                                        </PremiumButton>
                                        <PremiumButton href="/guide" variant="secondary" icon={<FileText className="h-4 w-4" />} className="text-xs">
                                            View Install Guide
                                        </PremiumButton>
                                        <PremiumButton href="/contact" variant="secondary" icon={<ShieldAlert className="h-4 w-4" />} className="text-xs">
                                            Support Template
                                        </PremiumButton>
                                    </div>
                                </GlassCard>
                            </div>
                        ) : (
                            <GlassCard accent="slate" className="p-10 text-center">
                                <Smartphone className="mx-auto mb-4 h-10 w-10 text-zinc-500" />
                                <h3 className="text-xl font-black text-white">No public ROM file is available yet.</h3>
                                <p className="mt-3 text-sm leading-7 text-zinc-400">
                                    This device is supported by DeadZone, but no public ROM file has been published on the website yet. You can request a build through Telegram.
                                </p>
                                <div className="mt-4 rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4">
                                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">DeadZone Version</p>
                                    <p className="mt-2 text-sm font-bold text-white">{deadZoneVersion}</p>
                                </div>
                                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                                    <button
                                        type="button"
                                        onClick={() => copyCommand(device.codename)}
                                        className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-4 text-xs font-black uppercase tracking-[0.16em] text-slate-950 transition hover:bg-cyan-300"
                                    >
                                        {copiedValue === command ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                        {copiedValue === command ? "Copied Command" : "Copy /mezo"}
                                    </button>
                                    <PremiumButton href={requestTelegramLink} external variant="secondary" icon={<Smartphone className="h-4 w-4" />} className="text-xs">
                                        Request on Telegram
                                    </PremiumButton>
                                    <PremiumButton href="/guide" variant="secondary" icon={<FileText className="h-4 w-4" />} className="text-xs">
                                        View Install Guide
                                    </PremiumButton>
                                </div>
                            </GlassCard>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
