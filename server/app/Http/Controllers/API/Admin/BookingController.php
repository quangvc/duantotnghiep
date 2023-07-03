<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\BookingRequest;
use App\Http\Resources\API\BookingResource;
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
        if ($role != 'client') {

            $bookings = Booking::with(['booking_details.room_type' => function ($query) {
                $query->select('id', 'hotel_id' ,'name');
            }, 'booking_details.room_type.hotel' => function ($query) {
                $query->select('id', 'hotel_name');
            }])
            ->whereHas('booking_details.room_type', function ($query) {
                $query->where('tbl_room_types.hotel_id', auth()->user()->hotel_id);
            })
            ->get();

            return MessageStatusAPI::show(BookingResource::collection($bookings));            
        }

    }

    public function show($id)
    {
        $role = auth()->user()->getRoleNames()->first();
        if ($role != 'client') {

                $booking = Booking::with(['booking_details.room_type' => function ($query) {
                    $query->select('id', 'hotel_id' ,'name');
                }, 'booking_details.room_type.hotel' => function ($query) {
                    $query->select('id', 'hotel_name');
                }])
                ->where('id', $id)
                ->get();

            return MessageStatusAPI::show(BookingResource::collection($booking));
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
        // $total_date = $checkout_date->diffInDays($checkin_date);
        // $total_price = 0;

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
            
            // $price = RoomType::where('id', $item['room_type_id'])->select('price_per_night')->get();
            // $total_price += $total_date * $price[0]->price_per_night * $item['quantity'];
        }        
        $booking = new Booking([
            'checkin_date' =>  $checkin_date,
            'checkout_date' => $checkout_date,
            'people_quantity' =>  $validated['people_quantity'],
            'user_id' =>  $user_id,
            'guest_name' =>  $guest_name,
            'guest_email' =>  $guest_email,
            'guest_phone' =>  $guest_phone,
            'total_price' => $validated['total_price'],
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

    

    public function confirmBooking(Request $request, $id)
    {
        $role = auth()->user()->getRoleNames()->first();
        if ($role != 'client') {
            // $validated = $request->all();
            // $rooms_id = $request->room_id;
            $items = $request->items;
            // return $rooms_details;

            $booking_details = BookingDetail::where('booking_id', $id)->get();            

            foreach ($items as $item) {
                foreach ($item['room_id'] as $room) {
                    // echo $room.'<br>';
                    foreach ($booking_details as $booking_detail) {         
                        if ($item['room_type_id'] == $booking_detail->room_type_id && $booking_detail->room_id == '') {
                            $booking_detail->update([
                                'room_id' => $room
                            ]);
                            break;
                        }
                    }
                } 
            }
            foreach ($booking_details as $booking_detail){
                if ($booking_detail->room_id == '') {
                    foreach ($booking_details as $booking_detail2){
                        $booking_detail2->update([
                            'room_id' => null
                        ]);
                    }
                    return 'Lỗi. Xác nhận thất bại!';
                }
            }
            return 'Xác nhận thành công!';

        }
    }

}