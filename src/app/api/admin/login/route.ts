import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        const ADMIN_EMAIL = "mohamedmezo@projectmove.co";
        const ADMIN_PASSWORD = "Mohamed0931#";

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            const response = NextResponse.json({ success: true });

            // Set session cookie
            response.cookies.set("admin_session", "true", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 60 * 24, // 24 hours
                path: "/",
            });

            return response;
        }

        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    } catch (error) {
        console.error("Login API error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
