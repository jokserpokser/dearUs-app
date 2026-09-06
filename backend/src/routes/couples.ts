import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import {
  createCouple,
  joinCouple,
  getMyCouple,
  updateMyCouple,
  leaveCouple,
} from "../controllers/couplesController";

const router = Router();

router.post("/create", protect, createCouple);
router.post("/join", protect, joinCouple);
router.get("/me", protect, getMyCouple);
router.put("/me", protect, updateMyCouple);
router.delete("/me", protect, leaveCouple);

export default router;
