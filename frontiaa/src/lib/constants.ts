// src/lib/constants.ts

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
} as const;
