import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/roms/[id] - Get a specific ROM
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const rom = await prisma.rom.findUnique({
      where: { id: params.id },
      include: {
        device: true,
        _count: {
          select: { downloads: true },
        },
      },
    });

    if (!rom) {
      return NextResponse.json(
        { success: false, error: "ROM not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: rom });
  } catch (error) {
    console.error("Error fetching ROM:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch ROM" },
      { status: 500 }
    );
  }
}

// PUT /api/roms/[id] - Update a ROM
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const {
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

    const rom = await prisma.rom.update({
      where: { id: params.id },
      data: {
        name,
        version,
        androidVersion,
        type: type?.toUpperCase(),
        downloadUrl,
        fileSize,
        changelog,
        releaseDate: releaseDate ? new Date(releaseDate) : undefined,
        screenshots,
        installationGuide,
        status: status?.toUpperCase(),
        isVipOnly,
      },
    });

    return NextResponse.json({ success: true, data: rom });
  } catch (error) {
    console.error("Error updating ROM:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update ROM" },
      { status: 500 }
    );
  }
}

// DELETE /api/roms/[id] - Delete a ROM
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.rom.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { success: true, message: "ROM deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting ROM:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete ROM" },
      { status: 500 }
    );
  }
}
