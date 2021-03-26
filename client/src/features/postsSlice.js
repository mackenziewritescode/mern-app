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

export const createPost = createAsyncThunk("/posts", async (newPost) => {
  const response = await api.createPost(newPost);
  return response.data;
});

export const updatePost = createAsyncThunk("/posts", async (id, post) => {
  const response = await api.updatePost(id, post);
  return response.data;
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
      const { id, title, author, content, image, isEditing } = action.payload;
      const existingPost = state.postsData.find((post) => post._id === id);

      if (existingPost) {
        existingPost.title = title;
        existingPost.author = author;
        existingPost.content = content;
        existingPost.image = image;
        existingPost.isEditing = isEditing;
      }
    },
  },
});

export default postsSlice.reducer;
