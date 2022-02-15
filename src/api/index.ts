import { createAsyncThunk } from "@reduxjs/toolkit";
import { Post } from "../types";

export const fetchPosts = createAsyncThunk(
  "posts/fetchList",
  async (params, thunkApi) => {
    console.log(params, "params");
    console.log(thunkApi, "thunkApi");
    const { rejectWithValue } = thunkApi;

    try {
      let res = await fetch(
        "https://jsonplaceholder.typicode.com/posts?limit=20"
      );
      return (await res.json()) as Post[];
    } catch (err) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err);
    }
  }
);
