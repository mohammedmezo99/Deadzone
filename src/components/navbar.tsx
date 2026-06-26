"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { CircuitBoard, Download, Gem, Home, Menu, MessageCircle, Smartphone, Sparkles, UserRound, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteLinks } from "@/data/deadzone-registry";

const navItems = [
    { name: "Home", href: siteLinks.home, icon: Home },
    { name: "Downloads", href: siteLinks.downloads, icon: Download },
    { name: "Devices", href: siteLinks.devices, icon: Smartphone },
    { name: "Styles", href: siteLinks.styles, icon: Sparkles },
    { name: "Premium", href: siteLinks.premium, icon: Gem },
    { name: "Community", href: siteLinks.community, icon: MessageCircle },
    { name: "Contact", href: siteLinks.contact, icon: UserRound },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed left-0 right-0 top-0 z-50 px-4 py-4 transition-all duration-500 sm:px-6",
                scrolled ? "border-b border-white/10 bg-black/70 backdrop-blur-2xl" : "bg-black/20 backdrop-blur-lg"
            )}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
                <Link href={siteLinks.home} className="group flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/30 bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-fuchsia-500/20 shadow-lg shadow-cyan-500/20 transition-transform duration-300 group-hover:rotate-6">
                        <CircuitBoard className="h-5 w-5 text-cyan-100" />
                    </div>
                    <div className="min-w-0">
                        <span className="block truncate text-lg font-black uppercase tracking-[0.16em] text-white sm:text-xl">
                            DeadZone
                        </span>
                        <span className="hidden text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-200/80 sm:block">
                            Premium HyperOS ROM
                        </span>
                    </div>
                </Link>

                <div className="hidden items-center gap-1 xl:flex">
                    {navItems.map((item) => {
                        const baseHref = item.href.split("#")[0];
                        const isActive = pathname === baseHref || (baseHref !== "/" && pathname.startsWith(baseHref));

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "relative flex items-center gap-2 rounded-2xl px-4 py-3 text-xs font-black uppercase tracking-[0.12em] transition-colors",
                                    isActive ? "text-white" : "text-zinc-400 hover:text-white"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="deadzone-nav"
                                        className="absolute inset-0 -z-10 rounded-2xl border border-cyan-300/25 bg-cyan-400/10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        );
                    })}
                </div>

                <Link
                    href={siteLinks.premium}
                    className="hidden min-h-11 items-center rounded-2xl bg-cyan-400 px-5 text-xs font-black uppercase tracking-[0.14em] text-slate-950 shadow-lg shadow-cyan-500/20 transition-all hover:bg-cyan-300 md:flex"
                >
                    Get Premium
                </Link>

                <button
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-zinc-200 transition-colors hover:text-white xl:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle navigation"
                >
                    {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute left-4 right-4 top-full mt-3 overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-950/95 p-2 shadow-2xl shadow-black/60 backdrop-blur-2xl xl:hidden"
                >
                    {navItems.map((item) => {
                        const baseHref = item.href.split("#")[0];
                        const isActive = pathname === baseHref || (baseHref !== "/" && pathname.startsWith(baseHref));

                        return (
                            <Link
                                key={`${item.href}-mobile`}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "flex min-h-12 items-center gap-3 rounded-2xl px-4 text-sm font-bold transition-colors",
                                    isActive ? "bg-cyan-400/10 text-white" : "text-zinc-400 hover:bg-white/[0.05] hover:text-white"
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </motion.div>
            )}
        </nav>
    );
}
