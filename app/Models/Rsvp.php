<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rsvp extends Model
{
    use HasFactory;

    /** @var list<string> */
    protected $fillable = [
        'name',
        'ip_address',
        'user_agent',
    ];
}
