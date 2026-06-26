import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await req.json();
        const rom = await prisma.rom.update({
            where: { id: params.id },
            data: body,
        });
        return NextResponse.json(rom);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update ROM" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.rom.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete ROM" }, { status: 500 });
    }
}
