import type { Metadata } from "next";
import { DownloadDeviceDetailClient } from "@/components/download-device-detail-client";
import { findSupportedDeviceRecord } from "@/data/supported-devices";
import { publicBuilds } from "@/lib/builds";
import { getDeadZoneVersion } from "@/lib/deadzone-version";

export async function generateMetadata({ params }: { params: { codename: string } }): Promise<Metadata> {
    const device = findSupportedDeviceRecord(params.codename);

    if (!device) {
        return {
            title: "Device Not Found | DeadZone Download Center",
            description: "The requested DeadZone device codename was not found in the supported-device source of truth.",
        };
    }

    return {
        title: `${device.name} | DeadZone Download Center`,
        description: `View DeadZone build status, available ROM entries, and request options for ${device.name} (${device.codename}).`,
        alternates: {
            canonical: `/downloads/${device.codename}`,
        },
    };
}

export default function DownloadDeviceDetailPage({ params }: { params: { codename: string } }) {
    const codename = params.codename.trim().toLowerCase();
    const device = findSupportedDeviceRecord(codename);
    const builds = publicBuilds.filter((build) => build.codename === codename);
    const deadZoneVersion = getDeadZoneVersion();

    return <DownloadDeviceDetailClient device={device} builds={builds} deadZoneVersion={deadZoneVersion} />;
}
