"use client";

import { Smartphone } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { getDeviceImage } from "@/lib/device-images";

type DeviceImageProps = {
    codename: string;
    name: string;
    src?: string;
    alt?: string;
    soc?: "MTK" | "Snapdragon" | string;
    className?: string;
    imageClassName?: string;
    priority?: boolean;
};

export function DeviceImage({
    codename,
    name,
    src,
    alt,
    soc,
    className,
    imageClassName,
    priority = false,
}: DeviceImageProps) {
    const [failed, setFailed] = useState(false);
    const imageSrc = src ?? getDeviceImage(codename);
    const isMtk = soc === "MTK";
    const showPlaceholder = failed || !imageSrc;

    function renderPlaceholder() {
        return (
            <div className="relative flex h-full w-full flex-col items-center justify-center p-6 text-center">
                <div className="mb-3 flex h-24 w-14 items-center justify-center rounded-[1.5rem] border border-white/20 bg-black/45 shadow-2xl shadow-black/60">
                    <Smartphone className="h-8 w-8 text-cyan-100" />
                </div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200/80">DeadZone</p>
                <p className="mt-2 text-sm font-black text-white">Device image coming soon</p>
                <p className="mt-2 max-w-[14rem] text-sm font-semibold text-zinc-300">{name}</p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-400">{codename}</p>
            </div>
        );
    }

    return (
        <div
            className={cn(
                "relative flex aspect-[4/3] min-h-[190px] items-center justify-center overflow-hidden rounded-[1.35rem] border border-white/10 bg-gradient-to-br",
                isMtk ? "from-purple-400/30 via-fuchsia-500/10 to-cyan-300/20" : "from-blue-400/30 via-cyan-500/10 to-fuchsia-300/20",
                className
            )}
        >
            <div className="absolute inset-0 deadzone-grid opacity-35" />
            {!showPlaceholder ? (
                <Image
                    src={imageSrc}
                    alt={alt || `${name} device image`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    priority={priority}
                    className={cn("object-contain p-5 drop-shadow-2xl transition-transform duration-500 group-hover:scale-105", imageClassName)}
                    onError={() => setFailed(true)}
                />
            ) : (
                renderPlaceholder()
            )}
            <div className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/55 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur-xl">
                {codename}
            </div>
        </div>
    );
}
