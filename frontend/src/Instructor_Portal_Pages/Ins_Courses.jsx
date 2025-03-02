import React, { useEffect, useState } from "react";
import Ins_Sidebar from "./Ins_Sidebar";
import Courses from "./Courses";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Ins_Courses = () => {
  const [course, setCourse] = useState([]);
  const instructorId = localStorage.getItem("userId");

  const fetchCourse = async () => {
    if (!instructorId) {
      console.error("Instructor ID not found!");
      return;
    }


    try {
      const res = await fetch(`http://localhost:8000/api/courses/instructor/${instructorId}`);
      const result = await res.json();
      const activeCourses = result.data.filter(c => c.status === "active");
      setCourse(activeCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <div className="flex">
      <Ins_Sidebar />
      <div className="flex-1 p-6">
        {/* Header Section */}
        <motion.div
          className="flex justify-between items-center pt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h1 className="text-black font-roboto text-lg font-bold">Courses</h1>
          <Link to="/create-course" className="hover:!scale-110 duration-300">
            <img src="/images/create 1.png" alt="Create Course" />
          </Link>
        </motion.div>
        <section>
          <div className="container grid-col-1 md:grid-cols-2 min-h-[15px]"></div>
        </section>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {course.length > 0 ? (
            course.map((c) => (
              <Courses key={c.course_no} id={c.id} course_no={c.course_no} course_title={c.course_title} />
            ))
          ) : (
            <p className="text-gray-500">No active courses available.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Ins_Courses;
