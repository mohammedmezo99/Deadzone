"use client";

import Image from "next/image";
import { PremiumButton } from "@/components/ui/premium-button";
import { officialLinks, siteLinks } from "@/lib/links";
import { cn } from "@/lib/utils";

// Generate an array of screenshot paths (limited to first 8 for display)
const screenshotCount = 8;
const screenshots = Array.from({ length: screenshotCount }, (_, i) => `/showcase/deadzone-lite/${i + 1}.jpg`);

export function LiteGallery() {
  return (
    <section className="mt-10">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-black text-white">DeadZone Lite Preview</h2>
        <p className="mt-4 text-center text-sm text-zinc-300">
          Explore the public builds of DeadZone Lite through these screenshots.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {screenshots.map((src, idx) => (
            <div
              key={idx}
              className={cn(
                "group relative aspect-[4/3] rounded-[1.35rem] border border-white/10 bg-gradient-to-br",
                "from-cyan-400/30 via-blue-500/10 to-fuchsia-300/20",
                "overflow-hidden shadow-inner"
              )}
            >
              <Image
                src={src}
                alt={`DeadZone Lite screenshot ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-center gap-4">
          <PremiumButton href={siteLinks.downloads + "?style=Lite"} className="px-5 py-3 text-xs" variant="primary">
            View Builds
          </PremiumButton>
          <PremiumButton href={officialLinks.contactMezo} external className="px-5 py-3 text-xs" variant="secondary">
            Telegram
          </PremiumButton>
        </div>
      </div>
    </section>
  );
}
