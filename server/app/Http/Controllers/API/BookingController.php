<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\BookingRequest;
use App\Http\Resources\API\BookingResource;
use App\Http\Resources\API\RoomResource;
use App\Models\Booking;
use App\Models\BookingDetail;
use App\Models\Room;
use App\Models\RoomType;
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

    public function store(BookingRequest $request)
    {
        // return $request;
        $user = auth()->user();
        $validated = $request->all();
        $checkin_date = Carbon::parse($validated['checkin_date']);
        $checkout_date = Carbon::parse($validated['checkout_date']);
        $date_diff = $checkin_date->diffInDays($checkout_date);
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
        // Đếm số lượng room_type đã gửi lên để check
        // $counted_array = array_count_values($validated['room_type_id']);
        // foreach ($counted_array as $roomType) {
        // }

        // Lấy ra room dựa trên hotel_id và room_id gửi lên 
        foreach ($validated['items'] as $item) {
            $rooms[] = Room::where('hotel_id', '=', $validated['hotel_id'])
                ->where('room_type_id', '=', $item['room_type_id'])
                ->distinct()
                ->get();
        }
        $rooms = array_values(array_unique($rooms));
        $result = [];
        foreach ($rooms as $roomGroup) {
            $result = array_merge($result, $roomGroup->toArray());
        }
        return $result;


        // $check_booking = Booking::whereDate('checkin_date', $checkin_date)
        //     ->whereDate('checkout_date', $checkout_date)
        //     ->whereHas('booking_details', function ($query) use ($validated) {
        //         $query->where('room_id', '=', $validated['room_id']);
        //     })
        //     ->first();
        // if (empty($check_booking) && ) {
        // }
        // return RoomResource::collection($room_types);
        $booking = new Booking([
            'booking_date' =>  Carbon::now()->format('Y-m-d H:i:s.u'),
            'checkin_date' =>  Carbon::createFromFormat('d-m-Y', $validated['checkin_date'])->format('Y-m-d'),
            'checkout_date' => Carbon::createFromFormat('d-m-Y', $validated['checkout_date'])->format('Y-m-d'),
            'people_quantity' =>  $validated['people_quantity'],
            'hotel_id' => $validated['hotel_id'],
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
        foreach ($validated['items'] as $item) {
            BookingDetail::create(
                [
                    'booking_id' => $booking->id,
                    'room_type_id' => $item['room_type_id'],
                    'room_id' => $item['room_id'],
                ]
            );
        }

        return new BookingResource($booking);
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
