<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\RoomRequest;
use App\Models\Room;
use App\Traits\MessageStatusAPI;
use App\Http\Controllers\Controller;
use App\Http\Resources\API\RoomResource;

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
            $rooms = Room::with('hotel')
                ->where('hotel_id', '=', auth()->user()->hotel_id)
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
            'hotel_id' =>  $validated['hotel_id'],
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
            if ($room->status == 1) {
                $room->update(['status' => 0]);
            } else {
                $room->update(['status' => 1]);
            }
            return MessageStatusAPI::update();
        }
        $id_hotelRoom = auth()->user()->hotel_id;
        if ($role == 'manager') {
            if ($id_hotelRoom == $room->hotel_id) {
                if ($room->status == 1) {
                    $room->update(['status' => 0]);
                } else {
                    $room->update(['status' => 1]);
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
        $room = Room::find($id);
        if ($room) {
            $room->delete();
            return MessageStatusAPI::destroy();
        } else {
            return MessageStatusAPI::notFound();
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
            'hotel_id' => $validated['hotel_id'],
            'room_type_id' => $validated['room_type_id'],
            'status' => $validated['status']
        ]);
        return MessageStatusAPI::update();
    }
}
