import { NextResponse } from "next/server";
import dataClient from "@/lib/data-client";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const [deviceCount, visitorConfig] = await Promise.all([
            dataClient.device.count(),
            dataClient.siteConfig.findUnique({
                where: { key: "visitor_count" }
            })
        ]);

        // Base seed for Active Users (as requested by user "50K+")
        // We will start from a base and add the live count
        const baseSeed = 52400;
        const liveVisitors = visitorConfig ? parseInt(visitorConfig.value) : 0;

        return NextResponse.json({
            devices: deviceCount,
            activeUsers: baseSeed + liveVisitors,
        });
    } catch (error) {
        console.error("Stats fetch failed:", error);
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
