import React from "react";
import { Link } from "react-router-dom";

const Courses = ({ id, course_no, course_title, unique_code }) => {
  return (
    <Link className="text-gray-900 cursor-pointer" to={`/instructor-courses/${id}`}>
      <div className="border-separate bg-BLUE border-black p-4 rounded-lg overflow-hidden transform hover:translate-y-[-5px] hover:shadow-2xl transition-all duration-300 ease-in-out shadow-lg">
        
        

        {/* Course no */}
        <p className="pt-1 pb-1 text-sm font-medium font-roboto truncate">
          {course_no}
        </p>

        {/* Course title */}
        <p className="text-sm font-bold font-roboto text-red-900">
          {course_title}
        </p>

        {/* Unique ID */}
        <p className="pt-3 pb-1 text-sm font-medium font-roboto truncate">
          Course Code : <strong>{unique_code}</strong>
        </p>
      </div>
    </Link>
  );
};

export default Courses;