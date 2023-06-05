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
        // input phải có name là login
        $login = $request->login;
        $fieldType = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'phone_number';

        $credentials = $request->validate([
            'login' => 'required|max:255',
            'password' => ['required'],
        ]);

        $remember = $request->remember;
        if (Auth::attempt([$fieldType => $login, 'password' => $credentials['password'], 'active' => 1], $remember)) {

            $user = User::where('email', $request->login)->orWhere('phone_number', $request->login)->first();
            auth()->user()->tokens()->delete();
            $tokenResult = $user->createToken('authToken')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $tokenResult,
            ]);
        } else {
            throw new \Exception('Thông tin đăng nhập không đúng');
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
        // phải có input name password_confirmation
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

    public function sentResetLink(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['status' => __($status)])
            : response()->json(['email' => __($status)]);
    }




















    

    public function sendMail(Request $request)
    {
        $user = User::where('email', $request->email)->firstOrFail();
        $passwordReset = PasswordReset::updateOrCreate([
            'email' => $user->email,
        ], [
            'token' => Str::random(60),
        ]);
        if ($passwordReset) {
            $user->notify(new ResetPasswordRequest($passwordReset->token));
        }

        return response()->json([
            'message' => 'We have e-mailed your password reset link!'
        ]);
    }


    public function reset(Request $request, $token)
    {
        $passwordReset = PasswordReset::where('token', $token)->firstOrFail();
        if (Carbon::parse($passwordReset->updated_at)->addMinutes(720)->isPast()) {
            $passwordReset->delete();

            return response()->json([
                'message' => 'This password reset token is invalid.',
            ], 422);
        }
        $user = User::where('email', $passwordReset->email)->firstOrFail();
        $updatePasswordUser = $user->update($request->only('password'));
        $passwordReset->delete();

        return response()->json([
            'success' => $updatePasswordUser,
        ]);
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
