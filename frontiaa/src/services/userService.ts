// src/services/userService.ts

import api from "@/api/axios";
import { User } from "@/api/types";
import { API_ENDPOINTS } from "@/lib/constants";

export const userService = {
  getAllUsers: () => api.get<User[]>(API_ENDPOINTS.USERS.ALL),

  getUserById: (id: string) => api.get<User>(API_ENDPOINTS.USERS.BY_ID(id)),
};
