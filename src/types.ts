export type AccentColor = "cyan" | "blue" | "purple" | "magenta" | "gold" | "red" | "slate";

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

export type RomStyle = {
    id: string;
    name: "DeadZone Lite" | "GamingPlus" | "Legend" | "Ninja";
    type: "public" | "premium";
    accent: AccentColor;
    shortDescription: string;
    features: string[];
    ctaLabel: string;
    ctaUrl: string;
};

export type SupportedDevice = {
    name: string;
    codename: string;
    category: DeviceCategory;
    brand: string;
    supported: true;
    image: string;
    imageSource: "exact" | "codename" | "closest" | "fallback";
    aliases?: string[];
};

export type CodenameRegistryEntry = {
    codename: string;
    supported: true;
    image: string;
    imageFallback: string;
    imageType: "exact" | "closest" | "fallback";
    aliases?: string[];
    closestTo?: string;
};

export type BuildItem = {
    id: string;
    deviceName: string;
    codename: string;
    romVersion: string;
    androidVersion?: string;
    hyperOsVersion?: string;
    region?: string;
    fileSize?: string;
    filename?: string;
    downloadUrl?: string;
    changelogUrl?: string;
    sha256?: string;
    updatedAt?: string;
    style: "Lite" | "GamingPlus" | "Legend" | "Ninja";
    status: "Available" | "Coming Soon" | "Building" | "Failed";
};

export type OfficialLinks = {
    contactMezo: string;
    discussionGroup: string;
    officialUpdates: string;
    screenshotsCloud: string;
    supportedDevices: string;
    groupRules: string;
};

export type SiteLinks = {
    home: string;
    downloads: string;
    devices: string;
    styles: string;
    premium: string;
    status: string;
    guide: string;
    community: string;
    contact: string;
};
