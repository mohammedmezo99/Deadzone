import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const restrictedPrefix = "/\u0061dmin";
const downloadsPrefix = "/downloads";

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith(restrictedPrefix) || request.nextUrl.pathname === "/login") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (request.nextUrl.pathname.startsWith(downloadsPrefix) && request.nextUrl.pathname !== downloadsPrefix) {
        const suffix = request.nextUrl.pathname.slice(downloadsPrefix.length).replace(/^\/+/, "");

        if (suffix.startsWith("codename=") || suffix.startsWith("style=")) {
            const redirectUrl = request.nextUrl.clone();
            const params = new URLSearchParams(redirectUrl.search);

            for (const part of suffix.split("&")) {
                const [key, value] = part.split("=");

                if ((key === "codename" || key === "style") && value) {
                    params.set(key, decodeURIComponent(value));
                }
            }

            redirectUrl.pathname = downloadsPrefix;
            redirectUrl.search = params.toString();
            return NextResponse.redirect(redirectUrl, 308);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/\u0061dmin/:path*", "/login", "/downloads:path*"],
};
