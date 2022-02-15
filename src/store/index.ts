import { configureStore } from "@reduxjs/toolkit";
import { reducer as userReducer } from "./slices/user";
import { reducer as postsReducer } from "./slices/posts";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer
  }
}); // Export a hook that can be reused to resolve types

export default store;
