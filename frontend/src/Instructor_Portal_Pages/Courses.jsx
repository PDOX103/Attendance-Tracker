import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Courses = ({ id, course_no, course_title, unique_code }) => {
  // Function to copy the unique code
  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    toast.success("Copied", {
      autoClose: 1000,
      position: "bottom-center",
    });
  };

  return (
    <Link
      className="text-gray-900 cursor-pointer"
      to={`/instructor-courses/${id}`}
    >
      <div className="border-separate bg-BLUE border-black p-4 rounded-lg overflow-hidden transform hover:translate-y-[-5px] hover:shadow-2xl transition-all duration-300 ease-in-out shadow-lg">
        {/* Course no */}
        <p className="pt-1 pb-1 text-sm font-medium font-roboto truncate">
          {course_no}
        </p>

        {/* Course title */}
        <p className="text-sm font-bold font-roboto text-red-900">
          {course_title}
        </p>

        {/* Unique ID (Copyable) */}
        <p className="pt-3 pb-1 text-sm font-medium font-roboto truncate flex items-center">
          Course Code :{" "}
          <strong
            className="ml-1 cursor-pointer text-blue-600 hover:underline"
            onClick={(e) => {
              e.preventDefault(); // Prevent Link redirection
              copyToClipboard(unique_code);
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium font-roboto">
                {unique_code}
              </span>
              <img
                src="/images/copy.png"
                alt="Copy Icon"
                className="hover:!scale-110 duration-300 cursor-pointer"
              />
            </div>
          </strong>
        </p>
      </div>
    </Link>
  );
};

export default Courses;
