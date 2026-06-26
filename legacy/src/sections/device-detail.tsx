"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft, 
  Cpu, 
  Calendar, 
  FileSize, 
  Download, 
  Crown, 
  Check,
  AlertCircle,
  BookOpen,
  Clock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Device, Rom } from "@/types";

interface DeviceDetailProps {
  device: Device & { roms: Rom[] };
}

const brandColors: Record<string, string> = {
  XIAOMI: "from-orange-500/20 to-orange-600/20 border-orange-500/20",
  REDMI: "from-red-500/20 to-red-600/20 border-red-500/20",
  POCO: "from-yellow-500/20 to-yellow-600/20 border-yellow-500/20",
};

const brandBadgeColors: Record<string, string> = {
  XIAOMI: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  REDMI: "bg-red-500/20 text-red-400 border-red-500/30",
  POCO: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
};

function RomCard({ rom, deviceCodename }: { rom: Rom; deviceCodename: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="glass border-white/5 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold">{rom.name}</h3>
                {rom.isVipOnly && (
                  <Badge variant="vip">
                    <Crown className="w-3 h-3 mr-1" />
                    VIP
                  </Badge>
                )}
                <Badge 
                  variant={rom.status === "ACTIVE" ? "success" : "secondary"}
                  className="text-xs"
                >
                  {rom.status}
                </Badge>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Cpu className="w-4 h-4" />
                  Android {rom.androidVersion}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(rom.releaseDate).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <FileSize className="w-4 h-4" />
                  {rom.fileSize}
                </span>
              </div>
            </div>

            <Button
              className={rom.isVipOnly 
                ? "bg-gradient-to-r from-amber-500 to-orange-500" 
                : "bg-gradient-to-r from-blue-500 to-purple-600"
              }
              disabled={rom.status !== "ACTIVE"}
            >
              <Download className="w-4 h-4 mr-2" />
              {rom.isVipOnly ? "Get VIP" : "Download"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function DeviceDetail({ device }: DeviceDetailProps) {
  const freeRoms = device.roms.filter((rom) => !rom.isVipOnly);
  const vipRoms = device.roms.filter((rom) => rom.isVipOnly);

  return (
    <div className="container mx-auto px-4">
      {/* Back Link */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <Link href="/download">
          <Button variant="ghost" className="pl-0">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Devices
          </Button>
        </Link>
      </motion.div>

      {/* Device Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${brandColors[device.brand]} border p-8 md:p-12 mb-8`}
      >
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge 
                  variant="outline" 
                  className={`${brandBadgeColors[device.brand]} capitalize`}
                >
                  {device.brand.toLowerCase()}
                </Badge>
                {device.status === "ACTIVE" && (
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    <Check className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold font-display mb-2">
                {device.name}
              </h1>
              <p className="text-lg text-muted-foreground">
                Codename: <span className="font-mono">{device.codename}</span>
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Chipset</p>
                <p className="font-medium">{device.chipset}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <Cpu className="w-6 h-6" />
              </div>
            </div>
          </div>

          {device.description && (
            <p className="mt-6 text-muted-foreground max-w-2xl">
              {device.description}
            </p>
          )}
        </div>
      </motion.div>

      {/* Content Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Tabs defaultValue="roms" className="w-full">
          <TabsList className="glass mb-6">
            <TabsTrigger value="roms">ROMs</TabsTrigger>
            <TabsTrigger value="changelog">Changelog</TabsTrigger>
            <TabsTrigger value="installation">Installation</TabsTrigger>
          </TabsList>

          <TabsContent value="roms" className="space-y-6">
            {freeRoms.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Free Versions</h2>
                <div className="space-y-4">
                  {freeRoms.map((rom) => (
                    <RomCard key={rom.id} rom={rom} deviceCodename={device.codename} />
                  ))}
                </div>
              </div>
            )}

            {vipRoms.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Crown className="w-5 h-5 text-amber-400" />
                  VIP Versions
                </h2>
                <div className="space-y-4">
                  {vipRoms.map((rom) => (
                    <RomCard key={rom.id} rom={rom} deviceCodename={device.codename} />
                  ))}
                </div>
              </div>
            )}

            {device.roms.length === 0 && (
              <Card className="glass border-white/5">
                <CardContent className="p-12 text-center">
                  <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No ROMs Available</h3>
                  <p className="text-muted-foreground">
                    There are no ROMs available for this device yet. Check back later!
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="changelog">
            <Card className="glass border-white/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Changelog
                </CardTitle>
              </CardHeader>
              <CardContent>
                {device.roms.length > 0 ? (
                  <div className="space-y-6">
                    {device.roms.slice(0, 5).map((rom) => (
                      <div key={rom.id} className="border-l-2 border-white/10 pl-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">{rom.version}</span>
                          <span className="text-sm text-muted-foreground">
                            {new Date(rom.releaseDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground whitespace-pre-line">
                          {rom.changelog}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    No changelog available yet.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="installation">
            <Card className="glass border-white/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Installation Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Prerequisites</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Unlocked bootloader</li>
                      <li>Custom recovery installed (TWRP or similar)</li>
                      <li>Backup of your current data</li>
                      <li>At least 50% battery</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Installation Steps</h3>
                    <ol className="list-decimal list-inside text-muted-foreground space-y-2">
                      <li>Download the ROM zip file for your device</li>
                      <li>Boot into custom recovery mode</li>
                      <li>Wipe data, cache, and dalvik cache</li>
                      <li>Flash the ROM zip file</li>
                      <li>Flash GApps (optional, for Google services)</li>
                      <li>Reboot and enjoy DeadZone!</li>
                    </ol>
                  </div>

                  <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-400">Important Notice</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Installing a custom ROM will wipe all your data. Make sure to backup 
                          important files before proceeding. We are not responsible for any data loss.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
