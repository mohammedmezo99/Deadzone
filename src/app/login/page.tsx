"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Starfield } from "@/components/starfield";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                window.location.href = "/admin";
            } else {
                setError(data.error || "Login failed");
                setIsLoading(false);
            }
        } catch (err) {
            setError("Network error. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden">
            <Starfield />

            <Link
                href="/"
                className="absolute top-8 left-8 flex items-center gap-3 text-zinc-500 hover:text-white transition-all group px-4 py-2 rounded-xl hover:bg-white/5"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-bold uppercase tracking-widest">Safe Exit</span>
            </Link>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="glass p-10 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />

                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/20">
                            <Zap className="text-white w-8 h-8" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
                        <p className="text-zinc-500 text-sm">Sign in to manage DeadZone.</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-sm font-bold flex items-center justify-center gap-2"
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@projectmove.com"
                                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium pr-14"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-2xl font-bold transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 group"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Sign In
                                    <Zap className="w-4 h-4 group-hover:scale-125 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/5 text-center">
                        <p className="text-zinc-600 text-xs">
                            Secure Access Only. All activities are logged.
                        </p>
                    </div>
                </div>
            </motion.div>
        </main>
    );
}
