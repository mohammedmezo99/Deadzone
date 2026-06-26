import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getClientIP, detectLocation } from "@/lib/analytics";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { romId, deviceId } = body;

        if (!romId) {
            return NextResponse.json({ error: "ROM ID is required" }, { status: 400 });
        }

        // Extract tracking data
        const clientIP = getClientIP(req);
        const userAgent = req.headers.get('user-agent');

        // Detect geographic location (async, non-blocking)
        const { country, city } = await detectLocation(clientIP);

        // Create download record with full analytics data
        const download = await prisma.download.create({
            data: {
                romId,
                deviceId: deviceId || null,
                ipAddress: clientIP,
                userAgent,
                country,
                city,
            },
        });

        return NextResponse.json({ success: true, download });
    } catch (error) {
        console.error("Download tracking failed:", error);
        return NextResponse.json({ error: "Failed to track download" }, { status: 500 });
    }
}
