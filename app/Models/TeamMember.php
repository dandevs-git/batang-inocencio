<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    use HasFactory;

    protected $table = 'team_members'; // Explicitly defining the table name (optional)

    // Fillable properties for mass assignment
    protected $fillable = [
        'team_id',
        'name',
        'age',
        'contact'
    ];

    // Relationship with the Team model
    public function team()
    {
        return $this->belongsTo(Team::class);
    }
}