<?php

use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\AttendanceController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;    

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/users', function () {
    $users = User::all();
    return response()->json($users);
});*/

Route::post('/auth/google',[GoogleAuthController::class, 'handleGoogleCallback']);
Route::get('/users', [GoogleAuthController::class, 'getAllUsers']);
Route::get('/users/{id}', [GoogleAuthController::class, 'getUserDetails']);

Route::post('/courses', [CourseController::class, 'store']);
Route::get('/courses/instructor/{id}', [CourseController::class, 'getCoursesByInstructor']);
Route::post('/courses/join', [CourseController::class, 'joinCourse']);


Route::post('/sessions', [SessionController::class, 'createSession']);
Route::get('/sessions/course/{id}', [SessionController::class, 'getCoursesByCourse']);



Route::post('/sessions/{sessionId}/attendance', [AttendanceController::class, 'markAttendance']);
Route::get('/sessions/{sessionId}/attendance', [AttendanceController::class, 'getAttendanceBySession']);