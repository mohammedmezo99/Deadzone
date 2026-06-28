"use client";

import Image from "next/image";
import { useState, useCallback, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Smartphone } from "lucide-react";
import { PremiumButton } from "@/components/ui/premium-button";
import { officialLinks, siteLinks } from "@/lib/links";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  All 31 DeadZone Lite screenshots                                   */
/* ------------------------------------------------------------------ */
const TOTAL_SCREENSHOTS = 31;
const screenshots = Array.from({ length: TOTAL_SCREENSHOTS }, (_, i) => {
  const num = i + 1;
  return {
    src: `/showcase/deadzone-lite/${num}.jpg`,
    label: `Lite Screenshot ${num}`,
  };
});

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export function LiteGallery() {
  const [current, setCurrent] = useState(0);
  const thumbRef = useRef<HTMLDivElement>(null);

  const prev = useCallback(
    () => setCurrent((c) => (c === 0 ? screenshots.length - 1 : c - 1)),
    []
  );
  const next = useCallback(
    () => setCurrent((c) => (c === screenshots.length - 1 ? 0 : c + 1)),
    []
  );

  /* keyboard navigation */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  /* auto-scroll thumbnail strip to keep active thumb visible */
  useEffect(() => {
    const container = thumbRef.current;
    if (!container) return;
    const active = container.children[current] as HTMLElement | undefined;
    if (active) {
      active.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [current]);

  const shot = screenshots[current];

  return (
    <section id="lite-gallery" className="px-6 pb-24 pt-14">
      <div className="mx-auto max-w-5xl">
        {/* ── Header ─────────────────────────────────────────── */}
        <div className="mb-10 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-cyan-300">
            Public Style Preview
          </p>
          <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">
            DeadZone Lite Highlights
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-zinc-400">
            Explore the public DeadZone Lite experience with clean HyperOS
            visuals, stable daily use, and a lightweight DeadZone identity.
          </p>
        </div>

        {/* ── Description card ───────────────────────────────── */}
        <div className="mb-8 rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-cyan-500/[0.06] via-transparent to-fuchsia-500/[0.06] p-6 backdrop-blur-xl md:p-8">
          <div className="flex items-start gap-4">
            <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/25 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 md:flex">
              <Smartphone className="h-5 w-5 text-cyan-200" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                DeadZone Lite
              </h3>
              <p className="mt-2 text-sm leading-7 text-zinc-400">
                DeadZone Lite is the public DeadZone style focused on clean
                performance, stable daily use, and a smooth HyperOS-based
                experience for supported Xiaomi, Redmi, and POCO devices.
              </p>
            </div>
          </div>
        </div>

        {/* ── Gallery container ──────────────────────────────── */}
        <div className="rounded-[1.8rem] border border-white/10 bg-gradient-to-br from-cyan-500/[0.04] via-black/40 to-fuchsia-500/[0.04] shadow-[0_0_80px_rgba(34,211,238,0.06)] backdrop-blur-xl">
          {/* Main preview area */}
          <div className="relative flex items-center justify-center px-4 pt-6 md:px-10 md:pt-8">
            {/* Previous button */}
            <button
              type="button"
              onClick={prev}
              aria-label="Previous screenshot"
              className={cn(
                "absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center",
                "rounded-full border border-white/15 bg-black/60 text-white/80 backdrop-blur-md",
                "transition-all hover:border-cyan-300/40 hover:bg-black/80 hover:text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]",
                "md:left-3 md:h-11 md:w-11"
              )}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Screenshot display */}
            <div className="relative mx-auto aspect-[9/16] w-full max-w-xs overflow-hidden rounded-[1.2rem] border border-white/10 bg-black/50 sm:max-w-sm md:max-w-md">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={shot.src}
                    alt={shot.label}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 448px"
                    className="object-contain"
                    priority={current < 3}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next button */}
            <button
              type="button"
              onClick={next}
              aria-label="Next screenshot"
              className={cn(
                "absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center",
                "rounded-full border border-white/15 bg-black/60 text-white/80 backdrop-blur-md",
                "transition-all hover:border-cyan-300/40 hover:bg-black/80 hover:text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]",
                "md:right-3 md:h-11 md:w-11"
              )}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Counter + label */}
          <div className="mt-4 flex flex-col items-center gap-1 px-4">
            <p className="font-mono text-sm font-bold tracking-wider text-white">
              {current + 1}{" "}
              <span className="text-zinc-500">/</span>{" "}
              {screenshots.length}
            </p>
            <p className="text-xs text-zinc-400">{shot.label}</p>
          </div>

          {/* Thumbnail strip */}
          <div
            ref={thumbRef}
            className="mt-5 flex gap-2 overflow-x-auto px-4 pb-6 scrollbar-hide md:px-6"
          >
            {screenshots.map((s, idx) => (
              <button
                key={s.src}
                type="button"
                onClick={() => setCurrent(idx)}
                aria-label={`View ${s.label}`}
                className={cn(
                  "relative flex-none overflow-hidden rounded-xl border transition-all duration-200",
                  "h-16 w-10 sm:h-20 sm:w-[52px]",
                  idx === current
                    ? "border-cyan-400/60 shadow-[0_0_12px_rgba(34,211,238,0.25)] ring-1 ring-cyan-400/30"
                    : "border-white/10 opacity-50 hover:opacity-80 hover:border-white/25"
                )}
              >
                <Image
                  src={s.src}
                  alt={s.label}
                  fill
                  sizes="52px"
                  className="object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        {/* ── CTA card ───────────────────────────────────────── */}
        <div className="mt-10 rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-cyan-500/[0.06] via-transparent to-fuchsia-500/[0.06] p-6 backdrop-blur-xl md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h3 className="text-2xl font-black text-white">
                Get DeadZone Lite
              </h3>
              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Public Lite builds can be requested through the DeadZone
                Telegram bot for supported devices.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <PremiumButton
                href={siteLinks.downloads + "?style=Lite"}
                className="px-5 py-3 text-xs"
                variant="primary"
              >
                View Lite Builds
              </PremiumButton>
              <PremiumButton
                href={siteLinks.devices}
                className="px-5 py-3 text-xs"
                variant="secondary"
              >
                Supported Devices
              </PremiumButton>
              <PremiumButton
                href={officialLinks.contactMezo}
                external
                className="px-5 py-3 text-xs"
                variant="secondary"
              >
                Contact MEZO
              </PremiumButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
