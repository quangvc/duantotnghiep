<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\API\UserResource;
use Illuminate\Http\Request;
use App\Models\User;

use Spatie\Permission\Models\Role;
use App\Traits\MessageStatusAPI;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::with('roles')->get();

        $arr = [
            'data' => UserResource::collection($users),
            'message' => 'List users',
            'status' => true,

        ];
        return response()->json($arr);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string|min:6|max:50',
            'email' => 'required_without:phone|email|unique:tbl_users,email',
            'phone_number' => 'required_without:email|unique:tbl_users,phone_number|numeric|digits_between:9,12',
            'password' => 'required|confirmed',
        ]);

        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'phone_number' => $fields['phone_number'],
            'password' => bcrypt($fields['password']),
            'gender' => $request->gender,
            'active' => $request->active,
            'hotel_id' => $request->hotel_id,
        ]);

        if ($request->role == 'user') {
            $this->assignRoleClient($user); // add role user
        } elseif ($request->role == 'manager') {
            $this->assignRoleManager($user);
        } elseif ($request->role == 'admin') {
            $this->assignRoleAdmin($user);
        }
        // $token = $user->createToken('authToken')->plainTextToken;

        return response([
            'user' => $user,
            // 'token' => $token,
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        $arr = [
            'status' => true,
            'message' => 'User information',
            'data' => $user->with('roles')->get()
        ];
        return response()->json([$arr]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'string|min:6|max:50',
            'email' => 'email|unique:tbl_users,email' . $request->id,
            'phone_number' => 'numeric|digits_between:9,12|unique:tbl_users,phone_number' . $request->id,
        ]);

        $user->update($request->all());

        if ($request->role == 'user') {
            $this->assignRoleClient($user); // add role user
        } elseif ($request->role == 'manager') {
            $this->assignRoleManager($user);
        } elseif ($request->role == 'admin') {
            $this->assignRoleAdmin($user);
        }

        return response([
            'user' => $user,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        User::destroy($id);
        return MessageStatusAPI::destroy();
    }


    private function assignRoleClient($user)
    {
        $roleUserApi = Role::findByName('client', 'api');
        $user->assignRole($roleUserApi);
    }

    private function assignRoleManager($user)
    {
        $roleUserApi = Role::findByName('manager', 'api');
        $user->assignRole($roleUserApi);
    }

    private function assignRoleAdmin($user)
    {
        $roleUserApi = Role::findByName('admin', 'api');
        $user->assignRole($roleUserApi);
    }
}
