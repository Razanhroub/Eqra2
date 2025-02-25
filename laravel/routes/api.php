<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;

/*
|---------------------------------------------------------------------------
| API Routes
|---------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response()->json($request->user()); // Return authenticated user's data
});

// Registration Route
Route::post('/register', [RegisterController::class, 'register']); // User registration

// Login Route
Route::post('/login', [LoginController::class, 'login']); // User login

// CSRF Protection for Sanctum (ensure CSRF token is sent with requests)
Route::middleware('web')->get('/csrf-cookie', function () {
    return response()->json(['message' => 'CSRF cookie set successfully']);
});
