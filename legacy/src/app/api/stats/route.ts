import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/stats - Get overall statistics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get("days") || "30");

    // Get counts
    const [
      totalDevices,
      totalRoms,
      totalDownloads,
      totalTeamMembers,
      activeDevices,
    ] = await Promise.all([
      prisma.device.count(),
      prisma.rom.count(),
      prisma.download.count(),
      prisma.teamMember.count(),
      prisma.device.count({ where: { status: "ACTIVE" } }),
    ]);

    // Get recent downloads
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const recentDownloads = await prisma.download.count({
      where: {
        timestamp: {
          gte: startDate,
        },
      },
    });

    // Get downloads by device
    const downloadsByDevice = await prisma.device.findMany({
      select: {
        name: true,
        codename: true,
        roms: {
          select: {
            _count: {
              select: { downloads: true },
            },
          },
        },
      },
      take: 5,
    });

    // Get latest ROMs
    const latestRoms = await prisma.rom.findMany({
      include: {
        device: {
          select: {
            name: true,
            codename: true,
          },
        },
      },
      orderBy: {
        releaseDate: "desc",
      },
      take: 5,
    });

    return NextResponse.json({
      success: true,
      data: {
        counts: {
          totalDevices,
          totalRoms,
          totalDownloads,
          totalTeamMembers,
          activeDevices,
        },
        recentDownloads,
        downloadsByDevice,
        latestRoms,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
