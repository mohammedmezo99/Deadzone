import { NextResponse } from "next/server";
import { devices } from "@/data/deadzone-registry";

export async function GET() {
    return NextResponse.json(devices);
}
