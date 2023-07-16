<?php

namespace App\Http\Controllers\API\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateRoomTypeRequest;
use App\Http\Resources\API\RoomTypeResource;
use App\Models\Room;
use App\Models\RoomType;
use App\Models\BookingDetail;
use Illuminate\Http\Request;
use App\Traits\MessageStatusAPI;
use Illuminate\Http\Response;
use Carbon\Carbon;

class RoomTypesClientController extends Controller
{
    //
    public function index()
    {
        $roomtype = RoomType::all();
        return RoomTypeResource::collection($roomtype);
    }

    public function show($id)
    {
        $roomtype = RoomType::find($id);
        if ($roomtype) {
            return new RoomTypeResource($roomtype);
        }
        return MessageStatusAPI::notFound();
    }

    public function getRoomtype($hotel_id, $checkin_date, $checkout_date)
    {
        $roomtypes = RoomType::where('hotel_id', $hotel_id)->get();

        $checkin_date = Carbon::parse($checkin_date);
        $checkout_date = Carbon::parse($checkout_date);
        $data = [];
        foreach ($roomtypes as $roomtype) {
            $count_all_rooms = Room::where([
                ['room_type_id', $roomtype->id],
                ['status', 1]
            ])->count();


            $count_booked_rooms = BookingDetail::join('tbl_bookings', 'tbl_bookings.id', '=', 'booking_id')
                ->where([
                    ['room_type_id', $roomtype->id],
                    ['tbl_bookings.status', 1],
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
                if ($count_all_rooms - $count_booked_rooms > 0) {
                    $data[] = [
                        'room_type' => $roomtype,
                        'rooms_count' => $count_all_rooms - $count_booked_rooms
                    ];
                }            
        }

        return $data;
    }



}
