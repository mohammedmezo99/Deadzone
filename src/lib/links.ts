import type { OfficialLinks, SiteLinks } from "@/types";

export const officialLinks: OfficialLinks = {
    contactMezo: "https://t.me/MohamedMezo1",
    discussionGroup: "https://t.me/DeadZoneDiscussion",
    officialUpdates: "https://t.me/xDeadZone",
    screenshotsCloud: "https://t.me/DeadZoneCloud",
    supportedDevices: "https://t.me/DeadZoneDiscussion/2851",
    groupRules: "https://t.me/DeadZoneDiscussion/2849",
};

export const siteLinks: SiteLinks = {
    home: "/",
    downloads: "/downloads",
    devices: "/devices",
    styles: "/styles",
    premium: "/premium",
    status: "/status",
    guide: "/guide",
    community: "/community",
    contact: "/contact",
};

export function buildDownloadsPath(options?: { codename?: string; style?: string }) {
    const codename = options?.codename?.trim().toLowerCase();
    const style = options?.style?.trim();

    if (!codename && !style) {
        return siteLinks.downloads;
    }

    const params = new URLSearchParams();

    if (codename) {
        params.set("codename", codename);
    }

    if (style) {
        params.set("style", style);
    }

    return `${siteLinks.downloads}?${params.toString()}`;
}
