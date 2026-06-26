import { NextResponse } from "next/server";
import { supportedDevices } from "@/data/devices";

export async function GET() {
    return NextResponse.json(supportedDevices);
}
