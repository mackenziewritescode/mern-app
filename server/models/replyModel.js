import mongoose from "mongoose";

const replySchema = mongoose.Schema({
  parent: String,
  author: String,
  content: String,
  image: String,
  date: {
    type: Date,
    default: new Date(),
  },
  // replyNum: Number,
});

const reply = mongoose.model("reply", replySchema);

export default reply;
