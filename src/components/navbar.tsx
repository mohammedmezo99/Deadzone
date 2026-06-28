"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download, Gem, Home, Menu, MessageCircle, Smartphone, Sparkles, UserRound, X } from "lucide-react";
import { PremiumButton } from "@/components/ui/premium-button";
import { officialLinks, siteLinks } from "@/lib/links";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Home", href: siteLinks.home, icon: Home },
    { name: "Downloads", href: siteLinks.downloads, icon: Download },
    { name: "Devices", href: siteLinks.devices, icon: Smartphone },
    { name: "Gallery", href: siteLinks.gallery, icon: Sparkles },
    { name: "Premium", href: siteLinks.premium, icon: Gem },
    { name: "Community", href: siteLinks.community, icon: MessageCircle },
    { name: "Contact", href: siteLinks.contact, icon: UserRound },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 16);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6 glass-navbar",
                scrolled
                    ? "border-b border-white/10 bg-[#02050a]/82 shadow-[0_18px_50px_rgba(2,5,10,0.42)] backdrop-blur-2xl"
                    : "bg-transparent"
            )}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-[1.75rem] border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-2xl">
                <Link href={siteLinks.home} className="group flex flex-1 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/30 bg-gradient-to-br from-cyan-400/18 via-blue-500/18 to-fuchsia-500/18 shadow-lg shadow-cyan-500/20 transition-transform duration-300 group-hover:rotate-6">
                        <Image src="/brand/logo.png" alt="DeadZone logo" width={24} height={24} className="object-contain" />
                    </div>
                    <div className="min-w-0">
                        <span className="block text-lg font-black uppercase tracking-[0.18em] text-white whitespace-nowrap">DeadZone</span>
                        <span className="block text-[10px] font-black uppercase tracking-[0.28em] text-cyan-200/80 whitespace-nowrap">
                            Premium HyperOS by MEZO
                        </span>
                    </div>
                </Link>

                <div className="hidden items-center gap-1 xl:flex ml-auto">
                    {navItems.map((item) => {
                        const baseHref = item.href.split("#")[0];
                        const isActive = pathname === baseHref || (baseHref !== "/" && pathname.startsWith(baseHref));

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "relative flex items-center gap-2 rounded-2xl px-4 py-3 text-xs font-black uppercase tracking-[0.14em] transition-colors",
                                    isActive ? "text-white" : "text-zinc-400 hover:text-white"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="deadzone-nav"
                                        className="absolute inset-0 -z-10 rounded-2xl border border-cyan-300/30 bg-cyan-400/10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.55 }}
                                    />
                                )}
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        );
                    })}
                </div>

                <div className="hidden xl:block">
                    <PremiumButton
                        href={officialLinks.contactMezo}
                        external
                        icon={<Gem className="h-4 w-4" />}
                        className="min-h-11 px-5 py-3 text-xs"
                    >
                        Get Premium Membership
                    </PremiumButton>
                </div>

                <button
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-zinc-200 transition-colors hover:text-white xl:hidden"
                    onClick={() => setIsOpen((value) => !value)}
                    aria-label="Toggle navigation"
                >
                    {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mx-auto mt-3 max-w-7xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#060a12]/96 p-3 shadow-2xl shadow-black/60 backdrop-blur-2xl xl:hidden"
                >
                    <div className="grid gap-2">
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
                                        isActive ? "bg-cyan-400/12 text-white" : "text-zinc-400 hover:bg-white/[0.05] hover:text-white"
                                    )}
                                >
                                    <item.icon className="h-5 w-5" />
                                    {item.name}
                                </Link>
                            );
                        })}

                        <PremiumButton
                            href={officialLinks.contactMezo}
                            external
                            icon={<Gem className="h-4 w-4" />}
                            className="mt-2 w-full text-xs"
                        >
                            Get Premium Membership
                        </PremiumButton>
                    </div>
                </motion.div>
            )}
        </nav>
    );
}
