<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Google_Client;
use Auth;



class GoogleAuthController extends Controller
{
    //get all the users
    public function getAllUsers()
    {
        $users = User::select('id', 'name', 'email')->get();

        return response()->json([
            'users' => $users
        ]);
    }

    public function getUserDetails($id)
    {
        $user = User::find($id);

        if ($user == null) {
            return response()->json([
                'success' => false,
                'message' => 'User not found',
            ]);
        }


        return response()->json([
            'success' => true,
            'data' => $user,
        ]);
    }




    public function handleGoogleCallback(Request $request)
    {
        $validatedData = $request->validate([
            'credential' => 'required|string',
        ]);

        $client = new Google_Client(['client_id' => env('GOOGLE_CLIENT_ID')]);

        $payload = $client->verifyIdToken($validatedData['credential']);

        if (!$payload) {
            return response()->json(['error' => 'Invalid Google Token'], 401);
        }

        //checking if the user exists for role checking
        $user = User::where('email', $payload['email'])->first();
        if ($user) {
            $role = $user->role;
        } else {
            $role = 'student';
        }

        $user = User::updateOrCreate(
            ['email' => $payload['email']],
            [
                'name' => $payload['name'],
                'google_id' => $payload['sub'],
                'password' => Hash::make(uniqid()), // Dummy password as it's not needed for Google SSO
                'avatar' => $payload['picture'] ?? null,
                'role' => $role,
            ]
        );

        // Generate token
        $token = $user->createToken('google-auth-token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
            'role' => $role,

        ]);
    }

}
