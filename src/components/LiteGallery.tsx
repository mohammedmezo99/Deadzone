"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";
import { PremiumButton } from "@/components/ui/premium-button";
import { officialLinks, siteLinks } from "@/lib/links";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

/**
 * All 31 DeadZone Lite screenshots from public/showcase/deadzone-lite.
 * We list every file so that no screenshot is excluded.
 */
const TOTAL_SCREENSHOTS = 31;
const screenshots = Array.from({ length: TOTAL_SCREENSHOTS }, (_, i) => {
  const num = i + 1;
  return {
    src: `/showcase/deadzone-lite/${num}.jpg`,
    label: `Lite Screenshot ${num}`,
  };
});

export function LiteGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section className="px-6 pb-20 pt-10">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-10 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-cyan-300">
            Screenshot Gallery
          </p>
          <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">
            DeadZone Lite Preview
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-zinc-400">
            Explore all available DeadZone Lite screenshots for the public Lite
            experience.
          </p>
        </div>

        {/* Screenshot grid — responsive: 2 cols mobile, 3 cols md, 4 cols lg */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {screenshots.map((shot, idx) => (
            <button
              key={shot.src}
              type="button"
              onClick={() => setLightboxIndex(idx)}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-[1.35rem]",
                "border border-white/10 bg-gradient-to-br from-cyan-400/10 via-blue-500/5 to-fuchsia-400/10",
                "transition-all duration-300",
                "hover:-translate-y-1 hover:border-cyan-300/30 hover:shadow-[0_8px_32px_rgba(34,211,238,0.15)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
              )}
            >
              {/* Image container — NO cropping */}
              <div className="relative aspect-[9/16] w-full bg-black/30">
                <Image
                  src={shot.src}
                  alt={shot.label}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-contain p-1 transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              {/* Label */}
              <div className="px-3 py-2.5">
                <p className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors">
                  {shot.label}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Action buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <PremiumButton
            href={siteLinks.downloads + "?style=Lite"}
            className="px-6 py-3 text-xs"
            variant="primary"
          >
            View Lite Builds
          </PremiumButton>
          <PremiumButton
            href={officialLinks.contactMezo}
            external
            className="px-6 py-3 text-xs"
            variant="secondary"
          >
            Contact MEZO
          </PremiumButton>
        </div>
      </div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-lg p-4"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition-colors hover:bg-white/10"
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Nav: prev */}
            {lightboxIndex > 0 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(lightboxIndex - 1);
                }}
                className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-xl text-white transition-colors hover:bg-white/10 sm:left-4"
                aria-label="Previous screenshot"
              >
                ‹
              </button>
            )}

            {/* Nav: next */}
            {lightboxIndex < screenshots.length - 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(lightboxIndex + 1);
                }}
                className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-xl text-white transition-colors hover:bg-white/10 sm:right-4"
                aria-label="Next screenshot"
              >
                ›
              </button>
            )}

            {/* Full image — NO cropping */}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative h-[85vh] w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={screenshots[lightboxIndex].src}
                alt={screenshots[lightboxIndex].label}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
              <p className="absolute bottom-0 left-0 right-0 bg-black/70 py-2 text-center text-sm font-bold text-white backdrop-blur-sm rounded-b-2xl">
                {screenshots[lightboxIndex].label}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
