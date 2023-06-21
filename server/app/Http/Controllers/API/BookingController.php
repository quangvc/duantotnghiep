<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\BookingRequest;
use App\Http\Resources\API\BookingResource;
use App\Models\Booking;
use App\Traits\MessageStatusAPI;
use Carbon\Carbon;
use Illuminate\Http\Request as HttpRequest;
use Illuminate\Support\Facades\Hash;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::all();
        return BookingResource::collection($bookings);
    }

    public function store(HttpRequest $request)
    {
        $user = auth()->user();
        $validated = $request->all();

        if ($user) {
            $guest_name = $user->name;
            $guest_email = $user->email;
            $guest_phone = $user->phone_number;
            $user_id = $user->id;
        }
        if (!$user) {
            $guest_name =  $validated['guest_name'];
            $guest_email =  $validated['guest_email'];
            $guest_phone =  $validated['guest_phone'];
            $user_id =  null;
        }

        $booking = new Booking([
            'booking_date' =>  Carbon::now()->format('Y-m-d H:i:s.u'),
            'checkin_date' =>  date('Y-m-d H:i:s.u', strtotime($validated['checkin_date'] . 'T12:00:00')),
            'checkout_date' => date('Y-m-d H:i:s.u', strtotime($validated['checkout_date'] . 'T12:00:00')),
            'people_quantity' =>  $validated['people_quantity'],
            // 'coupon_id' =>  $validated['coupon_id'],
            'user_id' =>  $user_id,
            'guest_name' =>  $guest_name,
            'guest_email' =>  $guest_email,
            'guest_phone' =>  $guest_phone,
            'note' =>  $validated['note'],
            // 'comment_id' =>  $validated['comment_id'],
            'status' => 0,
            'booking_number' =>  '',
        ]);

        $booking->save();
        $booking->update(['booking_number' => 'HD' . $booking->id . '_' . random_int('10000000', '99999999')]);
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
