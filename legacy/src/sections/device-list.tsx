"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Cpu, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Device } from "@/types";

interface DeviceListProps {
  devices: Device[];
}

const brandColors: Record<string, string> = {
  XIAOMI: "from-orange-500/20 to-orange-600/20",
  REDMI: "from-red-500/20 to-red-600/20",
  POCO: "from-yellow-500/20 to-yellow-600/20",
};

const brandBadgeColors: Record<string, string> = {
  XIAOMI: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  REDMI: "bg-red-500/20 text-red-400 border-red-500/30",
  POCO: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
};

export function DeviceList({ devices }: DeviceListProps) {
  if (devices.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <Cpu className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No devices found</h3>
            <p className="text-muted-foreground">
              Check back later for new device support.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {devices.map((device, index) => (
            <motion.div
              key={device.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/download/${device.codename}`}>
                <Card className="group glass border-white/5 hover:border-white/10 transition-all duration-300 hover-lift overflow-hidden">
                  <CardContent className="p-0">
                    {/* Image */}
                    <div className={`relative h-48 bg-gradient-to-br ${brandColors[device.brand]} overflow-hidden`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-2xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <span className="text-4xl font-bold">{device.name[0]}</span>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge 
                          variant="outline" 
                          className={`${brandBadgeColors[device.brand]} capitalize`}
                        >
                          {device.brand.toLowerCase()}
                        </Badge>
                      </div>
                      {device.roms && device.roms.length > 0 && (
                        <div className="absolute bottom-4 left-4">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            <Check className="w-3 h-3 mr-1" />
                            Active
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold group-hover:text-blue-400 transition-colors">
                            {device.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Codename: {device.codename}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <Cpu className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{device.chipset}</span>
                      </div>

                      {device.roms && device.roms.length > 0 && (
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                          <div>
                            <p className="text-xs text-muted-foreground">Latest Version</p>
                            <p className="text-sm font-medium">{device.roms[0].version}</p>
                          </div>
                          <Button size="sm" variant="ghost" className="group/btn">
                            View
                            <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
