import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const trendConfig = await prisma.siteConfig.findUnique({
            where: { key: "visitor_trend" }
        });

        if (!trendConfig) {
            return NextResponse.json([]);
        }

        return NextResponse.json(JSON.parse(trendConfig.value));
    } catch (error) {
        console.error("Failed to fetch analytics:", error);
        return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
    }
}
