import type { BuildItem } from "@/types";

export const publicBuilds: BuildItem[] = [];

const validStyles: BuildItem["style"][] = ["Lite", "GamingPlus", "Legend", "Ninja"];
const validStatuses: BuildItem["status"][] = ["Available", "Coming Soon", "Building", "Failed"];

export type PublicBuildsResponse = {
    ok: boolean;
    builds: BuildItem[];
};

const defaultDeadZoneVersion = "v1.06";

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
        deadZoneVersion: input?.deadZoneVersion || input?.deadzone_version || input?.version || defaultDeadZoneVersion,
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
    return Boolean(
        sanitizePublicDownloadUrl(build.downloadUrl) &&
        sanitizePublicFilename(build.filename) &&
        sanitizePublicSha256(build.sha256) &&
        sanitizePublicFileSize(build.fileSize),
    );
}

export function sanitizePublicDownloadUrl(value: string | undefined) {
    const url = String(value || "").trim();

    if (!url) {
        return "";
    }

    try {
        const parsed = new URL(url);
        return parsed.protocol === "http:" || parsed.protocol === "https:" ? parsed.toString() : "";
    } catch {
        return "";
    }
}

export function sanitizePublicFilename(value: string | undefined) {
    return String(value || "").trim();
}

export function sanitizePublicSha256(value: string | undefined) {
    const normalized = String(value || "").trim().toLowerCase();
    return /^[a-f0-9]{64}$/.test(normalized) ? normalized : "";
}

export function sanitizePublicFileSize(value: string | undefined) {
    return String(value || "").trim();
}

export function getBuildAvailabilityStatus(build: BuildItem): BuildItem["status"] {
    return hasPublishedFile(build) ? build.status : "Coming Soon";
}

export function sanitizeBuildForPublicResponse(build: BuildItem): BuildItem {
    const downloadUrl = sanitizePublicDownloadUrl(build.downloadUrl);
    const filename = sanitizePublicFilename(build.filename);
    const sha256 = sanitizePublicSha256(build.sha256);
    const fileSize = sanitizePublicFileSize(build.fileSize);
    const published = Boolean(downloadUrl && filename && sha256 && fileSize);

    return {
        ...build,
        deadZoneVersion: build.deadZoneVersion || defaultDeadZoneVersion,
        status: published ? build.status : "Coming Soon",
        downloadUrl: published ? downloadUrl : undefined,
        filename: published ? filename : undefined,
        sha256: published ? sha256 : undefined,
        fileSize: published ? fileSize : undefined,
        changelogUrl: published ? sanitizePublicDownloadUrl(build.changelogUrl) || undefined : undefined,
    };
}

export function sanitizeBuildsForPublicResponse(builds: BuildItem[]) {
    return builds.map(sanitizeBuildForPublicResponse);
}

export async function fetchRemoteBuilds(base: string, codename?: string | null): Promise<PublicBuildsResponse> {
    const workerBase = base.replace(/\/+$/, "");
    const endpoint = codename
        ? `${workerBase}/api/builds?codename=${encodeURIComponent(codename)}`
        : `${workerBase}/api/builds`;

    const response = await fetch(endpoint, {
        cache: "no-store",
        headers: {
            Accept: "application/json",
        },
    });

    if (!response.ok) {
        return { ok: false, builds: [] };
    }

    const payload = await response.json();
    const source = Array.isArray(payload) ? payload : payload?.builds;
    return {
        ok: true,
        builds: sanitizeBuildsForPublicResponse(getPublicBuilds(source)),
    };
}

export async function resolveWebsiteBuilds(codename?: string | null): Promise<PublicBuildsResponse> {
    const fallback = sanitizeBuildsForPublicResponse(
        codename ? publicBuilds.filter((build) => build.codename === codename) : publicBuilds,
    );
    const base = process.env.DEADZONE_WORKER_API_BASE?.trim();

    if (!base) {
        return { ok: true, builds: fallback };
    }

    try {
        const remote = await fetchRemoteBuilds(base, codename);
        return remote.builds.length ? remote : { ok: remote.ok, builds: fallback };
    } catch {
        return { ok: false, builds: fallback };
    }
}
