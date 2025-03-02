<?php

namespace App\Http\Controllers\Auth;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\GoogleAuthService;
use Auth;

class GoogleAuthController extends Controller
{
    protected $googleAuthService;

    public function __construct(GoogleAuthService $googleAuthService)
    {
        $this->googleAuthService = $googleAuthService;
    }

    public function getAllUsers()
    {
        $users = User::select('id', 'name', 'email')->get();

        return response()->json(['users' => $users]);
    }

    public function getUserDetails($id)
    {
        $user = User::find($id);

        if ($user == null) {
            return response()->json(['success' => false, 'message' => 'User not found']);
        }

        return response()->json(['success' => true, 'data' => $user]);
    }

    public function handleGoogleCallback(Request $request)
    {
        $validatedData = $request->validate(['credential' => 'required|string']);

        $user = $this->googleAuthService->authenticate($validatedData['credential']);

        if ($user === null) {
            return response()->json(['error' => 'Invalid Google Token'], 401);
        }

        // Generate token
        $token = $user->createToken('google-auth-token')->plainTextToken;

        return response()->json(['user' => $user, 'token' => $token, 'role' => $user->role]);
    }
}