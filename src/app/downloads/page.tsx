import type { Metadata } from "next";
import { DownloadsPageClient } from "@/components/downloads-page-client";
import { publicBuilds } from "@/lib/builds";

export const metadata: Metadata = {
    title: "DeadZone Downloads | Public Builds and Status by Device",
    description:
        "Browse DeadZone downloads by device name, codename, and style. Check Lite, GamingPlus, Legend, and Ninja build status, changelogs, and download availability.",
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
            initialBuilds={publicBuilds}
            initialCodename={initialCodename}
            initialStyle={initialStyle}
        />
    );
}
