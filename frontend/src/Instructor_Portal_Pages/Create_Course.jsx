import React from "react";
import Ins_Sidebar from "./Ins_Sidebar";

const Create_Course = () => {
  return (
    <div className="flex h-screen">
      <Ins_Sidebar />
      <div className="flex-auto flex justify-center items-center p-6">
        <div className="w-full max-w-2xl bg-BLUE border border-gray-300 p-6 rounded-lg shadow-lg mt-[-400px]">
          <h2 className="text-lg font-semibold mb-4 text-center font-roboto">Create Course</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium font-roboto">Course Name</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-700 font-roboto"
                placeholder="Enter course name"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium font-roboto">Course Title</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-700 font-roboto"
                placeholder="Enter course title"
              />
            </div>
            <div className="flex justify-center items-center">
            <button className="bg-[#111B47] text-white px-4 py-2 rounded-2xl text-sm hover:!scale-110 duration-300 transition w-36 shadow-black shadow-sm font-roboto">
              Create
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create_Course;
