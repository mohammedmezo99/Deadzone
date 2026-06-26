"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function TermsOfServicePage() {
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
                        <FileText className="w-3.5 h-3.5" /> Legal
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white"
                    >
                        Terms of <span className="text-blue-500">Service</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-500 text-sm mb-12"
                    >
                        Last Updated: February 17, 2026
                    </motion.p>

                    <div className="prose prose-invert prose-zinc max-w-none">
                        <div className="space-y-8 text-zinc-400 leading-relaxed">
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                                <p>
                                    By accessing and using DeadZone's website and downloading our custom ROM (DeadZone),
                                    you accept and agree to be bound by the terms and conditions of this agreement.
                                    If you do not agree with these terms, please do not use our services.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">2. Use License</h2>
                                <p>
                                    DeadZone is provided free of charge for personal use. You may download, install, and use
                                    the ROM on your compatible MediaTek devices. However, you may not:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 mt-4">
                                    <li>Redistribute or sell the ROM for commercial purposes</li>
                                    <li>Modify the ROM and claim it as your own work</li>
                                    <li>Remove or alter any copyright notices or credits</li>
                                    <li>Use the ROM for any illegal purposes</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">3. Disclaimer of Warranties</h2>
                                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 my-6">
                                    <p className="text-amber-500 font-semibold mb-2">⚠️ IMPORTANT DISCLAIMER</p>
                                    <p className="text-sm">
                                        DeadZone is provided "AS IS" without warranty of any kind. Installing custom ROMs
                                        carries inherent risks including but not limited to:
                                    </p>
                                    <ul className="list-disc pl-6 space-y-1 mt-3 text-sm">
                                        <li>Device malfunction or "bricking"</li>
                                        <li>Loss of data</li>
                                        <li>Voiding of manufacturer warranty</li>
                                        <li>Security vulnerabilities</li>
                                    </ul>
                                </div>
                                <p>
                                    You acknowledge that you install and use DeadZone at your own risk. DeadZone and its
                                    team members are not responsible for any damage to your device or loss of data.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">4. Limitation of Liability</h2>
                                <p>
                                    In no event shall DeadZone, its developers, or contributors be liable for any
                                    direct, indirect, incidental, special, or consequential damages arising out of the
                                    use or inability to use DeadZone, even if advised of the possibility of such damages.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">5. Third-Party Software</h2>
                                <p>
                                    DeadZone may include third-party software components, each subject to its own license terms.
                                    We are not affiliated with Google, Xiaomi, or any other manufacturer. Android is a
                                    trademark of Google LLC.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">6. User Responsibilities</h2>
                                <p>As a user of DeadZone, you are responsible for:</p>
                                <ul className="list-disc pl-6 space-y-2 mt-4">
                                    <li>Backing up your data before installation</li>
                                    <li>Following installation instructions carefully</li>
                                    <li>Ensuring your device is compatible</li>
                                    <li>Understanding the risks involved in custom ROM installation</li>
                                    <li>Complying with all applicable laws and regulations</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">7. Updates and Modifications</h2>
                                <p>
                                    We reserve the right to modify, suspend, or discontinue DeadZone or any part of it at any time
                                    without prior notice. We may also update these Terms of Service periodically. Continued use
                                    of our services after changes constitutes acceptance of the new terms.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">8. Community Guidelines</h2>
                                <p>
                                    When participating in DeadZone communities (Telegram, GitHub, etc.), you agree to:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 mt-4">
                                    <li>Be respectful to other users and team members</li>
                                    <li>Not spam or post inappropriate content</li>
                                    <li>Not share pirated content or illegal material</li>
                                    <li>Provide constructive feedback and bug reports</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">9. Intellectual Property</h2>
                                <p>
                                    The DeadZone branding, website design, and original code are the intellectual property
                                    of the DeadZone team. DeadZone itself is based on the Android Open Source Project (AOSP)
                                    and other open-source components.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">10. Governing Law</h2>
                                <p>
                                    These Terms of Service shall be governed by and construed in accordance with applicable
                                    international open-source software laws and regulations.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">11. Contact Information</h2>
                                <p>
                                    If you have any questions about these Terms of Service, please contact us through our
                                    official community channels or GitHub repository.
                                </p>
                            </section>

                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mt-8">
                                <p className="text-blue-500 font-semibold">
                                    By downloading and installing DeadZone, you acknowledge that you have read, understood,
                                    and agree to be bound by these Terms of Service.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
