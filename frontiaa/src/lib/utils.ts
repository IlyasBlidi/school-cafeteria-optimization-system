import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const categoryIcons: { [key: string]: string } = {
  "Breakfast": "🍳",
  "Lunch": "🍱",
  "Dinner": "🍽️",
  "Soup": "🥣",
  "Desserts": "🍨",
  "Side Dishes": "🥗",
  "Appetizer": "🥟",
  "Beverages": "☕",
  "Snacks": "🥨",
  "VIP Menu": "👑"
};