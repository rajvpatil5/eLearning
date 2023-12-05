import { createSlice } from "@reduxjs/toolkit";

const INITIAL_MYFAV_STATE = { myFavCourses: [] };

export const myFavSlice = createSlice({
  name: "myFavCourses",
  initialState: INITIAL_MYFAV_STATE,
  reducers: {
    setmyFavCourse(state, action) {
      state.myFavCourses = action.payload;
    },
  },
});

export const { setmyFavCourse } = myFavSlice.actions;

export const myFavReducer = myFavSlice.reducer;
