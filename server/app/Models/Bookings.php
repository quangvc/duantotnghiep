<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bookings extends Model
{
    use HasFactory;
    protected $table = 'tbl_bookings';

    protected $fillable = [
        'booking_date','checkin_date','checkout_date','people_quantity','coupon_id','user_id','guest_name','guest_email','guest_phone','note','comment_id','status','created_at','updated_at'
    ];
}