"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { motion } from "framer-motion";
import { BookOpen, AlertTriangle, CheckCircle2, Download, Smartphone, Zap } from "lucide-react";

export default function InstallationPage() {
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
                        <BookOpen className="w-3.5 h-3.5" /> Documentation
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white"
                    >
                        Installation <span className="text-blue-500">Guide</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-400 text-lg mb-12 leading-relaxed"
                    >
                        Follow these steps carefully to install DeadZone on your device.
                    </motion.p>

                    {/* Warning */}
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-3xl p-8 mb-12">
                        <div className="flex items-start gap-4">
                            <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-amber-500 font-bold text-lg mb-2">⚠️ Important Warning</h3>
                                <ul className="text-amber-200/80 space-y-2 text-sm">
                                    <li>• Installing custom ROMs will <strong>void your warranty</strong></li>
                                    <li>• Always <strong>backup your data</strong> before proceeding</li>
                                    <li>• Risk of device damage ("bricking") exists if steps are not followed correctly</li>
                                    <li>• We are not responsible for any damage to your device</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-12">
                        {/* Requirements */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 flex items-center justify-center">
                                    <Smartphone className="w-6 h-6 text-blue-500" />
                                </div>
                                <h2 className="text-3xl font-bold text-white">Requirements</h2>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                                <ul className="space-y-4">
                                    {[
                                        "Compatible MediaTek device (check Download page)",
                                        "Unlocked bootloader",
                                        "Custom recovery (TWRP recommended)",
                                        "Charged battery (at least 70%)",
                                        "USB cable and computer",
                                        "DeadZone ROM file downloaded from our website"
                                    ].map((req, i) => (
                                        <li key={i} className="flex items-start gap-3 text-zinc-300">
                                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span>{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        {/* Installation Steps */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center">
                                    <Zap className="w-6 h-6 text-violet-500" />
                                </div>
                                <h2 className="text-3xl font-bold text-white">Installation Steps</h2>
                            </div>

                            <div className="space-y-6">
                                {[
                                    {
                                        step: 1,
                                        title: "Backup Your Data",
                                        desc: "Use your device's backup feature or third-party apps to backup all important data, photos, contacts, and apps."
                                    },
                                    {
                                        step: 2,
                                        title: "Download DeadZone ROM",
                                        desc: "Go to the Download page and download the DeadZone ROM file for your specific device. Verify the file integrity using the provided checksum."
                                    },
                                    {
                                        step: 3,
                                        title: "Transfer ROM to Device",
                                        desc: "Connect your device to your computer and transfer the downloaded ROM file to your device's internal storage or SD card."
                                    },
                                    {
                                        step: 4,
                                        title: "Boot into Recovery Mode",
                                        desc: "Power off your device. Then press and hold the Volume Up + Power buttons simultaneously until you see the recovery mode screen (TWRP)."
                                    },
                                    {
                                        step: 5,
                                        title: "Wipe Data (Factory Reset)",
                                        desc: "In TWRP, go to Wipe > Advanced Wipe. Select Dalvik/ART Cache, System, Data, and Cache. Swipe to wipe. DO NOT wipe Internal Storage."
                                    },
                                    {
                                        step: 6,
                                        title: "Install DeadZone ROM",
                                        desc: "In TWRP, tap Install. Navigate to the DeadZone ROM file you transferred earlier. Swipe to confirm flash. Wait for the installation to complete."
                                    },
                                    {
                                        step: 7,
                                        title: "Reboot System",
                                        desc: "After installation completes, tap 'Reboot System'. The first boot may take 5-10 minutes. Do not panic if it takes longer than usual."
                                    },
                                    {
                                        step: 8,
                                        title: "Setup & Enjoy",
                                        desc: "Once booted, go through the initial setup wizard. Restore your data if needed. Enjoy your new DeadZone experience!"
                                    }
                                ].map((item) => (
                                    <div key={item.step} className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/[0.07] transition-colors">
                                        <div className="flex items-start gap-6">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center flex-shrink-0">
                                                <span className="text-white font-bold text-lg">{item.step}</span>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                                <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Troubleshooting */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center">
                                    <AlertTriangle className="w-6 h-6 text-red-500" />
                                </div>
                                <h2 className="text-3xl font-bold text-white">Troubleshooting</h2>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">Device won't boot / Stuck on bootloop</h3>
                                    <p className="text-zinc-400">Try wiping cache/dalvik again in recovery and reboot. If issue persists, reflash the ROM or restore from backup.</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">Installation failed in TWRP</h3>
                                    <p className="text-zinc-400">Verify your ROM file isn't corrupted. Check if you have enough storage space. Ensure you're using the correct ROM for your device model.</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">Device is completely dead (bricked)</h3>
                                    <p className="text-zinc-400">If your device won't turn on at all, you may need to use manufacturer-specific flash tools (e.g., SP Flash Tool for MediaTek). Join our Telegram group for assistance.</p>
                                </div>
                            </div>
                        </section>

                        {/* Call to Action */}
                        <section className="bg-gradient-to-br from-blue-500/10 to-violet-500/10 border border-white/10 rounded-3xl p-8 md:p-12 text-center">
                            <h2 className="text-3xl font-bold text-white mb-4">Need Help?</h2>
                            <p className="text-zinc-400 mb-6 max-w-2xl mx-auto">
                                If you encounter any issues during installation, don't hesitate to reach out to our community for support.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center">
                                <a href="/contact" className="px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/20 transition-all">
                                    Contact Support
                                </a>
                                <a href="/community" className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-semibold border border-white/10 transition-all">
                                    Join Community
                                </a>
                            </div>
                        </section>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
