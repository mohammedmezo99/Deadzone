"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, Zap, Users, Info, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home", icon: LayoutGrid },
  { href: "/features", label: "Features", icon: Zap },
  { href: "/download", label: "Download", icon: Download },
  { href: "/team", label: "Team", icon: Users },
  { href: "/about", label: "About", icon: Info },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg leading-tight">
              DeadZone
            </span>
            <span className="text-xs text-muted-foreground">DeadZone</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant="ghost"
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-white/5 rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Button>
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/download">
            <Button variant="ghost" size="sm">
              Download
            </Button>
          </Link>
          <Link href="/download">
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90"
            >
              <Zap className="w-4 h-4 mr-2" />
              Get VIP
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-background/95 backdrop-blur-xl">
            <div className="flex flex-col gap-6 mt-8">
              <div className="flex items-center gap-3 px-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-display font-bold">DeadZone</span>
                  <p className="text-xs text-muted-foreground">DeadZone</p>
                </div>
              </div>
              
              <div className="flex flex-col gap-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                    >
                      <Button
                        variant={pathname === link.href ? "secondary" : "ghost"}
                        className="w-full justify-start gap-3"
                      >
                        <link.icon className="w-4 h-4" />
                        {link.label}
                      </Button>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-3 px-2">
                <Link href="/download" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </Link>
                <Link href="/download" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600">
                    <Zap className="w-4 h-4 mr-2" />
                    Get VIP Access
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </motion.header>
  );
}
