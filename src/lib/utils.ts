import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency: string = 'CNY'): string {
  const symbols: Record<string, string> = {
    CNY: '¥',
    USD: '$',
    RUB: '₽',
    KRW: '₩',
    JPY: '¥',
  };
  const symbol = symbols[currency] || currency;
  return `${symbol}${price.toLocaleString()}`;
}

export function formatPricePerUnit(price: number, unit: string, currency: string = 'CNY'): string {
  return `${formatPrice(price, currency)}/${unit}`;
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function calculateStayDuration(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

export function getDurationLabel(days: number): string {
  if (days < 7) return `${days}晚`;
  if (days < 30) return `${Math.floor(days / 7)}周`;
  if (days < 90) return `${Math.floor(days / 30)}个月`;
  return `${Math.floor(days / 30)}个月 (季租)`;
}
