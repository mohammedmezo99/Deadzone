"use client";

import { Wrench } from "lucide-react";
import { GlassCard, RomBadge } from "@/components/ui/deadzone";

export function MaintenanceBanner() {
    return (
        <GlassCard accent="gold" className="mb-8 overflow-hidden p-5 md:p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.14),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.12),transparent_38%)]" />
            <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="max-w-4xl">
                    <RomBadge accent="gold">🛠 DeadZone Maintenance Active</RomBadge>
                    <p className="mt-4 text-sm leading-7 text-zinc-200 md:text-base">
                        MEZO is currently checking reported issues.
                        Please report your device name, codename, ROM version, Android version, DeadZone style, and full problem details.
                    </p>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-300/30 bg-amber-400/10 text-amber-100">
                    <Wrench className="h-5 w-5" />
                </div>
            </div>
        </GlassCard>
    );
}
