import { Metadata } from "next";
import { DeviceSearch } from "@/sections/device-search";
import { DeviceList } from "@/sections/device-list";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Download | DeadZone",
  description: "Download DeadZone for your device. Find ROMs for Xiaomi, Redmi, and Poco devices.",
};

async function getDevices() {
  try {
    const devices = await prisma.device.findMany({
      where: {
        status: "ACTIVE",
      },
      include: {
        roms: {
          where: {
            status: "ACTIVE",
          },
          orderBy: {
            releaseDate: "desc",
          },
          take: 1,
        },
      },
      orderBy: {
        name: "asc",
      },
    });
    return devices;
  } catch (error) {
    console.error("Error fetching devices:", error);
    return [];
  }
}

export default async function DownloadPage() {
  const devices = await getDevices();

  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <div className="container mx-auto px-4 mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-blue-400 font-medium mb-4 block">Download</span>
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
            Find Your Device
          </h1>
          <p className="text-lg text-muted-foreground">
            Search for your device and download the latest version of DeadZone. 
            We support Xiaomi, Redmi, and Poco devices with MediaTek chipsets.
          </p>
        </div>
      </div>

      <DeviceSearch />
      <DeviceList devices={devices} />
    </div>
  );
}
