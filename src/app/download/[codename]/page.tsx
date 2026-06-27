import { redirect } from "next/navigation";
import { buildDownloadsPath } from "@/lib/links";

export default function LegacyDeviceDownloadPage({ params }: { params: { codename: string } }) {
    redirect(buildDownloadsPath({ codename: params.codename }));
}
