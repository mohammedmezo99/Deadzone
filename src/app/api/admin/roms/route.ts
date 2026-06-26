import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const deviceId = searchParams.get("deviceId");

        const where = deviceId ? { deviceId } : {};

        const roms = await prisma.rom.findMany({
            where,
            include: {
                device: true,
                _count: {
                    select: { downloads: true }
                }
            },
            orderBy: { releaseDate: 'desc' }
        });
        return NextResponse.json(roms);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch ROMs" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            deviceId,
            name,
            version,
            androidVersion,
            flavor,
            soc,
            platform,
            type,
            downloadUrl,
            githubRunUrl,
            pixeldrainUrl,
            sha256,
            fileSize,
            changelog,
            installationGuide,
            isStable,
            isTestBuild,
            flashType,
            isVipOnly,
        } = body;

        const rom = await prisma.rom.create({
            data: {
                deviceId,
                name,
                version,
                androidVersion,
                flavor,
                soc,
                platform,
                type: type || "FREE",
                downloadUrl,
                githubRunUrl,
                pixeldrainUrl,
                sha256,
                fileSize,
                changelog,
                installationGuide,
                isStable: isStable ?? true,
                isTestBuild: isTestBuild ?? false,
                flashType,
                isVipOnly: isVipOnly || false,
            }
        });

        return NextResponse.json(rom);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create ROM" }, { status: 500 });
    }
}
