"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PremiumButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    external?: boolean;
    className?: string;
    icon?: React.ReactNode;
    loading?: boolean;
    variant?: "primary" | "secondary" | "legend" | "danger";
}

const variantClasses: Record<NonNullable<PremiumButtonProps["variant"]>, string> = {
    primary: "border-cyan-300/35 bg-[linear-gradient(135deg,rgba(34,211,238,0.92),rgba(59,130,246,0.92),rgba(217,70,239,0.92))] text-slate-950 shadow-[0_18px_45px_rgba(34,211,238,0.18)] hover:shadow-[0_22px_60px_rgba(34,211,238,0.24)]",
    secondary: "border-white/12 bg-white/[0.045] text-white hover:border-cyan-300/28 hover:bg-white/[0.08]",
    legend: "border-amber-300/35 bg-[linear-gradient(135deg,rgba(253,224,71,0.95),rgba(251,191,36,0.95),rgba(249,115,22,0.95))] text-black shadow-[0_18px_45px_rgba(251,191,36,0.2)] hover:shadow-[0_22px_60px_rgba(251,191,36,0.26)]",
    danger: "border-red-400/30 bg-red-500/85 text-white hover:bg-red-400/90",
};

const baseClassName =
    "group inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl border px-6 py-4 text-sm font-black uppercase tracking-[0.16em] transition duration-300";

function ButtonContent({ children, icon, loading }: Pick<PremiumButtonProps, "children" | "icon" | "loading">) {
    return (
        <>
            {loading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current/25 border-t-current" />
            ) : (
                <>
                    {icon}
                    <span>{children}</span>
                </>
            )}
        </>
    );
}

export function PremiumButton({
    children,
    onClick,
    href,
    external = false,
    className,
    icon,
    loading,
    variant = "primary",
}: PremiumButtonProps) {
    const classes = cn(baseClassName, variantClasses[variant], className);

    if (href) {
        if (external) {
            return (
                <motion.a
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes}
                >
                    <ButtonContent icon={icon} loading={loading}>{children}</ButtonContent>
                </motion.a>
            );
        }

        return (
            <motion.div whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <Link href={href} className={classes}>
                    <ButtonContent icon={icon} loading={loading}>{children}</ButtonContent>
                </Link>
            </motion.div>
        );
    }

    return (
        <motion.button
            type="button"
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={onClick}
            disabled={loading}
            className={classes}
        >
            <ButtonContent icon={icon} loading={loading}>{children}</ButtonContent>
        </motion.button>
    );
}
