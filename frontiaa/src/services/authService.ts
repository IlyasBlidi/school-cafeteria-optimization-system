import api from "@/api/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import { LoginCredentials, AuthResponse, SignupCredentials } from "@/types/types";

export const authService = {
  login: async (credentials: LoginCredentials) => {
    try {
      const response = await api.post<AuthResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
      );

      

      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error: any) {
      console.error("Login error in authService:", error);
      throw error; 
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
      throw error;
    }
  },
};
