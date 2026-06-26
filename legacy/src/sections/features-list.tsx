"use client";

import { motion } from "framer-motion";
import { 
  Cpu, 
  Battery, 
  Gamepad2, 
  Shield, 
  Sparkles, 
  RefreshCw,
  Thermometer,
  Palette,
  Zap,
  Settings,
  Wifi,
  Lock
} from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "Performance Tuned Kernel",
    description: "Custom kernel optimizations for MediaTek chipsets delivering up to 30% better performance.",
  },
  {
    icon: Thermometer,
    title: "Advanced Thermal Control",
    description: "Intelligent thermal management prevents overheating during intensive tasks and gaming.",
  },
  {
    icon: Gamepad2,
    title: "Gaming Optimization",
    description: "Dedicated gaming mode with performance profiles, touch optimization, and distraction-free experience.",
  },
  {
    icon: Battery,
    title: "Battery Optimization",
    description: "AI-driven power management extends battery life by up to 40% with smart background app control.",
  },
  {
    icon: Sparkles,
    title: "Clean UI Design",
    description: "Minimal bloatware with a modern, customizable interface. Choose from multiple themes and icon packs.",
  },
  {
    icon: RefreshCw,
    title: "OTA Update Support",
    description: "Seamless over-the-air updates keep your device secure and up-to-date with the latest features.",
  },
  {
    icon: Zap,
    title: "Fast Boot & App Launch",
    description: "Optimized boot sequence and app preloading for lightning-fast startup and app launches.",
  },
  {
    icon: Palette,
    title: "Customization Options",
    description: "Extensive theming support, custom fonts, icon shapes, and accent colors to match your style.",
  },
  {
    icon: Wifi,
    title: "Network Optimization",
    description: "Enhanced WiFi and mobile data performance with reduced latency and improved stability.",
  },
  {
    icon: Shield,
    title: "Security & Privacy",
    description: "Regular security patches, privacy indicators, and granular permission controls.",
  },
  {
    icon: Settings,
    title: "Advanced Settings",
    description: "Fine-tune every aspect of your device with our comprehensive settings panel.",
  },
  {
    icon: Lock,
    title: "App Locker",
    description: "Built-in app locker with biometric authentication to protect your sensitive applications.",
  },
];

export function FeaturesList() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold font-display text-center">
            Feature Highlights
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group"
            >
              <div className="glass rounded-2xl p-6 h-full hover-lift">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
