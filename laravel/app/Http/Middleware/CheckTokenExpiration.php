<?php
// app/Http/Middleware/CheckTokenExpiration.php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CheckTokenExpiration
{
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();
        if ($user) {
            $token = $request->bearerToken();
            $tokenRecord = DB::table('tokens')->where('token', $token)->first();

            if ($tokenRecord && Carbon::parse($tokenRecord->expires_at)->isPast()) {
                // Token is expired
                return response()->json(['message' => 'Token expired'], 401);
            }
        }

        return $next($request);
    }
}