"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export default function PrivacyPolicyPage() {
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
                        <Shield className="w-3.5 h-3.5" /> Legal
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white"
                    >
                        Privacy <span className="text-blue-500">Policy</span>
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
                                <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                                <p>
                                    Welcome to DeadZone. We respect your privacy and are committed to protecting your personal data.
                                    This privacy policy will inform you about how we handle your data when you visit our website and
                                    download our custom ROM.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">2. Data We Collect</h2>
                                <p>We may collect the following information:</p>
                                <ul className="list-disc pl-6 space-y-2 mt-4">
                                    <li><strong>Download Statistics:</strong> IP address, user agent, and timestamp when you download ROMs</li>
                                    <li><strong>Usage Data:</strong> Pages visited, time spent on site, and navigation patterns</li>
                                    <li><strong>Device Information:</strong> Browser type, operating system, and device type</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Data</h2>
                                <p>We use your data for the following purposes:</p>
                                <ul className="list-disc pl-6 space-y-2 mt-4">
                                    <li>To provide and maintain our service</li>
                                    <li>To monitor download statistics and improve our ROMs</li>
                                    <li>To detect and prevent technical issues</li>
                                    <li>To improve user experience on our website</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">4. Data Storage and Security</h2>
                                <p>
                                    We implement appropriate security measures to protect your personal information.
                                    Your data is stored securely and is only accessible by authorized personnel.
                                    We do not sell, trade, or transfer your personal information to third parties.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">5. Cookies</h2>
                                <p>
                                    We may use cookies to enhance your browsing experience. You can choose to disable cookies
                                    through your browser settings, though this may affect some functionality of our website.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">6. Third-Party Services</h2>
                                <p>
                                    We may use third-party services for analytics and hosting. These services have their own
                                    privacy policies, and we encourage you to review them.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">7. Your Rights</h2>
                                <p>You have the right to:</p>
                                <ul className="list-disc pl-6 space-y-2 mt-4">
                                    <li>Request access to your personal data</li>
                                    <li>Request correction of inaccurate data</li>
                                    <li>Request deletion of your data</li>
                                    <li>Object to processing of your data</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">8. Changes to This Policy</h2>
                                <p>
                                    We may update this privacy policy from time to time. We will notify you of any changes
                                    by posting the new policy on this page with an updated "Last Updated" date.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-white mb-4">9. Contact Us</h2>
                                <p>
                                    If you have any questions about this Privacy Policy, please contact us through our
                                    community channels (Telegram, GitHub).
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
