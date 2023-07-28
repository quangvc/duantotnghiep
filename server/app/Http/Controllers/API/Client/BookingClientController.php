<?php

namespace App\Http\Controllers\API\Client;

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
use Illuminate\Support\Facades\Hash;
use App\Enums\BookingStatusEnum;

class BookingClientController extends Controller
{
    public function index($number_booking)
    {
        $bookings = Booking::where('booking_number', '=', $number_booking)
            ->get();
        return BookingResource::collection($bookings);
    }

    public function show($id)
    {
        $booking = Booking::with(['booking_details.room_type' => function ($query) {
            $query->select('id', 'hotel_id', 'name');
        }, 'booking_details.room_type.hotel' => function ($query) {
            $query->select('id', 'hotel_name');
        }])
            ->where('id', $id)
            ->get();

        return MessageStatusAPI::show(BookingResource::collection($booking));
    }

    public function userBooking($id_user)
    {

        $bookings = Booking::where('user_id', '=', $id_user)
            ->get();

        return BookingResource::collection($bookings);
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
            $user_id =  $validated['user_id'];
        }
        // return $request->query('people_quantity');
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
                ->where([
                    ['room_type_id', $item['room_type_id']],
                    ['tbl_bookings.status', '<=', 1],
                ])
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

            if ($count_all_rooms - $count_booked_rooms < $item['quantity']) {
                return 'room_type_id ' . $item['room_type_id'] . ' hết phòng';
            }
        }
        $booking = new Booking([
            'checkin_date' =>  $checkin_date,
            'checkout_date' => $checkout_date,
            'people_quantity' =>  $validated['people_quantity'],
            'user_id' =>  $user_id,
            'coupon_id' =>  $request->coupon_id,
            'guest_name' =>  $guest_name,
            'guest_email' =>  $guest_email,
            'guest_phone' =>  $guest_phone,
            'total_price' => $validated['total_price'],
        ]);
        $booking->save();
        $booking->update(['booking_number' => 'HD' . $booking->id . '_' . random_int('10000000', '99999999')]);

        foreach ($validated['items'] as $item) {
            for ($i = 0; $i < $item['quantity']; $i++) {
                BookingDetail::create([
                    'booking_id' => $booking->id,
                    'room_type_id' => $item['room_type_id'],
                ]);
            }
        }

        return MessageStatusAPI::store($booking);
    }

    public function cancelBooking($id)
    {
        $booking = Booking::find($id);
        $checkin_date = Carbon::parse($booking->checkin_date);
        if ($checkin_date->diffInDays(now()) >= 7) {
            $booking->update([
                'status' => BookingStatusEnum::CANCELLED
            ]);
        } else {
            return response(['Bạn không thể hủy vào lúc này!']);
        }

        return MessageStatusAPI::update();
    }
}
