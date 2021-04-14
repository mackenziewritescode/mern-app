import { configureStore } from "@reduxjs/toolkit";

import postsReducer from "../features/postsReducer";
import repliesReducer from "../features/repliesReducer";

export default configureStore({
  reducer: {
    posts: postsReducer,
    replies: repliesReducer,
  },
});
