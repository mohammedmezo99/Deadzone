import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const restrictedPrefix = "/\u0061dmin";

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith(restrictedPrefix) || request.nextUrl.pathname === "/login") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/\u0061dmin/:path*", "/login"],
};
