<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blogs extends Model
{
    use HasFactory;
    protected $table = 'tbl_blogs';

    protected $fillable = [
        'title', 'content', 'user_id'
    ];
}
