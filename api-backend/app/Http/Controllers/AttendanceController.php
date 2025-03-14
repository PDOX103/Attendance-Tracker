<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Enrollment;
use App\Models\Session;
use App\Services\AttendanceService;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    protected $attendanceService;

    public function __construct(AttendanceService $attendanceService)
    {
        $this->attendanceService = $attendanceService;
    }

    // Mark attendance
    public function markAttendance(Request $request, $sessionId)
    {
        $request->validate([
            'student_id' => 'required|exists:users,id',
            'students_id' => 'required|string|max:255', // Ensure valid student ID format
        ]);

        // Check if session exists and is active
        $session = Session::find($sessionId);
        if (!$session || $session->status !== 'active') {
            return response()->json(['status' => false, 'message' => 'Session not found or inactive'], 400);
        }

        // Check if student is enrolled in this session's course
        $enrollment = Enrollment::where('course_id', $session->course_id)
            ->where('student_id', $request->student_id)
            ->first();

        if (!$enrollment) {
            return response()->json(['status' => false, 'message' => 'Student is not enrolled in this course'], 400);
        }

        // Check if attendance already exists
        $existingAttendance = Attendance::where([
            'session_id' => $sessionId,
            'enrollment_id' => $enrollment->id,
        ])->first();

        if ($existingAttendance) {
            return response()->json(['status' => false, 'message' => 'Attendance already marked'], 409);
        }

        // Mark attendance
        $attendance = $this->attendanceService->markAttendance(
            $sessionId,
            $enrollment->id,
            $request->students_id, // Pass students_id
            true
        );

        return response()->json([
            'status' => true,
            'message' => 'Attendance marked successfully',
            'data' => $attendance,
        ], 201);
    }


    // Get attendance by session
    public function getAttendanceBySession($sessionId)
    {
        $attendance = $this->attendanceService->getAttendanceBySession($sessionId);

        return response()->json([
            'status' => true,
            'data' => $attendance,
        ]);
    }


    public function getStudentAttendanceReportByCourse($courseId)
{
    // Fetch the specific course with its sessions and attendances
    $course = \App\Models\Course::with('sessions.attendances')->find($courseId);

    if (!$course) {
        return response()->json([
            'status' => false,
            'message' => 'Course not found'
        ], 404);
    }

    $studentsAttendance = [];

    // Loop through each session of the course
    foreach ($course->sessions as $session) {
        foreach ($session->attendances as $attendance) {
            // Count attendance per unique students_id
            if (!isset($studentsAttendance[$attendance->students_id])) {
                $studentsAttendance[$attendance->students_id] = 0;
            }
            if ($attendance->present) {
                $studentsAttendance[$attendance->students_id] += 1;
            }
        }
    }

    // Sort by students_id in ascending order
    ksort($studentsAttendance);

    return response()->json([
        'status' => true,
        'data' => [
            'course_id' => $course->id,
            'course_title' => $course->course_title,
            'students' => $studentsAttendance
        ]
    ]);
}


}