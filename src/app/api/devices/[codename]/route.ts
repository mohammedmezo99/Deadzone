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
            include: {
                roms: {
                    orderBy: {
                        releaseDate: "desc",
                    },
                },
            },
        });

        if (!device) {
            return NextResponse.json({ error: "Device not found" }, { status: 404 });
        }

        return NextResponse.json(device);
    } catch (error) {
        console.error("Device fetch failed:", error);
        return NextResponse.json({ error: "Failed to fetch device" }, { status: 500 });
    }
}
