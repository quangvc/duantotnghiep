<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\Request;
use App\Http\Requests\CouponRequest;
use App\Traits\MessageStatusAPI;

class CouponController extends Controller
{
    public function index()
    {
        $coupons = Coupon::all();

        return response()->json(['data' => $coupons, 'message' => 'Message'], 200);
    }

    public function create(CouponRequest $request)
    {
        $validated = $request->validated();
        $coupon = new Coupon([
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
}
