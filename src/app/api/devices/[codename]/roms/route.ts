import { NextResponse } from "next/server";
import { publicBuilds } from "@/lib/builds";

export async function GET(request: Request, { params }: { params: { codename: string } }) {
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

    return NextResponse.json(roms);
}
