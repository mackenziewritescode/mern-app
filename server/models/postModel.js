import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  author: String,
  content: String,
  image: String,
  date: {
    type: Date,
    default: new Date(),
  },
  postNum: {
    type: Number,
    default: 1,
  },
  replies: {
    type: [Object],
    default: [],
  },
});

const post = mongoose.model("post", postSchema);

export default post;
