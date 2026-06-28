import type { MetadataRoute } from "next";
import { resolveSiteUrl } from "@/lib/site-url";

const routes = [
    "",
    "/downloads",
    "/devices",
    "/gallery",
    "/premium",
    "/community",
    "/contact",
    "/about",
    "/faq",
];

export default function sitemap(): MetadataRoute.Sitemap {
    const siteUrl = resolveSiteUrl();

    if (!siteUrl) {
        return [];
    }

    const base = siteUrl.toString().replace(/\/$/, "");

    return routes.map((route) => ({
        url: `${base}${route || "/"}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "daily",
        priority: route === "" ? 1 : 0.7,
    }));
}
