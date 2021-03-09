import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    key: "1",
    title: "Post 1",
    author: "Luigi",
    content: "Oh yeah, Luigi time!",
    image: "",
    date: Date.now(),
    postNum: 1,
    replies: [{}],
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
});

export default postsSlice.reducer;
