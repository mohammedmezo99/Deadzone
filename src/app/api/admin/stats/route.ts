import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const emptyStats = {
    devices: 0,
    roms: 0,
    downloads: 0,
    team: 0,
    trajectory: Array(12).fill(0),
    monthlyTrajectory: Array(12).fill(0),
};

export async function GET() {
    if (!process.env.DATABASE_URL) {
        return NextResponse.json(emptyStats);
    }

    try {
        const [deviceCount, romCount, downloadCount, teamCount] = await Promise.all([
            prisma.device.count(),
            prisma.rom.count(),
            prisma.download.count(),
            prisma.teamMember.count()
        ]);

        // Calculate daily trajectory for the last 12 days
        const trajectory = await Promise.all(
            Array.from({ length: 12 }).map(async (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - (11 - i));
                date.setHours(0, 0, 0, 0);
                const nextDate = new Date(date);
                nextDate.setDate(date.getDate() + 1);

                return prisma.download.count({
                    where: {
                        downloadedAt: {
                            gte: date,
                            lt: nextDate,
                        },
                    },
                });
            })
        );

        // Calculate monthly trajectory for the current year
        const currentYear = new Date().getFullYear();
        const monthlyTrajectory = await Promise.all(
            Array.from({ length: 12 }).map(async (_, month) => {
                const startDate = new Date(currentYear, month, 1);
                const endDate = new Date(currentYear, month + 1, 1);

                return prisma.download.count({
                    where: {
                        downloadedAt: {
                            gte: startDate,
                            lt: endDate,
                        },
                    },
                });
            })
        );

        return NextResponse.json({
            devices: deviceCount,
            roms: romCount,
            downloads: downloadCount,
            team: teamCount,
            trajectory,
            monthlyTrajectory
        });
    } catch (error) {
        console.error("Dashboard stats fetch failed:", error);
        return NextResponse.json(emptyStats);
    }
}
