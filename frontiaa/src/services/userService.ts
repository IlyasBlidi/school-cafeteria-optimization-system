// src/services/userService.ts

import api from "@/api/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import { User } from "@/types/types";

export const userService = {
  getAllUsers: () => api.get<User[]>(API_ENDPOINTS.USERS.ALL),

  getUserById: (id: string) => api.get<User>(API_ENDPOINTS.USERS.BY_ID(id)),
};
