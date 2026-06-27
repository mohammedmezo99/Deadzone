import type { MetadataRoute } from "next";

const routes = [
    "",
    "/downloads",
    "/devices",
    "/styles",
    "/premium",
    "/community",
    "/contact",
    "/about",
    "/faq",
];

export default function sitemap(): MetadataRoute.Sitemap {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    if (!siteUrl) {
        return [];
    }

    const base = siteUrl.replace(/\/$/, "");

    return routes.map((route) => ({
        url: `${base}${route || "/"}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "daily",
        priority: route === "" ? 1 : 0.7,
    }));
}
