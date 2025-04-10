<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    /** @use HasFactory<\Database\Factories\AnnouncementFactory> */
    use HasFactory;


    // Define which attributes are mass assignable
    protected $fillable = [
        'title',
        'description',
        'image',
        'status',  // draft, published
    ];


    protected $casts = [
        'status' => 'string',
    ];

    protected $attributes = [
        'status' => 'draft',
    ];

    public function getFormattedCreatedAtAttribute()
    {
        return $this->created_at->format('M d, Y');  // Example format
    }

    public function getFormattedUpdatedAtAttribute()
    {
        return $this->created_at->format('M d, Y');  // Example format
    }
}