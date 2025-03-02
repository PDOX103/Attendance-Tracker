<?php

namespace App\Services;

use App\Models\Course;
use Illuminate\Support\Facades\Validator;

class CourseService
{
    public function getCoursesByInstructor($id)
    {
        return Course::where('instructor_id', $id)->get();
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

        $course = Course::create($data);

        return [
            'status' => true,
            'message' => 'Course added successfully',
            'data' => $course,
            'code' => 201,
        ];
    }

    
}