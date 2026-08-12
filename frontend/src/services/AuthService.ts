import axiosInstance from "../api/axiosInstance";

export const AuthService = {
  register: async (name: string, email: string, password: string) => {
    try {
      const response = await axiosInstance.post("/auth/register", {
        name,
        email,
        password,
      });

      return response.data;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  },
  login: async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      return response.data;
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  },
};
