<?php

namespace App\Http\Controllers;

use App\Services\EnrolledService;
use Illuminate\Http\Request;

class EnrolledController extends Controller
{
    protected $enrolledService;

    public function __construct(EnrolledService $enrolledService)
    {
        $this->enrolledService = $enrolledService;
    }

    public function getCoursesByEnroll($id)
    {
        $enrollments = $this->enrolledService->getCoursesByEnroll($id);

        // Transform response to include course details directly
        $courses = $enrollments->map(function ($enrollment) {
            return [
                'id' => $enrollment->id,
                'course_id' => $enrollment->course->id,
                'course_no' => $enrollment->course->course_no,
                'course_title' => $enrollment->course->course_title,
            ];
        });

        return response()->json([
            'status' => true,
            'data' => $courses,
        ]);
    }
}
