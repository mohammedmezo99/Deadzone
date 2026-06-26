"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";
import { motion } from "framer-motion";
import { HelpCircle, Search, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

export default function FaqPage() {
    const [faqs, setFaqs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useEffect(() => {
        fetch("/api/faq")
            .then(res => res.json())
            .then(data => {
                setFaqs(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const categories = ["All", ...Array.from(new Set(faqs.map(f => f.category)))];

    const filteredFaqs = faqs.filter(faq => {
        const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

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
                        <HelpCircle className="w-3.5 h-3.5" /> Help Center
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white"
                    >
                        Frequently Asked <span className="text-blue-500">Questions</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-400 text-lg mb-12 leading-relaxed"
                    >
                        Find answers to common questions about DeadZone.
                    </motion.p>

                    {/* Search and Filter */}
                    <div className="mb-12 space-y-6">
                        <div className="relative">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search questions..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 rounded-3xl text-white placeholder:text-zinc-500 focus:ring-2 focus:ring-blue-500/50 outline-none"
                            />
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${selectedCategory === cat
                                            ? "bg-gradient-to-r from-blue-500 to-violet-600 text-white shadow-lg shadow-blue-500/20"
                                            : "bg-white/5 hover:bg-white/10 text-zinc-400 border border-white/10"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* FAQs */}
                    <div className="space-y-4">
                        {loading ? (
                            <div className="text-center py-20">
                                <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                            </div>
                        ) : filteredFaqs.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-zinc-500">No questions found matching your search.</p>
                            </div>
                        ) : (
                            filteredFaqs.map((faq, index) => (
                                <motion.div
                                    key={faq.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:bg-white/[0.07] transition-colors"
                                >
                                    <button
                                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                        className="w-full p-8 flex items-start justify-between gap-6 text-left"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-bold uppercase tracking-wider border border-blue-500/20">
                                                    {faq.category}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-white">{faq.question}</h3>
                                        </div>
                                        <ChevronDown
                                            className={`w-6 h-6 text-zinc-400 flex-shrink-0 transition-transform ${openIndex === index ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>
                                    {openIndex === index && (
                                        <div className="px-8 pb-8">
                                            <p className="text-zinc-400 leading-relaxed">{faq.answer}</p>
                                        </div>
                                    )}
                                </motion.div>
                            ))
                        )}
                    </div>

                    {/* Still have questions? */}
                    <div className="mt-16 bg-gradient-to-br from-blue-500/10 to-violet-500/10 border border-white/10 rounded-3xl p-8 md:p-12 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">Still have questions?</h2>
                        <p className="text-zinc-400 mb-6 max-w-2xl mx-auto">
                            Can't find what you're looking for? Reach out to our support team or join our community.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <a href="/contact" className="px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/20 transition-all">
                                Contact Us
                            </a>
                            <a href="/community" className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-semibold border border-white/10 transition-all">
                                Join Community
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
