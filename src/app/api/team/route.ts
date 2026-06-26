import { NextResponse } from "next/server";
import dataClient from "@/lib/data-client";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const team = await dataClient.teamMember.findMany({
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
