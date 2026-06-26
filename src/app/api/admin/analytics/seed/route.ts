import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const today = new Date();
        const trend = [];

        for (let i = 13; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];

            // Generate some random but realistic looking counts
            const count = Math.floor(Math.random() * 50) + 20;
            trend.push({ date: dateStr, count });
        }

        await prisma.siteConfig.upsert({
            where: { key: "visitor_trend" },
            update: { value: JSON.stringify(trend) },
            create: { key: "visitor_trend", value: JSON.stringify(trend) }
        });

        return NextResponse.json({ success: true, seeded: trend });
    } catch (error) {
        console.error("Seeding failed:", error);
        return NextResponse.json({ error: "Seeding failed" }, { status: 500 });
    }
}
