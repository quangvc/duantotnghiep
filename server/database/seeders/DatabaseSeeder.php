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

        $userAdmin = User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('123456'),
            'gender' => 1,
            'phone_number' => '09' . random_int(10000000, 99999999),
            'active' => 1,
        ]);
        $userManager = User::factory()->create([
            'name' => 'Manager',
            'email' => 'manager@example.com',
            'password' => bcrypt('123456'),
            'gender' => 1,
            'hotel_id' => 1,
            'phone_number' => '09' . random_int(10000000, 99999999),
            'active' => 1,
        ]);
        $userClient = User::factory()->create([
            'name' => 'Client',
            'email' => 'client@example.com',
            'password' => bcrypt('123456'),
            'gender' => 1,
            'phone_number' => '09' . random_int(10000000, 99999999),
            'active' => 1,
        ]);


        $adminRoleApi = Role::create([
            'name' => 'admin',
        ]);
        $managerApi = Role::create([
            'name' => 'manager',
        ]);
        $clientRoleApi = Role::create([
            'name' => 'client',
        ]);

        $adminPermissions = [
            'view_region', 'edit_region', 'add_region', 'delete_region',
            'view_user', 'edit_user', 'add_user', 'delete_user',
            'view_hotel', 'add_hotel', 'edit_hotel', 'show_hotel', 'delete_hotel',
            'view_role', 'add_role', 'edit_role', 'delete_role',
            'view_booking', 'add_booking', 'edit_booking', 'delete_booking',
            'view_booking_detail', 'add_booking_detail', 'edit_booking_detail', 'delete_booking_detail',
            'view_coupon', 'add_coupon', 'edit_coupon', 'delete_coupon',
            'view_room', 'add_room', 'show_room', 'edit_room', 'delete_room',
            'view_blog', 'add_blog', 'edit_blog', 'delete_blog',
            'view_image', 'add_image', 'edit_image', 'delete_image',
            'view_room_type', 'add_room_type', 'edit_room_type', 'delete_room_type',
            'view_support', 'edit_support', 'delete_support',
            'view_comment', 'add_comment', 'delete_comment',
        ];
        $managerPermissions = [
            'view_user', 'add_user',
            'view_hotel', 'edit_hotel',
            'view_booking', 'add_booking', 'edit_booking', 'delete_booking',
            'view_booking_detail', 'add_booking_detail', 'edit_booking_detail', 'delete_booking_detail',
            'view_coupon',
            'view_room', 'add_room', 'show_room', 'edit_room', 'delete_room',
            'view_blog', 'add_blog', 'edit_blog', 'delete_blog',
            'view_image', 'add_image', 'edit_image', 'delete_image',
            'view_room_type', 'add_room_type', 'edit_room_type', 'delete_room_type',
            'view_support', 'edit_support', 'delete_support',
            'view_comment', 'delete_comment',
        ];

        $clientPermission = [
            'edit_user',
            'view_booking',
            'view_booking_detail',
            'view_support',
            'view_comment', 'add_comment',
        ];

        // admin
        foreach ($adminPermissions as $permissionss) {
            $permission = Permission::create([
                'name' => $permissionss,
            ]);
        }

        $userID = [1, 2, 3];
        $roleAdminApi = Role::findByName('admin');
        $roleManagerApi = Role::findByName('manager');
        $roleClientApi = Role::findByName('client');


        foreach ($userID as $userIDS) {
            $userAdmin = User::find(1);
            $userAdmin->assignRole($roleAdminApi, 'admin');
            $roleAdminApi->syncPermissions($adminPermissions);
        }
        foreach ($userID as $userIDS) {
            $userManager = User::find(2);
            $userManager->assignRole($roleManagerApi, 'manager');
            $roleManagerApi->syncPermissions($managerPermissions);
        }
        foreach ($userID as $userIDS) {
            $userClient = User::find(3);
            $userClient->assignRole($roleClientApi, 'client');
            $roleClientApi->syncPermissions($clientPermission);
        }
    }
}
