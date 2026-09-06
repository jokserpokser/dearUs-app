import axiosInstance from "../api/axiosInstance";
import { isDemoMode } from "./demoMode";

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
    if (isDemoMode()) {
      return {
        couple: {
          id: 42,
          invite_code: "DEAR-US",
          anniversary: "2021-06-18T00:00:00.000Z",
          endearment: "My favorite person",
          created_at: "2021-06-18T00:00:00.000Z",
        },
        members: [
          {
            id: 101,
            name: "Jamie",
            email: "jamie@example.com",
            created_at: "2021-06-18T00:00:00.000Z",
          },
          {
            id: 102,
            name: "Alex",
            email: "alex@example.com",
            created_at: "2021-06-18T00:00:00.000Z",
          },
        ],
      };
    }

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
