<?php

namespace App\Http\Controllers\API\Admin;

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
    
    public function store(BookingRequest $request)
    {
        $request->validated();
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

        foreach ($validated['items'] as $item) {

            // đếm tổng số room theo loại
            $count_all_rooms = Room::where([
                ['room_type_id', $item['room_type_id']],
                ['status', 1]
            ])->count();

            // đếm số phòng đã được đặt trong khoảng thời gian mà khách chọn theo loại
            $count_booked_rooms = BookingDetail::join('tbl_bookings', 'tbl_bookings.id', '=', 'booking_id')
            ->where('room_type_id', $item['room_type_id'])
            ->where(function ($query) use ($checkin_date, $checkout_date) {
                $query->where([
                    ['checkin_date', '>=', $checkin_date],
                    ['checkout_date', '<=', $checkout_date],
                ])->orWhere([
                    ['checkin_date', '<=', $checkin_date],
                    ['checkout_date', '>=', $checkout_date],
                ])->orWhere([
                    ['checkin_date', '>', $checkin_date],
                    ['checkin_date', '<', $checkout_date],
                ])->orWhere([
                    ['checkout_date', '>', $checkin_date],
                    ['checkout_date', '<', $checkout_date],
                ]);
            })
            ->count();

            if ($count_all_rooms - $count_booked_rooms < $item['quantity'] ) {
                return 'room_type_id '.$item['room_type_id'].' hết phòng';
            }
        }

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