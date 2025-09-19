import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import Ins_Sidebar from "./Ins_Sidebar";
import InstructorCoursesSummary from "../Components/InstructorCoursesSummary";

const Instructor_Dashboard = () => {
  const [instructorId, setInstructorId] = useState(null);

  useEffect(() => {
    // Get instructor ID from localStorage (similar to student dashboard)
    const userId = localStorage.getItem('userId');
    
    if (userId) {
      console.log('Found instructor userId in localStorage:', userId);
      setInstructorId(userId);
    } else {
      console.log('No userId found in localStorage');
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Ins_Sidebar />
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Instructor Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back! Manage your courses and track student progress.</p>
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-6">
            {/* Courses Summary - Full Width */}
            <div className="col-span-full">
              {instructorId ? (
                <InstructorCoursesSummary instructorId={instructorId} />
              ) : (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <p className="text-gray-500">Loading instructor information...</p>
                  <p className="text-sm text-gray-400 mt-2">
                    If this persists, check if you're logged in properly.
                  </p>
                </div>
              )}
            </div>

            {/* Additional Dashboard Components can be added here */}
            {/* For example:
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-2">Recent Sessions</h3>
                // Add recent sessions component
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-2">Pending Actions</h3>
                // Add pending actions component
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-2">Analytics</h3>
                // Add analytics component
              </div>
            </div>
            */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructor_Dashboard;