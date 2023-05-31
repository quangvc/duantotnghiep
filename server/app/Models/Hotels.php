<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hotels extends Model
{
    use HasFactory;
    protected $table = 'tbl_hotels';

    protected $fillable = [
        'hotel_name', 'hotel_phone', 'hotel_address', 'description', 'star_rating',
        'region_id', 'status', 'created_at', 'updated_at'
    ];
}
