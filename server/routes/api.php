<?php

use App\Http\Controllers\API\RegionController;
use App\Http\Controllers\API\RoomController;
use App\Http\Controllers\API\RoomTypesController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\API\HotelController;
use App\Http\Controllers\ProfileController;


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

Route::group(['prefix' => 'users', 'controller' => UserController::class], function () {
    Route::get('/', 'index');
    Route::get('/{user}', 'show');
    Route::post('/', 'store');
    Route::put('/{user}', 'update');
    Route::delete('/{user}', 'destroy');
});


Route::group(
    ['prefix' => 'hotels'], // Thêm `prefix` để xác định endpoint chung của API
    function () {
        Route::get('/', [HotelController::class, 'index'])->middleware('permission:view_hotel');
        Route::post('/create', [HotelController::class, 'create'])->middleware('permission:add_hotel');
        Route::put('/update/{id}', [HotelController::class, 'update']);
        Route::post('/detail/{id}', [HotelController::class, 'detail']);
        Route::delete('/destroy/{id}', [HotelController::class, 'destroy']);
    }
);

Route::group(
    ['prefix' => 'rooms'], // Thêm `prefix` để xác định endpoint chung của API
    function () {
        Route::get('/', [RoomController::class, 'index']);
        Route::post('/create', [RoomController::class, 'create']);
        Route::put('/update/{id}', [RoomController::class, 'update']);
        Route::delete('/destroy/{id}', [RoomController::class, 'destroy']);
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
