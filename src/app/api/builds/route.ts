import { NextRequest, NextResponse } from "next/server";
import { getPublicBuilds, publicBuilds, type PublicBuildsResponse } from "@/lib/builds";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function emptyResponse(ok = true) {
    return NextResponse.json<PublicBuildsResponse>({ ok, builds: [] });
}

function fallbackBuilds(codename?: string | null) {
    if (!codename) {
        return publicBuilds;
    }

    return publicBuilds.filter((build) => build.codename === codename);
}

export async function GET(request: NextRequest) {
    const codename = request.nextUrl.searchParams.get("codename")?.toLowerCase();
    const base = process.env.DEADZONE_WORKER_API_BASE?.trim();

    if (!base) {
        return NextResponse.json<PublicBuildsResponse>({
            ok: true,
            builds: fallbackBuilds(codename),
        });
    }

    const workerBase = base.replace(/\/+$/, "");
    const endpoint = codename
        ? `${workerBase}/api/builds?codename=${encodeURIComponent(codename)}`
        : `${workerBase}/api/builds`;

    try {
        const response = await fetch(endpoint, {
            cache: "no-store",
            headers: {
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            return emptyResponse(false);
        }

        const payload = await response.json();
        const source = Array.isArray(payload) ? payload : payload?.builds;

        const workerBuilds = getPublicBuilds(source);

        return NextResponse.json<PublicBuildsResponse>({
            ok: true,
            builds: workerBuilds.length ? workerBuilds : fallbackBuilds(codename),
        });
    } catch {
        return NextResponse.json<PublicBuildsResponse>({
            ok: false,
            builds: fallbackBuilds(codename),
        });
    }
}
