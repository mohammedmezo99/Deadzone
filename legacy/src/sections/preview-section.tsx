"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

const screenshots = [
  {
    id: 1,
    title: "Home Screen",
    description: "Clean and customizable home screen with smooth animations",
    color: "from-blue-500/30 to-purple-500/30",
  },
  {
    id: 2,
    title: "Settings",
    description: "Intuitive settings with advanced customization options",
    color: "from-purple-500/30 to-pink-500/30",
  },
  {
    id: 3,
    title: "Gaming Mode",
    description: "Dedicated gaming mode for optimal performance",
    color: "from-green-500/30 to-blue-500/30",
  },
  {
    id: 4,
    title: "Battery Manager",
    description: "Advanced battery management and optimization",
    color: "from-yellow-500/30 to-orange-500/30",
  },
  {
    id: 5,
    title: "Quick Settings",
    description: "Redesigned quick settings panel with custom tiles",
    color: "from-red-500/30 to-pink-500/30",
  },
];

export function PreviewSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-purple-400 font-medium mb-4 block">UI Preview</span>
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
            Experience DeadZone
          </h2>
          <p className="text-lg text-muted-foreground">
            Take a glimpse at the sleek, modern interface designed for performance and aesthetics.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Main Display */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden glass">
            <div className={`absolute inset-0 bg-gradient-to-br ${screenshots[currentIndex].color} opacity-50`} />
            
            {/* Phone Mockup */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-48 md:w-64 h-80 md:h-96 bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2rem] p-2 shadow-2xl">
                {/* Screen */}
                <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-[1.5rem] overflow-hidden relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${screenshots[currentIndex].color}`} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold">M</span>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">{screenshots[currentIndex].title}</h4>
                    <p className="text-xs text-white/70">{screenshots[currentIndex].description}</p>
                  </div>
                </div>
                {/* Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full" />
              </div>
            </div>

            {/* Navigation */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={prevSlide}
                className="glass hover:bg-white/10"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              <div className="flex gap-2">
                {screenshots.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "w-8 bg-white"
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={nextSlide}
                className="glass hover:bg-white/10"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Fullscreen Button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 glass hover:bg-white/10"
                >
                  <Maximize2 className="w-5 h-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl bg-background/95 backdrop-blur-xl">
                <div className={`aspect-video rounded-xl bg-gradient-to-br ${screenshots[currentIndex].color} flex items-center justify-center`}>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">{screenshots[currentIndex].title}</h3>
                    <p className="text-muted-foreground">{screenshots[currentIndex].description}</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Thumbnails */}
          <div className="flex justify-center gap-3 mt-6">
            {screenshots.map((screenshot, index) => (
              <button
                key={screenshot.id}
                onClick={() => setCurrentIndex(index)}
                className={`w-20 h-14 rounded-lg overflow-hidden transition-all ${
                  index === currentIndex
                    ? "ring-2 ring-blue-500 scale-105"
                    : "opacity-50 hover:opacity-75"
                }`}
              >
                <div className={`w-full h-full bg-gradient-to-br ${screenshot.color}`} />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
