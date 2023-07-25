<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Requests\RoomRequest;
use App\Models\Room;
use App\Models\BookingDetail;
use App\Traits\MessageStatusAPI;
use App\Http\Controllers\Controller;
use App\Http\Resources\API\RoomResource;
use App\Enums\StatusEnum;
use App\Models\RoomType;
use Carbon\Carbon;

class RoomController extends Controller
{

    public function index()
    {
        $role = auth()->user()->getRoleNames()->first();
        if ($role == 'admin') {
            $rooms = Room::all();
            return RoomResource::collection($rooms);
        }
        $id_hotelRoom = auth()->user()->hotel_id;
        if ($id_hotelRoom != 0 && $role == 'manager') {
            $rooms = Room::with('room_type')
                ->whereHas('room_type', function ($query) {
                    $query->where('hotel_id', '=', auth()->user()->hotel_id);
                })
                ->get();
            return RoomResource::collection($rooms);
        }
        return MessageStatusAPI::notFound();
    }

    public function store(RoomRequest $request)
    {
        $validated = $request->validated();
        $room = Room::firstOrCreate([
            'room_number' =>  $validated['room_number'],
            'room_type_id' =>  $validated['room_type_id'],
            'status' =>  $validated['status'],
        ]);
        $room->save();
        return MessageStatusAPI::store();
    }
    public function changeStatus($id)
    {
        $role = auth()->user()->getRoleNames()->first();
        $room = Room::find($id);
        if (!$room) {
            return MessageStatusAPI::notFound();
        }
        if ($role == 'admin') {
            if ($room->status == StatusEnum::ACTIVE) {
                $room->update(['status' => StatusEnum::DEACTIVE]);
            } else {
                $room->update(['status' => StatusEnum::ACTIVE]);
            }
            return MessageStatusAPI::update();
        }
        $id_hotelRoom = auth()->user()->hotel_id;
        if ($role == 'manager') {
            if ($id_hotelRoom == $room->hotel_id) {
                if ($room->status == StatusEnum::ACTIVE) {
                    $room->update(['status' => StatusEnum::DEACTIVE]);
                } else {
                    $room->update(['status' => StatusEnum::ACTIVE]);
                }
                return $room->status;
            } else {
                return MessageStatusAPI::notFound();
            }
        }
    }
    public function show($id)
    {
        $room = Room::find($id);
        if ($room) {
            return new RoomResource($room);
        } else {
            return MessageStatusAPI::notFound();
        }
    }

    public function destroy($id)
    {
        $role = auth()->user()->getRoleNames()->first();
        $room = Room::find($id);
        if (!$room) {
            return MessageStatusAPI::notFound();
        }
        if ($role == 'admin') {
            $room->delete();
            return MessageStatusAPI::destroy();
        }
        $id_hotelRoom = auth()->user()->hotel_id;
        if ($role == 'manager') {
            if ($id_hotelRoom == $room->hotel_id) {
                $room->delete();
                return MessageStatusAPI::destroy();
            } else {
                return MessageStatusAPI::notFound();
            }
        }
    }

    public function update(RoomRequest $request, $id)
    {
        $validated = $request->validated();

        $room = Room::findOrFail($id);
        if (!$room) {
            return MessageStatusAPI::displayInvalidInput($room);
        }
        $room->update([
            'room_number' => $validated['room_number'],
            'room_type_id' => $validated['room_type_id'],
            'status' => $validated['status']
        ]);
        return MessageStatusAPI::update();
    }

    public function roomsCanRent ($hotel_id, $date_from, $date_to) {
        $date_from = Carbon::parse($date_from);
        $date_to = Carbon::parse($date_to);
        
        // all rooms 
        $rooms = RoomType::where('hotel_id', $hotel_id)    
            ->with(['rooms' => function ($query) {
                $query->select('room_number', 'room_type_id');
            }])
            ->get();
// return $rooms;
        // các phòng đã đặt
        $booked_rooms = BookingDetail::join('tbl_bookings', 'tbl_bookings.id', '=', 'booking_id')
            ->where(function ($query) use ($date_from, $date_to) {
                $query->where([
                    ['checkin_date', '>=', $date_from],
                    ['checkout_date', '<=', $date_to],
                ])->orWhere([
                    ['checkin_date', '<=', $date_from],
                    ['checkout_date', '>=', $date_to],
                ])->orWhere([
                    ['checkin_date', '>', $date_from],
                    ['checkin_date', '<', $date_to],
                ])->orWhere([
                    ['checkout_date', '>', $date_from],
                    ['checkout_date', '<', $date_to],
                ]);
            })
            ->get();

return $booked_rooms;

    }
}
