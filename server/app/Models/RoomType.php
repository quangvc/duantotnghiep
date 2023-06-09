<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RoomType extends Model
{
    use HasFactory;
    protected $table = 'tbl_room_types';

    protected $fillable = [
        'name', 'hotel_id', 'price_per_night', 'capacity', 'description'
    ];

    public function hotel(): BelongsTo
    {
        return $this->belongsTo(Hotel::class);
    }
    public function images(): HasMany
    {
        return $this->hasMany(Image::class);
    }

    public function rooms(): HasMany
    {
        return $this->hasMany(Room::class);
    }
    public function booking_details(): HasMany
    {
        return $this->hasMany(BookingDetail::class);
    }
}
