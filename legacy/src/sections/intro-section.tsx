"use client";

import { motion } from "framer-motion";
import { Cpu, Battery, Gamepad2, Shield, Sparkles, RefreshCw } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "Performance Tuned",
    description: "Optimized kernel and system parameters for maximum performance on MediaTek chipsets.",
  },
  {
    icon: Battery,
    title: "Battery Optimization",
    description: "Advanced power management with AI-driven battery optimization for all-day usage.",
  },
  {
    icon: Gamepad2,
    title: "Gaming Ready",
    description: "Built-in gaming mode with thermal control and performance profiles for smooth gameplay.",
  },
  {
    icon: Shield,
    title: "Security First",
    description: "Regular security patches and privacy-focused features to keep your data safe.",
  },
  {
    icon: Sparkles,
    title: "Clean UI",
    description: "Minimal bloatware with a clean, customizable interface that puts you in control.",
  },
  {
    icon: RefreshCw,
    title: "OTA Updates",
    description: "Seamless over-the-air updates to keep your device running the latest version.",
  },
];

export function IntroSection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-blue-400 font-medium mb-4 block">What is DeadZone?</span>
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
            Redefining Android Experience
          </h2>
          <p className="text-lg text-muted-foreground">
            DeadZone is a custom Android ROM designed specifically for MediaTek-powered 
            Xiaomi, Redmi, and Poco devices. Our mission is to deliver exceptional performance, 
            extended battery life, and a clean user experience without compromises.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass rounded-2xl p-6 h-full hover-lift gradient-border">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
