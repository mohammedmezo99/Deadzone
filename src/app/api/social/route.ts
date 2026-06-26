import { NextResponse } from "next/server";
import { officialLinks } from "@/data/deadzone-registry";

export async function GET() {
    return NextResponse.json([
        { id: "contact", platform: "telegram", title: "Contact MEZO", url: officialLinks.contact },
        { id: "discussion", platform: "telegram", title: "Discussion Group", url: officialLinks.discussion },
        { id: "updates", platform: "telegram", title: "Official Updates", url: officialLinks.updates },
        { id: "screenshots", platform: "telegram", title: "Screenshots Cloud", url: officialLinks.screenshots },
        { id: "devices", platform: "telegram", title: "Supported Devices", url: officialLinks.supportedDevices },
        { id: "rules", platform: "telegram", title: "Group Rules", url: officialLinks.groupRules },
    ]);
}
