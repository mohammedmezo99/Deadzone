import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const configs = await prisma.siteConfig.findMany();
        const configMap = configs.reduce((acc: any, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {});
        return NextResponse.json(configMap);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { key, value } = body;

        if (!key) return NextResponse.json({ error: "Key is required" }, { status: 400 });

        const config = await prisma.siteConfig.upsert({
            where: { key },
            update: { value },
            create: { key, value },
        });

        return NextResponse.json(config);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update setting" }, { status: 500 });
    }
}
