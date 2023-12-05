import { createSlice } from "@reduxjs/toolkit";
import { createContext } from "react";

// this is the actual value you want to access
export const UserContext = createContext(
  // We have to pass here a default value of UserContext
  {
    currentUser: null,
    setCurrentUser: () => null,
  }
);

const INITIAL_STATE = { currentUser: null };

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
