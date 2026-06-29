"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, Gem, Home, Menu, MessageCircle, Smartphone, Sparkles, UserRound, X } from "lucide-react";
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
        <header className="fixed inset-x-0 top-0 z-50 px-3 py-3 sm:px-5 sm:py-4">
            <nav
                className={cn(
                    "navbar-shell mx-auto max-w-[90rem]",
                    scrolled && "navbar-shell-scrolled"
                )}
                aria-label="Primary navigation"
            >
                <div className="navbar-inner">
                    <Link href={siteLinks.home} className="navbar-brand group">
                        <div className="navbar-brand-mark">
                            <div className="navbar-brand-mark-inner">
                                <Image src="/brand/logo.png" alt="DeadZone logo" width={28} height={28} className="object-contain" />
                            </div>
                        </div>
                        <div className="min-w-0">
                            <span className="block whitespace-nowrap text-[1rem] font-black uppercase tracking-[0.2em] text-white sm:text-[1.05rem]">
                                DeadZone
                            </span>
                            <span className="block whitespace-nowrap text-[0.58rem] font-black uppercase tracking-[0.32em] text-cyan-100/72 sm:text-[0.62rem]">
                                Premium HyperOS by MEZO
                            </span>
                        </div>
                    </Link>

                    <div className="navbar-center hidden xl:flex">
                        <div className="navbar-center-rail">
                            {navItems.map((item) => {
                                const baseHref = item.href.split("#")[0];
                                const isActive = pathname === baseHref || (baseHref !== "/" && pathname.startsWith(baseHref));

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn("navbar-link group", isActive && "navbar-link-active")}
                                        aria-current={isActive ? "page" : undefined}
                                    >
                                        <item.icon
                                            className={cn(
                                                "h-[0.95rem] w-[0.95rem] transition-colors duration-300",
                                                isActive ? "text-cyan-100" : "text-cyan-100/72 group-hover:text-cyan-100"
                                            )}
                                        />
                                        <span>{item.name}</span>
                                        <span className="navbar-link-sheen" aria-hidden="true" />
                                        {isActive && (
                                            <motion.span
                                                layoutId="deadzone-nav-active"
                                                className="navbar-link-indicator"
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div className="ml-auto flex items-center gap-2 sm:gap-3">
                        <Link
                            href={siteLinks.status}
                            className="navbar-utility hidden md:inline-flex"
                            aria-label="Open DeadZone status"
                        >
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>

                        <PremiumButton
                            href={officialLinks.contactMezo}
                            external
                            icon={<Gem className="h-4 w-4" />}
                            className="min-h-[3rem] rounded-[1.1rem] px-4 py-3 text-[0.66rem] tracking-[0.18em] shadow-[0_18px_40px_rgba(30,144,255,0.18)] sm:px-5 xl:min-h-[3.25rem]"
                        >
                            Get Premium Membership
                        </PremiumButton>

                        <button
                            className="navbar-menu-button xl:hidden"
                            onClick={() => setIsOpen((value) => !value)}
                            aria-label="Toggle navigation"
                            aria-expanded={isOpen}
                        >
                            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="navbar-mobile-panel xl:hidden"
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
                                        className={cn("navbar-mobile-link", isActive && "navbar-mobile-link-active")}
                                        aria-current={isActive ? "page" : undefined}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        <span>{item.name}</span>
                                        {isActive && <span className="navbar-mobile-indicator" aria-hidden="true" />}
                                    </Link>
                                );
                            })}

                            <div className="mt-2 grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
                                <PremiumButton
                                    href={officialLinks.contactMezo}
                                    external
                                    icon={<Gem className="h-4 w-4" />}
                                    className="w-full justify-center rounded-[1.15rem] text-[0.66rem] tracking-[0.18em]"
                                >
                                    Get Premium Membership
                                </PremiumButton>

                                <Link href={siteLinks.status} onClick={() => setIsOpen(false)} className="navbar-mobile-utility">
                                    <ArrowUpRight className="h-4 w-4" />
                                    Status
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </nav>
        </header>
    );
}
