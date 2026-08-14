import axiosInstance from "../api/axiosInstance";

export const CouplesService = {
  createCouple: async (anniversary?: string, endearment?: string) => {
    try {
      const response = await axiosInstance.post("/couples/create", {
        anniversary: anniversary || null,
        endearment: endearment || null,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating couple:", error);
      throw error;
    }
  },
  getMyCouple: async () => {
    try {
      const response = await axiosInstance.get("/couples/me");
      return response.data;
    } catch (error) {
      console.error("Error fetching couple:", error);
      throw error;
    }
  },
  joinCouple: async (inviteCode: string) => {
    try {
      const response = await axiosInstance.post("/couples/join", {
        invite_code: inviteCode,
      });
      return response.data;
    } catch (error) {
      console.error("Error joining couple:", error);
      throw error;
    }
  },
};
