import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
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
  addDataToFirestore,
} from "./utils/firebase/firebase.utils";

import { selectCurrentUser } from "./app/users/user.selector";
import { setCurrentUser } from "./app/users/user.reducer";
import courseModel from "./courseModel";
import { setEnrolledCourse } from "./app/enrolled-course/enrolledCourse.reducer";
import { setmyFavCourse } from "./app/my-favourite/myFav.reducer";

function App() {
  const dispatch = useDispatch();
  // signOutUser();
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListner((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
        createMyListDocumentFromAuth(user);
      }
      // console.log(setCurrentUser(user));
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, []);

  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEnrolledCourse(currentUser.uid);
      console.log("data of enrolled course", data);
      dispatch(setEnrolledCourse(data));
    };

    currentUser && fetchData();
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      const unsubscribefetchFavouriteListing = fetchFavouriteCourses(
        currentUser?.uid,
        (userMyFavorites) => {
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
