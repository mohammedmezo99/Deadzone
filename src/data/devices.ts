import type { DeviceCategory, SupportedDevice as LegacySupportedDevice } from "@/types";
import {
    findSupportedDeviceRecord,
    supportedDevices as canonicalSupportedDevices,
} from "@/data/supported-devices";

export const deviceCategories: DeviceCategory[] = [
    "Xiaomi Series",
    "Xiaomi MIX / Fold / Flip Series",
    "Redmi K / Turbo Series",
    "Redmi Note Series",
    "Redmi Number Series",
    "POCO F Series",
    "POCO X Series",
    "POCO M / C Series",
    "Xiaomi Pad / Redmi Pad / POCO Pad",
];

function getBrand(name: string) {
    if (name.startsWith("Redmi")) return "Redmi";
    if (name.startsWith("POCO")) return "POCO";
    return "Xiaomi";
}

function getLegacyCategory(deviceName: string, category: (typeof canonicalSupportedDevices)[number]["category"]): DeviceCategory {
    if (category === "Pad") {
        return "Xiaomi Pad / Redmi Pad / POCO Pad";
    }

    if (category === "MIX") {
        return "Xiaomi MIX / Fold / Flip Series";
    }

    if (category === "POCO") {
        if (deviceName.startsWith("POCO F")) return "POCO F Series";
        if (deviceName.startsWith("POCO X")) return "POCO X Series";
        return "POCO M / C Series";
    }

    if (category === "Redmi") {
        if (deviceName.startsWith("Redmi Note")) return "Redmi Note Series";
        if (deviceName.startsWith("Redmi K") || deviceName.startsWith("Redmi Turbo")) return "Redmi K / Turbo Series";
        return "Redmi Number Series";
    }

    return "Xiaomi Series";
}

export const supportedDevices: LegacySupportedDevice[] = canonicalSupportedDevices.map((device) => ({
    name: device.name,
    codename: device.codename,
    category: getLegacyCategory(device.name, device.category),
    brand: getBrand(device.name),
    supported: true,
    image: device.image || "",
    imageSource: device.image ? "exact" : "fallback",
    aliases: device.aliases,
}));

export function findSupportedDevice(codename: string) {
    const normalized = codename.trim().toLowerCase();
    return supportedDevices.find((device) => device.codename === normalized) || null;
}

export function findCanonicalSupportedDevice(codename: string) {
    return findSupportedDeviceRecord(codename);
}
