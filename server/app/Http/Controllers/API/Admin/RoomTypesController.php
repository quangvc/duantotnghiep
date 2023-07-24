<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateRoomTypeRequest;
use App\Http\Resources\API\RoomTypeResource;
use App\Models\BookingDetail;
use App\Models\Room;
use App\Models\RoomType;
use Illuminate\Http\Request;
use App\Traits\MessageStatusAPI;
use Carbon\Carbon;
use Illuminate\Http\Response;

class RoomTypesController extends Controller
{
    //
    public function index()
    {
        $role = auth()->user()->getRoleNames()->first();
        if ($role == 'admin') {
            $roomtype = RoomType::all();
            return RoomTypeResource::collection($roomtype);
        }
        $id_hotelRoom = auth()->user()->hotel_id;
        if ($id_hotelRoom != 0 && $role == 'manager') {
            $roomType = RoomType::where('hotel_id', '=', $id_hotelRoom)->get();
            return RoomTypeResource::collection($roomType);
        }
        return MessageStatusAPI::notFound();
    }
    public function store(CreateRoomTypeRequest $request)
    {
        if (auth()->user()) {
            $id_hotel = auth()->user()->hotel_id;
            $role = auth()->user()->getRoleNames()->first();
        }
        $validated = $request->validated();
        if ($role == 'admin') {
            $id_hotel = $validated['hotel_id'];
        }
        if ($role == 'manager') {
            $id_hotel = auth()->user()->hotel_id;
        }
        if ($id_hotel) {
            $room_type = new RoomType([
                'name' => $validated['name'],
                'hotel_id' => $id_hotel,
                'price_per_night' => $validated['price_per_night'],
                'capacity' => $validated['capacity'],
                'description' => $validated['description']
            ]);
            $room_type->save();
            return MessageStatusAPI::store();
        }
    }
    public function destroy($id)
    {
        $role = auth()->user()->getRoleNames()->first();
        if ($role == 'admin') {
            $roomtype = RoomType::find($id);
            if (!empty($roomtype)) {
                $roomtype->delete();
                return MessageStatusAPI::destroy();
            } else {
                return MessageStatusAPI::notFound();
            }
        }
        $id_hotelRoom = auth()->user()->hotel_id;
        if ($id_hotelRoom != 0 && $role == 'manager') {
            $roomtype = RoomType::where('hotel_id', '=', $id_hotelRoom)
                ->where('id', '=', $id)
                ->first();
            if (!empty($roomtype)) {
                $roomtype->delete();
                return MessageStatusAPI::destroy();
            }
        }
        return MessageStatusAPI::notFound();
    }
    public function update(CreateRoomTypeRequest $request, $id)
    {
        $roomType = RoomType::findOrFail($id);
        if (!$roomType) {
            return MessageStatusAPI::notFound();
        }
        $roomType->update($request->all());
        return MessageStatusAPI::update();
    }
    public function show($id)
    {
        $role = auth()->user()->getRoleNames()->first();
        if ($role == 'admin') {
            $roomtype = RoomType::find($id);
            if ($roomtype) {
                return new RoomTypeResource($roomtype);
            } else {
                return MessageStatusAPI::notFound();
            }
        }
        $id_hotelRoom = auth()->user()->hotel_id;
        if ($id_hotelRoom != 0 && $role == 'manager') {
            $roomType = RoomType::where('hotel_id', '=', $id_hotelRoom)
                ->where('id', '=', $id)
                ->first();
            if (!empty($roomType)) {
                return new RoomTypeResource($roomType);
            }
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
