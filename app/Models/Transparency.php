<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transparency extends Model
{
    /** @use HasFactory<\Database\Factories\TransparencyFactory> */
    use HasFactory;

    protected $fillable = ['name'];


    public function files()
    {
        return $this->hasMany(TransparencyFile::class);
    }
}
