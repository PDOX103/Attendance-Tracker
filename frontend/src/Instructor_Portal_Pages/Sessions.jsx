import React, { useEffect, useState } from "react";
import Ins_Sidebar from "./Ins_Sidebar";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const { id } = useParams(); // Get course ID from URL params

  const fetchSession = async () => {
    if (!id) {
      console.error("Course ID not found in params!");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/api/sessions/course/${id}`);
      if (!res.ok) {
        throw new Error(`Error fetching sessions: ${res.statusText}`);
      }
      const result = await res.json();
      setSessions(result.data); // Assuming API response has { data: [...] }
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  useEffect(() => {
    fetchSession();
  }, [id]); // Re-fetch when the course ID changes

  const handleEndSession = async (sessionId) => {
    try {
      const res = await fetch(`http://localhost:8000/api/sessions/${sessionId}/end`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error(`Error ending session: ${res.statusText}`);
      }

      // Remove the session from the state
      setSessions(sessions.filter((session) => session.id !== sessionId));
    } catch (error) {
      console.error("Error ending session:", error);
    }
  };

  return (
    <div className="flex">
      <Ins_Sidebar />
      <div className="flex-1 p-6">
        {/* Header Section */}
        <motion.div
          className="flex justify-between items-center pt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h1 className="text-black font-roboto text-lg font-bold">Sessions</h1>
          <Link to={`/create-session/${id}`} className="hover:!scale-110 duration-300">
            <img src="/images/create 2.png" alt="Create Session" />
          </Link>
        </motion.div>

        {/* Sessions Table */}
        <div className="mt-6 bg-BLUE shadow-lg rounded-lg p-4">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-BLUE2">
                <th className="border font-roboto border-black px-4 py-2">
                  Session ID
                </th>
                <th className="border font-roboto border-black px-4 py-2">
                  Date
                </th>
                <th className="border font-roboto border-black px-4 py-2">
                  Start Time
                </th>
                <th className="border font-roboto border-black px-4 py-2">
                  End Time
                </th>
                <th className="border font-roboto border-black px-4 py-2">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {sessions.length > 0 ? (
                sessions.map((session) => (
                  <tr key={session.id} className="text-center">
                    <td className="border font-roboto border-black px-4 py-2">
                      {session.id}
                    </td>
                    <td className="border font-roboto border-black px-4 py-2">
                      {session.date}
                    </td>
                    <td className="border font-roboto border-black px-4 py-2">
                      {session.start_time}
                    </td>
                    <td className="border font-roboto border-black px-4 py-2">
                      {session.end_time || "Ongoing"}
                    </td>
                    <td className="border font-roboto border-black px-4 py-2">
                      <button onClick={() => handleEndSession(session.id)}>
                        <img src="/images/remove.png" alt="End Session" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center font-roboto text-black py-4">
                    No sessions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Sessions;
