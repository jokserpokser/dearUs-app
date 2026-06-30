import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import {
  getExperiences,
  createExperience,
  completeExperience,
  deleteExperience,
} from "../controllers/experiencesController";

const router = Router();

router.get("/", protect, getExperiences);
router.post("/", protect, createExperience);
router.patch("/:id", protect, completeExperience);
router.delete("/:id", protect, deleteExperience);

export default router;
