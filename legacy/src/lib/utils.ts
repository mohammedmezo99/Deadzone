import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function getBrandColor(brand: string): string {
  const colors: Record<string, string> = {
    XIAOMI: 'bg-orange-500',
    REDMI: 'bg-red-500',
    POCO: 'bg-yellow-500',
  };
  return colors[brand] || 'bg-blue-500';
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    ACTIVE: 'bg-green-500',
    INACTIVE: 'bg-red-500',
    MAINTENANCE: 'bg-yellow-500',
  };
  return colors[status] || 'bg-gray-500';
}

export function getRoleColor(role: string): string {
  const colors: Record<string, string> = {
    LEADER: 'bg-purple-500',
    DEVELOPER: 'bg-blue-500',
    TESTER: 'bg-green-500',
    CONTRIBUTOR: 'bg-orange-500',
    DESIGNER: 'bg-pink-500',
  };
  return colors[role] || 'bg-gray-500';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function generateMetadata({
  title,
  description,
  image,
  url,
}: {
  title: string;
  description: string;
  image?: string;
  url?: string;
}) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [image] : [],
      url,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
