"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { motion } from "framer-motion";
import { Users, Github, Send, Twitter, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

const iconMap: Record<string, any> = {
    github: Github,
    telegram: Send,
    twitter: Twitter,
    discord: MessageCircle,
};

export default function CommunityPage() {
    const [socialLinks, setSocialLinks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/social")
            .then(res => res.json())
            .then(data => {
                setSocialLinks(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <main className="min-h-screen relative">
            <Starfield />
            <Navbar />

            <section className="pt-40 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
                    >
                        <Users className="w-3.5 h-3.5" /> Join Us
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white"
                    >
                        Our <span className="text-blue-500">Community</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-400 text-lg mb-12 leading-relaxed"
                    >
                        Connect with fellow DeadZone users, get support, and stay updated with the latest developments.
                    </motion.p>

                    {/* Social Links */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-8">Join Our Channels</h2>
                        {loading ? (
                            <div className="text-center py-10">
                                <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {socialLinks.map((link, i) => {
                                    const Icon = iconMap[link.platform.toLowerCase()] || MessageCircle;
                                    return (
                                        <motion.a
                                            key={link.id}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="group p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/[0.07] hover:border-white/20 transition-all"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <Icon className="w-7 h-7 text-blue-500" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-bold text-white capitalize mb-1">{link.platform}</h3>
                                                    <p className="text-sm text-zinc-500">{link.url}</p>
                                                </div>
                                                <div className="text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all">
                                                    →
                                                </div>
                                            </div>
                                        </motion.a>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Community Guidelines */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-8">Community Guidelines</h2>
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
                            {[
                                {
                                    title: "Be Respectful",
                                    desc: "Treat all community members with respect. No harassment, hate speech, or personal attacks."
                                },
                                {
                                    title: "Stay On Topic",
                                    desc: "Keep discussions relevant to DeadZone and Android development. Off-topic spam will be removed."
                                },
                                {
                                    title: "No Piracy",
                                    desc: "Do not share or request pirated content, paid apps, or illegal material."
                                },
                                {
                                    title: "Help Each Other",
                                    desc: "If you can help someone, do it! We're all learning and growing together."
                                },
                                {
                                    title: "Search First",
                                    desc: "Before asking a question, check the FAQ and search previous discussions. Your question may already be answered."
                                },
                                {
                                    title: "Provide Details",
                                    desc: "When reporting bugs or asking for help, provide as much detail as possible: device model, DeadZone version, steps to reproduce, logs, etc."
                                }
                            ].map((guideline, i) => (
                                <div key={i}>
                                    <h3 className="text-lg font-bold text-white mb-2">{guideline.title}</h3>
                                    <p className="text-zinc-400">{guideline.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-br from-blue-500/10 to-violet-500/10 border border-white/10 rounded-3xl p-8 md:p-12 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">Ready to Join?</h2>
                        <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
                            Become part of the DeadZone family. Get help, share your experiences, and contribute to making DeadZone even better.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <a href={socialLinks.find(l => l.platform === 'telegram')?.url || '#'} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/20 transition-all">
                                Join Telegram
                            </a>
                            <a href={socialLinks.find(l => l.platform === 'github')?.url || '#'} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-semibold border border-white/10 transition-all">
                                View on GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
