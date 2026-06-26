import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { AdminDashboard } from "@/sections/admin-dashboard";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Admin Dashboard | DeadZone",
};

async function getStats() {
  try {
    const [totalDevices, totalRoms, totalDownloads, totalTeamMembers] = await Promise.all([
      prisma.device.count(),
      prisma.rom.count(),
      prisma.download.count(),
      prisma.teamMember.count(),
    ]);

    // Get downloads per day for the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const downloadsPerDay = await prisma.download.groupBy({
      by: ["timestamp"],
      where: {
        timestamp: {
          gte: sevenDaysAgo,
        },
      },
      _count: {
        id: true,
      },
    });

    // Get downloads per device
    const downloadsPerDevice = await prisma.device.findMany({
      select: {
        name: true,
        codename: true,
        _count: {
          select: {
            roms: {
              select: {
                downloads: true,
              },
            },
          },
        },
      },
      take: 5,
    });

    return {
      totalDevices,
      totalRoms,
      totalDownloads,
      totalTeamMembers,
      downloadsPerDay,
      downloadsPerDevice,
    };
  } catch (error) {
    console.error("Error fetching stats:", error);
    return {
      totalDevices: 0,
      totalRoms: 0,
      totalDownloads: 0,
      totalTeamMembers: 0,
      downloadsPerDay: [],
      downloadsPerDevice: [],
    };
  }
}

export default async function AdminPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/admin/login");
  }

  const stats = await getStats();

  return <AdminDashboard stats={stats} />;
}
