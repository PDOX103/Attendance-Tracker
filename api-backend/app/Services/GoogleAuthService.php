<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Google_Client;

class GoogleAuthService
{
    protected $client;

    public function __construct()
    {
        $this->client = new Google_Client(['client_id' => env('GOOGLE_CLIENT_ID')]);
    }

    public function authenticate($credential)
    {
        $payload = $this->client->verifyIdToken($credential);

        if (!$payload) {
            return null; // Token is invalid
        }

        $user = User::updateOrCreate(
            ['email' => $payload['email']],
            [
                'name' => $payload['name'],
                'google_id' => $payload['sub'],
                'password' => Hash::make(uniqid()), // Dummy password
                'avatar' => $payload['picture'] ?? null,
                'role' => User::where('email', $payload['email'])->exists() ? User::where('email', $payload['email'])->first()->role : 'student',
            ]
        );

        return $user; // Return the user
    }
}