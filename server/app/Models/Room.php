<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Room extends Model
{
    use HasFactory;
    protected $table = 'tbl_rooms';

    protected $fillable = [
        'hotel_id', 'room_type_id', 'room_number', 'status'
    ];

    public function booking_details(): HasMany
    {
        return $this->hasMany(BookingDetail::class);
    }

    public function hotel(): BelongsTo
    {
        return $this->belongsTo(Hotel::class);
    }

    public function room_type(): BelongsTo
    {
        return $this->belongsTo(RoomType::class);
    }

}
