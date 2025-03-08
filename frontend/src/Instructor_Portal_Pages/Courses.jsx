import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Courses = ({ id, course_no, course_title, unique_code, onEndCourse }) => {
  // Function to copy the unique code
  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    toast.success("Copied", {
      autoClose: 1000,
      position: "bottom-center",
    });
  };

  return (
    <div className="border bg-BLUE p-4 rounded-lg shadow-lg transform hover:translate-y-[-5px] hover:shadow-2xl transition-all duration-300 ease-in-out">
      {/* Course Info (Clickable) */}
      <Link className="text-gray-900 cursor-pointer" to={`/instructor-courses/${id}`}>
        <p className="pt-1 pb-1 text-sm font-medium font-roboto truncate">{course_no}</p>
        <p className="text-sm font-bold font-roboto text-red-900">{course_title}</p>
      </Link>

      {/* Unique ID (Copyable) */}
      <div className="pt-3 pb-1 flex items-center text-sm font-medium font-roboto">
        <span>Course Code:</span>
        <strong
          className="ml-1 cursor-pointer text-blue-600 hover:underline flex items-center gap-2"
          onClick={(e) => {
            e.preventDefault(); // Prevent Link redirection
            copyToClipboard(unique_code);
          }}
        >
          <span>{unique_code}</span>
          <img
            src="/images/copy.png"
            alt="Copy Icon"
            className="hover:!scale-110 duration-300 cursor-pointer"
          />
        </strong>
      </div>

      {/* End Course Button */}
      <button
        className="text-white bg-[#111B47] px-3 py-1 rounded-full hover:!scale-110 duration-300 shadow-lg font-roboto text-sm"
        onClick={() => onEndCourse(id)}
      >
        End Course
      </button>
    </div>
  );
};

export default Courses;
