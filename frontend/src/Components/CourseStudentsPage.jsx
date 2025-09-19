import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Ins_Sidebar from "../Instructor_Portal_Pages/Ins_Sidebar";

const CourseStudentsPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [markOutOf, setMarkOutOf] = useState(10);
  const [updatingMarks, setUpdatingMarks] = useState({});
  const [savingAll, setSavingAll] = useState(false);

  // Function to calculate marks based on attendance percentage
  const calculateMarks = (attendancePercentage, outOf) => {
    const rawMark = (attendancePercentage / 100) * outOf;
    const decimal = rawMark - Math.floor(rawMark);
    
    if (decimal < 0.5) {
      return Math.floor(rawMark);
    } else {
      return Math.ceil(rawMark);
    }
  };

  useEffect(() => {
    fetchCourseStudents();
  }, [courseId]);

  const fetchCourseStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8000/api/courses/${courseId}/students-with-attendance`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch course students");
      }

      const data = await response.json();
      if (data.status) {
        setCourseData(data.data.course);
        
        const studentsWithMarks = (data.data.students || []).map(student => {
          const calculatedMark = calculateMarks(student.attendance_percentage, markOutOf);
          return {
            ...student,
            manual_mark: (student.manual_mark !== null && student.mark_out_of === markOutOf) 
              ? student.manual_mark 
              : calculatedMark
          };
        });
        
        setStudents(studentsWithMarks);
      } else {
        throw new Error(data.message || "Failed to load students");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkOutOfChange = (newValue) => {
    setMarkOutOf(newValue);
    
    const updatedStudents = students.map(student => {
      const newCalculatedMark = calculateMarks(student.attendance_percentage, newValue);
      return {
        ...student,
        manual_mark: newCalculatedMark
      };
    });
    setStudents(updatedStudents);
  };

  const updateStudentMark = async (studentId, newMark) => {
    console.log('Saving mark:', { studentId, newMark, markOutOf, courseId }); // Debug log
    
    setUpdatingMarks(prev => ({ ...prev, [studentId]: true }));
    
    try {
      const requestData = {
        mark: parseFloat(newMark),
        mark_out_of: parseInt(markOutOf)
      };
      
      console.log('Request data:', requestData); // Debug log
      
      const response = await fetch(
        `http://localhost:8000/api/students/${studentId}/course/${courseId}/mark`,
        {
          method: 'POST', // Changed from PUT to POST
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(requestData)
        }
      );

      console.log('Response status:', response.status); // Debug log
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText); // Debug log
        throw new Error(`Failed to update mark: ${response.status} - ${errorText}`);
      }

      const responseData = await response.json();
      console.log('Success response:', responseData); // Debug log

      // Update local state only after successful API call
      setStudents(prev => prev.map(student => 
        student.id === studentId 
          ? { ...student, manual_mark: parseFloat(newMark), mark_out_of: parseInt(markOutOf) }
          : student
      ));
      
      alert('Mark saved successfully!'); // Success feedback
      
    } catch (err) {
      console.error('Save error:', err); // Debug log
      alert("Failed to update mark: " + err.message);
    } finally {
      setUpdatingMarks(prev => ({ ...prev, [studentId]: false }));
    }
  };

  const saveAllMarks = async () => {
    console.log('Saving all marks...'); // Debug log
    setSavingAll(true);
    
    try {
      // Prepare all marks data
      const allMarksData = students.map(student => ({
        student_id: student.id,
        mark: parseFloat(student.manual_mark || 0),
        mark_out_of: parseInt(markOutOf)
      }));

      console.log('All marks data:', allMarksData); // Debug log

      const response = await fetch(
        `http://localhost:8000/api/courses/${courseId}/save-all-marks`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            marks: allMarksData
          })
        }
      );

      console.log('Save all response status:', response.status); // Debug log

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Save all error response:', errorText); // Debug log
        throw new Error(`Failed to save all marks: ${response.status} - ${errorText}`);
      }

      const responseData = await response.json();
      console.log('Save all success response:', responseData); // Debug log

      // Update all students' mark_out_of in local state
      setStudents(prev => prev.map(student => ({
        ...student,
        mark_out_of: parseInt(markOutOf)
      })));

      alert(`Successfully saved marks for ${students.length} students!`);

    } catch (err) {
      console.error('Save all error:', err); // Debug log
      alert("Failed to save all marks: " + err.message);
    } finally {
      setSavingAll(false);
    }
  };

  if (loading) {
    return (
      <div className="flex">
        <Ins_Sidebar />
        <div className="flex-1 p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex">
        <Ins_Sidebar />
        <div className="flex-1 p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-red-800">Error</h3>
            <p className="text-red-600">{error}</p>
            <button 
              onClick={() => navigate('/instructor/dashboard')}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Ins_Sidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {courseData?.course_title || 'Course Students'}
            </h2>
            <p className="text-gray-600 mt-1">
              {courseData?.course_code} - {students.length} Students Enrolled
            </p>
          </div>
          {/* <button
            onClick={() => navigate('/instructor-dashboard')}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Back to Dashboard
          </button> */}
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="font-semibold text-gray-700">Mark out of:</label>
              <div className="flex gap-2">
                <button
                  onClick={() => handleMarkOutOfChange(10)}
                  className={`px-4 py-2 rounded transition-colors ${
                    markOutOf === 10
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  10
                </button>
                {/* <button
                  onClick={() => handleMarkOutOfChange(20)}
                  className={`px-4 py-2 rounded transition-colors ${
                    markOutOf === 20
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  20
                </button> */}
              </div>
              <span className="text-sm text-gray-500">
                Marks are calculated based on attendance percentage
              </span>
            </div>

            {/* Save All Button */}
            <button
              onClick={saveAllMarks}
              disabled={savingAll || students.length === 0}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {savingAll ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Saving All...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Save All Marks
                </>
              )}
            </button>
          </div>
        </div>

        {students.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">No students enrolled in this course yet.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Attendance %
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mark ({markOutOf})
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {student.student_id || student.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.email || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            student.attendance_percentage >= 80
                              ? 'bg-green-100 text-green-800'
                              : student.attendance_percentage >= 60
                              ? 'bg-blue-100 text-blue-800'
                              : student.attendance_percentage >= 40
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {student.attendance_percentage}%
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <input
                          type="number"
                          min="0"
                          max={markOutOf}
                          step="0.1"
                          value={student.manual_mark !== null ? student.manual_mark : 0}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === '' || value === null) {
                              setStudents(prev => prev.map(s => 
                                s.id === student.id 
                                  ? { ...s, manual_mark: 0 }
                                  : s
                              ));
                              return;
                            }
                            
                            const newMark = parseFloat(value);
                            if (!isNaN(newMark) && newMark >= 0 && newMark <= markOutOf) {
                              setStudents(prev => prev.map(s => 
                                s.id === student.id 
                                  ? { ...s, manual_mark: newMark }
                                  : s
                              ));
                            }
                          }}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {student.manual_mark !== calculateMarks(student.attendance_percentage, markOutOf) && (
                          <span className="ml-1 text-xs text-blue-600">(edited)</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => updateStudentMark(student.id, student.manual_mark !== null ? student.manual_mark : 0)}
                          disabled={updatingMarks[student.id]}
                          className="text-blue-600 hover:text-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {updatingMarks[student.id] ? 'Saving...' : 'Save'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {students.length > 0 && (
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Class Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="font-bold text-green-600">
                  {students.filter(s => s.attendance_percentage >= 80).length}
                </div>
                <div className="text-gray-600">Excellent (≥80%)</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-blue-600">
                  {students.filter(s => s.attendance_percentage >= 60 && s.attendance_percentage < 80).length}
                </div>
                <div className="text-gray-600">Good (60-79%)</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-yellow-600">
                  {students.filter(s => s.attendance_percentage >= 40 && s.attendance_percentage < 60).length}
                </div>
                <div className="text-gray-600">Average (40-59%)</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-red-600">
                  {students.filter(s => s.attendance_percentage < 40).length}
                </div>
                <div className="text-gray-600">Poor (&lt;40%)</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseStudentsPage;