import { NextResponse } from "next/server";
import { publicBuilds } from "@/data/deadzone-registry";

export async function GET(request: Request, { params }: { params: { codename: string } }) {
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

    return NextResponse.json(roms);
}
