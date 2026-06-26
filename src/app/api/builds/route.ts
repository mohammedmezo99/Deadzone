import { NextRequest, NextResponse } from "next/server";
import { normalizeWorkerBuilds, publicBuilds } from "@/data/deadzone-registry";

export async function GET(request: NextRequest) {
    const codename = request.nextUrl.searchParams.get("codename")?.toLowerCase();
    const rows = codename ? publicBuilds.filter((build) => build.codename === codename) : publicBuilds;

    return NextResponse.json(normalizeWorkerBuilds(rows));
}
