<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        $user = User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('123456'),
            'gender' => 1,
            'phone_number' => rand(10, 10),
            'active' => 1,
        ]);


        $adminRoleApi = Role::create([
            'name' => 'admin',
        ]);

        $clientRoleApi = Role::create([
            'name' => 'client',
        ]);

        $partnerApi = Role::create([
            'name' => 'partner',
        ]);

        $adminPermissions = [
            'view_user', 'edit_user', 'add_user', 'delete_user',
            'view_hotel', 'add_hotel', 'edit_hotel', 'delete_hotel',
            'view_role', 'add_role', 'edit_role', 'delete_role',
            'view_booking', 'add_booking', 'edit_booking', 'delete_booking',
            'view_coupon', 'add_coupon', 'edit_coupon', 'delete_coupon',
            'view_room', 'add_room', 'edit_room', 'delete_room',

        ];

        $clientPermission = [
            'view_user', 'edit_user',
            'view_hotel',
            'view_coupon', 'add_coupon', 'edit_coupon', 'delete_coupon',
            'view_room', 'add_room', 'edit_room', 'delete_room',
        ];

        // admin
        foreach ($adminPermissions as $permissionss) {
            $permission = Permission::create([
                'name' => $permissionss,
            ]);
        }

        $userID = [1];
        $roleAdminApi = Role::findByName('admin');
        $roleClientApi = Role::findByName('client');
        $rolePartnerApi = Role::findByName('partner');

        foreach ($userID as $userIDS) {
            $user = User::find($userIDS);
            $user->assignRole($roleAdminApi, 'admin');
            $roleAdminApi->syncPermissions($adminPermissions);
            $roleClientApi->syncPermissions($clientPermission);
            $rolePartnerApi->syncPermissions($clientPermission);
        }
    }
}
