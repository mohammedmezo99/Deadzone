"use client";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Starfield } from "@/components/starfield";
import { GlassCard, RomBadge, SectionHeader } from "@/components/ui/deadzone";
import { romStyles } from "@/data/styles";

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
                        {romStyles.map((style) => (
                            <GlassCard key={style.id} accent={style.accent} className="h-full p-6">
                                <RomBadge accent={style.accent}>{style.type === "public" ? "Public" : "Premium"}</RomBadge>
                                <h2 className="mt-5 text-2xl font-black text-white">{style.name}</h2>
                                <p className="mt-3 text-sm leading-7 text-zinc-300">{style.shortDescription}</p>
                                <ul className="mt-5 space-y-2 text-sm text-zinc-400">
                                    {style.features.map((feature) => (
                                        <li key={feature}>{feature}</li>
                                    ))}
                                </ul>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
