<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\MessageStatusAPI;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
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








}
