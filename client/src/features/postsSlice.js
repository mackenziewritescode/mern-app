import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

const initialState = {
  postsData: [],
  status: "idle",
  error: null,
};

export const getPosts = createAsyncThunk("/posts/fetch", async () => {
  const response = await api.fetchPosts();
  return response.data;
});

export const createPost = createAsyncThunk("/posts/create", async (newPost) => {
  const response = await api.createPost(newPost);
  return response.data;
});

export const updatePost = createAsyncThunk(
  "/posts/update",
  async (id, post) => {
    const response = await api.updatePost(id, post);
    console.log(response.data);
    return response.data;
  }
);

export const deletePost = createAsyncThunk("/posts/delete", async (id) => {
  await api.deletePost(id);
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [getPosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [getPosts.fulfilled]: (state, action) => {
      console.log(state.postsData);
      state.status = "succeeded";
      state.postsData = state.postsData.concat(action.payload);
    },
    [getPosts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
    [createPost.fulfilled]: (state, action) => {
      state.postsData.push(action.payload);
    },
    [updatePost.fulfilled]: (state, action) => {
      // console.log(action.payload);
      const { id, post } = action.payload;
      const existingPost = state.postsData.find((post) => post._id === id);
      if (existingPost) {
        existingPost.title = post.title;
        existingPost.author = post.author;
        existingPost.content = post.content;
        existingPost.image = post.image;
      } else {
        console.log(action.payload);
      }
    },
    [deletePost.fulfilled]: (state, action) => {
      const { id } = action.payload;
      console.log(id);

      state.postsData = state.postsData.filter((post) => post._id !== id);
    },
  },
});

export default postsSlice.reducer;
