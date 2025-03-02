import React from "react";
import Ins_Sidebar from "./Ins_Sidebar";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const Create_Session = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the 'id' from the URL params
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const formSubmit = async (data) => {
    const { start_time, end_time, date } = data;

    // Check if end_time is after start_time
    const startTime = new Date(`${date}T${start_time}`);
    const endTime = new Date(`${date}T${end_time}`);

    if (endTime <= startTime) {
      toast.error("End time must be after start time.", {
        position: "bottom-center",
        autoClose: 1000,
      });
      return;
    }

    const formattedData = {
      date,
      start_time: start_time, // Already in HH:MM:SS format
      end_time: end_time, // Already in HH:MM:SS format
      course_id: parseInt(id, 10), // Using the 'id' from the URL as course_id
    };

    try {
      const res = await fetch("http://localhost:8000/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      const resData = await res.json();

      if (res.status === 409) {
        toast.error("Session already exists!", {
          position: "bottom-center",
          autoClose: 1000,
        });
      } else if (res.ok) {
        toast.success("Session Created Successfully!", {
          position: "bottom-center",
          autoClose: 1000,
        });
        navigate(-1); // Navigate back to the previous page
      } else {
        toast.error(resData.message || "Something went wrong!", {
          position: "bottom-center",
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error("Error creating session:", error);
      toast.error("Failed to create session!", {
        position: "bottom-center",
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="flex">
      <Ins_Sidebar />
      <div className="flex-1 p-6">
        <div className="bg-BLUE shadow-lg rounded-lg p-6 max-w-lg mx-auto">
          <h2 className="text-lg font-semibold mb-4 text-center font-roboto">
            Create Session
          </h2>
          <form onSubmit={handleSubmit(formSubmit)} className="space-y-4">
            {/* Date */}
            <div>
              <label className="block text-sm font-roboto font-medium mb-1">
                Date
              </label>
              <input
                type="date"
                {...register("date", { required: true })}
                className="w-full font-roboto border rounded-md p-2"
                required
              />
            </div>

            {/* Start Time (HH:MM:SS) */}
            <div>
              <label className="block text-sm font-roboto font-medium mb-1">
                Start Time (HH:MM:SS)
              </label>
              <input
                type="time"
                step="1" // Allows seconds in input
                {...register("start_time", { required: true })}
                className="w-full font-roboto border rounded-md p-2"
                required
              />
            </div>

            {/* End Time (HH:MM:SS) */}
            <div>
              <label className="block text-sm font-roboto font-medium mb-1">
                End Time (HH:MM:SS)
              </label>
              <input
                type="time"
                step="1" // Allows seconds in input
                {...register("end_time", { required: true })}
                className="w-full font-roboto border rounded-md p-2"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="bg-[#111B47] text-white px-4 py-2 rounded-2xl text-sm hover:!scale-110 duration-300 transition w-36 shadow-black shadow-sm font-roboto"
              >
                Create Session
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create_Session;
