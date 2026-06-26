import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface Params {
    params: {
        id: string;
    }
}

export async function PUT(req: Request, { params }: Params) {
    try {
        const body = await req.json();

        // Recalculate order if role changes
        if (body.role) {
            let order = 100;
            const lowerRole = body.role.toLowerCase();
            if (lowerRole.includes("founder") && !lowerRole.includes("co")) order = 0;
            else if (lowerRole.includes("co-founder") || lowerRole.includes("cofounder")) order = 1;
            else if (lowerRole.includes("lead")) order = 2;
            else if (lowerRole.includes("developer")) order = 3;
            else if (lowerRole.includes("moderator")) order = 4;
            body.order = order;
        }

        const member = await (prisma.teamMember as any).update({
            where: { id: params.id },
            data: body,
        });

        revalidatePath("/team");
        revalidatePath("/api/team");

        return NextResponse.json(member);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update team member" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: Params) {
    try {
        await prisma.teamMember.delete({
            where: { id: params.id },
        });
        revalidatePath("/team");
        revalidatePath("/api/team");

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete team member" }, { status: 500 });
    }
}
