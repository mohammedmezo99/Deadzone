export interface Device {
  id: string;
  name: string;
  codename: string;
  brand: 'XIAOMI' | 'REDMI' | 'POCO';
  chipset: string;
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
  image?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  roms?: Rom[];
}

export interface Rom {
  id: string;
  deviceId: string;
  device?: Device;
  name: string;
  version: string;
  androidVersion: string;
  type: 'FREE' | 'VIP';
  downloadUrl: string;
  fileSize: string;
  changelog: string;
  releaseDate: string;
  screenshots: string[];
  installationGuide?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
  isVipOnly: boolean;
  createdAt: string;
  updatedAt: string;
  downloadCount?: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: 'LEADER' | 'DEVELOPER' | 'TESTER' | 'CONTRIBUTOR' | 'DESIGNER';
  image?: string;
  bio?: string;
  github?: string;
  telegram?: string;
  twitter?: string;
  website?: string;
  order: number;
}

export interface Download {
  id: string;
  romId: string;
  rom?: Rom;
  timestamp: string;
  ip?: string;
  userAgent?: string;
}

export interface SiteStats {
  id: string;
  totalDownloads: number;
  totalDevices: number;
  totalRoms: number;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'ADMIN' | 'MODERATOR';
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface ComparisonFeature {
  name: string;
  free: boolean | string;
  vip: boolean | string;
}
