import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        // Get downloads for last 30 days with daily breakdown
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const downloads = await prisma.download.findMany({
            where: {
                downloadedAt: {
                    gte: thirtyDaysAgo,
                },
            },
            select: {
                downloadedAt: true,
            },
            orderBy: {
                downloadedAt: 'asc',
            },
        });

        // Group downloads by date
        const downloadsByDate: { [key: string]: number } = {};

        downloads.forEach((download) => {
            const date = download.downloadedAt.toISOString().split('T')[0];
            downloadsByDate[date] = (downloadsByDate[date] || 0) + 1;
        });

        // Create array of last 30 days with counts (fill missing days with 0)
        const chartData = [];
        for (let i = 29; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];

            chartData.push({
                date: dateStr,
                count: downloadsByDate[dateStr] || 0,
                label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            });
        }

        return NextResponse.json({ data: chartData });
    } catch (error) {
        console.error("Download trends fetch failed:", error);
        return NextResponse.json({ error: "Failed to fetch download trends" }, { status: 500 });
    }
}
