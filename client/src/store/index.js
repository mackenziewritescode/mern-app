import { configureStore } from "@reduxjs/toolkit";

import postsReducer from "../features/postsReducer";

export default configureStore({
  reducer: {
    posts: postsReducer,
  },
});
