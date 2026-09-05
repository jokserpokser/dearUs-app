import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import db from "../db/connections";
import { generateInviteCode } from "../utils/generateInviteCode";

// POST /couples/create
export const createCouple = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { anniversary, endearment } = req.body;

    const user = await db("users").where({ id: userId }).first();

    if (user.couple_id) {
      return res.status(409).json({ message: "You are already in a couple" });
    }

    const inviteCode = generateInviteCode();

    const [couple] = await db("couples")
      .insert({
        invite_code: inviteCode,
        anniversary: anniversary || null,
        endearment: endearment || null,
      })
      .returning("*");

    await db("users").where({ id: userId }).update({ couple_id: couple.id });

    res.status(201).json({ couple });
  } catch (error: any) {
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Invite code collision, please try again",
      });
    }
    console.error("createCouple error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// POST /couples/join
export const joinCouple = async (req: AuthRequest, res: Response) => {
  const { invite_code } = req.body;

  try {
    const userId = req.user!.userId;

    const user = await db("users").where({ id: userId }).first();

    if (user.couple_id) {
      return res.status(409).json({ message: "You are already in a couple" });
    }

    const couple = await db("couples").where({ invite_code }).first();

    if (!couple) {
      return res.status(404).json({ message: "Invalid invite code" });
    }

    await db("users").where({ id: userId }).update({ couple_id: couple.id });

    res.status(200).json({ couple });
  } catch (error) {
    console.error("joinCouple error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /couples/me
export const getMyCouple = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;

    const user = await db("users").where({ id: userId }).first();

    if (!user.couple_id) {
      return res
        .status(404)
        .json({ message: "You are not part of a couple yet" });
    }

    const couple = await db("couples").where({ id: user.couple_id }).first();

    const members = await db("users")
      .where({ couple_id: user.couple_id })
      .orderBy("created_at", "asc")
      .select("id", "name", "email", "created_at");

    res.status(200).json({ couple, members });
  } catch (error) {
    console.error("getMyCouple error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
