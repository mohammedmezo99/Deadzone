import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const links = await prisma.socialLink.findMany({
            where: { isActive: true },
            orderBy: { createdAt: 'asc' }
        });
        return NextResponse.json(links);
    } catch (error) {
        console.error("Error fetching social links:", error);
        return NextResponse.json({ error: "Failed to fetch social links" }, { status: 500 });
    }
}
