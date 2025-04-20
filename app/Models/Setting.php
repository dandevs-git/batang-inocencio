<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = [
        'logo',
        'website_name',
        'address',
        'phone_number',
        'email',
        'mission',
        'vision',
    ];

    public function committeeMembers()
    {
        return $this->hasMany(CommitteeMember::class);
    }

    public function carousels()
    {
        return $this->hasMany(Carousel::class);
    }
}