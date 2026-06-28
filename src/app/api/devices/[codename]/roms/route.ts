import { NextResponse } from "next/server";
import { hasPublishedFile, publicBuilds } from "@/lib/builds";
import { getDeadZoneVersion } from "@/lib/deadzone-version";

export async function GET(request: Request, { params }: { params: { codename: string } }) {
    const deadZoneVersion = getDeadZoneVersion();
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

    return NextResponse.json(roms);
}
