import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import {
  createTip,
  deleteTip,
  getTip,
  getTips,
  updateTip,
  likeTip,
} from "../controllers/tips.js";

router.post("/", createTip);
router.get("/", getTips);
router.get("/:id", getTip);
router.delete("/:id", auth, deleteTip);
router.patch("/:id", auth, updateTip);

router.post("/:id/like", auth, likeTip);

export default router;
