<?php

use App\Http\Controllers\API\BlogController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\API\RegionController;
use App\Http\Controllers\API\RoomController;
use App\Http\Controllers\API\RoomTypesController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\API\HotelController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\API\ImageController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\CouponController;


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
Route::post('/send-reset-link', [AuthController::class, 'sentResetLink'])->name('password.reset');

Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::apiResource('users', UserController::class);

Route::prefix('profile')->controller(ProfileController::class)->group(function () {
    Route::put('/change-password',  'changePassword');
});


Route::group(
    ['prefix' => 'hotels'], // Thêm `prefix` để xác định endpoint chung của API
    function () {
        Route::get('/', [HotelController::class, 'index'])->middleware('permission:view_hotel');
        Route::post('/', [HotelController::class, 'store'])->middleware('permission:add_hotel');
        Route::put('/{id}', [HotelController::class, 'update'])->middleware('permission:edit_hotel');
        Route::get('/{id}', [HotelController::class, 'show'])->middleware('permission:show_hotel');
        Route::delete('/{id}', [HotelController::class, 'destroy'])->middleware('permission:delete_hotel');
    }
);
Route::apiResource('users', UserController::class);
Route::group(
    ['prefix' => 'rooms'], // Thêm `prefix` để xác định endpoint chung của API
    function () {
        Route::get('/', [RoomController::class, 'index'])->middleware('permission:view_room');
        Route::post('/', [RoomController::class, 'store'])->middleware('permission:view_room');
        Route::get('/{id}', [RoomController::class, 'show'])->middleware('permission:show_room');
        Route::put('/{id}', [RoomController::class, 'update'])->middleware('permission:edit_room');
        Route::delete('/{id}', [RoomController::class, 'destroy'])->middleware('permission:delete_room');
    }
);

Route::group(
    ['prefix' => 'room-types'], // Thêm `prefix` để xác định endpoint chung của API
    function () {
        Route::get('/', [RoomTypesController::class, 'index']);
        Route::post('/', [RoomTypesController::class, 'store']);
        Route::put('/{id}', [RoomTypesController::class, 'update']);
        Route::get('/{id}', [RoomTypesController::class, 'show']);
        Route::delete('/{id}', [RoomTypesController::class, 'destroy']);
    }
);
Route::group(
    ['prefix' => 'regions'], // Thêm `prefix` để xác định endpoint chung của API
    function () {
        Route::get('/', [RegionController::class, 'index']);
        Route::post('/', [RegionController::class, 'store']);
        Route::put('/{id}', [RegionController::class, 'update']);
        Route::get('/{id}', [RegionController::class, 'show']);
        Route::delete('/{id}', [RegionController::class, 'destroy']);
    }
);
Route::group(
    ['prefix' => 'coupons'], // Thêm `prefix` để xác định endpoint chung của API
    function () {
        Route::get('/', [CouponController::class, 'index'])->middleware('permission:view_coupon');;
        Route::post('/', [CouponController::class, 'store'])->middleware('permission:add_coupon');
        Route::get('/{id}', [CouponController::class, 'show'])->middleware('permission:show_coupon');;
        Route::put('/{id}', [CouponController::class, 'update'])->middleware('permission:edit_coupon');
        Route::delete('/{id}', [CouponController::class, 'destroy'])->middleware('permission:delete_coupon');
    }
);
Route::group(
    ['prefix' => 'comment'], // Thêm `prefix` để xác định endpoint chung của API
    function () {
        Route::get('/', [CommentController::class, 'index']);
        Route::post('/', [CommentController::class, 'store']);
        Route::post('/{id}', [CommentController::class, 'show']);
        Route::put('/{id}', [CommentController::class, 'update']);
        Route::delete('/{id}', [CommentController::class, 'destroy']);
    }
);
Route::group(
    ['prefix' => 'image'], // Thêm `prefix` để xác định endpoint chung của API
    function () {
        Route::get('/', [ImageController::class, 'index']);
        Route::post('/hotel/{id}', [ImageController::class, 'storeHotel']);
        Route::post('/room-type/{id}', [ImageController::class, 'storeRoomType']);
        Route::put('/{id}', [ImageController::class, 'update']);
        Route::delete('/{id}', [ImageController::class, 'destroy']);
    }
);
