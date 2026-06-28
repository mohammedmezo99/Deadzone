"use client";

import { exactDeviceImageByName } from "@/data/devices";
export const fallbackImage = "/devices/placeholder.png";

/**
 * Resolve the correct device image path for a given codename.
 * If a verified image exists in `public/devices/` it returns that path.
 * Otherwise it falls back to the generic placeholder image.
 */
export function getDeviceImage(codename: string): string {
  const mappedName = exactDeviceImageByName[codename];
  if (mappedName) {
    return `/devices/${mappedName}.webp`;
  }
  return fallbackImage;
}
