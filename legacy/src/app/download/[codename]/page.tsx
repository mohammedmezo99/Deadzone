import { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { DeviceDetail } from "@/sections/device-detail";

interface DevicePageProps {
  params: {
    codename: string;
  };
}

async function getDevice(codename: string) {
  try {
    const device = await prisma.device.findUnique({
      where: {
        codename,
      },
      include: {
        roms: {
          orderBy: {
            releaseDate: "desc",
          },
        },
      },
    });
    return device;
  } catch (error) {
    console.error("Error fetching device:", error);
    return null;
  }
}

export async function generateMetadata({ params }: DevicePageProps): Promise<Metadata> {
  const device = await getDevice(params.codename);
  
  if (!device) {
    return {
      title: "Device Not Found | DeadZone",
    };
  }

  return {
    title: `${device.name} | Download | DeadZone`,
    description: `Download DeadZone for ${device.name} (${device.codename}). Latest ROM versions and installation guides.`,
  };
}

export async function generateStaticParams() {
  try {
    const devices = await prisma.device.findMany({
      select: {
        codename: true,
      },
    });
    return devices.map((device) => ({
      codename: device.codename,
    }));
  } catch (error) {
    return [];
  }
}

export default async function DevicePage({ params }: DevicePageProps) {
  const device = await getDevice(params.codename);

  if (!device) {
    notFound();
  }

  return (
    <div className="pt-24 pb-16">
      <DeviceDetail device={device} />
    </div>
  );
}
