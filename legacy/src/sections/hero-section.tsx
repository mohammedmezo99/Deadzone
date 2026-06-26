"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download, Zap, Cpu, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

const floatingIcons = [
  { Icon: Cpu, delay: 0, x: "10%", y: "20%" },
  { Icon: Smartphone, delay: 0.2, x: "85%", y: "15%" },
  { Icon: Zap, delay: 0.4, x: "75%", y: "75%" },
  { Icon: Cpu, delay: 0.6, x: "15%", y: "70%" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] animate-pulse delay-1000" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Floating Icons */}
        {floatingIcons.map(({ Icon, delay, x, y }, index) => (
          <motion.div
            key={index}
            className="absolute hidden lg:block"
            style={{ left: x, top: y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 0.1, 
              scale: 1,
              y: [0, -20, 0],
            }}
            transition={{
              opacity: { delay: delay + 0.5, duration: 0.5 },
              scale: { delay: delay + 0.5, duration: 0.5 },
              y: { delay: delay + 1, duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <Icon className="w-12 h-12 text-white" />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Now Available for MediaTek Devices
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="text-gradient">DeadZone</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-4 font-display"
          >
            DeadZone — Performance Beyond Limits
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg text-muted-foreground/80 mb-10 max-w-2xl mx-auto"
          >
            Experience the ultimate Android customization with our MediaTek-optimized ROM. 
            Built for Xiaomi, Redmi, and Poco devices with performance and battery life in mind.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/download">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white px-8 py-6 text-lg rounded-xl group"
              >
                <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Download Now
              </Button>
            </Link>
            <Link href="/download">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 hover:bg-white/5 px-8 py-6 text-lg rounded-xl group"
              >
                <Zap className="w-5 h-5 mr-2 text-amber-400" />
                Get VIP Access
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 flex flex-wrap justify-center gap-6 md:gap-10"
          >
            {[
              { label: "MediaTek Optimized", icon: Cpu },
              { label: "Xiaomi/Redmi/Poco", icon: Smartphone },
              { label: "Performance Tuned", icon: Zap },
            ].map(({ label, icon: Icon }, index) => (
              <div key={index} className="flex items-center gap-2 text-muted-foreground">
                <Icon className="w-4 h-4" />
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
