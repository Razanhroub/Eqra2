<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class CheckTokenExpiration
{
    public function handle(Request $request, Closure $next)
    {
        Log::info('CheckTokenExpiration middleware executed');
        $user = Auth::user();
        if ($user) {
            Log::info('User authenticated: ' . $user->id);
            $token = $request->bearerToken();
            Log::info('Token from request: ' . $token);
            $tokenRecord = DB::table('tokens')->where('token', $token)->first();
    
            if ($tokenRecord) {
                Log::info('Token found in DB: ' . $tokenRecord->token);
                if (Carbon::parse($tokenRecord->expires_at)->isPast()) {
                    Log::info('Token expired');
                    return response()->json(['message' => 'Token expired'], 401);
                } else {
                    Log::info('Token is still valid');
                }
            } else {
                Log::info('Token not found in DB');
            }
        } else {
            Log::info('User not authenticated');
        }
    
        return $next($request);
    }   
}