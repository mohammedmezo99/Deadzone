import { NextResponse } from "next/server";
import { dataClient } from "@/lib/data-client";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const screenshots = await dataClient.screenshot.findMany({
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
