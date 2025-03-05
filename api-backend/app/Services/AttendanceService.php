<?php
namespace App\Services;

use App\Models\Attendance;

class AttendanceService
{
    public function markAttendance($sessionId, $enrollmentId, $studentsId, $present)
    {
        return Attendance::updateOrCreate(
            [
                'session_id' => $sessionId,
                'enrollment_id' => $enrollmentId,
            ],
            [
                'students_id' => $studentsId, // Store manually entered student ID
                'present' => $present,
            ]
        );
    }



    public function getAttendanceBySession($sessionId)
    {
        return Attendance::where('session_id', $sessionId)->get();
    }
}