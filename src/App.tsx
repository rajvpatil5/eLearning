import { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import NoPage from "./pages/NoPage/NoPage";
import AllCourses from "./pages/AllCourses/AllCourses";
import CourseDetails from "./pages/CourseDetails/CourseDetails";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./components/Registration/Login";
import SignUp from "./components/Registration/Signup";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEnrolledCourse,
  fetchFavouriteCourses,
  onAuthStateChangedListner,
} from "./utils/firebase/firebase.utils";
import {
  createMyListDocumentFromAuth,
  createUserDocumentFromAuth,
} from "./utils/firebase/firebase.utils";

import { selectCurrentUser } from "./app/users/user.selector";
import { setCurrentUser } from "./app/users/user.reducer";
import { setEnrolledCourse } from "./app/enrolled-course/enrolledCourse.reducer";
import { setmyFavCourse } from "./app/my-favourite/myFav.reducer";
import * as React from "react";

type SyllabusItem = {
  week: number;
  topic: string;
  content: string;
};

type Course = {
  id: number;
  name: string;
  instructor: string;
  description: string;
  enrollmentStatus: string;
  thumbnail: string;
  duration: string;
  schedule: string;
  location: string;
  prerequisites: string[];
  syllabus: SyllabusItem[];
};

function App() {
  const dispatch = useDispatch();
  // signOutUser();
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListner(
      (user: { uid: String; displayName: String; email: String }) => {
        if (user) {
          createUserDocumentFromAuth(user);
          createMyListDocumentFromAuth(user);
        }
        // //console.log(setCurrentUser(user));
        dispatch(setCurrentUser(user));
      }
    );
    return unsubscribe;
  }, []);

  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEnrolledCourse(currentUser.uid);
      //console.log("data of enrolled course", data);
      dispatch(setEnrolledCourse(data));
    };

    currentUser && fetchData();
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      const unsubscribefetchFavouriteListing = fetchFavouriteCourses(
        currentUser.uid,
        (userMyFavorites: Course[]) => {
          dispatch(setmyFavCourse(userMyFavorites));
        }
      );
      return () => {
        // Unsubscribe from the snapshot listener when the component unmounts
        unsubscribefetchFavouriteListing();
      };
    }
  }, [currentUser]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allcourses" element={<AllCourses />} />
        <Route path="/course-details/:id" element={<CourseDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/*" element={<NoPage />} />
      </Routes>
    </>
  );
}

export default App;
