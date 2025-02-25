<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $user = $request->user();
        $token = $user->createToken('auth_token', ['*'], now()->addDays(5))->plainTextToken;

        // Insert token details into the tokens table
        DB::table('tokens')->insert([
            'user_id' => $user->id,
            'token' => $token,
            'created_at' => Carbon::now(),
            'expires_at' => Carbon::now()->addDays(5),
        ]);

        return response()->json(['token' => $token], 200);
    }
}