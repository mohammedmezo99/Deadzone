import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/downloads - Get download statistics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const romId = searchParams.get("romId");
    const days = parseInt(searchParams.get("days") || "7");

    // Get total downloads
    const totalDownloads = await prisma.download.count();

    // Get downloads per day
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const downloadsPerDay = await prisma.download.groupBy({
      by: ["timestamp"],
      where: {
        timestamp: {
          gte: startDate,
        },
        ...(romId && { romId }),
      },
      _count: {
        id: true,
      },
    });

    // Get downloads per ROM
    const downloadsPerRom = await prisma.rom.findMany({
      select: {
        id: true,
        name: true,
        version: true,
        _count: {
          select: { downloads: true },
        },
      },
      orderBy: {
        downloads: {
          _count: "desc",
        },
      },
      take: 10,
    });

    return NextResponse.json({
      success: true,
      data: {
        totalDownloads,
        downloadsPerDay,
        downloadsPerRom,
      },
    });
  } catch (error) {
    console.error("Error fetching download stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch download statistics" },
      { status: 500 }
    );
  }
}

// POST /api/downloads - Record a new download
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { romId } = body;

    if (!romId) {
      return NextResponse.json(
        { success: false, error: "ROM ID is required" },
        { status: 400 }
      );
    }

    // Get client IP and user agent
    const ip = request.headers.get("x-forwarded-for") || request.ip || "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    const download = await prisma.download.create({
      data: {
        romId,
        ip: ip.split(",")[0].trim(),
        userAgent,
      },
    });

    return NextResponse.json(
      { success: true, data: download },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error recording download:", error);
    return NextResponse.json(
      { success: false, error: "Failed to record download" },
      { status: 500 }
    );
  }
}
