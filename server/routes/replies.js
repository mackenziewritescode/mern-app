import express from "express";
import {
  getReplies,
  createReply,
  updateReply,
  deleteReply,
  deleteChildren,
} from "../controllers/replies.js";

const router = express.Router();

router.get("/", getReplies);
router.post("/", createReply);
router.patch("/:id", updateReply);
router.delete("/:id", deleteReply);
router.delete("/parent/:parentId", deleteChildren);

export default router;
