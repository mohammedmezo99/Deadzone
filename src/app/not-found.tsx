"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { motion } from "framer-motion";
import { Home, Search, FileQuestion } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-screen relative flex flex-col">
            <Starfield />
            <Navbar />

            <section className="flex-1 flex items-center justify-center px-6 py-20">
                <div className="max-w-2xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <FileQuestion className="w-32 h-32 text-blue-500/50 mx-auto" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-8xl md:text-9xl font-black mb-6 tracking-tighter"
                    >
                        <span className="text-white">4</span>
                        <span className="text-blue-500">0</span>
                        <span className="text-white">4</span>
                    </motion.h1>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl md:text-4xl font-bold text-white mb-4"
                    >
                        Page Not Found
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-zinc-400 text-lg mb-12 leading-relaxed"
                    >
                        Oops! The page you're looking for doesn't exist or has been moved.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-wrap gap-4 justify-center"
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-violet-600 rounded-2xl font-bold hover:shadow-lg hover:shadow-blue-500/20 transition-all"
                        >
                            <Home className="w-5 h-5" />
                            Go Home
                        </Link>
                        <Link
                            href="/faq"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl font-bold border border-white/10 transition-all"
                        >
                            <Search className="w-5 h-5" />
                            Search FAQ
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="mt-16 pt-8 border-t border-white/10"
                    >
                        <p className="text-zinc-500 text-sm mb-4">Helpful Links:</p>
                        <div className="flex flex-wrap gap-3 justify-center text-sm">
                            {[
                                { href: "/download", label: "Download" },
                                { href: "/installation", label: "Installation Guide" },
                                { href: "/faq", label: "FAQ" },
                                { href: "/contact", label: "Contact" },
                                { href: "/community", label: "Community" }
                            ].map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white border border-white/10 transition-all"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
