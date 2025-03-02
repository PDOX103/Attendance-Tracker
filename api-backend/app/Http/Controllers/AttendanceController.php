<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
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
    ]);

    // Find the enrollment
    $enrollment = Enrollment::where('course_id', $sessionId)
        ->where('student_id', $request->student_id)
        ->first();

    if (!$enrollment) {
        return response()->json(['status' => false, 'message' => 'Student is not enrolled in this course'], 400);
    }

    // Use the enrollment ID here
    $attendance = $this->attendanceService->markAttendance(
        $sessionId,
        $enrollment->id, // This should match the enrollment ID
        true // Assuming present is true for marking attendance
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
}