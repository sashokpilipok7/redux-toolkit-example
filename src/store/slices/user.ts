import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "user",
  initialState: { editMode: false },
  reducers: {
    setEditMode(state, action: PayloadAction<boolean>) {
      // it's our actions, actions types constants, and reducer ( it creates in one place and boilerplate isn't nedded)
      console.log(action.type);
      state.editMode = action.payload; // here we can mutate state ( they are using Immer )
    }
  }
});

// Extract the action creators object and the reducer
export const { actions, reducer } = postsSlice;
