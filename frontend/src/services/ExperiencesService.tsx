import axiosInstance from "../api/axiosInstance";

export const ExperiencesService = {
  getExperiences: async () => {
    try {
      const response = await axiosInstance.get("/experiences");
      return response.data;
    } catch (error) {
      console.error("Error getting experiences:", error);
      throw error;
    }
  },
};
