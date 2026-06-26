import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const team = await prisma.teamMember.findMany({
            orderBy: [
                { order: "asc" },
                { createdAt: "desc" }
            ]
        });
        return NextResponse.json(team);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 });
    }
}
