"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Bug, Lightbulb, Loader2 } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        type: "general",
        subject: "",
        message: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setSubmitted(true);
                setFormData({ name: "", email: "", type: "general", subject: "", message: "" });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

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
                        <Mail className="w-3.5 h-3.5" /> Get in Touch
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white"
                    >
                        Contact & <span className="text-blue-500">Support</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-400 text-lg mb-12 leading-relaxed"
                    >
                        Have a question, found a bug, or want to request a feature? Let us know!
                    </motion.p>

                    {submitted ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-green-500/10 border border-green-500/20 rounded-3xl p-12 text-center"
                        >
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <MessageSquare className="w-8 h-8 text-green-500" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Message Sent!</h2>
                            <p className="text-zinc-400 mb-8">Thank you for reaching out. We'll get back to you as soon as possible.</p>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/20 transition-all"
                            >
                                Send Another Message
                            </button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-zinc-400 text-sm font-semibold ml-2">Your Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500/50 outline-none"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-zinc-400 text-sm font-semibold ml-2">Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500/50 outline-none"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-zinc-400 text-sm font-semibold ml-2">Type</label>
                                <div className="grid grid-cols-3 gap-4">
                                    {[
                                        { value: "general", icon: MessageSquare, label: "General" },
                                        { value: "bug", icon: Bug, label: "Bug Report" },
                                        { value: "feature", icon: Lightbulb, label: "Feature Request" }
                                    ].map((type) => (
                                        <button
                                            key={type.value}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, type: type.value })}
                                            className={`p-4 rounded-2xl border transition-all ${formData.type === type.value
                                                    ? "bg-blue-500/20 border-blue-500/50 text-blue-500"
                                                    : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10"
                                                }`}
                                        >
                                            <type.icon className="w-6 h-6 mx-auto mb-2" />
                                            <span className="text-sm font-semibold">{type.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-zinc-400 text-sm font-semibold ml-2">Subject</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500/50 outline-none"
                                    placeholder="Brief description of your message"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-zinc-400 text-sm font-semibold ml-2">Message</label>
                                <textarea
                                    required
                                    rows={6}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500/50 outline-none resize-none"
                                    placeholder="Provide as much detail as possible..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full py-5 bg-gradient-to-r from-blue-500 to-violet-600 rounded-2xl font-bold text-lg hover:shadow-lg hover:shadow-blue-500/20 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    "Send Message"
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
