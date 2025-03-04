import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Std_Sidebar from "./Std_Sidebar";

const Join_Course = () => {
  const [uniqueId, setUniqueId] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleJoinCourse = async (e) => {
    e.preventDefault();
    
    if (!uniqueId) {
      toast.error("Please enter a course code.");
      return;
    }
    
    try {
      const res = await fetch("http://localhost:8000/api/courses/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          unique_code: uniqueId,
          student_id: localStorage.getItem("userId"),
        }),
      });

      const data = await res.json();
      
      if (res.ok) {
        toast.success(data.message || "Course joined successfully!" , { position: "bottom-center", autoClose: 1000 });
        setMessage(data.message);
        setUniqueId(""); // Clear input field
        navigate("/joined-courses"); // Redirect to student dashboard
      } else {
        toast.error(data.message || "Failed to join the course.", { position: "bottom-center", autoClose: 1000 });
      }
    } catch (error) {
      console.error("Error joining course:", error);
      toast.error("An error occurred. Please try again." , { position: "bottom-center", autoClose: 1000 });
    }
  };

  return (
    <div className="flex h-screen">
      <Std_Sidebar />
      <div className="flex-auto flex justify-center items-center p-6">
        <div className="w-full max-w-2xl bg-BLUE p-6 rounded-lg shadow-lg shadow-black mt-[-400px]">
          <h2 className="text-lg font-semibold mb-4 text-center font-roboto">Join Course</h2>
          <form onSubmit={handleJoinCourse}>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium font-roboto">Course Code</label>
                <input
                  type="text"
                  value={uniqueId}
                  onChange={(e) => setUniqueId(e.target.value)}
                  className="w-full p-2 rounded bg-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-700 font-roboto"
                  placeholder="Enter course code"
                  required
                />
              </div>
              <div className="flex justify-center items-center">
                <button type="submit" className="bg-[#111B47] text-white px-4 py-2 rounded-2xl text-sm hover:!scale-110 duration-300 transition w-36 shadow-black shadow-sm font-roboto">
                  Join
                </button>
              </div>
              {message && <p className="text-center text-sm text-green-600 font-roboto">{message}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Join_Course;
