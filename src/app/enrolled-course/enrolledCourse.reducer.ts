import { createSlice } from "@reduxjs/toolkit";
import { createContext } from "react";

// this is the actual value you want to access
export const EnrolledCourseContext = createContext(
  // We have to pass here a default value of UserContext
  {
    enrolledCourse: null,
    setEnrolledCourse: () => null,
  }
);

const INITIAL_STATE = { enrolledCourse: null };

export const enrolledCourseSlice = createSlice({
  name: "enrolledCourse",
  initialState: INITIAL_STATE,
  reducers: {
    setEnrolledCourse(state, action) {
      state.enrolledCourse = action.payload;
    },
  },
});

export const { setEnrolledCourse } = enrolledCourseSlice.actions;

export const enrolledCourseReducer = enrolledCourseSlice.reducer;
