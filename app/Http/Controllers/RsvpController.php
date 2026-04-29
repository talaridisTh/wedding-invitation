<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRsvpRequest;
use App\Mail\RsvpSubmittedMail;
use App\Models\Rsvp;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;

use function Illuminate\Support\defer;

class RsvpController extends Controller
{
    public function store(StoreRsvpRequest $request): RedirectResponse
    {
        $guestName = (string) $request->validated('name');

        $rsvp = Rsvp::create([
            'name' => $guestName,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        $submittedAtDisplay = $rsvp->created_at
            ->locale('el')
            ->translatedFormat('l, d F Y H:i');

        $recipient = (string) config('wedding.rsvp.notification_email');

        defer(fn () => Mail::to($recipient)->send(new RsvpSubmittedMail(
            guestName: $guestName,
            submittedAtDisplay: $submittedAtDisplay,
        )));

        return back()->with('rsvpConfirmation', [
            'name' => $guestName,
        ]);
    }
}
