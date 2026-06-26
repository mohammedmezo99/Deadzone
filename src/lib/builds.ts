import type { BuildItem } from "@/types";

export const publicBuilds: BuildItem[] = [];

const validStyles: BuildItem["style"][] = ["DeadZone Lite", "GamingPlus", "Legend", "Ninja"];

export type PublicBuildsResponse = {
    ok: boolean;
    builds: BuildItem[];
};

export function normalizeBuildRecord(input: any): BuildItem {
    const codename = String(input?.codename || input?.device_codename || "").toLowerCase();
    const style = String(input?.style || "").trim();
    const normalizedStyle = validStyles.includes(style as BuildItem["style"]) ? style as BuildItem["style"] : "DeadZone Lite";

    return {
        id: String(input?.id || codename || input?.filename || `build-${Math.random().toString(36).slice(2, 10)}`),
        deviceName: String(input?.deviceName || input?.device || input?.device_name || "Unknown Xiaomi Device"),
        codename,
        romVersion: String(input?.romVersion || input?.rom || input?.rom_version || "Unknown ROM"),
        region: input?.region || undefined,
        android: input?.android || undefined,
        filename: input?.filename || input?.final_zip || "",
        downloadUrl: input?.downloadUrl || input?.download || input?.drive_link || "",
        updatedAt: input?.updatedAt || input?.updated_at || undefined,
        style: normalizedStyle,
    };
}

export function normalizeBuildRecords(input: unknown): BuildItem[] {
    if (!Array.isArray(input)) return [];
    return input.map(normalizeBuildRecord);
}

export function getPublicBuilds(input: unknown): BuildItem[] {
    return normalizeBuildRecords(input).filter((build) => Boolean(build.downloadUrl));
}
