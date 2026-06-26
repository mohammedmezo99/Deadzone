"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { DeviceImage } from "@/components/device-image";
import { GlassCard, RomBadge, SectionHeader } from "@/components/ui/deadzone";
import { Device, deviceCounts, devices as staticDevices, mergeApiDevices } from "@/data/deadzone-registry";
import { cn } from "@/lib/utils";
import { Cpu, Database, Search } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const filters = ["All", "MTK", "Snapdragon", "Xiaomi", "Redmi", "POCO", "Pad", "Stable", "Legend", "Gaming", "EPiC", "Available", "Coming Soon"] as const;

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

export default function DevicesPage() {
    const searchParams = useSearchParams();
    const initialSoc = searchParams.get("soc");
    const [query, setQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>(initialSoc === "MTK" || initialSoc === "Snapdragon" ? initialSoc : "All");
    const [rows, setRows] = useState<Device[]>(staticDevices);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadDevices() {
            try {
                const response = await fetch("/api/devices");
                const data = await response.json();
                if (Array.isArray(data)) setRows(mergeApiDevices(data));
            } catch (error) {
                console.error("Device matrix fetch failed:", error);
            } finally {
                setLoading(false);
            }
        }
        loadDevices();
    }, []);

    const counts = deviceCounts(rows);

    const filtered = useMemo(() => {
        const needle = query.trim().toLowerCase();
        return rows.filter((device) => {
            const matchesSearch = !needle || [device.codename, device.name, device.brand, device.soc, device.platform || ""].some((field) => field.toLowerCase().includes(needle));
            const matchesFilter =
                activeFilter === "All" ||
                device.soc === activeFilter ||
                device.brand === activeFilter ||
                device.styles.includes(activeFilter as any) ||
                (activeFilter === "Available" && device.status === "available") ||
                (activeFilter === "Coming Soon" && device.status === "coming-soon");
            return matchesSearch && matchesFilter;
        });
    }, [activeFilter, query, rows]);

    return (
        <main className="relative min-h-screen">
            <Starfield />
            <Navbar />

            <section className="px-6 pb-20 pt-36">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader eyebrow="Supported Devices" title={<>Full DeadZone <span className="text-gradient">device matrix</span>.</>} description="A complete searchable registry for MTK and Snapdragon targets. Availability follows registered ROM records." align="center" />

                    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                        <GlassCard accent="purple" className="p-5"><p className="text-4xl font-black text-white">{counts.mtk}</p><p className="mt-2 text-xs font-black uppercase tracking-[0.22em] text-purple-200">MTK Count</p></GlassCard>
                        <GlassCard accent="blue" className="p-5"><p className="text-4xl font-black text-white">{counts.snapdragon}</p><p className="mt-2 text-xs font-black uppercase tracking-[0.22em] text-blue-200">Snapdragon Count</p></GlassCard>
                        <GlassCard accent="cyan" className="p-5"><p className="text-4xl font-black text-white">{counts.total}</p><p className="mt-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Total Count</p></GlassCard>
                    </div>

                    <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_auto]">
                        <div className="relative">
                            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-600" />
                            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search codename, marketing name, brand, or SoC..." className="min-h-14 w-full rounded-2xl border border-white/10 bg-white/[0.05] py-4 pl-14 pr-5 text-white outline-none focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-500/20" />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                            {filters.map((filter) => <button key={filter} onClick={() => setActiveFilter(filter)} className={cn("min-h-14 shrink-0 rounded-2xl px-5 text-xs font-black uppercase tracking-[0.14em]", activeFilter === filter ? "bg-cyan-400 text-slate-950" : "border border-white/10 bg-white/[0.04] text-zinc-400 hover:text-white")}>{filter}</button>)}
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {Array.from({ length: 9 }).map((_, index) => <GlassCard key={index} accent="slate" className="h-[340px] animate-pulse p-5" />)}
                        </div>
                    ) : filtered.length ? (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {filtered.map((device) => (
                                <GlassCard key={device.codename} accent={device.soc === "MTK" ? "purple" : "blue"} className="p-5">
                                    <DeviceImage codename={device.codename} name={device.name} src={device.image} alt={device.imageAlt} soc={device.soc} className="mb-5" />
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h3 className="text-lg font-black text-white">{device.name}</h3>
                                            <p className="mt-2 font-mono text-xs uppercase tracking-[0.24em] text-zinc-500">{device.codename}</p>
                                        </div>
                                        <RomBadge accent={statusAccent(device.status) as any}>{statusLabel(device.status)}</RomBadge>
                                    </div>
                                    <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3"><p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">SoC</p><p className="mt-1 font-bold text-white">{device.soc}</p></div>
                                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3"><p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Brand</p><p className="mt-1 font-bold text-white">{device.brand}</p></div>
                                        <div className="col-span-2 rounded-2xl border border-white/10 bg-white/[0.04] p-3"><p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Platform</p><p className="mt-1 font-bold text-white">{device.platform || "HyperOS 3"}</p></div>
                                    </div>
                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {device.styles.map((style) => <RomBadge key={style} accent={style === "Legend" ? "gold" : style === "Gaming" ? "magenta" : style === "EPiC" ? "purple" : "cyan"}>{style}</RomBadge>)}
                                    </div>
                                    <Link href={`/download?device=${device.codename}`} className="mt-5 flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-4 text-xs font-black uppercase tracking-[0.16em] text-slate-950">
                                        <Cpu className="h-4 w-4" /> Open Downloads
                                    </Link>
                                </GlassCard>
                            ))}
                        </div>
                    ) : (
                        <GlassCard accent="slate" className="p-10 text-center">
                            <Database className="mx-auto mb-4 h-10 w-10 text-zinc-500" />
                            <h3 className="text-xl font-black text-white">No devices match this view</h3>
                            <p className="mt-2 text-sm text-zinc-500">Adjust the search or filter. The matrix never renders blank.</p>
                        </GlassCard>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
