"use client";

import { motion } from "framer-motion";
import { Check, X, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const features = [
  { name: "Core ROM Features", free: true, vip: true },
  { name: "OTA Updates", free: "Monthly", vip: "Weekly + Early Access" },
  { name: "Performance Profiles", free: "2 Profiles", vip: "5+ Profiles" },
  { name: "Gaming Mode", free: true, vip: true },
  { name: "Battery Optimization", free: true, vip: "Advanced AI" },
  { name: "Theme Customization", free: "Basic", vip: "Full Access" },
  { name: "Early Beta Access", free: false, vip: true },
  { name: "Exclusive Features", free: false, vip: true },
  { name: "Priority Support", free: false, vip: true },
  { name: "Custom Kernel", free: false, vip: true },
  { name: "Ad-Free Experience", free: false, vip: true },
  { name: "Cloud Backup", free: false, vip: "50GB" },
];

export function ComparisonTable() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">
            Choose Your Experience
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Compare the features between our Free and VIP versions to find the perfect fit for your needs.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 gap-4 p-6 border-b border-white/5 bg-white/5">
              <div className="font-semibold">Feature</div>
              <div className="text-center">
                <span className="font-semibold">Free</span>
              </div>
              <div className="text-center">
                <span className="font-semibold flex items-center justify-center gap-2">
                  <Crown className="w-4 h-4 text-amber-400" />
                  VIP
                </span>
              </div>
            </div>

            {/* Features */}
            <div className="divide-y divide-white/5">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="grid grid-cols-3 gap-4 p-4 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center text-sm">{feature.name}</div>
                  <div className="flex items-center justify-center">
                    {typeof feature.free === "boolean" ? (
                      feature.free ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <X className="w-5 h-5 text-red-500/50" />
                      )
                    ) : (
                      <span className="text-sm text-muted-foreground">{feature.free}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-center">
                    {typeof feature.vip === "boolean" ? (
                      feature.vip ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <X className="w-5 h-5 text-red-500/50" />
                      )
                    ) : (
                      <Badge variant="vip" className="text-xs">{feature.vip}</Badge>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="grid grid-cols-3 gap-4 p-6 border-t border-white/5 bg-white/5">
              <div></div>
              <div className="text-center">
                <Link href="/download">
                  <Button variant="outline" size="sm" className="w-full">
                    Download Free
                  </Button>
                </Link>
              </div>
              <div className="text-center">
                <Link href="/download">
                  <Button size="sm" className="w-full bg-gradient-to-r from-amber-500 to-orange-500">
                    <Crown className="w-4 h-4 mr-2" />
                    Get VIP
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
