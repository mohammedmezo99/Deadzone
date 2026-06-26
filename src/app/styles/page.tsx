"use client";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Starfield } from "@/components/starfield";
import { GlassCard, RomBadge, SectionHeader } from "@/components/ui/deadzone";

const styles = [
    {
        name: "DeadZone Lite",
        access: "Public",
        accent: "cyan" as const,
        copy: "The public DeadZone build line with a clean HyperOS experience for public releases.",
    },
    {
        name: "GamingPlus",
        access: "Premium",
        accent: "magenta" as const,
        copy: "Premium style focused on sharper performance, game-first tuning, and a bolder feel.",
    },
    {
        name: "Legend",
        access: "Premium",
        accent: "gold" as const,
        copy: "Premium style for the most refined and polished DeadZone presentation.",
    },
    {
        name: "Ninja",
        access: "Premium",
        accent: "purple" as const,
        copy: "Premium style with a stealthier personality and a more aggressive visual identity.",
    },
];

export default function StylesPage() {
    return (
        <main className="relative min-h-screen">
            <Starfield />
            <Navbar />

            <section className="px-6 pb-20 pt-36">
                <div className="mx-auto max-w-7xl">
                    <SectionHeader
                        eyebrow="Styles"
                        title="DeadZone styles, correctly aligned."
                        description="Public users get DeadZone Lite. Premium Membership unlocks GamingPlus, Legend, and Ninja."
                        align="center"
                    />

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {styles.map((style) => (
                            <GlassCard key={style.name} accent={style.accent} className="h-full p-6">
                                <RomBadge accent={style.accent}>{style.access}</RomBadge>
                                <h2 className="mt-5 text-2xl font-black text-white">{style.name}</h2>
                                <p className="mt-3 text-sm leading-7 text-zinc-300">{style.copy}</p>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
