// Analytics utility functions

/**
 * Extract client IP from request headers
 * Handles various proxy headers
 */
export function getClientIP(request: Request): string | null {
    const headers = request.headers;

    // Check common proxy headers
    const forwardedFor = headers.get('x-forwarded-for');
    if (forwardedFor) {
        return forwardedFor.split(',')[0].trim();
    }

    const realIP = headers.get('x-real-ip');
    if (realIP) {
        return realIP;
    }

    const cfConnectingIP = headers.get('cf-connecting-ip'); // Cloudflare
    if (cfConnectingIP) {
        return cfConnectingIP;
    }

    return null;
}

/**
 * Parse user agent string to extract browser and OS info
 */
export function parseUserAgent(userAgent: string | null): {
    browser: string;
    os: string;
    device: string;
} {
    if (!userAgent) {
        return { browser: 'Unknown', os: 'Unknown', device: 'Unknown' };
    }

    // Simple user agent parsing
    let browser = 'Unknown';
    let os = 'Unknown';
    let device = 'Desktop';

    // Detect browser
    if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
        browser = 'Chrome';
    } else if (userAgent.includes('Firefox')) {
        browser = 'Firefox';
    } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
        browser = 'Safari';
    } else if (userAgent.includes('Edg')) {
        browser = 'Edge';
    } else if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
        browser = 'Opera';
    }

    // Detect OS
    if (userAgent.includes('Windows')) {
        os = 'Windows';
    } else if (userAgent.includes('Mac OS')) {
        os = 'macOS';
    } else if (userAgent.includes('Linux')) {
        os = 'Linux';
    } else if (userAgent.includes('Android')) {
        os = 'Android';
        device = 'Mobile';
    } else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
        os = 'iOS';
        device = userAgent.includes('iPad') ? 'Tablet' : 'Mobile';
    }

    return { browser, os, device };
}

/**
 * Detect geographic location from IP address
 * Using free ip-api.com service
 */
export async function detectLocation(ip: string | null): Promise<{
    country: string | null;
    city: string | null;
}> {
    if (!ip || ip === '127.0.0.1' || ip === 'localhost') {
        return { country: null, city: null };
    }

    try {
        const response = await fetch(`http://ip-api.com/json/${ip}?fields=country,city`, {
            signal: AbortSignal.timeout(3000), // 3 second timeout
        });

        if (!response.ok) {
            return { country: null, city: null };
        }

        const data = await response.json();
        return {
            country: data.country || null,
            city: data.city || null,
        };
    } catch (error) {
        console.error('Geolocation detection failed:', error);
        return { country: null, city: null };
    }
}

/**
 * Anonymize IP address by masking last octet (privacy protection)
 */
export function anonymizeIP(ip: string | null): string | null {
    if (!ip) return null;

    const parts = ip.split('.');
    if (parts.length === 4) {
        // IPv4
        parts[3] = 'xxx';
        return parts.join('.');
    }

    // For IPv6 or other formats, just return as is (or implement IPv6 anonymization)
    return ip;
}
