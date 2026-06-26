import { NextResponse } from "next/server";

export async function POST() {
    return NextResponse.json({
        success: true,
        message: "Use the official Telegram contact links on the public site.",
    });
}
