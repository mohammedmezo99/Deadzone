import { NextResponse } from "next/server";
import { findDevice, publicBuilds } from "@/data/deadzone-registry";

export async function GET(request: Request, { params }: { params: { codename: string } }) {
    const device = findDevice(params.codename);

    if (!device) {
        return NextResponse.json({ error: "Device not found" }, { status: 404 });
    }

    const roms = publicBuilds
        .filter((build) => build.codename === params.codename)
        .map((build) => ({
            id: build.id,
            flavor: "Lite",
            version: build.rom,
            androidVersion: build.android,
            downloadUrl: build.download,
            fileName: build.filename,
            releaseDate: build.updated_at,
        }));

    return NextResponse.json({ ...device, roms });
}
