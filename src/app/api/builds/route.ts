import { NextRequest, NextResponse } from "next/server";
import { resolveWebsiteBuilds, type PublicBuildsResponse } from "@/lib/builds";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function emptyResponse(ok = true) {
    return NextResponse.json<PublicBuildsResponse>({ ok, builds: [] });
}

export async function GET(request: NextRequest) {
    const codename = request.nextUrl.searchParams.get("codename")?.toLowerCase();

    try {
        const result = await resolveWebsiteBuilds(codename);
        return NextResponse.json<PublicBuildsResponse>(result);
    } catch {
        return emptyResponse(false);
    }
}
