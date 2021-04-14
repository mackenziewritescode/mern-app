import express from "express";
import {
  getReplies,
  createReply,
  // updateReply,
  // deleteReply,
} from "../controllers/replies.js";

const router = express.Router();

router.get("/", getReplies);
router.post("/", createReply);

export default router;
