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
  addExperience: async (request: { title: string; notes: string }) => {
    try {
      const response = await axiosInstance.post("/experiences", request);

      return response.data;
    } catch (error) {
      console.error("Error adding experience:", error);
      throw error;
    }
  },
  completeExperience: async (request: { experienceId: number; file: File }) => {
    try {
      const formData = new FormData();
      formData.append("photo", request.file);

      const response = await axiosInstance.patch(
        `/experiences/${request.experienceId}`,
        formData,
      );

      return response.data;
    } catch (error) {
      console.error("Error completing experience:", error);
      throw error;
    }
  },
  deleteExperience: async (experienceId: number) => {
    try {
      const response = await axiosInstance.delete(
        `/experiences/${experienceId}`,
      );

      return response.data;
    } catch (error) {
      console.error("Error deleting experience:", error);
      throw error;
    }
  },
};
