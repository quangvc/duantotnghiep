<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rooms extends Model
{
    use HasFactory;
    protected $table = 'tbl_rooms';

    protected $fillable = [
        'hotel_id', 'room_type_id', 'room_number', 'status'
    ];
}
