<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {

        if(Auth::attempt($request->only(['email', 'password'])))
        {
            $user = User::with('role')->where('email', '=', $request->email)->firstOrFail();

            $permission = ['USER'];

            if($user->role->name === 'ADMIN') {
                $permission = ['ADMIN'];
            }
            if($user->role->name === 'MANAGER') {
                $permission = ['MANAGER'];
            }

            return response()->json([
                'message' => 'Authorized',
                'token' => $request->user()->createToken('general', $permission)->plainTextToken
            ], 200);
        }

        return response()->json('Not Authorized', 403);

    }
}
