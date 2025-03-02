<?php
namespace App\Services;

use App\Models\Attendance;

class AttendanceService
{
    public function markAttendance($sessionId, $enrollmentId, $present)
    {
        // Create or update attendance
        return Attendance::updateOrCreate(
            [
                'session_id' => $sessionId,
                'enrollment_id' => $enrollmentId, // Ensure this is used correctly
            ],
            [
                'present' => $present,
            ]
        );
    }

    public function getAttendanceBySession($sessionId)
    {
        return Attendance::where('session_id', $sessionId)->get();
    }
}