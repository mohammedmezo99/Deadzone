import { NextResponse } from "next/server";
import { officialLinks } from "@/lib/links";

export async function GET() {
    return NextResponse.json([
        { id: "contact", platform: "telegram", title: "Contact MEZO", url: officialLinks.contactMezo },
        { id: "discussion", platform: "telegram", title: "Discussion Group", url: officialLinks.discussionGroup },
        { id: "updates", platform: "telegram", title: "Official Updates", url: officialLinks.officialUpdates },
        { id: "screenshots", platform: "telegram", title: "Screenshots Cloud", url: officialLinks.screenshotsCloud },
        { id: "devices", platform: "telegram", title: "Supported Devices", url: officialLinks.supportedDevices },
        { id: "rules", platform: "telegram", title: "Group Rules", url: officialLinks.groupRules },
    ]);
}
