import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        // Get download count per device
        const deviceStats = await prisma.device.findMany({
            select: {
                id: true,
                name: true,
                brand: true,
                downloads: {
                    select: {
                        id: true,
                    },
                },
            },
        });

        // Transform data for charts
        const popularDevices = deviceStats
            .map((device) => ({
                deviceId: device.id,
                deviceName: `${device.brand} ${device.name}`,
                downloads: device.downloads.length,
            }))
            .filter((device) => device.downloads > 0) // Only devices with downloads
            .sort((a, b) => b.downloads - a.downloads) // Sort by most popular
            .slice(0, 10); // Top 10

        // Calculate total for percentages
        const total = popularDevices.reduce((sum, device) => sum + device.downloads, 0);

        const chartData = popularDevices.map((device) => ({
            ...device,
            percentage: total > 0 ? Math.round((device.downloads / total) * 100 * 10) / 10 : 0,
        }));

        return NextResponse.json({ data: chartData, total });
    } catch (error) {
        console.error("Device popularity fetch failed:", error);
        return NextResponse.json({ error: "Failed to fetch device stats" }, { status: 500 });
    }
}
