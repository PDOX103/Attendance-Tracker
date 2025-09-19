import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const InstructorCoursesSummary = ({ instructorId }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstructorCourses = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/courses/instructor/${instructorId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch instructor courses");
        }

        const data = await response.json();
        if (data.status) {
          setCourses(data.data || []);
        } else {
          throw new Error(data.message || "Failed to load courses");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (instructorId) {
      fetchInstructorCourses();
    }
  }, [instructorId]);

  const handleCourseClick = (courseId) => {
    navigate(`/instructor/course/${courseId}/students`);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">My Courses</h3>
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

  if (!courses || courses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">My Courses</h3>
        <p className="text-gray-600">No courses found. Create your first course to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">My Courses</h3>
        <span className="text-sm text-gray-500">
          Total Courses: {courses.length}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <div 
            key={course.id} 
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer hover:border-blue-300"
            onClick={() => handleCourseClick(course.id)}
          >
            {/* Course Header */}
            <div className="mb-3">
              <h4 className="font-semibold text-gray-800 text-lg mb-1">
                {course.course_title}
              </h4>
              {course.course_code && (
                <p className="text-sm text-gray-500">{course.course_code}</p>
              )}
            </div>

            {/* Course Stats */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Students Enrolled:</span>
                <span className="font-semibold text-blue-600">
                  {course.enrolled_count || 0}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Sessions:</span>
                <span className="font-semibold text-gray-700">
                  {course.sessions_count || 0}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  course.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {course.status || 'Active'}
                </span>
              </div>
            </div>

            {/* Action Indicator */}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Click to view students</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats Overview */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">Quick Overview</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="font-bold text-blue-600">
              {courses.reduce((sum, course) => sum + (course.enrolled_count || 0), 0)}
            </div>
            <div className="text-gray-600">Total Students</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-green-600">
              {courses.filter(c => c.status === 'active').length}
            </div>
            <div className="text-gray-600">Active Courses</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-gray-600">
              {courses.reduce((sum, course) => sum + (course.sessions_count || 0), 0)}
            </div>
            <div className="text-gray-600">Total Sessions</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorCoursesSummary;