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


    public function updateCourseStatus($id)
    {
        $result = $this->courseService->updateCourseStatus($id);
        return response()->json($result, $result['code']);
    }


    public function getCourseStudentsWithAttendance($courseId)
    {
        try {
            // Get the course
            $course = \App\Models\Course::find($courseId);

            if (!$course) {
                return response()->json([
                    'status' => false,
                    'message' => 'Course not found'
                ], 404);
            }

            // Get all enrollments for this course with user data
            $enrollments = Enrollment::with(['user'])
                ->where('course_id', $courseId)
                ->get();

            $studentsData = [];

            foreach ($enrollments as $enrollment) {
                $user = $enrollment->user;
                $studentId = $enrollment->student_id;

                // Calculate attendance percentage for this student in this course
                $totalSessions = \App\Models\Session::where('course_id', $courseId)->count();

                $presentSessions = 0;
                if ($totalSessions > 0) {
                    $sessions = \App\Models\Session::where('course_id', $courseId)->get();

                    foreach ($sessions as $session) {
                        $attendance = \App\Models\Attendance::where([
                            'session_id' => $session->id,
                            'enrollment_id' => $enrollment->id,
                            'present' => true
                        ])->first();

                        if ($attendance) {
                            $presentSessions++;
                        }
                    }
                }

                $attendancePercentage = $totalSessions > 0 ? round(($presentSessions / $totalSessions) * 100, 1) : 0;

                // Get existing mark if any
                $existingMark = \App\Models\StudentMark::where([
                    'student_id' => $studentId,
                    'course_id' => $courseId
                ])->first();

                $studentsData[] = [
                    'id' => $studentId,
                    'student_id' => $studentId,
                    'name' => $user ? $user->name : 'N/A',
                    'email' => $user ? $user->email : 'N/A',
                    'total_sessions' => $totalSessions,
                    'present_sessions' => $presentSessions,
                    'attendance_percentage' => $attendancePercentage,
                    'manual_mark' => $existingMark ? $existingMark->mark : null,
                    'mark_out_of' => $existingMark ? $existingMark->mark_out_of : null
                ];
            }

            return response()->json([
                'status' => true,
                'data' => [
                    'course' => [
                        'id' => $course->id,
                        'course_title' => $course->course_title,
                        'course_code' => $course->course_code ?? null
                    ],
                    'students' => $studentsData
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Error fetching course students: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update student mark for a specific course
     */
    public function updateStudentMark(Request $request, $studentId, $courseId)
    {
        try {
            $request->validate([
                'mark' => 'required|numeric|min:0',
                'mark_out_of' => 'required|numeric|min:1'
            ]);

            // Check if course exists
            $course = \App\Models\Course::find($courseId);
            if (!$course) {
                return response()->json([
                    'status' => false,
                    'message' => 'Course not found'
                ], 404);
            }

            // Check if student is enrolled
            $enrollment = Enrollment::where([
                'student_id' => $studentId,
                'course_id' => $courseId
            ])->first();

            if (!$enrollment) {
                return response()->json([
                    'status' => false,
                    'message' => 'Student is not enrolled in this course'
                ], 400);
            }

            // Validate mark is within range
            if ($request->mark > $request->mark_out_of) {
                return response()->json([
                    'status' => false,
                    'message' => 'Mark cannot be greater than mark_out_of'
                ], 400);
            }

            // Update or create student mark
            $studentMark = \App\Models\StudentMark::updateOrCreate(
                [
                    'student_id' => $studentId,
                    'course_id' => $courseId
                ],
                [
                    'mark' => $request->mark,
                    'mark_out_of' => $request->mark_out_of,
                    'updated_at' => now()
                ]
            );

            return response()->json([
                'status' => true,
                'message' => 'Student mark updated successfully',
                'data' => $studentMark
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Error updating student mark: ' . $e->getMessage()
            ], 500);
        }
    }

    public function saveAllMarks(Request $request, $courseId)
{
    try {
        $request->validate([
            'marks' => 'required|array|min:1',
            'marks.*.student_id' => 'required|exists:users,id',
            'marks.*.mark' => 'required|numeric|min:0',
            'marks.*.mark_out_of' => 'required|numeric|min:1'
        ]);

        // Check if course exists
        $course = \App\Models\Course::find($courseId);
        if (!$course) {
            return response()->json([
                'status' => false,
                'message' => 'Course not found'
            ], 404);
        }

        $savedMarks = [];
        $errors = [];

        foreach ($request->marks as $index => $markData) {
            try {
                $studentId = $markData['student_id'];
                $mark = $markData['mark'];
                $markOutOf = $markData['mark_out_of'];

                // Check if student is enrolled in this course
                $enrollment = Enrollment::where([
                    'student_id' => $studentId,
                    'course_id' => $courseId
                ])->first();

                if (!$enrollment) {
                    $errors[] = "Student ID {$studentId} is not enrolled in this course";
                    continue;
                }

                // Validate mark is within range
                if ($mark > $markOutOf) {
                    $errors[] = "Mark for student ID {$studentId} cannot be greater than {$markOutOf}";
                    continue;
                }

                // Update or create student mark
                $studentMark = \App\Models\StudentMark::updateOrCreate(
                    [
                        'student_id' => $studentId,
                        'course_id' => $courseId
                    ],
                    [
                        'mark' => $mark,
                        'mark_out_of' => $markOutOf,
                        'updated_at' => now()
                    ]
                );

                $savedMarks[] = [
                    'student_id' => $studentId,
                    'mark' => $studentMark->mark,
                    'mark_out_of' => $studentMark->mark_out_of
                ];

            } catch (\Exception $e) {
                $errors[] = "Error saving mark for student index {$index}: " . $e->getMessage();
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Bulk mark save completed',
            'data' => [
                'course_id' => $courseId,
                'saved_count' => count($savedMarks),
                'error_count' => count($errors),
                'saved_marks' => $savedMarks,
                'errors' => $errors
            ]
        ]);

    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json([
            'status' => false,
            'message' => 'Validation failed',
            'errors' => $e->errors()
        ], 422);
    } catch (\Exception $e) {
        return response()->json([
            'status' => false,
            'message' => 'Error saving marks: ' . $e->getMessage()
        ], 500);
    }
}
    

}