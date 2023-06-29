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
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index()
    {
        $role = auth()->user()->getRoleNames()->first();
        $hotel_id = auth()->user()->hotel_id ?? '';
        if ($role != 'client') {
            
            $bookings = Booking::leftJoin('tbl_booking_details', 'tbl_bookings.id', 'booking_id')
                ->leftJoin('tbl_room_types', 'tbl_room_types.id', '=', 'room_type_id')
                ->leftJoin('tbl_hotels', 'tbl_hotels.id', '=', 'hotel_id')
                ->where(function($query) {
                    if (auth()->user()->hotel_id) {
                        $query->where('tbl_hotels.id', auth()->user()->hotel_id);
                    }
                })
                ->select('tbl_bookings.*', 'tbl_room_types.name', 'tbl_hotels.hotel_name')
                // ->groupBy('booking_number', 'user_id', 'booking_date', 'checkin_date', 'checkout_date', 'people_quantity', 'coupon_id', 'note', )
                // ->having('booking_number', '>', 1)
                ->get();

                return BookingResource::collection($bookings);
        }

    }
    
    public function store(Request $request)
    {
        $validated = $request->all();
        $user = auth()->user();
        if ($user) {
            $guest_name = $user->name;
            $guest_email = $user->email;
            $guest_phone = $user->phone_number;
            $user_id = $user->id;
        } else {
            $guest_name =  $validated['guest_name'];
            $guest_email =  $validated['guest_email'];
            $guest_phone =  $validated['guest_phone'];
            $user_id =  null;
        }
                
        // $hotel_id = $validated['hotel_id'];
        $checkin_date = Carbon::parse($validated['checkin_date']);
        $checkout_date = Carbon::parse($validated['checkout_date']);

        // đếm số phòng đã được đặt trong khoảng thời gian mà khách chọn vs room_type_id = 4
        $room = BookingDetail::join('tbl_bookings', 'tbl_bookings.id', '=', 'booking_id')
        ->where(function ($query) use ($checkin_date, $checkout_date) {
            $query->where([
                ['checkin_date', '>=', $checkin_date],
                ['checkout_date', '<=', $checkout_date],
                ['room_type_id', 4],
            ])->orWhere([
                ['checkin_date', '<=', $checkin_date],
                ['checkout_date', '>=', $checkout_date],
                ['room_type_id', 4],
            ])->orWhere([
                ['checkin_date', '>', $checkin_date],
                ['checkin_date', '<', $checkout_date],
                ['room_type_id', 4],
            ])->orWhere([
                ['checkout_date', '>', $checkin_date],
                ['checkout_date', '<', $checkout_date],
                ['room_type_id', 4],
            ]);
        })
        // ->where([
        //     ['checkin_date', '>=', $checkin_date],
        //     ['checkout_date', '<=', $checkout_date],
        //     ['room_type_id', 4],
        // ])
        // ->orWhere([
        //     ['checkin_date', '<=', $checkin_date],
        //     ['checkout_date', '>=', $checkout_date],
        //     ['room_type_id', 4],
        // ])
        // ->orWhere([
        //     ['checkin_date', '>', $checkin_date],
        //     ['checkin_date', '<', $checkout_date],
        //     ['room_type_id', 4],
        // ])
        // ->orWhere([
        //     ['checkout_date', '>', $checkin_date],
        //     ['checkout_date', '<', $checkout_date],
        //     ['room_type_id', 4],
        // ])

        ->count();
        // ->get();
        return $room;


        foreach ($validated['items'] as $item) {
            $rooms1 = Room:://whereDate('')
            where('room_type_id', $item['room_type_id'])->count();
            // đếm tổng số room theo loại
            $rooms = Room::where('room_type_id', $item['room_type_id'])->where('status', 1)->count();
            if ($rooms < $item['quantity'] ) {
                return 'Hết phòng';
            }
        }
        // return $rooms;
        
        

        // Đếm số lượng room_type đã gửi lên để check
        // $counted_array = array_count_values($validated['room_type_id']);
        // foreach ($counted_array as $roomType) {
        // }

        // $room_types = Room::where('hotel_id', '=', $validated['hotel_id'])->whereIn('room_type_id', $validated['room_type_id'])
        //     ->get();

        // $check_booking = Booking::whereDate('checkin_date', $checkin_date)
        //     ->whereDate('checkout_date', $checkout_date)
        //     ->whereHas('booking_details', function ($query) use ($validated) {
        //         $query->where('room_id', '=', $validated['room_id']);
        //     })
        //     ->first();
        // if (empty($check_booking) && ) {
        // }
        // return RoomResource::collection($room_types);        

        // Carbon::createFromFormat('d-m-Y', $validated['checkin_date'])->format('Y-m-d')

        $booking = new Booking([
            'checkin_date' =>  $checkin_date,
            'checkout_date' => $checkout_date,
            'people_quantity' =>  $validated['people_quantity'],
            'user_id' =>  $user_id,
            'guest_name' =>  $guest_name,
            'guest_email' =>  $guest_email,
            'guest_phone' =>  $guest_phone,
        ]);
        $booking->save();
        $booking->update(['booking_number' => 'HD' . $booking->id . '_' . random_int('10000000', '99999999')]);

        foreach ($validated['items'] as $item) {
            for ($i=0; $i < $item['quantity']; $i++) { 
                BookingDetail::create([
                    'booking_id' => $booking->id,
                    'room_type_id' => $item['room_type_id'],
                ]);   
            }   
        }

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