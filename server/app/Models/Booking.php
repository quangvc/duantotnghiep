<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Booking extends Model
{
    use HasFactory;
    protected $table = 'tbl_bookings';

    protected $fillable = [
        'checkout_date', 'checkin_date', 'hotel_id', 'booking_number', 'people_quantity', 'coupon_id', 'user_id',
        'guest_name', 'guest_email', 'guest_phone', 'note',
        'comment_id', 'status'
    ];
    public function hotel(): BelongsTo
    {
        return $this->belongsTo(Hotel::class);
    }
    public function booking_details(): HasMany
    {
        return $this->hasMany(BookingDetail::class);
    }
    public function booking_detail_roomtype(): BelongsToMany
    {
        return $this->belongsToMany(RoomType::class, 'tbl_booking_detail');
    }
    public function booking_detail_room(): BelongsToMany
    {
        return $this->belongsToMany(Room::class, 'tbl_booking_detail');
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function coupon(): BelongsTo
    {
        return $this->belongsTo(Coupon::class);
    }
}
