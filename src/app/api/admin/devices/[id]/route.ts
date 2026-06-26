import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const device = await prisma.device.findUnique({
            where: { id: params.id },
            include: { roms: true }
        });
        return NextResponse.json(device);
    } catch (error) {
        return NextResponse.json({ error: "Device not found" }, { status: 404 });
    }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const body = await req.json();
        const device = await prisma.device.update({
            where: { id: params.id },
            data: body
        });
        return NextResponse.json(device);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update device" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.device.delete({
            where: { id: params.id }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete device" }, { status: 500 });
    }
}
