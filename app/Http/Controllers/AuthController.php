<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validate incoming request data
        $request->validate([
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'role' => 'required|in:traveler,agency',
            'full_name' => 'required|string|max:255',
            'phone_number' => 'required|string|max:20',
            'bio' => 'nullable|string',
            'business_license_number' => 'nullable|string|max:100|required_if:role,agency',
            'business_license_document' => 'nullable|string|max:255',
        ]);

        // Create a new user with the validated data
        $user = User::create([
            'id' => Str::uuid()->toString(),
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'full_name' => $request->full_name,
            'phone_number' => $request->phone_number,
            'bio' => $request->bio,
            'business_license_number' => $request->business_license_number,
            'business_license_document' => $request->business_license_document,
            'status' => $request->role === 'agency' ? 'pending_verification' : 'active',
            'notification_preferences' => ['email' => true, 'push' => false],
        ]);

        // Generate an auth token for the newly created user
        $token = $user->createToken('auth_token')->plainTextToken;

        // Return a JSON response with the auth token and user details
        return response()->json([
            'token' => $token,
            'user' => $user,
        ], 201);
    }


    public function login(Request $request)
    {
        // Validate incoming request data
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Find the user by email
        $user = User::where('email', $request->email)->first();

        // Check if the user exists and the password is correct
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials',
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['token' => $token, 'user' => $user]);

    }


    /**
     * Log the user out by revoking the current access token.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        // Revoke the user's current access token
        $request->user()->currentAccessToken()->delete();

        // Return a JSON response indicating successful logout
        return response()->json(['message' => 'Logged out']);
    }


    public function profile(Request $request)
    {
        return response()->json($request->user());
    }


    public function updateProfile(Request $request)
    {
        $request->validate([
            'full_name' => 'string|max:255',
            'phone_number' => 'nullable|string|max:20',
            'bio' => 'nullable|string',
            'profile_picture' => 'nullable|string|max:255',
            'notification_preferences' => 'nullable|array',
        ]);

        $request->user()->update($request->only([
            'full_name',
            'phone_number',
            'bio',
            'profile_picture',
            'notification_preferences',
        ]));

        return response()->json($request->user());
    }


    public function uploadFile(Request $request)
{
    $request->validate([
        'file' => 'required|file|mimes:jpg,png,pdf|max:2048', 
    ]);

    $path = $request->file('file')->store('uploads', 'public');
    $url = asset('storage/' . $path);

    return response()->json(['url' => $url]);
}


}