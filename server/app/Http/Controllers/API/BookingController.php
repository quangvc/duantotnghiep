<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\BookingRequest;
use App\Models\Booking;
use Illuminate\Http\Request;
use App\Traits\MessageStatusAPI;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::all();
        // $regions = DB::table('tbl_regions')
        //             ->join('tbl_hotels')

        return response()->json(['data' => $bookings, 'message' => 'Message'], 200);
    }

    public function create(BookingRequest $request)
    {
        $validated = $request->validated();
        $booking = new Booking([
            'booking_date' =>  $validated['booking_date'],
            'checkin_date' =>  $validated['checkin_date'],
            'checkout_date' =>  $validated['checkout_date'],
            'people_quantity' =>  $validated['people_quantity'],
            'coupon_id' =>  $validated['coupon_id'],
            'user_id' =>  $validated['user_id'],
            'guest_name' =>  $validated['guest_name'],
            'guest_email' =>  $validated['guest_email'],
            'guest_phone' =>  $validated['guest_phone'],
            'note' =>  $validated['note'],
            'comment_id' =>  $validated['comment_id'],
            'status' =>  $validated['status'],
        ]);
        $booking->save();
        return MessageStatusAPI::store();
    }

    public function destroy($id)
    {
        $booking = Booking::find($id);

        if ($booking) {
            $booking->delete();
            return MessageStatusAPI::destroy();
        } else {
            return MessageStatusAPI::notFound();
        }
    }

    public function update(BookingRequest $request, $id)
    {
        $validated = $request->validated();
        $booking = Booking::findOrFail($id);
        if (!$booking) {
            return MessageStatusAPI::displayInvalidInput($booking);
        }
        $booking->update([
            'booking_date' =>  $validated['booking_date'],
            'checkin_date' =>  $validated['checkin_date'],
            'checkout_date' =>  $validated['checkout_date'],
            'people_quantity' =>  $validated['people_quantity'],
            'coupon_id' =>  $validated['coupon_id'],
            'user_id' =>  $validated['user_id'],
            'guest_name' =>  $validated['guest_name'],
            'guest_email' =>  $validated['guest_email'],
            'guest_phone' =>  $validated['guest_phone'],
            'note' =>  $validated['note'],
            'comment_id' =>  $validated['comment_id'],
            'status' =>  $validated['status'],
        ]);
        return MessageStatusAPI::update();
    }
}
