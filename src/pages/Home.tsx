import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
const Home = () => {
  return (
    <Layout>
      <div className="flex items-center justify-start h-screen  relative overflow-hidden">
        <img
          className="absolute h-full w-full object-cover z-0"
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <div className="text-5xl font-bold relative z-50 top-0 left-0 text-white w-[75%] px-52">
          Visit our
          <Link className="underline mx-2" to={"/allcourses"}>
            all-course
          </Link>
          section for various courses.
        </div>
      </div>
    </Layout>
  );
};

export default Home;
