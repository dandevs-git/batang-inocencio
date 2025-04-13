<?php

use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarouselController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ParticipantController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\TeamMemberController;
use App\Http\Controllers\TransparencyController;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login'])->name('auth.login');
Route::apiResource('members', MemberController::class);
Route::apiResource('news', NewsController::class);
Route::apiResource('announcements', AnnouncementController::class);
Route::apiResource('transparency', TransparencyController::class);

Route::apiResource('participants', ParticipantController::class);
Route::apiResource('teams', TeamController::class);
Route::apiResource('team-members', TeamMemberController::class);
Route::apiResource('events', EventController::class);
Route::apiResource('settings', SettingController::class);
Route::apiResource('carousel', CarouselController::class);

Route::post('transparency/{categoryId}/upload', [TransparencyController::class, 'uploadFile'])->name('transparency.uploadFile');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('logout', [AuthController::class, 'logout'])->name('auth.logout');
});