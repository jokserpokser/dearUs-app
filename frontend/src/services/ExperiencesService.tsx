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
  addExperience: async (experienceData: { title: string; notes: string }) => {
    try {
      const response = await axiosInstance.post("/experiences", experienceData);
      return response.data;
    } catch (error) {
      console.error("Error adding experience:", error);
      throw error;
    }
  },
};
