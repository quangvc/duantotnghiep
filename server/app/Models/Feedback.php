<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Feedback extends Model
{
    use HasFactory;
    protected $table = 'tbl_feedbacks';

    protected $fillable = [
        'content', 'rating', 'booking_id'
    ];

    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }
    
}
