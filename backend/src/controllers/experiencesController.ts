import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import db from "../db/connections";

// Helper: get couple_id from userId
const getCoupleId = async (userId: number): Promise<number | null> => {
  const user = await db("users").where({ id: userId }).first();
  return user?.couple_id ?? null;
};

// GET /experiences
export const getExperiences = async (req: AuthRequest, res: Response) => {
  try {
    const coupleId = await getCoupleId(req.user!.userId);

    if (!coupleId) {
      return res
        .status(403)
        .json({ message: "You are not part of a couple yet" });
    }

    const experiences = await db("experiences")
      .where({ couple_id: coupleId })
      .orderBy("created_at", "desc");

    res.status(200).json({ experiences });
  } catch (error) {
    console.error("getExperiences error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// POST /experiences
export const createExperience = async (req: AuthRequest, res: Response) => {
  const { title, notes } = req.body;

  try {
    const coupleId = await getCoupleId(req.user!.userId);

    if (!coupleId) {
      return res
        .status(403)
        .json({ message: "You are not part of a couple yet" });
    }

    const [experience] = await db("experiences")
      .insert({ couple_id: coupleId, title, notes })
      .returning("*");

    res.status(201).json({ experience });
  } catch (error) {
    console.error("createExperience error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PATCH /experiences/:id
export const completeExperience = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  try {
    const coupleId = await getCoupleId(req.user!.userId);

    if (!coupleId) {
      return res
        .status(403)
        .json({ message: "You are not part of a couple yet" });
    }

    // Make sure this experience belongs to this couple
    const experience = await db("experiences")
      .where({ id, couple_id: coupleId })
      .first();

    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    const [updated] = await db("experiences")
      .where({ id })
      .update({
        is_completed: true,
        completed_at: new Date(),
      })
      .returning("*");

    res.status(200).json({ experience: updated });
  } catch (error) {
    console.error("completeExperience error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE /experiences/:id
export const deleteExperience = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  try {
    const coupleId = await getCoupleId(req.user!.userId);

    if (!coupleId) {
      return res
        .status(403)
        .json({ message: "You are not part of a couple yet" });
    }

    // Make sure this experience belongs to this couple
    const experience = await db("experiences")
      .where({ id, couple_id: coupleId })
      .first();

    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    await db("experiences").where({ id }).delete();

    res.status(200).json({ message: "Experience deleted" });
  } catch (error) {
    console.error("deleteExperience error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
