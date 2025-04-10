<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    /** @use HasFactory<\Database\Factories\ParticipantFactory> */
    use HasFactory;

    protected $fillable = [
        'team_name',
        'team_captain',
        'team_captain_age',
        'team_captain_address',
        'team_captain_contact_number',
        'team_captain_email'
    ];

    // One-to-many relationship with TeamMember
    public function members()
    {
        return $this->hasMany(TeamMember::class);
    }
}