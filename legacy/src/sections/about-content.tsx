"use client";

import { motion } from "framer-motion";
import { Target, Eye, Heart, Cpu, Zap, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    icon: Zap,
    title: "Performance First",
    description: "We believe every device deserves to run at its full potential. Our optimizations squeeze out every bit of performance from MediaTek chipsets.",
  },
  {
    icon: Heart,
    title: "Community Driven",
    description: "DeadZone is built by the community, for the community. We listen to feedback and continuously improve based on user needs.",
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    description: "Your data belongs to you. We prioritize privacy-focused features and regular security updates to keep your device safe.",
  },
  {
    icon: Cpu,
    title: "MediaTek Focus",
    description: "While others focus on Snapdragon, we specialize in MediaTek optimization, bringing flagship-level performance to these devices.",
  },
];

const milestones = [
  { year: "2022", event: "DeadZone founded" },
  { year: "2023", event: "First public release" },
  { year: "2023", event: "10+ devices supported" },
  { year: "2024", event: "VIP program launched" },
  { year: "2024", event: "25,000+ downloads" },
  { year: "2024", event: "25+ devices supported" },
];

export function AboutContent() {
  return (
    <div className="container mx-auto px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center mb-16"
      >
        <span className="text-blue-400 font-medium mb-4 block">About Us</span>
        <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
          Our Story
        </h1>
        <p className="text-lg text-muted-foreground">
          From a small passion project to a thriving community of Android enthusiasts.
        </p>
      </motion.div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8 mb-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="glass border-white/5 h-full">
            <CardContent className="p-8">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold font-display mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To deliver exceptional Android experiences on MediaTek-powered devices, 
                proving that great performance is not limited to flagship chipsets. We 
                strive to extend device longevity and provide users with the latest 
                features and security updates.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="glass border-white/5 h-full">
            <CardContent className="p-8">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold font-display mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To become the go-to custom ROM for MediaTek devices, creating a world 
                where every Android user can enjoy a smooth, secure, and personalized 
                experience regardless of their device&apos;s price point. We envision a 
                community-driven ecosystem that puts users first.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Values */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-20"
      >
        <h2 className="text-2xl md:text-3xl font-bold font-display text-center mb-12">
          Our Core Values
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <Card className="glass border-white/5 h-full hover-lift">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Device Policy */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mb-20"
      >
        <Card className="glass border-white/5">
          <CardContent className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">
                  Device Support Policy
                </h2>
                <p className="text-muted-foreground mb-6">
                  We focus exclusively on MediaTek-powered devices from Xiaomi, Redmi, 
                  and Poco. This focused approach allows us to deliver the best possible 
                  optimization and support for our users.
                </p>
                <ul className="space-y-3">
                  {[
                    "MediaTek chipsets priority",
                    "Xiaomi/Redmi/Poco devices only",
                    "Active community support",
                    "Regular security updates",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                        <svg className="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="aspect-square max-w-sm mx-auto rounded-3xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                      <Cpu className="w-12 h-12 text-blue-400" />
                    </div>
                    <p className="text-lg font-semibold">MediaTek Optimized</p>
                    <p className="text-sm text-muted-foreground">Xiaomi / Redmi / Poco</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold font-display text-center mb-12">
          Our Journey
        </h2>
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent" />
            
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className={`relative flex items-center gap-8 mb-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"} hidden md:block`}>
                  {index % 2 === 0 && (
                    <>
                      <span className="text-2xl font-bold text-gradient">{milestone.year}</span>
                      <p className="text-muted-foreground">{milestone.event}</p>
                    </>
                  )}
                </div>
                
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative z-10">
                  <div className="w-3 h-3 rounded-full bg-white" />
                </div>
                
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                  <span className="text-2xl font-bold text-gradient md:hidden">{milestone.year}</span>
                  {index % 2 !== 0 ? (
                    <>
                      <span className="text-2xl font-bold text-gradient hidden md:inline">{milestone.year}</span>
                      <p className="text-muted-foreground">{milestone.event}</p>
                    </>
                  ) : (
                    <p className="text-muted-foreground md:hidden">{milestone.event}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
