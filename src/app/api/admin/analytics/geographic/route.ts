import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        // Get downloads grouped by country
        const downloads = await prisma.download.groupBy({
            by: ['country'],
            _count: {
                id: true,
            },
            where: {
                country: {
                    not: null,
                },
            },
            orderBy: {
                _count: {
                    id: 'desc',
                },
            },
            take: 20, // Top 20 countries
        });

        // Transform data
        const total = downloads.reduce((sum, item) => sum + item._count.id, 0);

        const chartData = downloads.map((item) => ({
            country: item.country,
            downloads: item._count.id,
            percentage: total > 0 ? Math.round((item._count.id / total) * 100 * 10) / 10 : 0,
        }));

        // Also get city breakdown for top country
        const topCountry = downloads[0]?.country;
        let topCities: Array<{ city: string | null; downloads: number }> = [];

        if (topCountry) {
            const cities = await prisma.download.groupBy({
                by: ['city'],
                _count: {
                    id: true,
                },
                where: {
                    country: topCountry,
                    city: {
                        not: null,
                    },
                },
                orderBy: {
                    _count: {
                        id: 'desc',
                    },
                },
                take: 10,
            });

            topCities = cities.map((item) => ({
                city: item.city,
                downloads: item._count.id,
            }));
        }

        return NextResponse.json({
            countries: chartData,
            topCities,
            totalWithLocation: total,
        });
    } catch (error) {
        console.error("Geographic data fetch failed:", error);
        return NextResponse.json({ error: "Failed to fetch geographic data" }, { status: 500 });
    }
}
