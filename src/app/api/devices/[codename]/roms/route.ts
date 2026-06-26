import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
    request: Request,
    { params }: { params: { codename: string } }
) {
    try {
        const device = await prisma.device.findUnique({
            where: {
                codename: params.codename,
            },
            select: {
                id: true,
            },
        });

        if (!device) {
            return NextResponse.json({ error: "Device not found" }, { status: 404 });
        }

        const roms = await prisma.rom.findMany({
            where: {
                deviceId: device.id,
            },
            orderBy: {
                releaseDate: "desc",
            },
        });

        return NextResponse.json(roms);
    } catch (error) {
        console.error("Device ROMs fetch failed:", error);
        return NextResponse.json({ error: "Failed to fetch ROMs" }, { status: 500 });
    }
}
