<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Coupon extends Model
{
    use HasFactory;
    protected $table = 'tbl_coupons';

    protected $fillable = [
    'name','type','value','min','max'
    ];

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

}