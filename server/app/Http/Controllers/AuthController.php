<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            $credentials = $request->validate([
                'email' => ['required', 'email'],
                'password' => ['required'],
            ]);

            $remember = $request->remember;
            if (Auth::attempt(['email' => $credentials['email'], 'password' => $credentials['password'], 'active' => 1], $remember)) {

                $user = User::where('email', $request->email)->first();
                auth()->user()->tokens()->delete();
                $tokenResult = $user->createToken('authToken')->plainTextToken;

                return response()->json([
                    'user' => $user,
                    'token' => $tokenResult,
                ]);
            } else {
                throw new \Exception('Thông tin đăng nhập không đúng');
            }
        } catch (\Exception $error) {
            return response()->json([
                'message' => 'Thông tin đăng nhập không đúng',
                'error' => $error,
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();

        return [
            'message' => 'Logged out'
        ];
    }

    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string|min:6|max:50',
            'email' => 'required_without:phone|email|unique:tbl_users,email',
            'phone_number' => 'required|unique:tbl_users,phone_number|numeric|digits_between:9,12',
            'password' => 'required|confirmed',
        ]);
        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'phone_number' => $fields['phone_number'],
            'password' => bcrypt($fields['password']),
            'gender' => $request->gender
        ]);
        $token = $user->createToken('authToken')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token,
        ], 201);
    }



















    public function sentResetLink1(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? back()->with(['status' => __($status)])
            : back()->withErrors(['email' => __($status)]);
    }



    public function updatepass1(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        return $status === Password::PASSWORD_RESET
            ? redirect()->route('login')->with('status', __($status))
            : back()->withErrors(['email' => [__($status)]]);
    }
}
