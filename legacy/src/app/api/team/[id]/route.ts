import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/team/[id] - Get a specific team member
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const member = await prisma.teamMember.findUnique({
      where: { id: params.id },
    });

    if (!member) {
      return NextResponse.json(
        { success: false, error: "Team member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: member });
  } catch (error) {
    console.error("Error fetching team member:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch team member" },
      { status: 500 }
    );
  }
}

// PUT /api/team/[id] - Update a team member
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, role, image, bio, github, telegram, twitter, website, order } = body;

    const member = await prisma.teamMember.update({
      where: { id: params.id },
      data: {
        name,
        role: role?.toUpperCase(),
        image,
        bio,
        github,
        telegram,
        twitter,
        website,
        order,
      },
    });

    return NextResponse.json({ success: true, data: member });
  } catch (error) {
    console.error("Error updating team member:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update team member" },
      { status: 500 }
    );
  }
}

// DELETE /api/team/[id] - Delete a team member
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.teamMember.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { success: true, message: "Team member deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting team member:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete team member" },
      { status: 500 }
    );
  }
}
