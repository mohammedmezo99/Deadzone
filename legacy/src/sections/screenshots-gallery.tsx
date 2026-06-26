"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const screenshots = [
  { id: 1, title: "Home Screen", color: "from-blue-500 to-purple-600" },
  { id: 2, title: "Quick Settings", color: "from-purple-500 to-pink-600" },
  { id: 3, title: "App Drawer", color: "from-green-500 to-blue-600" },
  { id: 4, title: "Settings", color: "from-orange-500 to-red-600" },
  { id: 5, title: "Gaming Mode", color: "from-cyan-500 to-blue-600" },
  { id: 6, title: "Battery Manager", color: "from-yellow-500 to-orange-600" },
];

export function ScreenshotsGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold font-display text-center">
            Screenshots Gallery
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {screenshots.map((screenshot, index) => (
            <motion.div
              key={screenshot.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <div className="aspect-[9/16] max-w-[200px] mx-auto rounded-2xl overflow-hidden glass relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${screenshot.color} opacity-30 group-hover:opacity-50 transition-opacity`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-2xl font-bold">{screenshot.title[0]}</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-sm font-medium text-center">{screenshot.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 text-white"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>

          <div
            className="aspect-[9/16] max-h-[80vh] w-auto max-w-[300px] rounded-3xl overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${screenshots[currentIndex].color}`} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl font-bold">{screenshots[currentIndex].title[0]}</span>
                </div>
                <h3 className="text-2xl font-bold">{screenshots[currentIndex].title}</h3>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 text-white"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            <ChevronRight className="w-8 h-8" />
          </Button>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {screenshots.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "w-8 bg-white" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}
