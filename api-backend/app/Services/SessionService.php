<?php
namespace App\Services;

use App\Models\Session;
use Carbon\Carbon; // Ensure you have this imported
use Illuminate\Support\Facades\Validator;

class SessionService
{

    public function getSessionsByCourse($courseId)
    {
        // Fetch sessions and convert times to 12-hour format
        return Session::where('course_id', $courseId)
            ->where('date', '>=', Carbon::today()) // Only active sessions
            ->get()
            ->map(function ($session) {
                $session->start_time = Carbon::parse($session->start_time)->format('h:i A');
                $session->end_time = Carbon::parse($session->end_time)->format('h:i A');
                return $session;
            });
    }


    public function createSession($data)
    {
        // Validate request
        $validator = Validator::make($data, [
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i:s',
            'end_time' => 'nullable|date_format:H:i:s|after_or_equal:start_time',
            'course_id' => 'required|exists:courses,id',
        ]);

        if ($validator->fails()) {
            return [
                'status' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
                'code' => 400,
            ];
        }

        // Check if a session already exists for this course at the same time
        $exists = Session::where('course_id', $data['course_id'])
            ->where('date', $data['date'])
            ->where('start_time', $data['start_time'])
            ->exists();

        if ($exists) {
            return [
                'status' => false,
                'message' => 'Session already exists for this time slot',
                'code' => 409,
            ];
        }

        // Create session
        $session = Session::create($data);

        return [
            'status' => true,
            'message' => 'Session created successfully',
            'data' => $session,
            'code' => 201,
        ];
    }


    public function updateSessionStatus($sessionId)
    {
        // Find the session by ID
        $session = Session::find($sessionId);

        if (!$session) {
            return [
                'status' => false,
                'message' => 'Session not found',
                'code' => 404,
            ];
        }

        // Toggle session status
        if ($session->status === 'active') {
            $session->status = 'ended';
        } else {
            $session->status = 'active'; // Optional: Allow reactivating sessions
        }

        $session->save();

        return [
            'status' => true,
            'message' => 'Session status updated successfully',
            'data' => $session,
            'code' => 200,
        ];
    }

}