import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectCurrentUser } from "../../app/users/user.selector";
import Layout from "../../components/Layout/Layout";
import { Input } from "../../components/ui/input";
import courseModel from "../../courseModel";
import {
  addDataToFirestore,
  fetchAllCourses,
} from "../../utils/firebase/firebase.utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Link } from "react-router-dom";
import HeartButton from "../../components/Likes/HeartButton";
import { Button } from "../../components/ui/button";

const AllCourses = () => {
  // useEffect(() => {
  //   //console.log("inside add data useeffect");
  //   //console.log(courseModel);
  //   addDataToFirestore(courseModel);
  // }, []);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const [allCourse, setallCourse] = useState([]);
  const [filterAllCourse, setFilterAllCourse] = useState(allCourse);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllCourses();
      //console.log("Data from Firestore:", data);
      // Do something with the data
      setallCourse(data);
      setFilterAllCourse(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    //console.log(allCourse);
  }, [allCourse]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    //console.log(value);
    const filterData = allCourse.filter(
      (course) =>
        course.name.toLowerCase().includes(value.toLowerCase()) ||
        course.instructor.toLowerCase().includes(value.toLowerCase())
    );
    setFilterAllCourse(filterData);
    //console.log(filterData);
  };

  return (
    <Layout>
      <div className="container">
        <div className="w-full md:3/4 xl:w-1/2 container">
          <Input
            placeholder="Search Course or Instructor"
            onChange={handleChange}
          />
        </div>
        <div className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {filterAllCourse.map((course, index) => (
              <Card className="m-4 relative" key={course.id}>
                <div>
                  <img
                    className="w-full"
                    src="https://dummyimage.com/600x400"
                    alt="blog"
                  />
                </div>
                <div className="absolute top-3 right-3 z-30">
                  <HeartButton course={course} />
                </div>
                <CardHeader>
                  <CardTitle>{course.name}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex-col justify-start items-start gap-3">
                  <p>Instructor: {course.instructor}</p>
                  <p>{course.duration}</p>
                  <Link className="w-full" to={`/course-details/${course.id}`}>
                    <Button className="bg-yellow-500 w-full text-black font-bold hover:bg-yellow-600">
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllCourses;
