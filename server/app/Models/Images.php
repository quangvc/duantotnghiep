<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Images extends Model
{
    use HasFactory;
    protected $table = 'tbl_images';

    protected $fillable = [
        'hotel_name', 'hotel_phone', 'hotel_address', 'description', 'star_rating', 'region_id', 'status'
    ];
}
