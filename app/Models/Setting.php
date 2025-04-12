<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $table = 'website_information';

    protected $fillable = [
        'logo',
        'website_name',
        'address',
        'phone_number',
        'email',
        'mission',
        'vision',
        'committee_member_name',
        'committee_member_position',
        'committee_member_image',
    ];
}