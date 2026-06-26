import React from "react";
import Link from "next/link";
import { CircuitBoard, MessageCircle, Send, ShieldCheck } from "lucide-react";
import { officialLinks, siteLinks } from "@/data/deadzone-registry";

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black/60 px-6 pb-10 pt-16 backdrop-blur-xl">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
                    <div className="md:col-span-2">
                        <Link href={siteLinks.home} className="mb-6 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/25 bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-fuchsia-500/20">
                                <CircuitBoard className="h-5 w-5 text-cyan-100" />
                            </div>
                            <div>
                                <span className="block text-xl font-black uppercase tracking-[0.16em] text-white">DeadZone</span>
                                <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-200/80">Premium HyperOS ROM</span>
                            </div>
                        </Link>
                        <p className="max-w-md text-sm leading-7 text-zinc-400">
                            DeadZone is a premium HyperOS ROM project by Mohammed MEZO. DeadZone Lite is the public build line, and Premium Membership unlocks GamingPlus, Legend, and Ninja.
                        </p>
                        <div className="mt-6 flex gap-3">
                            <a href={officialLinks.updates} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-zinc-400 transition-colors hover:border-cyan-300/30 hover:text-white">
                                <Send className="h-4 w-4" />
                            </a>
                            <a href={officialLinks.discussion} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-zinc-400 transition-colors hover:border-cyan-300/30 hover:text-white">
                                <MessageCircle className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-white">Navigate</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href={siteLinks.downloads} className="text-zinc-400 transition-colors hover:text-white">Downloads</Link></li>
                            <li><Link href={siteLinks.devices} className="text-zinc-400 transition-colors hover:text-white">Devices</Link></li>
                            <li><Link href={siteLinks.styles} className="text-zinc-400 transition-colors hover:text-white">Styles</Link></li>
                            <li><Link href={siteLinks.premium} className="text-zinc-400 transition-colors hover:text-white">Premium</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-white">Official Links</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href={officialLinks.contact} target="_blank" rel="noopener noreferrer" className="text-zinc-400 transition-colors hover:text-white">Contact MEZO</a></li>
                            <li><a href={officialLinks.discussion} target="_blank" rel="noopener noreferrer" className="text-zinc-400 transition-colors hover:text-white">Discussion Group</a></li>
                            <li><a href={officialLinks.updates} target="_blank" rel="noopener noreferrer" className="text-zinc-400 transition-colors hover:text-white">Official Updates</a></li>
                            <li><a href={officialLinks.screenshots} target="_blank" rel="noopener noreferrer" className="text-zinc-400 transition-colors hover:text-white">Screenshots Cloud</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-zinc-500 md:flex-row md:items-center md:justify-between">
                    <p>Copyright {new Date().getFullYear()} DeadZone. Not affiliated with Google, Xiaomi, or MediaTek.</p>
                    <div className="flex items-center gap-2 text-zinc-400">
                        <ShieldCheck className="h-4 w-4 text-cyan-300" />
                        Flash at your own risk. Back up your data first.
                    </div>
                </div>
            </div>
        </footer>
    );
}
