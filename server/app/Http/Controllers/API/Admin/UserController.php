<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\API\UserResource;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use Spatie\Permission\Models\Role;
use App\Traits\MessageStatusAPI;
use App\Enums\StatusEnum;

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
    public function store(StoreUserRequest $request)
    {
        $request->validated();

        $user = new User(
            array_merge(
                $request->except(['password']),
                ['password' => bcrypt($request->input('password'))]
            )
        );
        if ($request->hasFile('avatar')) {
            $file = $request->avatar;
            // $user->avatar = $file->getClientOriginalName();
            $user->avatar = $file->hashName();
            $file->move(base_path('public/Images/avatar'), $user->avatar);
        }
        $user->save();

        if ($request->role == 'client') {
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
            'email' => 'email|unique:tbl_users,email,' . $user->id,
            'phone_number' => 'numeric|digits_between:9,12|unique:tbl_users,phone_number,' . $user->id,
        ]);

        if ($request->hasFile('avatar')) {
            if ($user->avatar != '' && file_exists(base_path('public/Images/avatars/' . $user->avatar))) {
                unlink(base_path('public/Images/avatars/' . $user->avatar));
            }
            $file = $request->avatar;
            $fileName = $file->hashName();
            $file->move(base_path('public/Images/avatars'), $fileName);

            $user->update(
                array_merge(
                    $request->except(['avatar']),
                    ['avatar' => $fileName]
                )
            );
        } else {
            $user->update($request->all());
        }

        if ($request->role == 'client') {
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
        if ($user->active == StatusEnum::DEACTIVE) {
            $user->update(['active' => StatusEnum::ACTIVE]);
        } else {
            $user->update(['active' => StatusEnum::DEACTIVE]);
        }

        return response([
            'message' => 'Changed status successfully',
        ], 200);
    }

    private function assignRoleClient($user)
    {
        $roleUserApi = Role::findByName('client', 'api');
        $user->syncRoles($roleUserApi);
        // $user->assignRole($roleUserApi);
    }

    private function assignRoleManager($user)
    {
        $roleUserApi = Role::findByName('manager', 'api');
        $user->syncRoles($roleUserApi);
    }

    private function assignRoleAdmin($user)
    {
        $roleUserApi = Role::findByName('admin', 'api');
        $user->syncRoles($roleUserApi);
    }
}
