import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        // Get current date boundaries
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - 7);
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        // Total downloads
        const totalDownloads = await prisma.download.count();

        // Downloads today
        const downloadsToday = await prisma.download.count({
            where: {
                downloadedAt: {
                    gte: startOfToday,
                },
            },
        });

        // Downloads this week
        const downloadsThisWeek = await prisma.download.count({
            where: {
                downloadedAt: {
                    gte: startOfWeek,
                },
            },
        });

        // Downloads this month
        const downloadsThisMonth = await prisma.download.count({
            where: {
                downloadedAt: {
                    gte: startOfMonth,
                },
            },
        });

        // Active devices (devices with at least one download)
        const activeDevices = await prisma.device.count({
            where: {
                downloads: {
                    some: {},
                },
            },
        });

        // Calculate growth percentages (compare with previous period)
        const yesterday = new Date(startOfToday);
        yesterday.setDate(yesterday.getDate() - 1);

        const downloadsYesterday = await prisma.download.count({
            where: {
                downloadedAt: {
                    gte: yesterday,
                    lt: startOfToday,
                },
            },
        });

        const todayGrowth = downloadsYesterday > 0
            ? ((downloadsToday - downloadsYesterday) / downloadsYesterday) * 100
            : 0;

        return NextResponse.json({
            totalDownloads,
            downloadsToday,
            downloadsThisWeek,
            downloadsThisMonth,
            activeDevices,
            growth: {
                today: Math.round(todayGrowth * 10) / 10, // Round to 1 decimal
            },
        });
    } catch (error) {
        console.error("Analytics overview failed:", error);
        return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
    }
}
