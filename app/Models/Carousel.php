<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Carousel extends Model
{
    /** @use HasFactory<\Database\Factories\CarouselFactory> */
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['image', 'title', 'description', 'page'];
}