<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Booking extends Model
{
    use HasFactory;
    protected $table = 'tbl_bookings';

    protected $fillable = [
        'booking_number', 'booking_date', 'checkin_date',
        'checkout_date', 'people_quantity', 'coupon_id', 'user_id',
        'guest_name', 'guest_email', 'guest_phone', 'note',
        'comment_id', 'status'
    ];

    public function booking_details(): HasMany
    {
        return $this->hasMany(BookingDetail::class);
    }
    public function booking_detail(): HasManyThrough
    {
        return $this->hasManyThrough(BookingDetail::class, Room::class);
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
