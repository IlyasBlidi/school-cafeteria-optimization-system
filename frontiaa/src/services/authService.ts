import api from "@/api/axios";
import { AuthResponse, LoginCredentials, SignupCredentials } from "@/api/types";
import { API_ENDPOINTS } from "@/lib/constants";

export const authService = {
  login: async (credentials: LoginCredentials) => {
    try {
      const response = await api.post<AuthResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
      );
      // Save user data in localStorage
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error: any) {
      // Optionally log or transform the error before throwing
      console.error("Login error in authService:", error);
      throw error; // Rethrow the error for the caller to handle
    }
  },

  signup: async (credentials: SignupCredentials) => {
    try {
      const response = await api.post<AuthResponse>(
        API_ENDPOINTS.AUTH.REGISTER,
        credentials
      );
      return response.data;
    } catch (error: any) {
      console.error("Signup error in authService:", error);
      throw error; // Rethrow the error for the calling function to handle
    }
  },
};
