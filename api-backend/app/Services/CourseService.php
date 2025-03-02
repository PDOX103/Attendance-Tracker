<?php

namespace App\Services;

use App\Models\Course;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

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

        $uniqueCode = str::random(8);
        \Log::info('Data being saved:', array_merge($data, ['unique_code' => $uniqueCode]));


        $course = Course::create(array_merge($data, ['unique_code' => $uniqueCode]));

        //$course = Course::create($data);

        return [
            'status' => true,
            'message' => 'Course added successfully',
            'data' => [
                'course_no' => $course->course_no,
                'course_title' => $course->course_title,
                'status' => $course->status,
                'instructor_id' => $course->instructor_id,
                'unique_code' => $course->unique_code, // Include the unique code
                'created_at' => $course->created_at,
                'updated_at' => $course->updated_at,
                'id' => $course->id,
            ],
            'code' => 201,
        ];
    }

    
}