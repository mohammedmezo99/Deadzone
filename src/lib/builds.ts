import type { BuildItem } from "@/types";

export const publicBuilds: BuildItem[] = [];

export function normalizeBuildRecord(input: any): BuildItem {
    const codename = String(input?.codename || input?.device_codename || "").toLowerCase();

    return {
        id: String(input?.id || codename || input?.filename || `build-${Math.random().toString(36).slice(2, 10)}`),
        deviceName: String(input?.deviceName || input?.device_name || input?.device || "Unknown device"),
        codename,
        romVersion: String(input?.romVersion || input?.rom_version || input?.rom || "DeadZone Lite"),
        region: input?.region || undefined,
        android: input?.android || undefined,
        filename: input?.filename || input?.final_zip || undefined,
        downloadUrl: input?.downloadUrl || input?.drive_link || input?.download || undefined,
        updatedAt: input?.updatedAt || input?.updated_at || undefined,
        style: "DeadZone Lite",
    };
}

export function normalizeBuildRecords(input: unknown): BuildItem[] {
    if (!Array.isArray(input)) return [];
    return input.map(normalizeBuildRecord);
}
