import React, { useEffect, useState } from "react";
import Ins_Sidebar from "./Ins_Sidebar";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const AttendanceReport = () => {
  const params = useParams(); // Get course_id from URL
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendanceReport = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/courses/${params.id}/attendance-report`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch attendance report");
        }

        const data = await response.json();
        setReport(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceReport();
  }, [params.id]);

  // 📌 Function to Generate and Download PDF
  const downloadPDF = () => {
    if (!report) return;

    const doc = new jsPDF();
    doc.text(`Attendance Report - ${report.course_title}`, 14, 15);

    const tableColumn = ["Student ID", "Present Count"];
    const tableRows = Object.entries(report.students).map(
      ([studentId, count]) => [studentId, count]
    );

    // ✅ Ensure autoTable is correctly used
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 25,
    });

    doc.save(`Attendance_Report_${report.course_title}.pdf`);
  };

  return (
    <div className="flex">
      <Ins_Sidebar />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">
          Attendance Report {report ? ` - ${report.course_title}` : ""}
        </h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* 📌 Download Button */}
        {report && (
          <button
            onClick={downloadPDF}
            className="text-white bg-[#111B47] px-3 py-1 rounded-full hover:!scale-110 duration-300 shadow-lg font-roboto text-sm"
          >
            Download PDF
          </button>
        )}

        <section>
          <div className="container grid-col-1 md:grid-cols-2 min-h-[15px]"></div>
        </section>

        {report && (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-BLUE2">
                <th className="border border-gray-300 px-4 py-2">Student ID</th>
                <th className="border border-gray-300 px-4 py-2">
                  Present Count
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(report.students).map(([studentId, count]) => (
                <tr key={studentId} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    {studentId}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AttendanceReport;
