import type { BuildItem } from "@/types";

export const publicBuilds: BuildItem[] = [];

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
        romVersion: input?.romVersion || input?.rom || input?.rom_version || undefined,
        deadZoneVersion: input?.deadZoneVersion || input?.deadzone_version || input?.version || undefined,
        androidVersion: input?.androidVersion || input?.android_version || input?.android || undefined,
        hyperOsVersion: input?.hyperOsVersion || input?.hyperosVersion || input?.hyperOSVersion || input?.hyperos || undefined,
        region: input?.region || undefined,
        fileSize: input?.fileSize || input?.file_size || input?.size || undefined,
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

export function hasPublishedFile(build: BuildItem) {
    return Boolean(build.downloadUrl || build.filename || build.sha256 || build.fileSize);
}
