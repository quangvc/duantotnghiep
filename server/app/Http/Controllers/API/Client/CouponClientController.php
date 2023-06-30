<?php

namespace App\Http\Controllers\API\Client;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\Request;
use App\Http\Requests\CouponRequest;
use App\Http\Resources\API\CouponResource;
use App\Traits\MessageStatusAPI;
use Carbon\Carbon;

class CouponClientController extends Controller
{
    public function index()
    {
        $counpon = Coupon::all();
        return CouponResource::collection($counpon);
    }
    public function show($id)
    {
        $couponDetail = Coupon::find($id);
        if (!$couponDetail) {
            return MessageStatusAPI::notFound();
        }
        return MessageStatusAPI::show(new CouponResource($couponDetail));
    }
}
