<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Feedback extends Model
{
    use HasFactory;
    protected $table = 'tbl_feedback';

    protected $fillable = [
        'content', 'rating', 'booking_id'
    ];

    public function booking(): HasOne
    {
        return $this->hasOne(Booking::class);
    }
}
