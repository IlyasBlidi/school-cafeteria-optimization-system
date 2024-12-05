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

const getUserData = () => {
  try {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};
export const user = getUserData();