import type { User } from "../context/models";

export const demoUser: User = {
  id: 101,
  email: "jamie.alex@example.com",
  name: "Jamie & Alex",
  couple_id: 42,
  created_at: "2021-06-18T00:00:00.000Z",
};

export const isDemoMode = () =>
  typeof window !== "undefined" && window.location.pathname.startsWith("/demo");
