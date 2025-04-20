<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommitteeMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'setting_id',
        'name',
        'position',
        'image',
    ];

    public function setting()
    {
        return $this->belongsTo(Setting::class);
    }
}