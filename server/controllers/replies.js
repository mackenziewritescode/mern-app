import mongoose from "mongoose";

import Reply from "../models/replyModel.js";

export const getReplies = async (req, res) => {
  try {
    const replies = await Reply.find();
    res.status(200).json(replies);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const createReply = async (req, res) => {
  const newReply = new Reply(req.body);

  try {
    await newReply.save();
    res.status(201).json(newReply);
  } catch (error) {
    res.status(409).json({ message: error });
  }
};

export const deleteReply = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Post not found.");

  const deletedReply = await Reply.findByIdAndRemove(id);

  res.json(deletedReply);
};
