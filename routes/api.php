<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
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

Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
Route::post('/upload-file',[AuthController::class,'uploadFile']);


Route::middleware('auth:sanctum')->get( function (Request $request) {
   Route::post('/logout', [AuthController::class, 'logout']);
   Route::post('/profile', [AuthController::class, 'profile']);
   Route::post('/update-profile', [AuthController::class, 'updateProfile']);
});
