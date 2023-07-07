<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    use HasFactory;
    protected $table = 'tbl_banners';

    protected $fillable = [
        'image', 'created_at', 'updated_at'
    ];
}
