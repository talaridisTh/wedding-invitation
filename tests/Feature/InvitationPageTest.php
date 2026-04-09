<?php

use Inertia\Testing\AssertableInertia;

it('renders the invitation page with wedding data', function () {
    $response = $this->get('/');

    $response->assertOk();
    $response->assertInertia(fn (AssertableInertia $page) => $page
        ->component('invitation')
        ->has('wedding')
        ->where('wedding.bride', config('wedding.bride'))
        ->where('wedding.groom', config('wedding.groom'))
        ->has('wedding.church')
        ->has('wedding.reception')
        ->has('wedding.menu')
        ->has('wedding.dress_code')
        ->has('wedding.rsvp')
        ->has('wedding.messages')
        ->has('wedding.timeline', 3)
        ->has('wedding.faq', 3)
    );
});
