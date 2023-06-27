<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Hotel extends Model
{
    use HasFactory;
    protected $table = 'tbl_hotels';

    protected $fillable = [
        'hotel_name', 'hotel_phone', 'hotel_address', 'description', 'star_rating', 'region_id', 'status'
    ];

    public function rooms(): HasMany
    {
        return $this->hasMany(Room::class);
    }
    public function booking(): HasMany
    {
        return $this->hasMany(Booking::class);
    }
    public function images(): HasMany
    {
        return $this->hasMany(Image::class);
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function region(): BelongsTo
    {
        return $this->belongsTo(Region::class);
    }

    public function coupons(): HasMany
    {
        return $this->hasMany(Coupon::class);
    }
}
