<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Spatie\Permission\Models\Role;
use App\Traits\MessageStatusAPI;

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
        if (Auth::guard('web')->attempt([$fieldType => $login, 'password' => $credentials['password'], 'active' => 1], $remember)) {

            $user = User::where('email', $request->login)->orWhere('phone_number', $request->login)->first();
            auth()->user()->tokens()->delete();
            $tokenResult = $user->createToken('authToken')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $tokenResult,
                'role' => auth('api')->user()->getRoleNames(),
                'permissions' => auth('api')->user()->getAllPermissions(),
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
            'phone_number' => 'required_without:email|unique:tbl_users,phone_number|numeric|digits_between:9,12',
            'password' => 'required|confirmed',
        ]);
        // phải có input name password_confirmation

        $user = User::create(
            array_merge(
                $request->except(['password']),
                ['password' => bcrypt($request->input('password'))]
            )
        );

        $this->assignRoleClient($user); // add role user
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

    public function updatepass(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6|confirmed',
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
            ? response()->json('status', __($status))
            : response()->json(['email' => [__($status)]]);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'old_password' => 'required',
            'password' => 'required|min:6|confirmed',
        ]);

        $user = $request->user();
        if (Hash::check($request->old_password, $user->password)) {
            $user->update([
                'password' => Hash::make($request->password)
            ]);

            return MessageStatusAPI::update();
        } else {
            return response([
                'message' => 'Old password does not match'
            ], 400);
        }
        
    }

    /**
     * Assign roles to the user
     *
     * @return void
     * @param mixed $user
     */
    private function assignRoleClient($user)
    {
        $roleUserApi = Role::findByName('client', 'api');
        $user->assignRole($roleUserApi);
    }

}


