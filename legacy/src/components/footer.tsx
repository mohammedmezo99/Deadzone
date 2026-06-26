"use client";

import Link from "next/link";
import { Zap, Github, Twitter, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = {
  product: [
    { label: "Features", href: "/features" },
    { label: "Download", href: "/download" },
    { label: "Changelog", href: "#" },
    { label: "Roadmap", href: "#" },
  ],
  community: [
    { label: "Team", href: "/team" },
    { label: "Contributors", href: "#" },
    { label: "Testers", href: "#" },
  ],
  support: [
    { label: "Documentation", href: "#" },
    { label: "Installation", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Contact", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "License", href: "#" },
  ],
};

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: MessageCircle, href: "#", label: "Telegram" },
  { icon: Mail, href: "#", label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-display font-bold">DeadZone</span>
                <p className="text-xs text-muted-foreground">DeadZone</p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              Performance Beyond Limits. Custom Android ROM optimized for MediaTek Xiaomi/Redmi/Poco devices.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-lg"
                  asChild
                >
                  <Link href={social.href} target="_blank" rel="noopener noreferrer">
                    <social.icon className="w-4 h-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Community</h4>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DeadZone. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with passion for the Android community
          </p>
        </div>
      </div>
    </footer>
  );
}
