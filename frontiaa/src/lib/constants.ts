import { Status } from "@/types/types";

export const API_BASE_URL = "http://localhost:8080/api/v1";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/authenticate",
    REGISTER: "/auth/register",
  },

  USERS: {
    ALL: "/users",
    BY_ID: (id: string) => `/users/${id}`,
  },

  CARDS: {
    ALL: "/cards",
    BY_USER_ID: (userId: string) => `/cards/${userId}`,
    CAHRGE: (cardId: string, amount: number) => `/cards/${cardId}`,
  },
  
  COMMAND: {
    ALL: "/commands",
    NEW_BY_USER_ID: (userId: string) => `/commands/${userId}`,
    STATUS_BY_ID: (commandId: string, status: Status) =>
      `/commands/${status.toLocaleLowerCase()}/${commandId}`,
    ACTIVE_BY_ID: (userId: string) => `/commands/active/${userId}`,
  },
};
