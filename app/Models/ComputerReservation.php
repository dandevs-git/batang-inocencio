<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComputerReservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'pc_number',
        'reservation_date',
        'time_range',
        'name',
        'address',
        'email',
        'contact',
        'reservation_code',
        // 'status'
    ];
}