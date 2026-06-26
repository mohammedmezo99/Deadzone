import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith("/admin") && request.nextUrl.pathname !== "/admin/login") {
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Redirect logged in users away from login page
  if (request.nextUrl.pathname === "/admin/login" && session) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};
