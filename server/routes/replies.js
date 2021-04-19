import express from "express";
import {
  getReplies,
  createReply,
  // updateReply,
  deleteReply,
} from "../controllers/replies.js";

const router = express.Router();

router.get("/", getReplies);
router.post("/", createReply);
router.delete("/:id", deleteReply);

export default router;
