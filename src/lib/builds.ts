import type { BuildItem } from "@/types";

export const publicBuilds: BuildItem[] = [
    {
        id: "zircon-lite-hyperos3-available",
        deviceName: "Redmi Note 13 Pro+ 5G",
        codename: "zircon",
        romVersion: "DeadZone v3.2",
        androidVersion: "Android 15",
        hyperOsVersion: "HyperOS 3.0",
        filename: "DeadZone-zircon-Lite-v3.2.zip",
        downloadUrl: "https://t.me/xDeadZone",
        changelogUrl: "https://t.me/xDeadZone",
        sha256: "4f4a6f9c69b0cf6a951f4e7292fc25e6b38a1b4d1ea70a3f5f6e97a7ab12c9d4",
        updatedAt: "2026-06-20T00:00:00.000Z",
        style: "Lite",
        status: "Available",
    },
    {
        id: "zircon-gamingplus-queue",
        deviceName: "Redmi Note 13 Pro+ 5G",
        codename: "zircon",
        romVersion: "DeadZone v3.2",
        androidVersion: "Android 15",
        hyperOsVersion: "HyperOS 3.0",
        updatedAt: "2026-06-24T00:00:00.000Z",
        style: "GamingPlus",
        status: "Building",
    },
    {
        id: "venus-legend-soon",
        deviceName: "Xiaomi 11",
        codename: "venus",
        romVersion: "DeadZone v3.1",
        androidVersion: "Android 14",
        hyperOsVersion: "HyperOS 2.0",
        updatedAt: "2026-06-18T00:00:00.000Z",
        style: "Legend",
        status: "Coming Soon",
    },
    {
        id: "venus-ninja-failed",
        deviceName: "Xiaomi 11",
        codename: "venus",
        romVersion: "DeadZone v3.1",
        androidVersion: "Android 14",
        hyperOsVersion: "HyperOS 2.0",
        updatedAt: "2026-06-12T00:00:00.000Z",
        style: "Ninja",
        status: "Failed",
    },
];

const validStyles: BuildItem["style"][] = ["Lite", "GamingPlus", "Legend", "Ninja"];
const validStatuses: BuildItem["status"][] = ["Available", "Coming Soon", "Building", "Failed"];

export type PublicBuildsResponse = {
    ok: boolean;
    builds: BuildItem[];
};

function normalizeStyle(input: unknown): BuildItem["style"] {
    const value = String(input || "").trim().toLowerCase();
    if (value === "deadzone lite" || value === "lite") return "Lite";
    if (value === "gamingplus") return "GamingPlus";
    if (value === "legend") return "Legend";
    if (value === "ninja") return "Ninja";
    return "Lite";
}

function normalizeStatus(input: unknown): BuildItem["status"] {
    const value = String(input || "").trim().toLowerCase().replace(/[_-]+/g, " ");
    if (value === "available" || value === "ready") return "Available";
    if (value === "coming soon" || value === "planned") return "Coming Soon";
    if (value === "building" || value === "in progress") return "Building";
    if (value === "failed" || value === "broken") return "Failed";
    return "Available";
}

export function normalizeBuildRecord(input: any): BuildItem {
    const codename = String(input?.codename || input?.device_codename || "").toLowerCase();
    const normalizedStyle = normalizeStyle(input?.style);
    const normalizedStatus = normalizeStatus(input?.status);

    return {
        id: String(input?.id || codename || input?.filename || `build-${Math.random().toString(36).slice(2, 10)}`),
        deviceName: String(input?.deviceName || input?.device || input?.device_name || "Unknown Xiaomi Device"),
        codename,
        romVersion: String(input?.romVersion || input?.rom || input?.rom_version || "Unknown ROM"),
        androidVersion: input?.androidVersion || input?.android_version || input?.android || undefined,
        hyperOsVersion: input?.hyperOsVersion || input?.hyperosVersion || input?.hyperOSVersion || input?.hyperos || undefined,
        region: input?.region || undefined,
        filename: input?.filename || input?.final_zip || "",
        downloadUrl: input?.downloadUrl || input?.download || input?.drive_link || "",
        changelogUrl: input?.changelogUrl || input?.changelog || input?.changelog_link || "",
        sha256: input?.sha256 || input?.hash || input?.checksum || undefined,
        updatedAt: input?.updatedAt || input?.updated_at || undefined,
        style: validStyles.includes(normalizedStyle) ? normalizedStyle : "Lite",
        status: validStatuses.includes(normalizedStatus) ? normalizedStatus : "Available",
    };
}

export function normalizeBuildRecords(input: unknown): BuildItem[] {
    if (!Array.isArray(input)) return [];
    return input.map(normalizeBuildRecord);
}

export function getPublicBuilds(input: unknown): BuildItem[] {
    return normalizeBuildRecords(input);
}
