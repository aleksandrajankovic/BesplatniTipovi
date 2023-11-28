import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import {
  createTip,
  deleteTip,
  getTip,
  getTips,
  getTipsByUser,
  updateTip,
  likeTip,
} from "../controllers/tips.js";

router.post("/", createTip);
router.get("/", getTips);
router.get("/:id", getTip);
router.delete("/:id", deleteTip);
router.patch("/:id", updateTip);
router.get("/userTips/:id", auth, getTipsByUser);
router.post("/:id/like", likeTip);

export default router;
