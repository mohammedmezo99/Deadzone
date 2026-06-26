"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { motion } from "framer-motion";
import { Globe, Heart, Shield, Code } from "lucide-react";

export default function AboutPage() {
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
                            About the <span className="text-gradient">Project</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-zinc-400 text-lg max-w-2xl mx-auto"
                        >
                            Born out of a desire for a cleaner, faster Android, DeadZone is the result of thousands of hours of optimization and testing.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h2 className="text-3xl font-bold text-white">Our Mission</h2>
                            <p className="text-zinc-400 leading-relaxed">
                                Our mission is simple: to provide the absolute best software experience for MediaTek-based Xiaomi devices. We believe that your hardware shouldn't be held back by subpar or bloated software.
                            </p>
                            <p className="text-zinc-400 leading-relaxed">
                                Every release of DeadZone is a testament to our commitment to excellence, focusing on system stability, security, and uncompromising speed.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="glass p-1 rounded-[3rem]"
                        >
                            <div className="bg-gradient-to-br from-blue-500/10 to-violet-500/10 p-12 rounded-[2.8rem] flex items-center justify-center">
                                <Globe className="w-32 h-32 text-blue-500 opacity-50" />
                            </div>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Heart, title: "Community Driven", desc: "We listen to our users. Your feedback drives our development roadmap." },
                            { icon: Shield, title: "Stable & Secure", desc: "We prioritize security and stability over gimmicky features." },
                            { icon: Code, title: "Open Source", desc: "We believe in transparency and the power of collaborative development." },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5"
                            >
                                <item.icon className="w-10 h-10 text-blue-500 mb-6" />
                                <h3 className="text-xl font-bold mb-4 text-white">{item.title}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
