import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/team - List all team members
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role");

    const where: any = {};

    if (role) {
      where.role = role.toUpperCase();
    }

    const members = await prisma.teamMember.findMany({
      where,
      orderBy: [{ role: "asc" }, { order: "asc" }],
    });

    return NextResponse.json({ success: true, data: members });
  } catch (error) {
    console.error("Error fetching team members:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch team members" },
      { status: 500 }
    );
  }
}

// POST /api/team - Create a new team member
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, role, image, bio, github, telegram, twitter, website, order } = body;

    // Validate required fields
    if (!name || !role) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const member = await prisma.teamMember.create({
      data: {
        name,
        role: role.toUpperCase(),
        image,
        bio,
        github,
        telegram,
        twitter,
        website,
        order: order || 0,
      },
    });

    return NextResponse.json(
      { success: true, data: member },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating team member:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create team member" },
      { status: 500 }
    );
  }
}
