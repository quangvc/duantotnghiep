<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingDetail extends Model
{
    use HasFactory;
    protected $table = 'tbl_booking_detail';

    protected $fillable = [
        'booking_id', 'room_id'
    ];
}
