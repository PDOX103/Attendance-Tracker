import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import Std_Sidebar from "./Std_Sidebar";

const Active_Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const { id } = useParams(); // Get course ID from URL params

  const fetchSession = async () => {
    if (!id) {
      console.error("Course ID not found in params!");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8000/api/sessions/course/${id}`
      );
      if (!res.ok) {
        throw new Error(`Error fetching sessions: ${res.statusText}`);
      }
      const result = await res.json();

      result.data.forEach((session) => {
        console.log(
          `Session ID: ${session.id}, Start Time: ${
            session.start_time
          }, End Time: ${session.end_time || "Ongoing"}`
        );
      });

      // Filter only active sessions
      const activeSessions = result.data.filter(
        (session) => session.status === "active"
      );
      setSessions(activeSessions);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  useEffect(() => {
    const now = new Date();
    let hours = now.getHours() % 12 || 12; // Convert to 12-hour format, treating 0 as 12
    let minutes = now.getMinutes().toString().padStart(2, "0");
    let seconds = now.getSeconds().toString().padStart(2, "0");

    const formattedTime = `${hours}:${minutes}:${seconds}`;
    console.log("Current Time:", formattedTime); // Logs time in HH:MM:SS (12-hour format without AM/PM)

    fetchSession();
  }, [id]);

  return (
    <div className="flex">
      <Std_Sidebar />
      <div className="flex-1 p-6">
        {/* Header Section */}
        <motion.div
          className="flex justify-between items-center pt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h1 className="text-black font-roboto text-lg font-bold">
            Active Sessions
          </h1>
        </motion.div>

        {/* Sessions Table */}
        <div className="mt-6 bg-BLUE shadow-lg rounded-lg p-4">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-BLUE2">
                {/* <th className="border font-roboto border-black px-4 py-2">
                  Session ID
                </th> */}
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
                  Give Attendance
                </th>
              </tr>
            </thead>
            <tbody>
              {sessions.length > 0 ? (
                sessions.map((session) => (
                  <tr key={session.id} className="text-center">
                    {/* <td className="border font-roboto border-black px-4 py-2">
                      {session.id}
                    </td> */}
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
                      <Link
                        to={`/attendance/${session.id}`}
                        className="hover:!scale-110 duration-300 flex justify-center"
                      >
                        <img src="/images/tap.png" alt="End Session" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center font-roboto text-black py-4"
                  >
                    No active sessions found.
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

export default Active_Sessions;
