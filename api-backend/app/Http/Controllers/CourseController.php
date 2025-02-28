<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CourseController extends Controller
{
    //show all courses
    public function index(){
        $course = Course::orderBy('created_at','DESC')->get();

        return response()->json([
            'status' =>true,
            'data'=> $course
        ]);
    }

    //show a course
    public function show(){
        
    }
    //insert course
    public function store(Request $request){

        $exists = Course::where('course_no', $request->course_no)->exists();

        if ($exists) {
            return response()->json(['message' => 'Course already exists'], 409);
        }

        $validator = Validator::make($request->all(), [
            'course_no' => 'required|min:3|unique:courses,course_no',
            'course_title' => 'required|min:3',
        ]);

        

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Fix the errors',
                'errors' => $validator->errors(),
            ]);
        }
        
        $course = Course::create($request->only(['course_no', 'course_title', 'status']));

        return response()->json([
            'status' => true,
            'message'=>'Course added successfull',
            'data' => $course
        ]);
    }
    //
    public function update(){
        
    }

    //delete course
    public function destroy(){
        
    }

}
