import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import {
  addEnrolledCourse,
  fetchAllCourses,
  fetchEnrolledCourse,
} from "../../utils/firebase/firebase.utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Button } from "../../components/ui/button";
import { ToastAction } from "../../components/ui/toast";
import { useToast } from "../../components/ui/use-toast";
import { Toaster } from "../../components/ui/toaster";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../app/users/user.selector";
import { setEnrolledCourse } from "../../app/enrolled-course/enrolledCourse.reducer";
import { selectEnrolledCourse } from "../../app/enrolled-course/enrolledCourse.selector";
const CourseDetails = () => {
  const { id } = useParams();
  const [filterIdCourse, setFilterIdCourse] = useState([]);
  const navigate = useNavigate();
  const routeChange = () => {
    navigate("/dashboard");
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllCourses();
      const courseId = data.filter((course) => course.id === parseInt(id, 10));

      setFilterIdCourse(courseId);
    };
    // Check if 'id' is available before making the fetch
    if (id) {
      fetchData();
    }
  }, [id]);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const currentEnrolledCourse = useSelector(selectEnrolledCourse);

  const onClickEnroll = () => {
    console.log("Click on enroll btn");
    toast({
      title: "Congratulations! You have successfully enrolled in the course.",
      duration: 2000,
    });
    addEnrolledCourse(currentUser.uid, filterIdCourse[0]);

    setTimeout(() => {
      routeChange();
    }, 2000);
  };

  const [enrolledCourse, setEnrolledCourse] = useState([]);

  const [startCourse, setStartCourse] = useState(false);
  useEffect(() => {
    if (currentEnrolledCourse) {
      currentEnrolledCourse.map((course) => {
        if (course.id === parseInt(id, 10)) {
          setStartCourse(true);
        }
      });
    } else {
      setStartCourse(false);
    }
  }, [currentEnrolledCourse]);

  return (
    <Layout>
      <div className="container">
        {filterIdCourse.map((courseData) => (
          <>
            <div className="flex justify-center items-center mb-4">
              <img
                className="w-[50%]"
                src={`${courseData.thumbnail}`}
                alt="blog"
              />
            </div>

            <div className="flex flex-col items-start gap-7 font-medium">
              <h2 className="font-bold text-2xl">
                Course Name - {courseData.name}
              </h2>
              <p>Instructor - {courseData.instructor}</p>
              <p>Course Description - {courseData.description}</p>
              <p>Enrollment status - {courseData.enrollmentStatus}</p>
              <p>Course Duration - {courseData.duration}</p>
              <p>Course Schedule - {courseData.schedule}</p>
              <p>Course Location - {courseData.location}</p>

              <p>
                Course prerequisites -{" "}
                {courseData.prerequisites.map((prereq, index) => (
                  <span key={index}>{prereq}</span>
                ))}
              </p>
              <p>Schedule - {courseData.schedule}</p>
              <div className="w-1/2 flex flex-col items-start">
                Syllabus -
                {courseData.syllabus.map((syllabusData, index) => (
                  <Accordion
                    key={index}
                    type="single"
                    collapsible
                    className="w-full"
                  >
                    <AccordionItem value="item-1" cn>
                      <AccordionTrigger>
                        Week - {syllabusData.week}
                      </AccordionTrigger>
                      <AccordionContent>
                        Topic - {syllabusData.topic}
                      </AccordionContent>
                      <AccordionContent>
                        Content - {syllabusData.content}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </div>

            <div className="my-5">
              <Button
                onClick={onClickEnroll}
                className="bg-yellow-500 w-1/3 text-black font-bold hover:bg-yellow-600"
              >
                Enroll Now
              </Button>
            </div>
          </>
        ))}
      </div>
      <Toaster />
    </Layout>
  );
};

export default CourseDetails;
