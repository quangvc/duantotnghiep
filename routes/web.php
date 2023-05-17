<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
})->name('welcome');

Route::get('/login', function () {
    return view('auth.login');
})->name('login');

Route::post('/signin', [AuthController::class, 'authenticate'])->name('signin');
Route::get('/logout', [AuthController::class, 'logout'])->name('logout');

Route::get('/signup', function () {
    return view('auth.signup');
});
Route::post('/signup', [AuthController::class, 'signup'])->name('signup');

Route::get('/forgot-pass', [AuthController::class, 'forgotPass'])->name('forgot-pass');
Route::post('/forgot-password', [AuthController::class, 'sentResetLink'])->name('sentResetLink');

Route::get('/reset-password/{token}', function (string $token) {
    return view('auth.reset-password', ['token' => $token]);
})->name('password.reset');

Route::post('/reset-password', [AuthController::class, 'updatepass'])->name('password.update');