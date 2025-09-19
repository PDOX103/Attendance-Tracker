import React, { useState, useEffect } from "react";

const StudentAttendanceSummary = ({ studentId }) => {
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/students/${studentId}/attendance-summary`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch attendance data");
        }

        const data = await response.json();
        if (data.status) {
          setAttendanceData(data.data);
        } else {
          throw new Error(data.message || "Failed to load attendance data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      fetchAttendanceData();
    }
  }, [studentId]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800 border-green-200';
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'average': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'poor': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProgressBarColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-blue-500';
    if (percentage >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">Attendance Summary</h3>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4 text-red-600">Error</h3>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!attendanceData || attendanceData.courses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">Attendance Summary</h3>
        <p className="text-gray-600">No courses found or no attendance data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">My Attendance Summary</h3>
        <span className="text-sm text-gray-500">
          Total Courses: {attendanceData.total_courses}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {attendanceData.courses.map((course) => (
          <div key={course.course_id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            {/* Course Header */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-gray-800 text-sm mb-1">
                  {course.course_title}
                </h4>
                {course.course_code && (
                  <p className="text-xs text-gray-500">{course.course_code}</p>
                )}
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(course.status)}`}>
                {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
              </span>
            </div>

            {/* Attendance Percentage */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-bold text-gray-800">
                  {course.attendance_percentage}%
                </span>
                <span className="text-xs text-gray-500">
                  {course.present_sessions}/{course.total_sessions} sessions
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(course.attendance_percentage)}`}
                  style={{ width: `${course.attendance_percentage}%` }}
                ></div>
              </div>
            </div>

            {/* Session Stats */}
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center">
                <div className="font-semibold text-green-600">{course.present_sessions}</div>
                <div className="text-gray-500">Present</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-red-600">{course.absent_sessions}</div>
                <div className="text-gray-500">Absent</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-600">{course.total_sessions}</div>
                <div className="text-gray-500">Total</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Overall Summary */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">Quick Overview</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="font-bold text-green-600">
              {attendanceData.courses.filter(c => c.status === 'excellent').length}
            </div>
            <div className="text-gray-600">Excellent (≥80%)</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-blue-600">
              {attendanceData.courses.filter(c => c.status === 'good').length}
            </div>
            <div className="text-gray-600">Good (60-79%)</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-yellow-600">
              {attendanceData.courses.filter(c => c.status === 'average').length}
            </div>
            <div className="text-gray-600">Average (40-59%)</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-red-600">
              {attendanceData.courses.filter(c => c.status === 'poor').length}
            </div>
            <div className="text-gray-600">Poor (&lt;40%)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendanceSummary;