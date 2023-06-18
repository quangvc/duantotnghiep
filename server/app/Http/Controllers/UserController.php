<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\UserResource;
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

        return MessageStatusAPI::show(UserResource::collection($users));
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

        $user= User::create($request->all());

        if ($request->role == 'user') {
            $this->assignRoleClient($user); // add role user
        } elseif ($request->role == 'manager') {
            $this->assignRoleManager($user);
        } elseif ($request->role == 'admin') {
            $this->assignRoleAdmin($user);
        }

        return response([
            'user' => $user,
            'message' => 'Created successfully'
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
        return MessageStatusAPI::show(new UserResource($user));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    //  update cac truong tru status
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'string|min:6|max:50',
            'email' => 'email|unique:tbl_users,email'. $request->id,
            'phone_number' => 'numeric|digits_between:9,12|unique:tbl_users,phone_number'. $request->id,
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
            'message' => 'Updated successfully',
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

    public function changeStatus($id)
    {
        $user = User::find($id);
        if ($user->status == 0) {
            $user->update(['status' => 1]);
        } else if ($user->status == 1) {
            $user->update(['status' => 0]);
        }       

        return response([
            'message' => 'Changed status successfully',
        ], 200);
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
