<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\UserController;


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
Route::middleware(['auth:sanctum', 'check.token.expiration'])->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::put('/users/{user}', [UserController::class, 'update']);
    Route::delete('/users/{user}', [UserController::class, 'destroy']);
});