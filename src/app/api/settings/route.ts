import { NextResponse } from "next/server";
import dataClient from "@/lib/data-client";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const configs = await dataClient.siteConfig.findMany();
        const configMap = configs.reduce((acc: any, curr: any) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {});
        return NextResponse.json(configMap);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
    }
}
