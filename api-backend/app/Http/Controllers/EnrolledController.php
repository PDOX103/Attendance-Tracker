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
        $courses = $this->enrolledService->getCoursesByEnroll($id);

        return response()->json([
            'status' => true,
            'data' => $courses,
        ]);
    }
}
