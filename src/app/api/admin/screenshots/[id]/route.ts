import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const screenshot = await (prisma.screenshot as any).update({
            where: { id: params.id },
            data: body,
        });
        revalidatePath("/gallery");
        revalidatePath("/api/screenshots");
        return NextResponse.json(screenshot);
    } catch (error) {
        console.error("Error updating screenshot:", error);
        return NextResponse.json({ error: "Failed to update screenshot" }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.screenshot.delete({
            where: { id: params.id },
        });
        revalidatePath("/gallery");
        revalidatePath("/api/screenshots");
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting screenshot:", error);
        return NextResponse.json({ error: "Failed to delete screenshot" }, { status: 500 });
    }
}
