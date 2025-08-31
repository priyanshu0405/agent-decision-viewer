import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function maskCustomerId(id: string): string {
  if (id.length <= 3) {
    return `c_***${id}`;
  }
  return `c_***${id.slice(-3)}`;
}
