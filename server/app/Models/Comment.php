<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Comment extends Model
{
    use HasFactory;
    protected $table = 'tbl_comment';

    protected $fillable = [
        'content', 'rating'
    ];

    public function booking(): HasOne
    {
        return $this->hasOne(Booking::class);
    }

}
