import { NextResponse } from "next/server";
import { dataClient } from "@/lib/data-client";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const faqs = await dataClient.faq.findMany({
            orderBy: [
                { order: 'asc' },
                { createdAt: 'asc' }
            ]
        });
        return NextResponse.json(faqs);
    } catch (error) {
        console.error("Error fetching FAQs:", error);
        return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
    }
}
