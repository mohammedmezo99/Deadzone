import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/devices/[codename] - Get a specific device
export async function GET(
  request: NextRequest,
  { params }: { params: { codename: string } }
) {
  try {
    const device = await prisma.device.findUnique({
      where: { codename: params.codename },
      include: {
        roms: {
          orderBy: { releaseDate: "desc" },
        },
      },
    });

    if (!device) {
      return NextResponse.json(
        { success: false, error: "Device not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: device });
  } catch (error) {
    console.error("Error fetching device:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch device" },
      { status: 500 }
    );
  }
}

// PUT /api/devices/[codename] - Update a device
export async function PUT(
  request: NextRequest,
  { params }: { params: { codename: string } }
) {
  try {
    const body = await request.json();
    const { name, brand, chipset, status, image, description } = body;

    const device = await prisma.device.update({
      where: { codename: params.codename },
      data: {
        name,
        brand: brand?.toUpperCase(),
        chipset,
        status: status?.toUpperCase(),
        image,
        description,
      },
    });

    return NextResponse.json({ success: true, data: device });
  } catch (error) {
    console.error("Error updating device:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update device" },
      { status: 500 }
    );
  }
}

// DELETE /api/devices/[codename] - Delete a device
export async function DELETE(
  request: NextRequest,
  { params }: { params: { codename: string } }
) {
  try {
    await prisma.device.delete({
      where: { codename: params.codename },
    });

    return NextResponse.json(
      { success: true, message: "Device deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting device:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete device" },
      { status: 500 }
    );
  }
}
