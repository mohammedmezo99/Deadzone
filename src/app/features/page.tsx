"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { motion } from "framer-motion";
import { Shield, Zap, Cpu, Battery, Eye, Lock, LucideIcon } from "lucide-react";

interface Feature {
    icon: LucideIcon;
    title: string;
    description: string;
}

const features: Feature[] = [
    {
        icon: Shield,
        title: "Enhanced Security",
        description: "Built-in privacy features and regular security patches to keep your data safe.",
    },
    {
        icon: Zap,
        title: "Extreme Speed",
        description: "System-level optimizations for lightning-fast app launches and smooth UI.",
    },
    {
        icon: Cpu,
        title: "Kernel Tuning",
        description: "Custom kernel profiles tuned for the perfect balance of performance and efficiency.",
    },
    {
        icon: Battery,
        title: "Efficiency",
        description: "Intelligent background management for extended battery life without sacrificing power.",
    },
    {
        icon: Eye,
        title: "Visual Polish",
        description: "Exclusive UI enhancements and blurring effects for a premium operating experience.",
    },
    {
        icon: Lock,
        title: "Bloat-Free",
        description: "Only the essentials. No pre-installed garbage, just pure Android performance.",
    },
];

export default function FeaturesPage() {
    return (
        <main className="min-h-screen relative">
            <Starfield />
            <Navbar />

            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-bold mb-6"
                        >
                            Why Choose <span className="text-gradient">DeadZone</span>?
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-zinc-400 text-lg max-w-2xl mx-auto"
                        >
                            We rebuild Android from the ground up to give you the most responsive and efficient experience on MediaTek hardware.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-3xl glass group hover:bg-white/[0.05] transition-all"
                            >
                                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <feature.icon className="text-blue-500 w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Section */}
            <section className="py-20 px-6 bg-white/[0.02]">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12">Next-Gen Technology</h2>
                    <div className="rounded-[2.5rem] glass overflow-hidden translate-z-0">
                        <div className="p-12">
                            <p className="text-zinc-400 leading-relaxed mb-8">
                                DeadZone utilizes proprietary optimization techniques that go beyond standard ROM development.
                                Our team meticulously tunes every system component to match your specific hardware capabilities.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <span className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-xs font-semibold tracking-wide border border-blue-500/20 uppercase">MediaTek Optimized</span>
                                <span className="px-4 py-2 bg-violet-500/10 text-violet-400 rounded-full text-xs font-semibold tracking-wide border border-violet-500/20 uppercase">Zero-Lag Kernel</span>
                                <span className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-semibold tracking-wide border border-emerald-500/20 uppercase">OLED Efficiency</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
