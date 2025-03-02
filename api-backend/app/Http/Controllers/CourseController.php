<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use App\Services\CourseService;

class CourseController extends Controller
{
    protected $courseService;

    public function __construct(CourseService $courseService)
    {
        $this->courseService = $courseService;
    }

    public function getCoursesByInstructor($id)
    {
        $courses = $this->courseService->getCoursesByInstructor($id);

        return response()->json([
            'status' => true,
            'data' => $courses,
        ]);
    }

    // Showing course
    public function show($id)
    {
        $course = Course::find($id);

        if (!$course) {
            return response()->json(['status' => false, 'message' => 'Course not found'], 404);
        }

        return response()->json(['status' => true, 'data' => $course]);
    }

    // Inserting course
    public function store(Request $request)
    {
        $result = $this->courseService->store($request->only(['course_no', 'course_title', 'status', 'instructor_id']));

        return response()->json($result, $result['code']);
    }

    // Updating Course
    public function update(Request $request, $id)
    {
       
    }

    // Delete course
    public function destroy($id)
    {
        
    }
}