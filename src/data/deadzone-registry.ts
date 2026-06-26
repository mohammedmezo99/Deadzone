import { allDevices as legacyDevices } from "./deadzone-devices";

export type RomStyle = "Stable" | "Legend" | "Gaming" | "EPiC";
export type DeviceStatus = "available" | "coming-soon" | "testing";
export type DeviceSoc = "MTK" | "Snapdragon";
export type GalleryCategory = "Interface" | "System" | "Performance" | "Tools" | "Install";

export type Device = {
    codename: string;
    name: string;
    brand: "Xiaomi" | "Redmi" | "POCO" | "Pad" | string;
    soc: DeviceSoc;
    platform?: string;
    android?: string;
    image?: string;
    imageAlt?: string;
    status: DeviceStatus;
    styles: RomStyle[];
};

export type Build = {
    id?: string;
    codename: string;
    style: RomStyle;
    version: string;
    buildDate?: string;
    base?: string;
    platform?: string;
    android?: string;
    changelog?: string;
    changelogUrl?: string;
    checksum?: string;
    fileSize?: string;
    links?: {
        pixeldrain?: string;
        github?: string;
        backup?: string;
    };
};

export type GalleryItem = {
    title: string;
    category: GalleryCategory;
    image: string;
    description?: string;
};

export const romStyles: RomStyle[] = ["Stable", "Legend", "Gaming", "EPiC"];

export const siteLinks = {
    telegram: "/community",
    community: "/community",
    github: "https://github.com/DeadZon/DeadZone_web",
    pixeldrainArchive: "",
};

function normalizeStyle(value?: string | null): RomStyle {
    const raw = String(value || "Stable").toLowerCase();
    if (raw.includes("legend") || raw.includes("vip") || raw.includes("premium")) return "Legend";
    if (raw.includes("gaming")) return "Gaming";
    if (raw.includes("epic")) return "EPiC";
    return "Stable";
}

function normalizeStatus(status?: string): DeviceStatus {
    const raw = String(status || "").toLowerCase();
    if (raw.includes("test")) return "testing";
    if (raw.includes("coming") || raw.includes("inactive")) return "coming-soon";
    return "coming-soon";
}

export const devices: Device[] = legacyDevices.map((device) => ({
    codename: device.codename,
    name: device.name,
    brand: device.brand,
    soc: device.soc,
    platform: device.platform,
    image: device.image,
    imageAlt: device.imageAlt,
    status: normalizeStatus(device.status),
    styles: ["Stable"],
}));

export const builds: Build[] = [];

export const galleryItems: GalleryItem[] = [];

export function deviceCounts(source: Device[] = devices) {
    return {
        mtk: source.filter((device) => device.soc === "MTK").length,
        snapdragon: source.filter((device) => device.soc === "Snapdragon").length,
        total: source.length,
        legendReady: source.filter((device) => device.styles.includes("Legend") && device.status === "available").length,
    };
}

export function mergeApiDevice(apiDevice: any): Device {
    const fallback = devices.find((device) => device.codename === apiDevice?.codename);
    const roms = Array.isArray(apiDevice?.roms) ? apiDevice.roms : [];
    const styles = Array.from(new Set(roms.map((rom: any) => normalizeStyle(rom.flavor || rom.type)))) as RomStyle[];

    return {
        codename: apiDevice?.codename || fallback?.codename || "",
        name: apiDevice?.name || fallback?.name || "Unknown device",
        brand: apiDevice?.brand || fallback?.brand || "Xiaomi",
        soc: fallback?.soc || (String(apiDevice?.chipset || "").toLowerCase().includes("mtk") ? "MTK" : "Snapdragon"),
        platform: apiDevice?.platform || fallback?.platform || "HyperOS 3 / Global ROM Base / CN features",
        android: apiDevice?.androidVersion || fallback?.android,
        image: apiDevice?.image || fallback?.image,
        imageAlt: fallback?.imageAlt || `${apiDevice?.name || fallback?.name || "DeadZone"} device image`,
        status: roms.length > 0 ? "available" : normalizeStatus(apiDevice?.status || fallback?.status),
        styles: styles.length ? styles : fallback?.styles || ["Stable"],
    };
}

export function mergeApiDevices(apiDevices: any[]): Device[] {
    const apiByCodename = new Map(apiDevices.map((device) => [device.codename, mergeApiDevice(device)]));
    const merged = devices.map((device) => apiByCodename.get(device.codename) || device);

    Array.from(apiByCodename.values()).forEach((device) => {
        if (!merged.some((item) => item.codename === device.codename)) merged.push(device);
    });

    return merged.sort((a, b) => a.codename.localeCompare(b.codename));
}

export function normalizeBuild(rom: any, codename: string): Build {
    const pixeldrain = rom?.pixeldrainUrl || undefined;
    const github = rom?.githubRunUrl || undefined;
    const backup = rom?.downloadUrl && rom.downloadUrl !== pixeldrain && rom.downloadUrl !== github ? rom.downloadUrl : undefined;

    return {
        id: rom?.id,
        codename,
        style: normalizeStyle(rom?.flavor || rom?.type),
        version: rom?.version || "Unversioned",
        buildDate: rom?.releaseDate,
        base: rom?.name,
        platform: rom?.platform,
        android: rom?.androidVersion,
        changelog: rom?.changelog,
        checksum: rom?.sha256,
        fileSize: rom?.fileSize,
        links: {
            pixeldrain,
            github,
            backup,
        },
    };
}

export function normalizeBuilds(roms: any[] = [], codename: string): Build[] {
    return roms.map((rom) => normalizeBuild(rom, codename));
}
