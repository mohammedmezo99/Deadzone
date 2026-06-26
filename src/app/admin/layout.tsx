"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    Smartphone,
    Users,
    Settings,
    LogOut,
    Zap,
    HelpCircle,
    Mail,
    Image as ImageIcon,
    Link as LinkIcon,
    Menu,
    X,
    ChevronRight,
    TrendingUp
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const adminNavItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { label: "Devices", icon: Smartphone, href: "/admin/devices" },
    { label: "Analytics", icon: TrendingUp, href: "/admin/analytics" },
    { label: "ROM Clusters", icon: Zap, href: "/admin/roms" },
    { label: "Team Members", icon: Users, href: "/admin/team" },
    { label: "FAQ", icon: HelpCircle, href: "/admin/faq" },
    { label: "Contact Forms", icon: Mail, href: "/admin/contact" },
    { label: "Screenshots", icon: ImageIcon, href: "/admin/screenshots" },
    { label: "Social Links", icon: LinkIcon, href: "/admin/social" },
    { label: "Settings", icon: Settings, href: "/admin/settings" },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#030406] text-white font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-mesh opacity-40" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
            </div>

            {/* Mobile Header */}
            <header className="lg:hidden fixed top-0 left-0 right-0 z-[100] glass-premium border-b border-white/[0.05]">
                <div className="flex items-center justify-between px-6 py-4">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                            <Zap className="text-white w-5 h-5 fill-white/20" />
                        </div>
                        <span className="font-black text-lg tracking-tight uppercase">Move<span className="text-indigo-400">OS</span></span>
                    </Link>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10 active:scale-90"
                    >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="lg:hidden fixed inset-0 z-[90] bg-black/60 backdrop-blur-md"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed left-0 top-0 bottom-0 w-80 bg-[#080a0f] border-r border-white/[0.05] pt-24 overflow-y-auto px-6 pb-10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <nav className="space-y-1.5">
                                {adminNavItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={cn(
                                                "flex items-center gap-4 px-5 py-4 rounded-2xl transition-all border border-transparent",
                                                isActive
                                                    ? "bg-indigo-600/10 text-white font-bold border-indigo-500/20"
                                                    : "text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.03]"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                                                isActive ? "bg-indigo-600 text-white" : "bg-white/[0.03]"
                                            )}>
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <span className="text-[15px] tracking-tight">{item.label}</span>
                                        </Link>
                                    );
                                })}
                            </nav>
                            <div className="mt-8 pt-8 border-t border-white/[0.05]">
                                <button
                                    onClick={async () => {
                                        await fetch("/api/admin/logout", { method: "POST" });
                                        window.location.href = "/login";
                                    }}
                                    className="w-full flex items-center gap-4 px-5 py-4 text-zinc-500 hover:text-red-400 transition-colors rounded-2xl hover:bg-red-500/5 group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center group-hover:bg-red-500/10 transition-colors">
                                        <LogOut className="w-5 h-5" />
                                    </div>
                                    <span className="text-[15px] font-medium">Terminate Session</span>
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex relative z-10 min-h-screen">
                {/* Desktop Sidebar */}
                <aside className="hidden lg:flex w-[300px] flex-col border-r border-white/[0.05] bg-[#080a0f]/80 backdrop-blur-3xl sticky top-0 h-screen">
                    <div className="p-8 pb-10">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-11 h-11 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-600/40 group-hover:scale-110 transition-all duration-500 rotate-0 group-hover:rotate-[360deg]">
                                <Zap className="text-white w-6 h-6 fill-white/20" />
                            </div>
                            <div>
                                <h1 className="text-xl font-black text-white tracking-tighter leading-none mb-1">Move<span className="text-indigo-400">OS</span></h1>
                                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">Administrative</p>
                            </div>
                        </Link>
                    </div>

                    <nav className="flex-1 px-4 space-y-1 custom-scrollbar overflow-y-auto">
                        <div className="px-4 mb-4">
                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">Management</span>
                        </div>
                        {adminNavItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href || "#"}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all relative group overflow-hidden",
                                        isActive
                                            ? "text-white font-bold bg-indigo-600/10 border border-indigo-500/20"
                                            : "text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.03] border border-transparent"
                                    )}
                                >
                                    <div className={cn(
                                        "w-9 h-9 rounded-xl flex items-center justify-center transition-all z-10",
                                        isActive ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/40" : "bg-white/[0.03] group-hover:scale-110"
                                    )}>
                                        <item.icon className={cn("w-4.5 h-4.5", isActive ? "" : "group-hover:text-indigo-400 transition-colors")} />
                                    </div>
                                    <span className="z-10 text-[14px] tracking-tight">{item.label}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-indicator"
                                            className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-500 rounded-l-full"
                                            transition={{ type: "spring", bounce: 0.2 }}
                                        />
                                    )}
                                    <ChevronRight className={cn(
                                        "w-4 h-4 ml-auto opacity-0 -translate-x-2 transition-all",
                                        !isActive && "group-hover:opacity-40 group-hover:translate-x-0"
                                    )} />
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-6 mt-auto border-t border-white/[0.05]">
                        <button
                            onClick={async () => {
                                await fetch("/api/admin/logout", { method: "POST" });
                                window.location.href = "/login";
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3.5 text-zinc-500 hover:text-red-400 transition-all rounded-2xl hover:bg-red-500/10 group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                                <LogOut className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-semibold tracking-tight">Logout</span>
                        </button>
                    </div>
                </aside>

                {/* Main Viewport */}
                <main className="flex-1 flex flex-col min-h-screen pt-16 lg:pt-0 overflow-hidden">
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <div className="max-w-[1600px] mx-auto">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
