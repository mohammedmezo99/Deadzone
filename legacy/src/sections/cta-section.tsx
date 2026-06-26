"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Download, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[80px]" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-50" />
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-8"
              >
                <Zap className="w-10 h-10 text-white" />
              </motion.div>

              <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
                Ready to Experience
                <span className="text-gradient block mt-2">DeadZone?</span>
              </h2>

              <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
                Join thousands of users who have already transformed their Android experience. 
                Download DeadZone today and unlock the full potential of your device.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/download">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white px-8 py-6 text-lg rounded-xl group"
                  >
                    <Download className="w-5 h-5 mr-2" />
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
              </div>

              {/* Trust Badges */}
              <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  Free Forever
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  Open Source
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  Community Driven
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
