import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setEnrolledCourse } from "../../app/enrolled-course/enrolledCourse.reducer";
import { selectEnrolledCourse } from "../../app/enrolled-course/enrolledCourse.selector";
import { selectCurrentUser } from "../../app/users/user.selector";
import Layout from "../../components/Layout/Layout";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  addCompleteCourse,
  fetchCompleteCourse,
  fetchEnrolledCourse,
  removeEnrolledCourse,
  removeListingFromFavorites,
} from "../../utils/firebase/firebase.utils";
import { FaCheck } from "react-icons/fa";

const Dashboard = () => {
  const currentEnrolledCourse = useSelector(selectEnrolledCourse);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const [allEnrollCou, setAllEnrollCou] = useState(currentEnrolledCourse);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEnrolledCourse(currentUser.uid);
      console.log("data of enrolled course", data);
      dispatch(setEnrolledCourse(data));
      setAllEnrollCou(data);
    };

    currentUser && fetchData();
  }, []);

  const [completeCourse, setCompleteCourse] = useState([]);

  const handleComplete = (courseId, courseData) => {
    console.log("Mark as complete");
    addCompleteCourse(currentUser.uid, courseData);

    removeEnrolledCourse(currentUser.uid, courseId);
    const updatedEnrolled = allEnrollCou.filter(
      (course) => course.id !== courseId
    );
    setAllEnrollCou(updatedEnrolled);

    setCompleteCourse((prevCompleteCourses) => {
      return [...prevCompleteCourses, courseData];
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCompleteCourse(currentUser.uid);
      console.log("data of enrolled course", data);
      setCompleteCourse(data);
    };
    currentUser && fetchData();
  }, [currentUser]);

  return (
    <Layout>
      <div className="container">
        {/* Enrolled Course */}
        <div className="">
          <h3 className="text-left font-semibold text-2xl my-3">
            Enrolled Course
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {allEnrollCou &&
              allEnrollCou.map((course, index) => (
                <div>
                  <Card className="m-4 cursor-pointer" key={course.id}>
                    <div>
                      <img
                        className="w-full"
                        src="https://dummyimage.com/600x400"
                        alt="blog"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{course.name}</CardTitle>
                    </CardHeader>
                    <CardFooter className="flex-col justify-start items-start gap-2">
                      <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                        <div className="w-[45%] bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full">
                          45%
                        </div>
                      </div>
                      <p>Instructor: {course.instructor}</p>
                      <p>{course.duration}</p>
                      <div className="w-full">
                        <Button
                          onClick={() => handleComplete(course.id, course)}
                          className="bg-yellow-500 w-full text-black font-bold hover:bg-yellow-600"
                        >
                          Mark complete
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              ))}
          </div>
        </div>

        {/* Completed Course */}
        <div className="">
          {completeCourse.length > 0 && (
            <>
              <h3 className="text-left font-semibold text-2xl my-3">
                Completed Course
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {completeCourse.map((course, index) => (
                  <div>
                    <Card className="m-4 cursor-pointer" key={course.id}>
                      <div>
                        <img
                          className="w-full"
                          src="https://dummyimage.com/600x400"
                          alt="blog"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle>{course.name}</CardTitle>
                      </CardHeader>
                      <CardFooter className="flex-col justify-start items-start gap-2">
                        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                          <div className="w-[100%] bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full">
                            100%
                          </div>
                        </div>
                        <p>Instructor: {course.instructor}</p>
                        <p>{course.duration}</p>
                        <div className="w-full">
                          <Button className="bg-green-500 w-full text-black font-bold">
                            Completed <FaCheck className="ml-2" />
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
