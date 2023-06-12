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

    public function create(RoomRequest $request)
    {
        $validated = $request->validated();
        $room = Room::firstOrCreate([
            'room_number' =>  $validated['room_number'],
            'hotel_id' =>  $validated['hotel_id'],
            'room_type_id' =>  $validated['room_type_id'],
            'status' =>  $validated['status']
        ]);
        $room->save();
        return MessageStatusAPI::store();
    }

    public function detail($id)
    {
        $room = Room::find($id);
        if ($room) {
            return RoomResource::collection($room);
        } else {
            return MessageStatusAPI::notFound();
        }
    }

    public function destroy($id)
    {
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