<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomTypes extends Model
{
    use HasFactory;
    protected $table = 'tbl_room_types';

    protected $fillable = [
        'name', 'price_per_night', 'capacity', 'description', 'created_at', 'updated_at'
    ];
}
