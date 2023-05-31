<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Support extends Model
{
    use HasFactory;
    protected $table = 'tbl_support';

    protected $fillable = [
        'name', 'email', 'phone', 'content', 'status', 'created_at', 'updated_at'

    ];
}
