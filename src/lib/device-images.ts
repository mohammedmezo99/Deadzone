import { verifiedDeviceImageByCodename } from "@/data/supported-devices";

export const deviceImageExtensionsByCodename = Object.freeze(
    Object.fromEntries(
        Object.entries(verifiedDeviceImageByCodename).map(([codename, imagePath]) => {
            const extension = imagePath.split(".").pop() || "webp";
            return [codename, extension];
        }),
    ) as Record<string, string>,
);

export function getVerifiedDeviceImage(codename: string): string | null {
    const normalized = codename.trim().toLowerCase();
    return verifiedDeviceImageByCodename[normalized] || null;
}

export function hasVerifiedDeviceImage(codename: string) {
    return getVerifiedDeviceImage(codename) !== null;
}

export function getDeviceImage(codename: string) {
    return getVerifiedDeviceImage(codename);
}
