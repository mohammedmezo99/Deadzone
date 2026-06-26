import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const links = await prisma.socialLink.findMany({
            orderBy: { createdAt: 'asc' }
        });
        return NextResponse.json(links);
    } catch (error) {
        console.error("Error fetching social links:", error);
        return NextResponse.json({ error: "Failed to fetch social links" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { platform, url, isActive } = body;

        const link = await (prisma.socialLink as any).create({
            data: {
                platform,
                url,
                isActive: isActive !== undefined ? isActive : true,
            },
        });

        revalidatePath("/api/social");
        return NextResponse.json(link, { status: 201 });
    } catch (error) {
        console.error("Error creating social link:", error);
        return NextResponse.json({ error: "Failed to create social link" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, platform, url, isActive } = body;

        const link = await (prisma.socialLink as any).update({
            where: { id },
            data: { platform, url, isActive },
        });

        revalidatePath("/api/social");
        return NextResponse.json(link);
    } catch (error) {
        console.error("Error updating social link:", error);
        return NextResponse.json({ error: "Failed to update social link" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        await prisma.socialLink.delete({
            where: { id },
        });

        revalidatePath("/api/social");
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting social link:", error);
        return NextResponse.json({ error: "Failed to delete social link" }, { status: 500 });
    }
}
