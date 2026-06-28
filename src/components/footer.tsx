import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Send, ShieldCheck, Sparkles } from "lucide-react";
import { PremiumButton } from "@/components/ui/premium-button";
import { officialLinks, siteLinks } from "@/lib/links";

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black/50 px-6 pb-10 pt-16 backdrop-blur-xl">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
                    <div className="max-w-xl">
                        <Link href={siteLinks.home} className="mb-6 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/25 bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-fuchsia-500/20">
                                <Image src="/brand/logo.png" alt="DeadZone logo" width={24} height={24} className="object-contain" />
                            </div>
                            <div>
                                <span className="block text-xl font-black uppercase tracking-[0.16em] text-white">DeadZone</span>
                                <span className="text-[10px] font-black uppercase tracking-[0.28em] text-cyan-200/80">Premium HyperOS ROM Builds</span>
                            </div>
                        </Link>

                        <p className="text-sm leading-7 text-zinc-400">
                            DeadZone is a premium HyperOS ROM project by Mohammed MEZO. DeadZone Lite is the public build line, while GamingPlus, Legend, and Ninja are available through Premium Membership.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <PremiumButton href={siteLinks.downloads} icon={<Sparkles className="h-4 w-4" />} className="px-5 py-3 text-xs">
                                Explore Builds
                            </PremiumButton>
                            <PremiumButton href={officialLinks.contactMezo} external variant="secondary" icon={<MessageCircle className="h-4 w-4" />} className="px-5 py-3 text-xs">
                                Contact MEZO
                            </PremiumButton>
                        </div>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-white">Navigate</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href={siteLinks.downloads} className="text-zinc-400 transition-colors hover:text-white">Explore Builds</Link></li>
                            <li><Link href={siteLinks.devices} className="text-zinc-400 transition-colors hover:text-white">Supported Devices</Link></li>
                            <li><Link href={siteLinks.gallery} className="text-zinc-400 transition-colors hover:text-white">Gallery</Link></li>
                            <li><Link href={siteLinks.premium} className="text-zinc-400 transition-colors hover:text-white">Premium Membership</Link></li>
                            <li><Link href={siteLinks.status} className="text-zinc-400 transition-colors hover:text-white">Status</Link></li>
                            <li><Link href={siteLinks.guide} className="text-zinc-400 transition-colors hover:text-white">Install Guide</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-white">Official Links</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href={officialLinks.discussionGroup} target="_blank" rel="noopener noreferrer" className="text-zinc-400 transition-colors hover:text-white">Discussion Group</a></li>
                            <li><a href={officialLinks.officialUpdates} target="_blank" rel="noopener noreferrer" className="text-zinc-400 transition-colors hover:text-white">Official Updates</a></li>
                            <li><a href={officialLinks.screenshotsCloud} target="_blank" rel="noopener noreferrer" className="text-zinc-400 transition-colors hover:text-white">Screenshots Cloud</a></li>
                            <li><a href={officialLinks.supportedDevices} target="_blank" rel="noopener noreferrer" className="text-zinc-400 transition-colors hover:text-white">Supported Devices</a></li>
                        </ul>
                    </div>

                    <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-5">
                        <p className="text-[11px] font-black uppercase tracking-[0.24em] text-cyan-200">Official Contact</p>
                        <h4 className="mt-3 text-2xl font-black text-white">Stay inside the official DeadZone network.</h4>
                        <p className="mt-3 text-sm leading-7 text-zinc-400">
                            Use the official Telegram links for support, premium access, screenshot previews, and public device references.
                        </p>
                        <div className="mt-5 flex gap-3">
                            <a href={officialLinks.officialUpdates} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-zinc-300 transition-colors hover:border-cyan-300/30 hover:text-white">
                                <Send className="h-4 w-4" />
                            </a>
                            <a href={officialLinks.discussionGroup} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-zinc-300 transition-colors hover:border-cyan-300/30 hover:text-white">
                                <MessageCircle className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-zinc-500 md:flex-row md:items-center md:justify-between">
                    <p>Copyright {new Date().getFullYear()} DeadZone. DeadZone Lite is the public build line by Mohammed MEZO.</p>
                    <div className="flex items-center gap-2 text-zinc-400">
                        <ShieldCheck className="h-4 w-4 text-cyan-300" />
                        Flash carefully and back up important data first.
                    </div>
                </div>
            </div>
        </footer>
    );
}
