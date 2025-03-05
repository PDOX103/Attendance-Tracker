import React, { useState } from "react";
import Std_Sidebar from "./Std_Sidebar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Attendance = () => {
  const params = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [studentsId, setStudentsId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setStudentsId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const sessionId = params.id;
  
      const response = await axios.post(
        `http://localhost:8000/api/sessions/${sessionId}/attendance`,
        {
          student_id: userId,
          students_id: studentsId,
        }
      );
  
      if (response.status === 201) {
        toast.success("Attendance marked successfully!");
        setTimeout(() => {
            navigate(-1); // Navigate to previous page after 1.5 seconds
          }, 1000);
      } else {
        throw new Error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 409) {
          toast.error("Already Given");
        } else if (status === 400 && data.message.includes("Session not found")) {
          toast.error("Session is ended");
        } else {
          toast.error(data.message || "Something went wrong!");
        }
      } else {
        toast.error("Error marking attendance. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="flex h-screen">
      <Std_Sidebar />
      <ToastContainer position="bottom-center" autoClose={1000} hideProgressBar={false} />
      <div className="flex-auto flex justify-center items-center p-6">
        <div className="w-full max-w-2xl bg-BLUE p-6 rounded-lg shadow-lg shadow-black mt-[-400px]">
          <h2 className="text-lg font-semibold mb-4 text-center font-roboto">
            Give Attendance
          </h2>
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="student_id" value={userId} />

            <div>
              <label className="block mb-1 text-sm font-medium font-roboto">
                Student ID
              </label>
              <input
                type="text"
                name="studentsId"
                value={studentsId}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-700 font-roboto"
                placeholder="Enter your student id"
                required
              />
            </div>
            <div className="flex justify-center items-center mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#111B47] text-white px-4 py-2 rounded-2xl text-sm hover:!scale-110 duration-300 transition w-36 shadow-black shadow-sm font-roboto"
              >
                {isSubmitting ? "Submitting..." : "Present"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
