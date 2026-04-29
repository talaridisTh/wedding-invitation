<?php

use App\Mail\RsvpSubmittedMail;
use App\Models\Rsvp;
use Illuminate\Support\Facades\Mail;

beforeEach(function (): void {
    Mail::fake();
    config()->set('wedding.rsvp.notification_email', 'foteinipsaria@gmail.com');
});

it('stores the RSVP in the database and sends the notification email', function () {
    $this->withoutDefer();

    $response = $this->from('/')->post('/rsvp', [
        'name' => 'Γιώργος Παπαδόπουλος',
    ]);

    $response->assertRedirect('/');
    $response->assertSessionHas('rsvpConfirmation.name', 'Γιώργος Παπαδόπουλος');

    expect(Rsvp::query()->count())->toBe(1);
    expect(Rsvp::query()->first())
        ->name->toBe('Γιώργος Παπαδόπουλος');

    Mail::assertSent(RsvpSubmittedMail::class, function (RsvpSubmittedMail $mail) {
        return $mail->hasTo('foteinipsaria@gmail.com')
            && $mail->guestName === 'Γιώργος Παπαδόπουλος';
    });
});

it('uses Laravel deferred functions to send the mail off the request path', function () {
    $controllerSource = file_get_contents(app_path('Http/Controllers/RsvpController.php'));

    expect($controllerSource)
        ->toContain('use function Illuminate\\Support\\defer;')
        ->toContain('defer(fn');
});

it('rejects submissions without a name', function () {
    $this->withoutDefer();

    $response = $this->from('/')->post('/rsvp', [
        'name' => '',
    ]);

    $response->assertRedirect('/');
    $response->assertSessionHasErrors('name');

    expect(Rsvp::query()->count())->toBe(0);
    Mail::assertNothingSent();
});

it('rejects submissions with a name shorter than 2 characters', function () {
    $this->withoutDefer();

    $response = $this->from('/')->post('/rsvp', [
        'name' => 'A',
    ]);

    $response->assertSessionHasErrors('name');

    expect(Rsvp::query()->count())->toBe(0);
    Mail::assertNothingSent();
});

it('rejects submissions with a name longer than 120 characters', function () {
    $this->withoutDefer();

    $response = $this->from('/')->post('/rsvp', [
        'name' => str_repeat('α', 121),
    ]);

    $response->assertSessionHasErrors('name');

    expect(Rsvp::query()->count())->toBe(0);
    Mail::assertNothingSent();
});

it('captures ip address and user agent on the RSVP record', function () {
    $this->withoutDefer();

    $this->from('/')
        ->withServerVariables(['REMOTE_ADDR' => '203.0.113.42'])
        ->withHeaders(['User-Agent' => 'PestTestAgent/1.0'])
        ->post('/rsvp', ['name' => 'Άννα Ιωάννου']);

    $rsvp = Rsvp::query()->firstOrFail();

    expect($rsvp->ip_address)->toBe('203.0.113.42');
    expect($rsvp->user_agent)->toBe('PestTestAgent/1.0');
});
