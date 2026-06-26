import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, type, subject, message } = body;

        // Basic validation
        if (!name || !email || !type || !subject || !message) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const submission = await (prisma.contactForm as any).create({
            data: {
                name,
                email,
                type,
                subject,
                message,
                status: "new",
            },
        });

        return NextResponse.json({
            success: true,
            message: "Your message has been sent successfully!"
        }, { status: 201 });
    } catch (error) {
        console.error("Error submitting contact form:", error);
        return NextResponse.json({ error: "Failed to submit form" }, { status: 500 });
    }
}
