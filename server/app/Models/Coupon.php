<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Coupon extends Model
{
    use HasFactory;
    protected $table = 'tbl_coupons';

    protected $fillable = [
    'name','type','value','min','max','hotel_id','quantity','dateStart','dateEnd'
    ];

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }
    public function hotel(): BelongsTo
    {
        return $this->belongsTo(Hotel::class);
    }
}