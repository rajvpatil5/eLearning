import { userReducer } from "./users/user.reducer";
import { combineReducers } from "@reduxjs/toolkit";
import { enrolledCourseReducer } from "./enrolled-course/enrolledCourse.reducer";
import { myFavReducer } from "./my-favourite/myFav.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  enrolled: enrolledCourseReducer,
  myFavCourse: myFavReducer,
});
