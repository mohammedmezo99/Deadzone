import { NextResponse } from "next/server";
import { findSupportedDevice } from "@/data/devices";
import { publicBuilds } from "@/lib/builds";

export async function GET(request: Request, { params }: { params: { codename: string } }) {
    const device = findSupportedDevice(params.codename);

    if (!device) {
        return NextResponse.json({ error: "Device not found" }, { status: 404 });
    }

    const roms = publicBuilds
        .filter((build) => build.codename === params.codename)
        .map((build) => ({
            id: build.id,
            flavor: build.style,
            version: build.romVersion,
            androidVersion: build.android,
            downloadUrl: build.downloadUrl,
            fileName: build.filename,
            releaseDate: build.updatedAt,
        }));

    return NextResponse.json({ ...device, roms });
}
