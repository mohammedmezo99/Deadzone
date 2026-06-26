import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/devices - List all devices
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const brand = searchParams.get("brand");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const where: any = {};

    if (brand && brand !== "all") {
      where.brand = brand.toUpperCase();
    }

    if (status) {
      where.status = status.toUpperCase();
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { codename: { contains: search, mode: "insensitive" } },
      ];
    }

    const devices = await prisma.device.findMany({
      where,
      include: {
        roms: {
          where: { status: "ACTIVE" },
          orderBy: { releaseDate: "desc" },
          take: 1,
        },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ success: true, data: devices });
  } catch (error) {
    console.error("Error fetching devices:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch devices" },
      { status: 500 }
    );
  }
}

// POST /api/devices - Create a new device
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, codename, brand, chipset, status, image, description } = body;

    // Validate required fields
    if (!name || !codename || !brand || !chipset) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if codename already exists
    const existingDevice = await prisma.device.findUnique({
      where: { codename },
    });

    if (existingDevice) {
      return NextResponse.json(
        { success: false, error: "Device with this codename already exists" },
        { status: 409 }
      );
    }

    const device = await prisma.device.create({
      data: {
        name,
        codename,
        brand: brand.toUpperCase(),
        chipset,
        status: status?.toUpperCase() || "ACTIVE",
        image,
        description,
      },
    });

    return NextResponse.json(
      { success: true, data: device },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating device:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create device" },
      { status: 500 }
    );
  }
}
