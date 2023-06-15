<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\Request;
use App\Http\Requests\CouponRequest;
use App\Http\Resources\API\CouponsResource;
use App\Traits\MessageStatusAPI;

class CouponController extends Controller
{
    public function index()
    {
        // $coupons = Coupon::where()
        
        return auth()->user();
    }

    public function store(CouponRequest $request)
    {
        $validated = $request->validated();
        $coupon = Coupon::firstOrCreate([
            'name' =>  $validated['name'],
            'type' =>  $validated['type'],
            'value' =>  $validated['value'],
            'min' =>  $validated['min'],
            'max' =>  $validated['max'],
        ]);
        $coupon->save();
        return MessageStatusAPI::store();
    }

    public function destroy($id)
    {
        $coupon = Coupon::find($id);

        if ($coupon) {
            $coupon->delete();
            return MessageStatusAPI::destroy();
        } else {
            return MessageStatusAPI::notFound();
        }
    }

    public function update(CouponRequest $request, $id)
    {
        $validated = $request->validated();
        $coupon = Coupon::findOrFail($id);
        if (!$coupon) {
            return MessageStatusAPI::displayInvalidInput($coupon);
        }
        $coupon->update([
            'name' =>  $validated['name'],
            'type' =>  $validated['type'],
            'value' =>  $validated['value'],
            'min' =>  $validated['min'],
            'max' =>  $validated['max'],
        ]);
        return MessageStatusAPI::update();
    }

    public function show($id)
    {
        $couponDetail = Coupon::join('tbl_hotels', 'tbl_coupons.hotel_id', '=', 'tbl_hotels.id')
            ->select('tbl_coupons.*', 'tbl_hotels.hotel_name as hotel_name')
            ->where('tbl_coupons.id', $id)
            ->first();
        if (!$couponDetail) {
            return MessageStatusAPI::notFound();
        }
        return MessageStatusAPI::show($couponDetail);
    }
}
