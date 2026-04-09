<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class RsvpSubmittedMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $guestName,
        public string $submittedAtDisplay,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Νέα επιβεβαίωση παρουσίας: {$this->guestName}",
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.rsvp-submitted',
            with: [
                'guestName' => $this->guestName,
                'submittedAtDisplay' => $this->submittedAtDisplay,
            ],
        );
    }

    /**
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
