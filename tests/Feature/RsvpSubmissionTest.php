<?php

use App\Mail\RsvpSubmittedMail;
use Illuminate\Support\Facades\Mail;

beforeEach(function (): void {
    Mail::fake();
    config()->set('wedding.rsvp.notification_email', 'rsvp@test.local');
});

it('sends an email when a guest submits a valid RSVP', function () {
    $response = $this->from('/')->post('/rsvp', [
        'name' => 'Γιώργος Παπαδόπουλος',
    ]);

    $response->assertRedirect('/');
    $response->assertSessionHas('rsvpConfirmation.name', 'Γιώργος Παπαδόπουλος');

    Mail::assertSent(RsvpSubmittedMail::class, function (RsvpSubmittedMail $mail) {
        return $mail->hasTo('rsvp@test.local')
            && $mail->guestName === 'Γιώργος Παπαδόπουλος';
    });
});

it('rejects submissions without a name', function () {
    $response = $this->from('/')->post('/rsvp', [
        'name' => '',
    ]);

    $response->assertRedirect('/');
    $response->assertSessionHasErrors('name');

    Mail::assertNothingSent();
});

it('rejects submissions with a name shorter than 2 characters', function () {
    $response = $this->from('/')->post('/rsvp', [
        'name' => 'A',
    ]);

    $response->assertSessionHasErrors('name');

    Mail::assertNothingSent();
});

it('rejects submissions with a name longer than 120 characters', function () {
    $response = $this->from('/')->post('/rsvp', [
        'name' => str_repeat('α', 121),
    ]);

    $response->assertSessionHasErrors('name');

    Mail::assertNothingSent();
});
