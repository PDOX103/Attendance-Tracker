<?php

namespace App\Services;

use App\Models\Course;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class CourseService
{
    public function getCoursesByInstructor($id)
    {
        $courses = Course::where('instructor_id', $id)->get();

        return $courses->map(function ($course) {
            // Manually count enrollments and sessions
            $enrollmentCount = \App\Models\Enrollment::where('course_id', $course->id)->count();
            $sessionCount = \App\Models\Session::where('course_id', $course->id)->count();

            return [
                'id' => $course->id,
                'course_no' => $course->course_no,
                'course_title' => $course->course_title,
                'course_code' => $course->course_code,
                'description' => $course->description,
                'instructor_id' => $course->instructor_id,
                'status' => $course->status ?? 'active',
                'unique_code' => $course->unique_code,
                'enrolled_count' => $enrollmentCount, // Manual count
                'sessions_count' => $sessionCount,    // Manual count
                'created_at' => $course->created_at,
                'updated_at' => $course->updated_at
            ];
        });
    }

    // In CourseService.php

    public function updateCourseStatus($courseId)
    {
        // Find the session by ID
        $course = Course::find($courseId);

        if (!$course) {
            return [
                'status' => false,
                'message' => 'Course not found',
                'code' => 404,
            ];
        }

        // Toggle session status
        if ($course->status === 'active') {
            $course->status = 'ended';
        } else {
            $course->status = 'active'; // Optional: Allow reactivating sessions
        }

        $course->save();

        return [
            'status' => true,
            'message' => 'Course status updated successfully',
            'data' => $course,
            'code' => 200,
        ];
    }

    public function store($data)
    {
        $exists = Course::where('course_no', $data['course_no'])->exists();

        if ($exists) {
            return ['status' => false, 'message' => 'Course already exists', 'code' => 409];
        }

        $validator = Validator::make($data, [
            'course_no' => 'required|min:3|unique:courses,course_no',
            'course_title' => 'required|min:3',
            'instructor_id' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return [
                'status' => false,
                'message' => 'Fix the errors',
                'errors' => $validator->errors(),
                'code' => 422,
            ];
        }

        $uniqueCode = Str::random(8);
        \Log::info('Data being saved:', array_merge($data, ['unique_code' => $uniqueCode]));

        $course = Course::create(array_merge($data, ['unique_code' => $uniqueCode]));

        return [
            'status' => true,
            'message' => 'Course added successfully',
            'data' => [
                'course_no' => $course->course_no,
                'course_title' => $course->course_title,
                'status' => $course->status,
                'instructor_id' => $course->instructor_id,
                'unique_code' => $course->unique_code,
                'created_at' => $course->created_at,
                'updated_at' => $course->updated_at,
                'id' => $course->id,
            ],
            'code' => 201,
        ];
    }


}