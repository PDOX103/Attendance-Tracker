import React, { useState, useEffect } from "react";
import Ins_Sidebar from "./Ins_Sidebar";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Create_Course = () => {
  const [uniqueCode, setUniqueCode] = useState(localStorage.getItem("uniqueCode") || null); // Initialize from local storage
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmit = async (data) => {
    const userId = localStorage.getItem("userId");
    const newData = { ...data, instructor_id: userId, status: true };

    const res = await fetch("http://localhost:8000/api/courses", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    const resData = await res.json();
    console.log(resData);

    if (res.status === 409) {
      toast.error("Course already exists!", { position: "bottom-center", autoClose: 1000 });
    } else if (res.ok) {
      toast.success("Course Created Successfully!", { position: "bottom-center", autoClose: 1000 });
      setUniqueCode(resData.data.unique_code);
      localStorage.setItem("uniqueCode", resData.data.unique_code); // Save to local storage
      navigate("/instructor-courses");
    } else {
      toast.error(resData.message || "Something went wrong!", { position: "bottom-center", autoClose: 1000 });
    }

    console.log(data);
  };

  // Optional: Clear unique code from local storage if necessary
  const clearUniqueCode = () => {
    setUniqueCode(null);
    localStorage.removeItem("uniqueCode");
  };

  return (
    <div className="flex h-screen">
      <Ins_Sidebar />
      <div className="flex-auto flex justify-center items-center p-6">
        <div className="w-full max-w-2xl bg-BLUE p-6 rounded-lg shadow-lg shadow-black mt-[-400px]">
          <h2 className="text-lg font-semibold mb-4 text-center font-roboto">Create Course</h2>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium font-roboto">Course Name</label>
                <input
                  {...register("course_no", { required: true })}
                  type="text"
                  className={`w-full p-2 rounded bg-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-700 font-roboto ${errors.course_no && "is-invalid"}`}
                  placeholder="Enter course name"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium font-roboto">Course Title</label>
                <input
                  {...register("course_title", { required: true })}
                  type="text"
                  className={`w-full p-2 rounded bg-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-700 font-roboto ${errors.course_title && "is-invalid"}`}
                  placeholder="Enter course title"
                  required
                />
              </div>
              <div className="flex justify-center items-center">
                <button className="bg-[#111B47] text-white px-4 py-2 rounded-2xl text-sm hover:!scale-110 duration-300 transition w-36 shadow-black shadow-sm font-roboto">
                  Create Course
                </button>
              </div>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default Create_Course;