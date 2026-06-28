import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { GalleryTabs } from "@/components/gallery-tabs";
import { Navbar } from "@/components/navbar";
import { Starfield } from "@/components/starfield";
import { GlassCard, SectionHeader } from "@/components/ui/deadzone";
import { getDeadZoneLiteGalleryImages } from "@/lib/gallery";

export const metadata: Metadata = {
    title: "DeadZone Gallery",
    description: "Explore DeadZone screenshots and visual previews for Lite, GamingPlus, Legend, and Ninja.",
    alternates: {
        canonical: "/gallery",
    },
};

export default function GalleryPage() {
    const liteImages = getDeadZoneLiteGalleryImages();

    return (
        <main className="page-shell">
            <Starfield />
            <Navbar />

            <section className="px-6 pb-20 pt-36">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        eyebrow="Gallery"
                        title="DeadZone Gallery"
                        description="Explore DeadZone screenshots and visual previews for Lite, GamingPlus, Legend, and Ninja."
                        align="center"
                    />

                    <GlassCard accent="cyan" className="mx-auto max-w-5xl p-6 md:p-8">
                        <p className="text-center text-sm leading-7 text-zinc-300">
                            Screenshot previews only. Browse the DeadZone Lite gallery now, then check upcoming GamingPlus, Legend, and Ninja sections as new visuals are added.
                        </p>
                    </GlassCard>

                    <GalleryTabs liteImages={liteImages} />
                </div>
            </section>

            <Footer />
        </main>
    );
}
