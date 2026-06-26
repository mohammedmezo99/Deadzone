"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Smartphone, 
  Cpu, 
  Download, 
  Users, 
  Plus, 
  Settings,
  LogOut,
  TrendingUp,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

interface AdminDashboardProps {
  stats: {
    totalDevices: number;
    totalRoms: number;
    totalDownloads: number;
    totalTeamMembers: number;
    downloadsPerDay: any[];
    downloadsPerDevice: any[];
  };
}

const statCards = [
  { key: "totalDevices", label: "Total Devices", icon: Smartphone, color: "from-blue-500/20 to-blue-600/20" },
  { key: "totalRoms", label: "Total ROMs", icon: Cpu, color: "from-purple-500/20 to-purple-600/20" },
  { key: "totalDownloads", label: "Total Downloads", icon: Download, color: "from-green-500/20 to-green-600/20" },
  { key: "totalTeamMembers", label: "Team Members", icon: Users, color: "from-orange-500/20 to-orange-600/20" },
];

export function AdminDashboard({ stats }: AdminDashboardProps) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-display">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your DeadZone ecosystem</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {statCards.map((stat, index) => (
            <Card key={stat.key} className="glass border-white/5">
              <CardContent className="p-6">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <p className="text-2xl font-bold">{stats[stat.key as keyof typeof stats].toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Management Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="glass mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="devices">Devices</TabsTrigger>
              <TabsTrigger value="roms">ROMs</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="glass border-white/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      <Link href="/admin/devices/new">
                        <Button variant="outline" className="w-full justify-start">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Device
                        </Button>
                      </Link>
                      <Link href="/admin/roms/new">
                        <Button variant="outline" className="w-full justify-start">
                          <Plus className="w-4 h-4 mr-2" />
                          Add ROM
                        </Button>
                      </Link>
                      <Link href="/admin/team/new">
                        <Button variant="outline" className="w-full justify-start">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Member
                        </Button>
                      </Link>
                      <Link href="/admin/settings">
                        <Button variant="outline" className="w-full justify-start">
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass border-white/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                        <span className="text-sm">New device added</span>
                        <span className="text-xs text-muted-foreground">2 hours ago</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                        <span className="text-sm">ROM updated</span>
                        <span className="text-xs text-muted-foreground">5 hours ago</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                        <span className="text-sm">Team member added</span>
                        <span className="text-xs text-muted-foreground">1 day ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="devices">
              <Card className="glass border-white/5">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Device Management</CardTitle>
                  <Link href="/admin/devices/new">
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Device
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center py-8">
                    Device management interface coming soon. Use the API for now.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="roms">
              <Card className="glass border-white/5">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>ROM Management</CardTitle>
                  <Link href="/admin/roms/new">
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add ROM
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center py-8">
                    ROM management interface coming soon. Use the API for now.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team">
              <Card className="glass border-white/5">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Team Management</CardTitle>
                  <Link href="/admin/team/new">
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Member
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center py-8">
                    Team management interface coming soon. Use the API for now.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
