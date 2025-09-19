// 4. UPDATE: Student_Dashboard.jsx

import React, { useState, useEffect } from "react";
import Std_Sidebar from "./Std_Sidebar";
import StudentAttendanceSummary from "../Components/StudentAttendanceSummary";

const Student_Dashboard = () => {
  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    
    if (userId) {
      console.log('Found userId in localStorage:', userId);
      setStudentId(userId);
    } else {
      console.log('No userId found in localStorage');
    }
  }, []);

  return (
    <div className="flex min-h-screen">
      <Std_Sidebar />
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-black font-roboto text-lg font-bold">Student Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back! Here's your academic overview.</p>
          </div>

          <div className="grid gap-6">
            <div className="col-span-full">
              {studentId ? (
                <StudentAttendanceSummary studentId={studentId} />
              ) : (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <p className="text-gray-500">Loading student information...</p>
                  <p className="text-sm text-gray-400 mt-2">
                    If this persists, check if you're logged in properly.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student_Dashboard;