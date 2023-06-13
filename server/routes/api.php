<?php

use App\Http\Controllers\API\BookingController;

use App\Http\Controllers\API\BlogController;
use App\Http\Controllers\Api\CommentController;

use App\Http\Controllers\API\RegionController;
use App\Http\Controllers\API\RoomController;
use App\Http\Controllers\API\RoomTypesController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\API\HotelController;

use App\Http\Controllers\API\CouponController;


use App\Http\Controllers\API\UserController;
use App\Models\Room;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/send-reset-link', [AuthController::class, 'sentResetLink']);

Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);



Route::group(
    ['prefix' => 'hotels'], // Thêm `prefix` để xác định endpoint chung của API
    function () {
        Route::get('/', [HotelController::class, 'index'])->middleware('permission:view_hotel');
        Route::post('/create', [HotelController::class, 'create'])->middleware('permission:add_hotel');
        Route::put('/update/{id}', [HotelController::class, 'update'])->middleware('permission:edit_hotel');
        Route::post('/detail/{id}', [HotelController::class, 'detail'])->middleware('permission:show_hotel');
        Route::delete('/destroy/{id}', [HotelController::class, 'destroy'])->middleware('permission:delete_hotel');
    }
);
Route::apiResource('users', UserController::class);
Route::group(
    ['prefix' => 'rooms'], // Thêm `prefix` để xác định endpoint chung của API
    function () {
        Route::get('/', [RoomController::class, 'index'])->middleware('permission:view_room');
        Route::post('/create', [RoomController::class, 'create'])->middleware('permission:view_room');
        Route::post('/detail/{id}', [RoomController::class, 'detail'])->middleware('permission:show_room');
        Route::put('/update/{id}', [RoomController::class, 'update'])->middleware('permission:edit_room');
        Route::delete('/destroy/{id}', [RoomController::class, 'destroy'])->middleware('permission:delete_room');
    }
);

Route::group(
    ['prefix' => 'room-types'], // Thêm `prefix` để xác định endpoint chung của API
    function () {
        Route::get('/', [RoomTypesController::class, 'index']);
        Route::post('/create', [RoomTypesController::class, 'create']);
        Route::put('/update/{id}', [RoomTypesController::class, 'update']);
        Route::delete('/destroy/{id}', [RoomTypesController::class, 'destroy']);
    }
);
Route::group(
    ['prefix' => 'regions'], // Thêm `prefix` để xác định endpoint chung của API
    function () {
        Route::get('/', [RegionController::class, 'index']);
        Route::post('/create', [RegionController::class, 'create']);
        Route::put('/update/{id}', [RegionController::class, 'update']);
        Route::delete('/destroy/{id}', [RegionController::class, 'destroy']);
    }
);
Route::group(
    ['prefix' => 'coupons'], // Thêm `prefix` để xác định endpoint chung của API
    function () {
        Route::get('/', [CouponController::class, 'index']);
        Route::post('/create', [CouponController::class, 'create']);
        Route::put('/update/{id}', [CouponController::class, 'update']);
        Route::delete('/destroy/{id}', [CouponController::class, 'destroy']);
    }
);
Route::group(
    ['prefix' => 'bookings'], // Thêm `prefix` để xác định endpoint chung của API
    function () {
        Route::get('/', [BookingController::class, 'index']);
        Route::post('/create', [BookingController::class, 'create']);
        Route::put('/update/{id}', [BookingController::class, 'update']);
        Route::delete('/destroy/{id}', [BookingController::class, 'destroy']);
    }
);
