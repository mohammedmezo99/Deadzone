"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CircuitBoard } from "lucide-react";

export function SplashLoader({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Force a minimum loading time for the premium feel
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <AnimatePresence>
                {loading && (
                    <motion.div
                        key="splash"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#02050a]"
                    >
                        <div className="absolute inset-0 bg-mesh opacity-50" />
                        <div className="relative z-10 flex flex-col items-center">
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="w-20 h-20 bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-fuchsia-500/20 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/20 mb-6 border border-cyan-300/25"
                            >
                                <CircuitBoard className="text-cyan-100 w-10 h-10" />
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-xl font-black text-white tracking-widest uppercase"
                            >
                                Dead<span className="text-cyan-300">Zone</span>
                            </motion.h2>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {children}
        </>
    );
}
