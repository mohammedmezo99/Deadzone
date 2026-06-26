import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { pathname } = await req.json();

        // Increment visitor_count in SiteConfig
        const currentConfig = await prisma.siteConfig.findUnique({
            where: { key: "visitor_count" }
        });
        const currentCount = currentConfig ? parseInt(currentConfig.value) : 0;

        await prisma.siteConfig.upsert({
            where: { key: "visitor_count" },
            update: { value: (currentCount + 1).toString() },
            create: { key: "visitor_count", value: "1" }
        });

        // Update visitor_trend (daily counts for the last 14 days)
        const trendConfig = await prisma.siteConfig.findUnique({
            where: { key: "visitor_trend" }
        });

        const today = new Date().toISOString().split('T')[0];
        let trend = trendConfig ? JSON.parse(trendConfig.value) : [];

        // trend format: [{ date: '2024-01-01', count: 123 }, ...]
        const todayIndex = trend.findIndex((itemValue: any) => itemValue.date === today);

        if (todayIndex > -1) {
            trend[todayIndex].count += 1;
        } else {
            trend.push({ date: today, count: 1 });
        }

        // Keep last 14 days
        if (trend.length > 14) {
            trend = trend.slice(-14);
        }

        await prisma.siteConfig.upsert({
            where: { key: "visitor_trend" },
            update: { value: JSON.stringify(trend) },
            create: { key: "visitor_trend", value: JSON.stringify(trend) }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Tracking failed:", error);
        return NextResponse.json({ error: "Tracking failed" }, { status: 500 });
    }
}
