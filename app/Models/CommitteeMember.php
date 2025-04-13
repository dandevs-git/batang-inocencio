<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommitteeMember extends Model
{
    use HasFactory;

    protected $fillable = ['website_information_id', 'name', 'position', 'image'];

    public function websiteInformation()
    {
        return $this->belongsTo(Setting::class, 'website_information_id');
    }
}