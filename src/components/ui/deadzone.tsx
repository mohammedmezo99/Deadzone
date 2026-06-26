import React from "react";
import { cn } from "@/lib/utils";

type Accent = "cyan" | "blue" | "purple" | "magenta" | "gold" | "red" | "slate";

const accents: Record<Accent, string> = {
    cyan: "border-cyan-300/30 bg-cyan-400/10 text-cyan-100 shadow-cyan-500/10",
    blue: "border-blue-300/30 bg-blue-500/10 text-blue-100 shadow-blue-500/10",
    purple: "border-purple-300/30 bg-purple-500/10 text-purple-100 shadow-purple-500/10",
    magenta: "border-fuchsia-300/30 bg-fuchsia-500/10 text-fuchsia-100 shadow-fuchsia-500/10",
    gold: "border-amber-300/35 bg-amber-400/10 text-amber-100 shadow-amber-500/10",
    red: "border-red-300/30 bg-red-500/10 text-red-100 shadow-red-500/10",
    slate: "border-white/10 bg-white/[0.04] text-zinc-200 shadow-black/20",
};

export function SectionHeader({
    eyebrow,
    title,
    description,
    align = "left",
}: {
    eyebrow: string;
    title: React.ReactNode;
    description?: string;
    align?: "left" | "center";
}) {
    return (
        <div className={cn("mb-10", align === "center" && "mx-auto max-w-3xl text-center")}>
            <div className="mb-3 text-[11px] font-black uppercase tracking-[0.32em] text-cyan-200">
                {eyebrow}
            </div>
            <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">
                {title}
            </h2>
            {description && (
                <p className="mt-4 text-sm leading-7 text-zinc-400 md:text-base">
                    {description}
                </p>
            )}
        </div>
    );
}

export function GlassCard({
    children,
    className,
    accent = "cyan",
}: {
    children?: React.ReactNode;
    className?: string;
    accent?: Accent;
}) {
    const glow =
        accent === "gold" ? "after:bg-amber-400/20" :
            accent === "purple" ? "after:bg-purple-500/20" :
                accent === "magenta" ? "after:bg-fuchsia-500/20" :
                    accent === "blue" ? "after:bg-blue-500/20" :
                        accent === "red" ? "after:bg-red-500/15" : "after:bg-cyan-400/18";

    return (
        <div
            className={cn(
                "hud-card relative overflow-hidden rounded-[2rem] border bg-[#070a10]/72 shadow-2xl shadow-black/45 backdrop-blur-2xl",
                accents[accent],
                "before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,0.09),transparent_34%,rgba(255,255,255,0.035))]",
                "after:pointer-events-none after:absolute after:-right-20 after:-top-20 after:h-44 after:w-44 after:rounded-full after:blur-[70px]",
                glow,
                className
            )}
        >
            <div className="pointer-events-none absolute left-0 top-0 h-8 w-8 border-l border-t border-current/50" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-8 w-8 border-b border-r border-current/40" />
            <div className="relative z-10">{children}</div>
        </div>
    );
}

export function RomBadge({
    children,
    className,
    accent = "cyan",
}: {
    children: React.ReactNode;
    className?: string;
    accent?: Accent;
}) {
    return (
        <span
            className={cn(
                "inline-flex min-h-7 items-center rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] shadow-lg",
                accents[accent],
                className
            )}
        >
            {children}
        </span>
    );
}

export function StatusBadge({
    stable,
    test,
    comingSoon,
}: {
    stable?: boolean;
    test?: boolean;
    comingSoon?: boolean;
}) {
    const label = comingSoon ? "Coming Soon" : test ? "Test Build" : stable === false ? "Experimental" : "Stable";
    const accent: Accent = comingSoon ? "slate" : test ? "gold" : stable === false ? "magenta" : "cyan";
    return <RomBadge accent={accent}>{label}</RomBadge>;
}

export function PlatformPill({ children, accent = "cyan" }: { children: React.ReactNode; accent?: Accent }) {
    return (
        <span className={cn("inline-flex min-h-11 items-center justify-center rounded-2xl border px-4 text-xs font-black uppercase tracking-[0.16em]", accents[accent])}>
            {children}
        </span>
    );
}

export function NeonDivider() {
    return <div className="mx-auto my-8 h-px max-w-5xl bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />;
}
