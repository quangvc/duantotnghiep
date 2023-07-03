<?php

use App\Http\Controllers\API\Admin\BlogController;
use App\Http\Controllers\API\Admin\BookingController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\API\Admin\RegionController;
use App\Http\Controllers\API\Admin\RoomController;
use App\Http\Controllers\API\Admin\RoomTypesController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\API\Admin\HotelController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\API\Admin\ImageController;
use App\Http\Controllers\API\Admin\SupportController;

use App\Http\Controllers\API\Admin\UserController;
use App\Models\Hotel;
use App\Http\Controllers\API\Admin\CouponController;
use App\Http\Controllers\API\Admin\FeedbackController;
use App\Http\Controllers\API\Admin\BannerController;
use App\Http\Controllers\API\Client\BlogClientController;
use App\Http\Controllers\API\Client\BookingClientController;
use App\Http\Controllers\API\Client\CouponClientController;
use App\Http\Controllers\API\Client\FeedbackClientController;
use App\Http\Controllers\API\Client\HotelClientController;
use App\Http\Controllers\API\Client\ImageClientController;
use App\Http\Controllers\API\Client\RegionClientController;
use App\Http\Controllers\API\Client\RoomClientController;
use App\Http\Controllers\API\Client\RoomTypesClientController;
use App\Http\Controllers\API\Client\UserClientController;
use App\Http\Controllers\Api\CommentClientController;

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

Route::prefix('profile')->controller(ProfileController::class)->group(function () {
    Route::put('/change-password', 'changePassword');
});


Route::group(['prefix' => 'admin'], function () {
    Route::group(['prefix' => 'users', 'controller' => UserController::class], function () {
        Route::get('/', 'index');
        Route::get('/{user}', 'show');
        Route::post('/', 'store');
        Route::post('/{user}', 'update');
        Route::delete('/{user}', 'destroy');
        Route::put('/{id}/change-status', 'changeStatus');
    });

    Route::group(
        ['prefix' => 'hotels', 'controller' => HotelController::class],
        function () {
            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::put('/changeStatus/{id}', 'changeStatus');
            Route::put('/{id}', 'update');
            Route::get('/{id}', 'show');
            Route::delete('/{id}', 'destroy');
        }
    );

    Route::group(
        ['prefix' => 'rooms', 'controller' => RoomController::class],
        function () {
            Route::get('/', 'index')->middleware('permission:view_room');
            Route::post('/', 'store')->middleware('permission:view_room');
            Route::get('/{id}', 'show')->middleware('permission:show_room');
            Route::put('/{id}', 'update')->middleware('permission:edit_room');
            Route::delete('/{id}', 'destroy')->middleware('permission:delete_room');
        }
    );

    Route::group(
        ['prefix' => 'room-types', 'controller' => RoomTypesController::class],
        function () {
            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::put('/{id}', 'update');
            Route::get('/{id}', 'show');
            Route::delete('/{id}', 'destroy');
        }
    );

    Route::group(
        ['prefix' => 'regions', 'controller' => RegionController::class],
        function () {
            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::put('/{id}', 'update');
            Route::get('/{id}', 'show');
            Route::delete('/{id}', 'destroy');
        }
    );
    Route::group(
        ['prefix' => 'coupons', 'controller' => CouponController::class],
        function () {
            Route::get('/', 'index')->middleware('permission:view_coupon');;
            Route::post('/', 'store')->middleware('permission:add_coupon');
            Route::get('/{id}', 'show')->middleware('permission:show_coupon');;
            Route::put('/{id}', 'update')->middleware('permission:edit_coupon');
            Route::delete('/{id}', 'destroy')->middleware('permission:delete_coupon');
        }
    );
    Route::group(
        ['prefix' => 'feedback', 'controller' => FeedbackController::class],
        function () {
            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::get('/{id}', 'show');
            Route::put('/{id}', 'update');
            Route::delete('/{id}', 'destroy');
        }
    );
    Route::group(
        ['prefix' => 'image', 'controller' => ImageController::class],
        function () {
            Route::get('/', 'index');
            Route::post('/hotel/{id}', 'storeHotel');
            Route::post('/room-type/{id}', 'storeRoomType');
            Route::put('/{id}', 'update');
            Route::delete('/{id}', 'destroy');
        }
    );
    Route::group(
        ['prefix' => 'bookings', 'controller' => BookingController::class], // Thêm `prefix` để xác định endpoint chung của API
        function () {
            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::get('/{id}', 'show');
            Route::post('/{id}/confirm-booking', 'confirmBooking');
        }
    );
    Route::group(
        ['prefix' => 'blogs', 'controller' => BlogController::class],
        function () {
            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::get('/{slug}', 'show');
            Route::put('/{id}', 'update');
            Route::delete('/{id}', 'destroy');
        }
    );
    Route::group(
        ['prefix' => 'comments', 'controller' => CommentController::class],
        function () {
            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::get('/{id}', 'show');
            Route::put('/{id}', 'update');
            Route::delete('/{id}', 'destroy');
        }
    );
    Route::group(
        ['prefix' => 'banners', 'controller' => BannerController::class],
        function () {
            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::delete('/{id}', 'destroy');
        }
    );
});
Route::group(['prefix' => 'client'], function () {
    Route::group(['prefix' => 'users', 'controller' => UserClientController::class], function () {
        Route::get('/', 'index');
        Route::get('/{user}', 'show');
        Route::post('/', 'store');
        Route::post('/{user}', 'update');
        Route::delete('/{user}', 'destroy');
        Route::put('/{id}/change-status', 'changeStatus');
    });

    Route::group(
        ['prefix' => 'hotels', 'controller' => HotelClientController::class],
        function () {
            Route::get('/', 'index')->middleware('permission:view_hotel');
            Route::post('/', 'store')->middleware('permission:add_hotel');
            Route::put('/changeStatus/{id}', 'changeStatus');
            Route::put('/{id}', 'update')->middleware('permission:edit_hotel');
            Route::get('/{id}', 'show')->middleware('permission:show_hotel');
            Route::delete('/{id}', 'destroy')->middleware('permission:delete_hotel');
        }
    );

    Route::group(
        ['prefix' => 'rooms', 'controller' => RoomClientController::class],
        function () {
            Route::get('/', 'index')->middleware('permission:view_room');
            Route::post('/', 'store')->middleware('permission:view_room');
            Route::get('/{id}', 'show')->middleware('permission:show_room');
            Route::put('/{id}', 'update')->middleware('permission:edit_room');
            Route::delete('/{id}', 'destroy')->middleware('permission:delete_room');
        }
    );

    Route::group(
        ['prefix' => 'room-types', 'controller' => RoomTypesClientController::class],
        function () {
            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::put('/{id}', 'update');
            Route::get('/{id}', 'show');
            Route::delete('/{id}', 'destroy');
        }
    );

    Route::group(
        ['prefix' => 'regions', 'controller' => RegionClientController::class],
        function () {
            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::put('/{id}', 'update');
            Route::get('/{id}', 'show');
            Route::delete('/{id}', 'destroy');
        }
    );
    Route::group(
        ['prefix' => 'coupons', 'controller' => CouponClientController::class],
        function () {
            Route::get('/', 'index')->middleware('permission:view_coupon');;
            Route::post('/', 'store')->middleware('permission:add_coupon');
            Route::get('/{id}', 'show')->middleware('permission:show_coupon');;
            Route::put('/{id}', 'update')->middleware('permission:edit_coupon');
            Route::delete('/{id}', 'destroy')->middleware('permission:delete_coupon');
        }
    );
    Route::group(
        ['prefix' => 'feedback', 'controller' => FeedbackClientController::class],
        function () {
            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::get('/{id}', 'show');
            Route::put('/{id}', 'update');
            Route::delete('/{id}', 'destroy');
        }
    );
    Route::group(
        ['prefix' => 'image', 'controller' => ImageClientController::class],
        function () {
            Route::get('/', 'index');
            Route::post('/hotel/{id}', 'storeHotel');
            Route::post('/room-type/{id}', 'storeRoomType');
            Route::put('/{id}', 'update');
            Route::delete('/{id}', 'destroy');
        }
    );
    Route::group(
        ['prefix' => 'bookings', 'controller' => BookingClientController::class], // Thêm `prefix` để xác định endpoint chung của API
        function () {
            Route::get('/', 'index');
            Route::post('/', 'store');
        }
    );
    Route::group(
        ['prefix' => 'blogs', 'controller' => BlogClientController::class],
        function () {
            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::get('/{slug}', 'show');
            Route::put('/{id}', 'update');
            Route::delete('/{id}', 'destroy');
        }
    );
    Route::group(
        ['prefix' => 'comments', 'controller' => CommentClientController::class],
        function () {
            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::get('/{id}', 'show');
            Route::put('/{id}', 'update');
            Route::delete('/{id}', 'destroy');
        }
    );
});
