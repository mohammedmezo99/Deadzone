import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const screenshots = await prisma.screenshot.findMany({
            orderBy: [
                { order: 'asc' },
                { createdAt: 'asc' }
            ]
        });
        return NextResponse.json(screenshots);
    } catch (error) {
        console.error("Error fetching screenshots:", error);
        return NextResponse.json({ error: "Failed to fetch screenshots" }, { status: 500 });
    }
}
