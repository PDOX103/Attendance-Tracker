<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Sanctum\PersonalAccessToken;
use Laravel\Http\JsonResponse;
use Google_Client;
use Google_Service_Oauth2;

class GoogleAuthController extends Controller
{
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

    // Handle user creation or update
    $user = User::updateOrCreate(
        ['email' => $payload['email']],
        [
            'name' => $payload['name'],
            'google_id' => $payload['sub'],
            'password' => Hash::make(uniqid()), // Dummy password as it's not needed for Google SSO
            'avatar' => $payload['picture'] ?? null,
        ]
    );

    // Generate token
    $token = $user->createToken('google-auth-token')->plainTextToken;

    return response()->json([
        'user' => $user,
        'token' => $token,
    ]);
}

}
