import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const devices = await prisma.device.findMany({
            include: {
                roms: {
                    orderBy: {
                        releaseDate: "desc",
                    },
                },
            },
            orderBy: {
                name: "asc",
            },
        });

        const formattedDevices = devices.map((d) => ({
            ...d,
            romCount: d.roms.length,
        }));

        return NextResponse.json(formattedDevices);
    } catch (error) {
        console.error("Public devices fetch failed:", error);
        return NextResponse.json({ error: "Failed to fetch devices" }, { status: 500 });
    }
}
