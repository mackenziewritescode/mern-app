import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

// [
//   {
//     id: "1",
//     title: "Post 1",
//     author: "Luigi",
//     content: "Oh yeah, Luigi time!",
//     image: "",
//     date: Date.now(),
//     postNum: 1,
//     replies: [{}],
//   },
//   {
//     id: "2",
//     title: "Post 2",
//     author: "Yoshi",
//     content: "Oh yeah, Yoshi time!",
//     image: "",
//     date: Date.now(),
//     postNum: 2,
//     replies: [{}],
//   },
//   {
//     id: "3",
//     title: "Post 3",
//     author: "Peach",
//     content: "Oh yeah, Peach time!",
//     image: "",
//     date: Date.now(),
//     postNum: 3,
//     replies: [{}],
//   },
// ];

export const getPosts = createAsyncThunk("/posts", async () => {
  const response = await api.fetchPosts();
  return response.data;
});


const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [getPosts.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.posts = state.posts.concat(action.payload);
    },
  },
});

export default postsSlice.reducer;
