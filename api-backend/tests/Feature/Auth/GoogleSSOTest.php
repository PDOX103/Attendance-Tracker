<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use App\Services\GoogleAuthService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Mockery;

class GoogleSSOTest extends TestCase
{
    use RefreshDatabase;

    protected $googleAuthService;

    public function setUp(): void
    {
        parent::setUp();
        // Mock the GoogleAuthService
        $this->googleAuthService = Mockery::mock(GoogleAuthService::class);
        $this->app->instance(GoogleAuthService::class, $this->googleAuthService);
    }

    public function test_users_can_authenticate_with_google()
    {
        // Mock user data returned by GoogleAuthService
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'name' => 'Test User',
            'google_id' => 'google_user_123',
            'avatar' => 'https://example.com/avatar.jpg',
            'role' => 'student',
        ]);

        // Mock the authenticate method to return the user
        $this->googleAuthService
            ->shouldReceive('authenticate')
            ->once()
            ->with('valid-google-credential')
            ->andReturn($user);

        // Make a POST request to the Google SSO callback endpoint
        $response = $this->postJson('/api/auth/google', [
            'credential' => 'valid-google-credential',
        ]);

        // Assert the response
        $response->assertStatus(200)
                ->assertJsonStructure([
                    'user' => ['id', 'name', 'email', 'role'],
                    'token',
                    'role',
                ]);

        // Verify a token was created for the user
        $this->assertNotNull($user->tokens()->where('name', 'google-auth-token')->first());
    }

    public function test_google_auth_fails_with_invalid_credential()
    {
        // Mock the authenticate method to return null (invalid token)
        $this->googleAuthService
            ->shouldReceive('authenticate')
            ->once()
            ->with('invalid-google-credential')
            ->andReturn(null);

        // Make a POST request with an invalid credential
        $response = $this->postJson('/api/auth/google', [
            'credential' => 'invalid-google-credential',
        ]);

        // Assert the response
        $response->assertStatus(401)
                ->assertJson([
                    'error' => 'Invalid Google Token',
                ]);
    }

    public function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}