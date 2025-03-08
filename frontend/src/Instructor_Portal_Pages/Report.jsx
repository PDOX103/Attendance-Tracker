import React, { useEffect, useState } from "react";
import Ins_Sidebar from "./Ins_Sidebar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Report = () => {
  const [courses, setCourses] = useState([]);
  const instructorId = localStorage.getItem("userId");

  const fetchCourses = async () => {
    if (!instructorId) {
      console.error("Instructor ID not found!");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8000/api/courses/instructor/${instructorId}`
      );
      const result = await res.json();
      const activeCourses = result.data.filter((c) => c.status === "active");
      setCourses(activeCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
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
          <h1 className="text-black font-roboto text-lg font-bold">Report</h1>
        </motion.div>

        {/* Courses Table */}
        <div className="overflow-x-auto mt-6">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-BLUE2">
                <th className="border border-gray-300 px-4 py-2 font-roboto">Course No</th>
                <th className="border border-gray-300 px-4 py-2 font-roboto">Title</th>
                <th className="border border-gray-300 px-4 py-2 font-roboto">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.length > 0 ? (
                courses.map((course) => (
                  <tr key={course.id} className="text-center font-roboto">
                    <td className="border border-gray-300 px-4 py-2">
                      {course.course_no}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {course.course_title}
                    </td>

                    <td className="border border-gray-300 px-4 py-2">
                      <Link
                        to={`/attendance-report/${course.id}`}
                        className="text-white bg-[#111B47] px-3 py-1 rounded-full hover:!scale-110 duration-300 shadow-lg font-roboto text-sm"
                      >
                        View Report
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="border border-gray-300 px-4 py-2 text-gray-500 text-center font-roboto"
                  >
                    No active courses available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Report;
