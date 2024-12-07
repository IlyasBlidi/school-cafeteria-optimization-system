import { Notification } from "@/types/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { create } from "zustand";


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

export interface NotificationStore {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  setNotifications: (notifications: Notification[]) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),
  setNotifications: (notifications) => set({ notifications }),
}));
