import type { Metadata } from "next";
import { DownloadsPageClient } from "@/components/downloads-page-client";

export const metadata: Metadata = {
    title: "DeadZone Download Center | Supported Devices and ROM Access",
    description:
        "Browse DeadZone supported devices by name, codename, category, and style. Open a device detail page to view builds, ROM status, and request options.",
    alternates: {
        canonical: "/downloads",
    },
};

export default function DownloadsPage({
    searchParams,
}: {
    searchParams?: { codename?: string; style?: string };
}) {
    const initialCodename = (searchParams?.codename || "").trim().toLowerCase();
    const style = (searchParams?.style || "").trim();
    const initialStyle = style === "Lite" || style === "GamingPlus" || style === "Legend" || style === "Ninja" ? style : "All";

    return (
        <DownloadsPageClient
            initialCodename={initialCodename}
            initialStyle={initialStyle}
        />
    );
}
