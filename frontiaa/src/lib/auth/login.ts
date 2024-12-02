import axios from "axios";
import { useRouter } from "next/navigation";
// import axiosInstance from "../axios-instance";

export async function handleLogin(
  email: string,
  password: string,
  router: ReturnType<typeof useRouter>
) {
  try {
    const response = await axios.post("http://localhost:8080/api/v1/auth/authenticate", {
      email,
      password,
    });

    if (response.status === 200) {
      // Save user details in localStorage
      localStorage.setItem("user", JSON.stringify(response.data));

      // Redirect based on user role
      const userRole = response.data.role;
      if (userRole === "MANAGER") {
        router.push("/admin");
      } else if (userRole === "USER") {
        router.push("/user");
      } else {
        console.error("Unknown role:", userRole);
      }
    } else {
      console.error("Failed to connect, status code:", response.status);
    }
  } catch (error) {
    console.error("Error occurred during login:", error);
  }
}
