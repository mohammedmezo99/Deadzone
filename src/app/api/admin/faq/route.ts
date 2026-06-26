import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const faqs = await prisma.faq.findMany({
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

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { question, answer, category, order } = body;

        const faq = await (prisma.faq as any).create({
            data: {
                question,
                answer,
                category,
                order: order || 0,
            },
        });

        revalidatePath("/faq");
        revalidatePath("/api/faq");

        return NextResponse.json(faq, { status: 201 });
    } catch (error) {
        console.error("Error creating FAQ:", error);
        return NextResponse.json({ error: "Failed to create FAQ" }, { status: 500 });
    }
}
