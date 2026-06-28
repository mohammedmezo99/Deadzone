import { NextResponse } from "next/server";
import { findSupportedDevice } from "@/data/devices";
import { hasPublishedFile, publicBuilds } from "@/lib/builds";
import { getDeadZoneVersion } from "@/lib/deadzone-version";

export async function GET(request: Request, { params }: { params: { codename: string } }) {
    const device = findSupportedDevice(params.codename);
    const deadZoneVersion = getDeadZoneVersion();

    if (!device) {
        return NextResponse.json({ error: "Device not found" }, { status: 404 });
    }

    const roms = publicBuilds
        .filter((build) => build.codename === params.codename)
        .map((build) => ({
            id: build.id,
            flavor: build.style,
            version: build.romVersion,
            deadZoneVersion: build.deadZoneVersion || deadZoneVersion,
            androidVersion: build.androidVersion,
            hyperOsVersion: build.hyperOsVersion,
            status: hasPublishedFile(build) ? build.status : "Coming Soon",
            downloadUrl: hasPublishedFile(build) ? build.downloadUrl : undefined,
            fileName: hasPublishedFile(build) ? build.filename : undefined,
            releaseDate: build.updatedAt,
        }));

    return NextResponse.json({ ...device, roms });
}
