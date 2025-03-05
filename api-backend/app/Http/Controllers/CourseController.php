<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use App\Services\CourseService;
use Illuminate\Support\Str;
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
        $request->validate([
            'course_no' => 'required|string|max:255',
            'course_title' => 'required|string|max:255',
            'status' => 'required|boolean',
            'instructor_id' => 'required|exists:users,id',
        ]);

        // Generate a unique code
        $uniqueCode = 'CODE_' . str::random(8);

        // Pass the data including the unique code to the service
        $result = $this->courseService->store($request->only(['course_no', 'course_title', 'status', 'instructor_id']) + ['unique_code' => $uniqueCode]);

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

    // Join course by unique code
    public function joinCourse(Request $request)
    {
        $request->validate([
            'unique_code' => 'required|string',
            'student_id' => 'required|exists:users,id',
        ]);

        $course = Course::where('unique_code', $request->unique_code)->first();

        if (!$course) {
            return response()->json(['status' => false, 'message' => 'Course not found'], 404);
        }

        $existingEnrollment = Enrollment::where('course_id', $course->id)
            ->where('student_id', $request->student_id)
            ->exists();

        if ($existingEnrollment) {
            return response()->json(['status' => false, 'message' => 'You have already joined this course'], 400);
        }
        
        Enrollment::create([
            'course_id' => $course->id,
            'student_id' => $request->student_id,
        ]);

        return response()->json(['status' => true, 'message' => 'Successfully joined the course'], 200);
    }

}