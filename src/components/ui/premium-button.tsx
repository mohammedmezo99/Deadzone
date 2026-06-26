"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface PremiumButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    icon?: React.ReactNode;
    loading?: boolean;
    variant?: "primary" | "secondary" | "legend" | "danger";
}

export function PremiumButton({ children, onClick, className, icon, loading, variant = "primary" }: PremiumButtonProps) {
    const [particles, setParticles] = useState<number[]>([]);

    const handleClick = () => {
        // Simple particle burst effect
        const now = Date.now();
        setParticles(prev => [...prev, now]);
        setTimeout(() => {
            setParticles(prev => prev.filter(p => p !== now));
        }, 1000);

        if (onClick) onClick();
    };

    return (
        <div className="relative">
            <AnimatePresence>
                {particles.map(id => (
                    <motion.div
                        key={id}
                        initial={{ opacity: 1, scale: 0 }}
                        animate={{ opacity: 0, scale: 2, y: -50 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 pointer-events-none flex items-center justify-center"
                    >
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ x: 0, y: 0 }}
                                animate={{ x: (i - 2.5) * 40, y: (Math.random() - 0.5) * 60 }}
                                className="w-1 h-1 bg-amber-400 rounded-full"
                            />
                        ))}
                    </motion.div>
                ))}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClick}
                disabled={loading}
                className={cn(
                    "group relative overflow-hidden px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-tight transition-all duration-300",
                    variant === "primary"
                        ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 text-white shadow-xl shadow-cyan-500/20 hover:shadow-cyan-400/40"
                        : variant === "legend"
                            ? "bg-gradient-to-r from-amber-300 via-yellow-500 to-orange-500 text-black shadow-xl shadow-amber-500/20 hover:shadow-amber-400/40"
                            : variant === "danger"
                                ? "bg-red-600 text-white shadow-xl shadow-red-600/20 hover:bg-red-500"
                                : "bg-white/[0.06] text-white border border-white/10 hover:bg-white/[0.1] hover:border-cyan-300/35",
                    "hover:brightness-110 active:brightness-90 disabled:opacity-60",
                    className
                )}
            >
                {/* Shimmer effect */}
                <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                />

                <div className="relative z-10 flex items-center justify-center gap-3">
                    {loading ? (
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            {children}
                            {icon}
                        </>
                    )}
                </div>
            </motion.button>
        </div>
    );
}
