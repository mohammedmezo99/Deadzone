"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { DeviceImage } from "@/components/device-image";
import { GlassCard, RomBadge, SectionHeader } from "@/components/ui/deadzone";
import { Build, Device, devices as staticDevices, mergeApiDevices, normalizeBuilds, romStyles } from "@/data/deadzone-registry";
import { cn } from "@/lib/utils";
import { AlertTriangle, Calendar, CheckCircle2, Download, Fingerprint, HardDriveDownload, Search, Server, Smartphone } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const filters = ["All", "Xiaomi", "Redmi", "POCO", "Pad", "MTK", "Snapdragon", "Stable", "Legend", "Gaming", "EPiC", "Available", "Coming Soon"] as const;
const servers = [
    { key: "pixeldrain", label: "PixelDrain" },
    { key: "github", label: "GitHub Release" },
    { key: "backup", label: "Backup Mirror" },
] as const;

type ServerKey = typeof servers[number]["key"];

function statusLabel(status: Device["status"]) {
    if (status === "available") return "Available";
    if (status === "testing") return "Testing";
    return "Coming Soon";
}

function statusAccent(status: Device["status"]) {
    if (status === "available") return "cyan";
    if (status === "testing") return "gold";
    return "slate";
}

function InfoRow({ label, value }: { label: string; value?: string | number }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">{label}</p>
            <p className="mt-1 break-words text-sm font-bold text-white">{value || "Not configured"}</p>
        </div>
    );
}

function buildServers(build: Build) {
    return servers.map((server) => ({ ...server, url: build.links?.[server.key] || "" }));
}

export default function DownloadPage() {
    const searchParams = useSearchParams();
    const requestedDevice = searchParams.get("device");
    const [query, setQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
    const [deviceList, setDeviceList] = useState<Device[]>(staticDevices);
    const [selectedCodename, setSelectedCodename] = useState(requestedDevice || staticDevices[0]?.codename || "");
    const [builds, setBuilds] = useState<Build[]>([]);
    const [loadingDevices, setLoadingDevices] = useState(true);
    const [loadingBuilds, setLoadingBuilds] = useState(false);
    const [selectedBuildId, setSelectedBuildId] = useState("");
    const [selectedServer, setSelectedServer] = useState<ServerKey>("pixeldrain");

    useEffect(() => {
        async function loadDevices() {
            try {
                const response = await fetch("/api/devices");
                const data = await response.json();
                if (Array.isArray(data)) setDeviceList(mergeApiDevices(data));
            } catch (error) {
                console.error("Device registry fetch failed:", error);
            } finally {
                setLoadingDevices(false);
            }
        }
        loadDevices();
    }, []);

    useEffect(() => {
        if (requestedDevice) setSelectedCodename(requestedDevice);
    }, [requestedDevice]);

    useEffect(() => {
        if (!selectedCodename) return;

        async function loadBuilds() {
            setLoadingBuilds(true);
            try {
                const response = await fetch(`/api/devices/${selectedCodename}`);
                const data = await response.json();
                const normalized = normalizeBuilds(Array.isArray(data?.roms) ? data.roms : [], selectedCodename);
                setBuilds(normalized);
                setSelectedBuildId(normalized[0]?.id || "");
                const firstServer = normalized[0] ? buildServers(normalized[0]).find((server) => server.url)?.key : "pixeldrain";
                setSelectedServer(firstServer || "pixeldrain");
            } catch (error) {
                console.error("Build registry fetch failed:", error);
                setBuilds([]);
                setSelectedBuildId("");
            } finally {
                setLoadingBuilds(false);
            }
        }

        loadBuilds();
    }, [selectedCodename]);

    const filteredDevices = useMemo(() => {
        const needle = query.trim().toLowerCase();
        return deviceList.filter((device) => {
            const textMatch = !needle || [device.codename, device.name, device.soc, device.brand, device.platform || ""].some((field) => field.toLowerCase().includes(needle));
            const filterMatch =
                activeFilter === "All" ||
                device.brand === activeFilter ||
                device.soc === activeFilter ||
                device.styles.includes(activeFilter as any) ||
                (activeFilter === "Available" && device.status === "available") ||
                (activeFilter === "Coming Soon" && device.status === "coming-soon");
            return textMatch && filterMatch;
        });
    }, [activeFilter, deviceList, query]);

    const selectedDevice = deviceList.find((device) => device.codename === selectedCodename) || filteredDevices[0] || deviceList[0];
    const selectedBuild = builds.find((build) => build.id === selectedBuildId) || builds[0];
    const availableServers = selectedBuild ? buildServers(selectedBuild) : [];

    return (
        <main className="relative min-h-screen">
            <Starfield />
            <Navbar />

            <section className="px-6 pb-20 pt-36">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader eyebrow="Download Center" title={<>Real device and <span className="text-gradient">build selector</span>.</>} description="Search by codename, device name, or SoC. Mirrors stay disabled until a real ROM record provides a URL." align="center" />

                    <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_auto]">
                        <div className="relative">
                            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-600" />
                            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search codename, device name, SoC, or platform..." className="min-h-14 w-full rounded-2xl border border-white/10 bg-white/[0.05] py-4 pl-14 pr-5 text-white outline-none focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-500/20" />
                        </div>
                        <div className="flex max-w-full gap-2 overflow-x-auto pb-2 custom-scrollbar">
                            {filters.map((filter) => (
                                <button key={filter} onClick={() => setActiveFilter(filter)} className={cn("min-h-14 shrink-0 rounded-2xl px-5 text-xs font-black uppercase tracking-[0.14em] transition-colors", activeFilter === filter ? "bg-cyan-400 text-slate-950" : "border border-white/10 bg-white/[0.04] text-zinc-400 hover:text-white")}>{filter}</button>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
                            {loadingDevices ? Array.from({ length: 6 }).map((_, index) => <GlassCard key={index} accent="slate" className="h-[390px] animate-pulse p-5" />) : filteredDevices.map((device) => (
                                <button key={device.codename} onClick={() => setSelectedCodename(device.codename)} className="group h-full text-left">
                                    <GlassCard accent={device.soc === "MTK" ? "purple" : "blue"} className={cn("h-full p-5 transition-all", selectedDevice?.codename === device.codename && "border-cyan-300/55")}>
                                        <DeviceImage codename={device.codename} name={device.name} src={device.image} alt={device.imageAlt} soc={device.soc} />
                                        <div className="mt-5 flex items-start justify-between gap-4">
                                            <div>
                                                <h3 className="text-lg font-black text-white">{device.name}</h3>
                                                <p className="mt-2 font-mono text-xs uppercase tracking-[0.24em] text-zinc-500">{device.codename}</p>
                                            </div>
                                            <RomBadge accent={statusAccent(device.status) as any}>{statusLabel(device.status)}</RomBadge>
                                        </div>
                                        <div className="mt-5 grid grid-cols-2 gap-3">
                                            <InfoRow label="SoC" value={device.soc} />
                                            <InfoRow label="Platform" value={device.platform || "HyperOS 3"} />
                                        </div>
                                        <div className="mt-5 flex flex-wrap gap-2">
                                            {device.styles.map((style) => <RomBadge key={style} accent={style === "Legend" ? "gold" : style === "Gaming" ? "magenta" : style === "EPiC" ? "purple" : "cyan"}>{style}</RomBadge>)}
                                        </div>
                                    </GlassCard>
                                </button>
                            ))}
                        </div>

                        <aside className="xl:sticky xl:top-28 xl:self-start">
                            <GlassCard accent={selectedDevice?.soc === "MTK" ? "purple" : "blue"} className="p-6">
                                <div className="mb-6 flex items-start justify-between gap-4">
                                    <div>
                                        <RomBadge accent="red">Device Info</RomBadge>
                                        <h2 className="mt-4 text-2xl font-black text-white">{selectedDevice?.name || "Select device"}</h2>
                                        <p className="mt-2 font-mono text-xs uppercase tracking-[0.24em] text-zinc-500">{selectedDevice?.codename || "codename"}</p>
                                    </div>
                                    <Smartphone className="h-8 w-8 text-cyan-200" />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <InfoRow label="Codename" value={selectedDevice?.codename} />
                                    <InfoRow label="SoC" value={selectedDevice?.soc} />
                                    <InfoRow label="ROM Base" value="Global ROM base / CN features" />
                                    <InfoRow label="Platform" value={selectedDevice?.platform || "HyperOS 3"} />
                                    <InfoRow label="Android" value={selectedDevice?.android || selectedBuild?.android} />
                                    <InfoRow label="Status" value={selectedDevice ? statusLabel(selectedDevice.status) : ""} />
                                </div>

                                <div className="mt-6">
                                    <h3 className="mb-3 flex items-center gap-2 text-sm font-black text-white"><HardDriveDownload className="h-5 w-5 text-cyan-300" /> Build list</h3>
                                    {loadingBuilds ? (
                                        <div className="h-28 animate-pulse rounded-2xl bg-white/[0.05]" />
                                    ) : builds.length ? (
                                        <div className="space-y-3">
                                            {builds.map((build) => (
                                                <button key={build.id || `${build.codename}-${build.version}`} onClick={() => setSelectedBuildId(build.id || "")} className={cn("w-full rounded-2xl border p-4 text-left transition-colors", selectedBuild === build ? "border-cyan-300/40 bg-cyan-400/10" : "border-white/10 bg-white/[0.04] hover:bg-white/[0.07]")}>
                                                    <div className="flex items-center justify-between gap-3">
                                                        <RomBadge accent={build.style === "Legend" ? "gold" : build.style === "Gaming" ? "magenta" : build.style === "EPiC" ? "purple" : "cyan"}>{build.style}</RomBadge>
                                                        {build.buildDate && <span className="flex items-center gap-1 text-xs text-zinc-500"><Calendar className="h-3 w-3" /> {new Date(build.buildDate).toLocaleDateString()}</span>}
                                                    </div>
                                                    <p className="mt-3 text-lg font-black text-white">v{build.version}</p>
                                                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-zinc-400">{build.changelog || "No changelog provided for this registered build."}</p>
                                                    {build.checksum && <p className="mt-3 flex items-center gap-2 break-all font-mono text-[11px] text-zinc-500"><Fingerprint className="h-4 w-4" /> {build.checksum}</p>}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm leading-7 text-zinc-400">
                                            No ROM is registered for this codename yet.
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6">
                                    <h3 className="mb-3 flex items-center gap-2 text-sm font-black text-white"><Server className="h-5 w-5 text-cyan-300" /> Download server</h3>
                                    <div className="grid gap-2">
                                        {servers.map((server) => {
                                            const available = Boolean(availableServers.find((item) => item.key === server.key)?.url);
                                            return <button key={server.key} disabled={!available} onClick={() => setSelectedServer(server.key)} className={cn("min-h-12 rounded-2xl border px-4 text-left text-xs font-black uppercase tracking-[0.14em] disabled:cursor-not-allowed", available && selectedServer === server.key ? "border-cyan-300/40 bg-cyan-400/12 text-white" : "border-white/10 bg-white/[0.04] text-zinc-500", available && selectedServer !== server.key && "hover:text-white")}>{server.label} {!available && "/ not configured"}</button>;
                                        })}
                                    </div>
                                </div>

                                {selectedBuild && availableServers.find((server) => server.key === selectedServer)?.url ? (
                                    <a href={availableServers.find((server) => server.key === selectedServer)?.url} target="_blank" rel="noopener noreferrer" className="mt-6 flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-5 text-xs font-black uppercase tracking-[0.16em] text-slate-950">
                                        <Download className="h-4 w-4" /> Open Real Mirror
                                    </a>
                                ) : (
                                    <div className="mt-6 flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                                        <AlertTriangle className="h-4 w-4" /> No configured mirror
                                    </div>
                                )}
                                {selectedDevice && <Link href={`/download/${selectedDevice.codename}`} className="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 text-xs font-black uppercase tracking-[0.16em] text-white"><CheckCircle2 className="h-4 w-4" /> Full Detail Page</Link>}
                            </GlassCard>
                        </aside>
                    </div>

                    {!loadingDevices && filteredDevices.length === 0 && (
                        <GlassCard accent="slate" className="mt-8 p-10 text-center">
                            <h3 className="text-xl font-black text-white">No matching device</h3>
                            <p className="mt-2 text-sm text-zinc-500">Try a different codename, model name, brand, SoC, style, or status filter.</p>
                        </GlassCard>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
