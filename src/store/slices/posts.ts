import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPosts } from "../../api";
import { Post } from "../../types";

type InitialStateType = {
  loading: boolean;
  list: Post[];
};

const initialState: InitialStateType = {
  loading: false,
  list: []
};

//There are options (exapmles) with which we can handle api request
// First one "Update Post" we can use with saga or thunk as usual
// Second one "fetchPosts" we can use with "createAsyncThunk" - redux/toolkit feature
const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    updatePostRequest(state) {
      state.loading = true;
    },
    updatePostSuccess(state, action: PayloadAction<Post>) {
      // addinig types for actions and reducer together with specific utility
      const idx = state.list.findIndex((i) => i.id === action.payload.id);

      state.loading = false;
      state.list[idx] = action.payload;
    },
    updatePostFailed(state, action: PayloadAction<string>) {
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      // both `state` and `action` are now correctly typed
      // based on the slice state and the `pending` action creator
      state.list = action.payload as Post[]; //FIXME: but i should change async thunk with generic type
    });
  }
});

// Extract the action creators object and the reducer
export const { actions, reducer } = postsSlice;

// ------ it we're gonna change to saga in our project ----

const { updatePostRequest, updatePostSuccess, updatePostFailed } = actions;

export const asyncPostUpdate = (value: string) => (dispatch: any) => {
  dispatch(updatePostRequest());
  fetch("https://jsonplaceholder.typicode.com/posts/1", {
    method: "PUT",
    body: JSON.stringify({ title: value })
  })
    .then((data) => dispatch(updatePostSuccess({ id: 1, title: value })))
    .catch((err) => dispatch(updatePostFailed(err)));
};
