import { allDevices as sourceDevices } from "./deadzone-devices";

export type RomStyle = "Lite" | "GamingPlus" | "Legend" | "Ninja";
export type DeviceStatus = "supported" | "coming-soon";
export type DeviceCategory =
    | "Xiaomi Series"
    | "Xiaomi MIX / Fold / Flip Series"
    | "Redmi K / Turbo Series"
    | "Redmi Note Series"
    | "Redmi Number Series"
    | "POCO F Series"
    | "POCO X Series"
    | "POCO M / C Series"
    | "Xiaomi Pad / Redmi Pad / POCO Pad";

export type Device = {
    codename: string;
    name: string;
    brand: string;
    soc: "MTK" | "Snapdragon";
    platform?: string;
    android?: string;
    image?: string;
    imageAlt?: string;
    status: DeviceStatus;
    category: DeviceCategory;
    styles: RomStyle[];
};

export type PublicBuild = {
    id: string;
    device: string;
    codename: string;
    rom: string;
    region?: string;
    android?: string;
    filename?: string;
    download?: string;
    updated_at?: string;
};

export const publicStyle: RomStyle = "Lite";
export const premiumStyles: RomStyle[] = ["GamingPlus", "Legend", "Ninja"];
export const romStyles: RomStyle[] = ["Lite", "GamingPlus", "Legend", "Ninja"];

export const officialLinks = {
    contact: "https://t.me/MohamedMezo1",
    discussion: "https://t.me/DeadZoneDiscussion",
    updates: "https://t.me/xDeadZone",
    screenshots: "https://t.me/DeadZoneCloud",
    supportedDevices: "https://t.me/DeadZoneDiscussion/2851",
    groupRules: "https://t.me/DeadZoneDiscussion/2849",
};

export const siteLinks = {
    home: "/",
    downloads: "/downloads",
    devices: "/devices",
    styles: "/styles",
    premium: "/premium",
    community: "/community",
    contact: "/contact",
};

function getCategory(name: string): DeviceCategory {
    const lower = name.toLowerCase();

    if (lower.includes("pad")) return "Xiaomi Pad / Redmi Pad / POCO Pad";
    if (lower.includes("mix") || lower.includes("fold") || lower.includes("flip")) return "Xiaomi MIX / Fold / Flip Series";
    if (lower.includes("poco f")) return "POCO F Series";
    if (lower.includes("poco x")) return "POCO X Series";
    if (lower.includes("poco m") || lower.includes("poco c")) return "POCO M / C Series";
    if (lower.includes("redmi note")) return "Redmi Note Series";
    if (lower.includes("redmi k") || lower.includes("redmi turbo")) return "Redmi K / Turbo Series";
    if (lower.includes("redmi ")) return "Redmi Number Series";

    return "Xiaomi Series";
}

export const devices: Device[] = sourceDevices.map((device) => ({
    codename: device.codename,
    name: device.name,
    brand: device.brand,
    soc: device.soc,
    platform: "HyperOS",
    android: "Android 15",
    image: device.image,
    imageAlt: device.imageAlt,
    status: device.status === "supported" ? "supported" : "coming-soon",
    category: getCategory(device.name),
    styles: ["Lite", "GamingPlus", "Legend", "Ninja"],
}));

export const publicBuilds: PublicBuild[] = [];

export function deviceCounts(source: Device[] = devices) {
    return {
        mtk: source.filter((device) => device.soc === "MTK").length,
        snapdragon: source.filter((device) => device.soc === "Snapdragon").length,
        total: source.length,
        supported: source.filter((device) => device.status === "supported").length,
    };
}

export function findDevice(codename: string) {
    return devices.find((device) => device.codename === codename);
}

export function normalizeBuildRecord(input: any): PublicBuild {
    return {
        id: String(input?.id || input?.codename || input?.device_codename || input?.filename || crypto.randomUUID?.() || Math.random()),
        device: String(input?.device || input?.device_name || "Unknown device"),
        codename: String(input?.codename || input?.device_codename || "").toLowerCase(),
        rom: String(input?.rom || input?.rom_version || "DeadZone Lite"),
        region: input?.region || undefined,
        android: input?.android || undefined,
        filename: input?.filename || input?.final_zip || undefined,
        download: input?.download || input?.drive_link || undefined,
        updated_at: input?.updated_at || undefined,
    };
}

export function normalizeWorkerBuilds(input: any): PublicBuild[] {
    if (!Array.isArray(input)) return [];
    return input.map(normalizeBuildRecord);
}
