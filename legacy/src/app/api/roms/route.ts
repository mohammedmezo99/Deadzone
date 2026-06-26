import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/roms - List all ROMs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const deviceId = searchParams.get("deviceId");
    const type = searchParams.get("type");
    const status = searchParams.get("status");

    const where: any = {};

    if (deviceId) {
      where.deviceId = deviceId;
    }

    if (type) {
      where.type = type.toUpperCase();
    }

    if (status) {
      where.status = status.toUpperCase();
    }

    const roms = await prisma.rom.findMany({
      where,
      include: {
        device: true,
        _count: {
          select: { downloads: true },
        },
      },
      orderBy: { releaseDate: "desc" },
    });

    return NextResponse.json({ success: true, data: roms });
  } catch (error) {
    console.error("Error fetching ROMs:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch ROMs" },
      { status: 500 }
    );
  }
}

// POST /api/roms - Create a new ROM
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      deviceId,
      name,
      version,
      androidVersion,
      type,
      downloadUrl,
      fileSize,
      changelog,
      releaseDate,
      screenshots,
      installationGuide,
      status,
      isVipOnly,
    } = body;

    // Validate required fields
    if (!deviceId || !name || !version || !androidVersion || !downloadUrl) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const rom = await prisma.rom.create({
      data: {
        deviceId,
        name,
        version,
        androidVersion,
        type: type?.toUpperCase() || "FREE",
        downloadUrl,
        fileSize: fileSize || "Unknown",
        changelog: changelog || "",
        releaseDate: releaseDate ? new Date(releaseDate) : new Date(),
        screenshots: screenshots || [],
        installationGuide,
        status: status?.toUpperCase() || "ACTIVE",
        isVipOnly: isVipOnly || false,
      },
    });

    return NextResponse.json(
      { success: true, data: rom },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating ROM:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create ROM" },
      { status: 500 }
    );
  }
}
