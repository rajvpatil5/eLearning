import { createSelector } from "reselect";

export const selectMyFavCou = (state) => state.myFavCourse;

export const selectMyFavCourse = createSelector(
  [selectMyFavCou],
  (course) => course
);
