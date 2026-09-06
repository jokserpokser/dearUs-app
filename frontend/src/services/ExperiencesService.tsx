import axiosInstance from "../api/axiosInstance";
import { isDemoMode } from "./demoMode";

type DemoExperience = {
  id: number;
  title: string;
  notes?: string;
  is_completed: boolean;
  created_at: string;
  photo_url?: string;
  completed_at: string;
};

let demoExperiences: DemoExperience[] = [
  {
    id: 1,
    title: "Sunset picnic by the lake",
    notes: "Bring the soft blanket and the strawberry lemonade.",
    is_completed: false,
    created_at: "2026-06-20T00:00:00.000Z",
    completed_at: "",
  },
  {
    id: 2,
    title: "Make pasta from scratch",
    notes: "Try the recipe from our little Italy weekend.",
    is_completed: true,
    created_at: "2026-05-10T00:00:00.000Z",
    completed_at: "2026-06-01T00:00:00.000Z",
  },
  {
    id: 3,
    title: "Weekend in Kyoto",
    notes: "Save up for spring and find a tiny neighbourhood cafe.",
    is_completed: false,
    created_at: "2026-04-12T00:00:00.000Z",
    completed_at: "",
  },
];

export const ExperiencesService = {
  getExperiences: async () => {
    if (isDemoMode()) return { experiences: demoExperiences };

    try {
      const response = await axiosInstance.get("/experiences");

      return response.data;
    } catch (error) {
      console.error("Error getting experiences:", error);
      throw error;
    }
  },
  addExperience: async (request: { title: string; notes: string }) => {
    if (isDemoMode()) {
      const experience = {
        id: Date.now(),
        ...request,
        is_completed: false,
        created_at: new Date().toISOString(),
        completed_at: "",
      };
      demoExperiences = [...demoExperiences, experience];
      return { experience };
    }

    try {
      const response = await axiosInstance.post("/experiences", request);

      return response.data;
    } catch (error) {
      console.error("Error adding experience:", error);
      throw error;
    }
  },
  completeExperience: async (request: { experienceId: number; file: File }) => {
    if (isDemoMode()) {
      demoExperiences = demoExperiences.map((experience) =>
        experience.id === request.experienceId
          ? {
              ...experience,
              is_completed: true,
              completed_at: new Date().toISOString(),
              photo_url: URL.createObjectURL(request.file),
            }
          : experience,
      );
      return {
        experience: demoExperiences.find(
          (experience) => experience.id === request.experienceId,
        ),
      };
    }

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
    if (isDemoMode()) {
      demoExperiences = demoExperiences.filter(
        (experience) => experience.id !== experienceId,
      );
      return { success: true };
    }

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
