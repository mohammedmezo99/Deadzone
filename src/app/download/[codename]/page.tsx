import { redirect } from "next/navigation";

export default function LegacyDeviceDownloadPage({ params }: { params: { codename: string } }) {
    redirect(`/downloads?codename=${encodeURIComponent(params.codename)}`);
}
