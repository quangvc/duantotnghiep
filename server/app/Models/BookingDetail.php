<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BookingDetail extends Model

{
    use HasFactory;
    protected $table = 'tbl_booking_details';

    protected $fillable = [
        'booking_id', 'room_type_id',  'room_id'
    ];

    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }

    // public function room(): BelongsTo
    // {
    //     return $this->belongsTo(Room::class);
    // }
    public function room_type(): BelongsTo
    {
        return $this->belongsTo(RoomType::class);
    }
}
