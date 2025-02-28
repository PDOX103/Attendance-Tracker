import React from "react";
import { Link } from "react-router-dom";

const Courses = () => {
  return (
    <Link className="text-gray-900 cursor-pointer" to={`/product`}>
    <div className="border-separate bg-BLUE border-black p-4 rounded-lg overflow-hidden transform hover:translate-y-[-5px] hover:shadow-2xl transition-all duration-300 ease-in-out shadow-lg">
      {/*
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition-transform duration-300 ease-in-out w-full h-auto rounded-lg"
          src=""
        />
      </div> */}

      {/* Course no */}
      <p className="pt-3 pb-1 text-sm font-medium font-roboto truncate">CSE3100</p>

      {/* Course title */}
      <p className=" text-sm font-bold font-roboto text-red-900">kdjkjaklj afjdjfjd</p>
    </div>
    </Link>
  );
};

export default Courses;
