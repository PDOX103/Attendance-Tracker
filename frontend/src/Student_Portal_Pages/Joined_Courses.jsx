import React, { useState, useEffect } from "react";
import Std_Sidebar from "./Std_Sidebar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Joined_Courses = () => {
  const [uniqueId, setUniqueId] = useState("");
  const [joinedCourses, setJoinedCourses] = useState([]); // State to hold joined courses
  const [activeSessions, setActiveSessions] = useState([]);
  const [message, setMessage] = useState("");

  const handleJoinCourse = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:8000/api/courses/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        unique_code: uniqueId,
        student_id: localStorage.getItem("userId"),
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setMessage(data.message);
      // Add the newly joined course to the joinedCourses state
      setJoinedCourses((prevCourses) => [
        ...prevCourses,
        { unique_code: uniqueId }, // You may want to fetch more details if needed
      ]);
      fetchActiveSessions(uniqueId); // Fetch active sessions after joining
    } else {
      setMessage("Failed to join the course. Please check the unique ID.");
    }
  };

  const fetchActiveSessions = async (courseId) => {
    const res = await fetch(
      `http://localhost:8000/api/sessions/course/${courseId}`
    );
    const data = await res.json();
    setActiveSessions(data.data);
  };

  return (
    <>
      <div className="flex">
        <Std_Sidebar />
        <div className="flex-1 p-6">
          {/* Header Section */}
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
              <img src="/images/join.png" alt="Create Course" />
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
            {/* {course.length > 0 ? (
              course.map((c) => (
                <Courses
                  key={c.course_no}
                  id={c.id}
                  course_no={c.course_no}
                  course_title={c.course_title}
                  unique_code={c.unique_code}
                />
              ))
            ) : (
              <p className="text-gray-500">No active courses available.</p>
            )} */}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Joined_Courses;
