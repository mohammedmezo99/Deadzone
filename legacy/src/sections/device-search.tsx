"use client";

import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DeviceSearch() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass rounded-2xl p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by device name or codename..."
                  className="pl-10 bg-white/5 border-white/10"
                />
              </div>
              <div className="flex gap-3">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[140px] bg-white/5 border-white/10">
                    <SelectValue placeholder="Brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Brands</SelectItem>
                    <SelectItem value="XIAOMI">Xiaomi</SelectItem>
                    <SelectItem value="REDMI">Redmi</SelectItem>
                    <SelectItem value="POCO">Poco</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="border-white/10">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
