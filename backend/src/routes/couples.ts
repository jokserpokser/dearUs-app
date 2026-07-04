import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import {
  createCouple,
  joinCouple,
  getMyCouple,
} from "../controllers/couplesController";

const router = Router();

router.post("/create", protect, createCouple);
router.post("/join", protect, joinCouple);
router.get("/me", protect, getMyCouple);

export default router;
