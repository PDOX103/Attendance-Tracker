<?php

namespace App\Http\Controllers;

use App\Models\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SessionController extends Controller
{

    public function getCoursesByCourse($id)
    {
        $session = Session::where('course_id', $id)->get();

        return response()->json([
            'status' => true,
            'data' => $session
        ]);
    }

    
    public function createSession(Request $request)
    {
        // Validate request
        $validator = Validator::make($request->all(), [
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i:s',
            'end_time' => 'nullable|date_format:H:i:s|after_or_equal:start_time',
            'course_id' => 'required|exists:courses,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 400);
        }

        // Check if a session already exists for this course at the same time
        $exists = Session::where('course_id', $request->course_id)
            ->where('date', $request->date)
            ->where('start_time', $request->start_time)
            ->exists();

        if ($exists) {
            return response()->json([
                'status' => false,
                'message' => 'Session already exists for this time slot'
            ], 409);
        }

        // Create session
        $session = Session::create($request->only(['date', 'start_time', 'end_time', 'status', 'course_id']));

        return response()->json([
            'status' => true,
            'message' => 'Session created successfully',
            'data' => $session
        ], 201);
    }
}
