import { officialLinks, siteLinks } from "@/lib/links";
import type { RomStyle } from "@/types";

export const romStyles: RomStyle[] = [
    {
        id: "deadzone-lite",
        name: "DeadZone Lite",
        type: "public",
        accent: "cyan",
        shortDescription: "Public optimized HyperOS experience. Clean, fast, smooth, daily-use focused.",
        features: [
            "Clean public HyperOS presentation",
            "Smooth daily-use tuning",
            "Fast access to public build listings",
        ],
        ctaLabel: "Explore Builds",
        ctaUrl: siteLinks.downloads,
    },
    {
        id: "gamingplus",
        name: "GamingPlus",
        type: "premium",
        accent: "magenta",
        shortDescription: "Premium membership style focused on stronger performance and gaming-oriented experience.",
        features: [
            "Gaming-oriented feel",
            "Stronger performance focus",
            "Premium-only DeadZone access",
        ],
        ctaLabel: "Contact MEZO",
        ctaUrl: officialLinks.contactMezo,
    },
    {
        id: "legend",
        name: "Legend",
        type: "premium",
        accent: "gold",
        shortDescription: "Premium membership style focused on balance, stability, and polished experience.",
        features: [
            "Balanced daily performance",
            "Polished everyday presentation",
            "Premium-only DeadZone access",
        ],
        ctaLabel: "Contact MEZO",
        ctaUrl: officialLinks.contactMezo,
    },
    {
        id: "ninja",
        name: "Ninja",
        type: "premium",
        accent: "purple",
        shortDescription: "Premium membership style focused on advanced, exclusive DeadZone experience.",
        features: [
            "Advanced DeadZone direction",
            "Exclusive premium experience",
            "Premium-only DeadZone access",
        ],
        ctaLabel: "Contact MEZO",
        ctaUrl: officialLinks.contactMezo,
    },
];

export const publicRomStyle = romStyles.find((style) => style.type === "public")!;
export const premiumRomStyles = romStyles.filter((style) => style.type === "premium");
