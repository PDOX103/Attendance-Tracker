import React, { useState, useEffect } from 'react';

const Student_Dashboard = () => {
  const [uniqueId, setUniqueId] = useState('');
  const [joinedCourses, setJoinedCourses] = useState([]); // State to hold joined courses
  const [activeSessions, setActiveSessions] = useState([]);
  const [message, setMessage] = useState('');

  const handleJoinCourse = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:8000/api/courses/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ unique_code: uniqueId, student_id: localStorage.getItem('userId') }),
    });

    if (res.ok) {
      const data = await res.json();
      setMessage(data.message);
      // Add the newly joined course to the joinedCourses state
      setJoinedCourses((prevCourses) => [
        ...prevCourses,
        { unique_code: uniqueId }, // You may want to fetch more details if needed
      ]);
      fetchActiveSessions(uniqueId);  // Fetch active sessions after joining
    } else {
      setMessage('Failed to join the course. Please check the unique ID.');
    }
  };

  const fetchActiveSessions = async (courseId) => {
    const res = await fetch(`http://localhost:8000/api/sessions/course/${courseId}`);
    const data = await res.json();
    setActiveSessions(data.data);
  };

  return (
    <div>
      <h2>Student Dashboard</h2>
      <form onSubmit={handleJoinCourse}>
        <label>
          Enter Course Unique ID:
          <input 
            type="text" 
            value={uniqueId} 
            onChange={(e) => setUniqueId(e.target.value)} 
            required 
          />
        </label>
        <button type="submit">Join Course</button>
      </form>
      {message && <p>{message}</p>}

      {joinedCourses.length > 0 && (
        <div>
          <h3>Joined Courses</h3>
          <ul>
            {joinedCourses.map((course, index) => (
              <li key={index}>
                Unique Code: {course.unique_code}
                {/* Add more course details if needed */}
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeSessions.length > 0 && (
        <div>
          <h3>Active Sessions</h3>
          <ul>
            {activeSessions.map((session) => (
              <li key={session.id}>
                <span>{session.date} - {session.start_time}</span>
                {/* You can add more session details here */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Student_Dashboard;