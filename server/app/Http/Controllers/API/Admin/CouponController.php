<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\Request;
use App\Http\Requests\CouponRequest;
use App\Http\Resources\API\CouponResource;
use App\Traits\MessageStatusAPI;
use Carbon\Carbon;

class CouponController extends Controller
{
    public function index()
    {
        // $coupons = Coupon::where()
        $role = auth()->user()->getRoleNames()->first();

        if ($role == 'admin') {
            $coupon = Coupon::all();
            return CouponResource::collection($coupon);
        }

        $id_hotel = auth()->user()->hotel_id;
        if ($id_hotel != 0 && $role == 'manager') {
            $coupon = Coupon::where('hotel_id', '=', auth()->user()->hotel_id)
                ->get();
            return CouponResource::collection($coupon);
        }
        return MessageStatusAPI::notFound();
    }

    public function store(CouponRequest $request)
    {

        $role = auth()->user()->getRoleNames()->first();
        $validated = $request->validated();
        if ($role == 'admin') {
            $id_hotel = $validated['hotel_id'];
        }
        if ($role == 'manager') {
            $id_hotel = auth()->user()->hotel_id;
        }

        $coupon = Coupon::firstOrCreate([
            'name' =>  "HOTEL" . $id_hotel . '_' . $validated['name'],
            'type' =>  $validated['type'],
            'value' =>  $validated['value'],
            'min' =>  $validated['min'],
            'max' =>  $validated['max'],
            'hotel_id' => $id_hotel,
            'quantity' =>  $validated['quantity'],
            'start_date' =>  $validated['start_date'],
            'end_date' => $validated['end_date'],
        ]);



        $coupon->save();
        return MessageStatusAPI::store();
    }

    public function destroy($id)
    {
        $role = auth()->user()->getRoleNames()->first();
        $coupon = Coupon::find($id);
        if (!$coupon) {
            return MessageStatusAPI::notFound();
        }
        if ($role == 'admin') {
            $coupon->delete();
            return MessageStatusAPI::destroy();
        }
        if ($role == 'manager') {
            $id_hotel = auth()->user()->hotel_id;
            if ($id_hotel == $coupon->hotel_id) {
                $coupon->delete();
                return MessageStatusAPI::destroy();
            } else {
                return MessageStatusAPI::notFound();
            }
        }
    }

    public function update(CouponRequest $request, $id)
    {
        $role = auth()->user()->getRoleNames()->first();
        $validated = $request->validated();
        $coupon = Coupon::find($id);
        if (!$coupon) {
            return MessageStatusAPI::notFound();
        }
        if ($role == 'admin') {
            $id_hotel = $validated['hotel_id'];
        }
        if ($role == 'manager') {
            $id_hotel = auth()->user()->hotel_id;
        }
        $coupon->update([
            'name' =>  "HOTEL" . $id_hotel . '_' . $validated['name'],
            'type' =>  $validated['type'],
            'value' =>  $validated['value'],
            'min' =>  $validated['min'],
            'max' =>  $validated['max'],
            'hotel_id' => $id_hotel,
            'quantity' =>  $validated['quantity'],
            'start_date' =>  $validated['start_date'],
            'end_date' => $validated['end_date']
        ]);
        return MessageStatusAPI::update();
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
