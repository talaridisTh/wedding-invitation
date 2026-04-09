<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRsvpRequest;
use App\Mail\RsvpSubmittedMail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;

class RsvpController extends Controller
{
    public function store(StoreRsvpRequest $request): RedirectResponse
    {
        $guestName = (string) $request->validated('name');
        $submittedAtDisplay = Carbon::now()->locale('el')->translatedFormat('l, d F Y H:i');

        Mail::to(config('wedding.rsvp.notification_email'))
            ->send(new RsvpSubmittedMail(
                guestName: $guestName,
                submittedAtDisplay: $submittedAtDisplay,
            ));

        return back()->with('rsvpConfirmation', [
            'name' => $guestName,
        ]);
    }
}
