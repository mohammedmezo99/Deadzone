import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const faq = await (prisma.faq as any).update({
            where: { id: params.id },
            data: body,
        });
        revalidatePath("/faq");
        revalidatePath("/api/faq");
        return NextResponse.json(faq);
    } catch (error) {
        console.error("Error updating FAQ:", error);
        return NextResponse.json({ error: "Failed to update FAQ" }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.faq.delete({
            where: { id: params.id },
        });
        revalidatePath("/faq");
        revalidatePath("/api/faq");
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting FAQ:", error);
        return NextResponse.json({ error: "Failed to delete FAQ" }, { status: 500 });
    }
}
