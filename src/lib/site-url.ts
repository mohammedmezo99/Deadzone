function normalizeUrl(rawUrl?: string | null) {
    if (!rawUrl) return null;

    const value = rawUrl.trim();
    if (!value) return null;

    const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;

    try {
        return new URL(withProtocol);
    } catch {
        return null;
    }
}

export function resolveSiteUrl() {
    return (
        normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
        normalizeUrl(process.env.NEXT_PUBLIC_APP_URL) ??
        normalizeUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
        normalizeUrl(process.env.VERCEL_URL)
    );
}
