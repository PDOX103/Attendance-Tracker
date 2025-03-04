import React, { useState, useEffect } from "react";
import Std_Sidebar from "./Std_Sidebar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import EnrolledCourse from "./EnrolledCourse";

const Joined_Courses = () => {
  const studentId = localStorage.getItem("userId");
  const [joinedCourses, setJoinedCourses] = useState([]);
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    fetchEnrolledCourses();
  }, []);
  
  const fetchEnrolledCourses = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/courses/enrolled/${studentId}`);
      if (!res.ok) {
        throw new Error("Failed to fetch enrolled courses");
      }
      const data = await res.json();
      setJoinedCourses(data.data || []);
    } catch (error) {
      setMessage("Error fetching enrolled courses.");
    }
  };
  
  return (
    <div className="flex">
      <Std_Sidebar />
      <div className="flex-1 p-6">
        <motion.div
          className="flex justify-between items-center pt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h1 className="text-black font-roboto text-lg font-bold">
            Joined Courses
          </h1>
          <Link to="/join-course" className="hover:!scale-110 duration-300">
            <img src="/images/join.png" alt="Join Course" />
          </Link>
        </motion.div>
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 mt-4">
          {joinedCourses.length > 0 ? (
            joinedCourses.map((course) => (
              <EnrolledCourse 
                key={course.id} 
                id={course.id} 
                course_id={course.course_id} 
                course_title={course.course_title} 
              />
            ))
          ) : (
            <p className="text-gray-500">No active courses available.</p>
          )}
        </section>
        {message && <p className="text-red-500 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default Joined_Courses;
