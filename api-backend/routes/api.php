<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\EnrolledController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\AttendanceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|--------------------------------------------------------------------------
*/

// -------------------- AUTH --------------------
Route::post('/auth/google', [GoogleAuthController::class, 'handleGoogleCallback']);
Route::get('/users', [GoogleAuthController::class, 'getAllUsers']);
Route::get('/users/{id}', [GoogleAuthController::class, 'getUserDetails']);

Route::middleware(['auth:sanctum'])->post('/auth/validate', [GoogleAuthController::class, 'validateToken']);

// -------------------- COURSES --------------------
Route::post('/courses', [CourseController::class, 'store']);
Route::get('/courses/instructor/{id}', [CourseController::class, 'getCoursesByInstructor']);
Route::post('/courses/join', [CourseController::class, 'joinCourse']);
Route::put('/courses/{course}', [CourseController::class, 'update']);             // ✅ update course
Route::delete('/courses/{course}', [CourseController::class, 'destroy']);        // ✅ delete course
Route::put('/courses/{id}/status', [CourseController::class, 'updateCourseStatus']); // keep if you want status toggle

// -------------------- SESSIONS --------------------
Route::post('/sessions', [SessionController::class, 'createSession']);
Route::get('/sessions/course/{id}', [SessionController::class, 'getCoursesByCourse']);
Route::put('/sessions/{id}/status', [SessionController::class, 'updateSessionStatus']);

// -------------------- ENROLLMENTS --------------------
Route::get('/courses/enrolled/{id}', [EnrolledController::class, 'getCoursesByEnroll']);

// -------------------- ATTENDANCE --------------------
Route::post('/sessions/{sessionId}/attendance', [AttendanceController::class, 'markAttendance']);
Route::get('/sessions/{sessionId}/attendance', [AttendanceController::class, 'getAttendanceBySession']);
Route::get('/courses/{courseId}/attendance-report', [AttendanceController::class, 'getStudentAttendanceReportByCourse']);
Route::get('/students/{studentId}/attendance-summary', [AttendanceController::class, 'getStudentAttendanceSummary']);

// -------------------- MARKS --------------------
Route::get('/courses/{courseId}/students-with-attendance', [CourseController::class, 'getCourseStudentsWithAttendance']);
Route::post('/students/{studentId}/course/{courseId}/mark', [CourseController::class, 'updateStudentMark']); // ✅ POST instead of PUT
Route::post('/courses/{courseId}/save-all-marks', [CourseController::class, 'saveAllMarks']); 
// -------------------- ADMIN --------------------
Route::put('/users/{id}/role', [AdminController::class, 'updateUserRole']);
