<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $table = 'events';

    protected $fillable = [
        'title',
        'date',
        'location',
        'event_organizer',
        'registration_start_date',
        'registration_end_date',
        'event_type',
        'requirements',
        'description',
        'time',
        'contact_number',
        'number_of_participants',
        'image',
        'status',
    ];

    protected $dates = [
        'date',
        'registration_start_date',
        'registration_end_date'
    ];
}