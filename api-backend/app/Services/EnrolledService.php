<?php
namespace App\Services;

use App\Models\Enrollment;
use App\Models\Session;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class EnrolledService
{
    public function getCoursesByEnroll($id)
    {
        return Enrollment::where('student_id', $id)
            ->whereHas('course', function ($query) {
                $query->where('status', 'active'); // Only fetch active courses
            })
            ->with('course:id,course_no,course_title,status') // Fetch necessary fields
            ->get();
    }
    

}