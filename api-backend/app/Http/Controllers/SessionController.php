<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\SessionService;

class SessionController extends Controller
{
    protected $sessionService;

    public function __construct(SessionService $sessionService)
    {
        $this->sessionService = $sessionService;
    }

    // Fetch active sessions for a specific course
    public function getCoursesByCourse($id)
    {
        $sessions = $this->sessionService->getSessionsByCourse($id);

        return response()->json([
            'status' => true,
            'data' => $sessions,
        ]);
    }

    public function createSession(Request $request)
    {
        $result = $this->sessionService->createSession($request->only(['date', 'start_time', 'end_time', 'status', 'course_id']));

        return response()->json($result, $result['code']);
    }
}