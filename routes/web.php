<?php

use App\Http\Controllers\InvitationController;
use App\Http\Controllers\RsvpController;
use Illuminate\Support\Facades\Route;

Route::get('/', InvitationController::class)->name('home');
Route::post('/rsvp', [RsvpController::class, 'store'])->name('rsvp.store');
