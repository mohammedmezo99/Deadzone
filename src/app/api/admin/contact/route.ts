import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const submissions = await prisma.contactForm.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(submissions);
    } catch (error) {
        console.error("Error fetching contact submissions:", error);
        return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, status } = body;

        const submission = await (prisma.contactForm as any).update({
            where: { id },
            data: { status },
        });

        return NextResponse.json(submission);
    } catch (error) {
        console.error("Error updating submission:", error);
        return NextResponse.json({ error: "Failed to update submission" }, { status: 500 });
    }
}
