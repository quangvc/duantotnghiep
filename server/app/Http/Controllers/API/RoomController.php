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
        // 'tbl_rooms.*', 'tbl_hotels.hotel_name', 'tbl_rooms.hotel_id', 'tbl_rooms.room_number', 'tbl_rooms.status', 'tbl_room_types.name as room_type_name', 'tbl_room_types.price_per_night as price', 'tbl_room_types.capacity as capacity'
        $roleManager = auth()->user()->hasRole('manager');
        $id_hotelRoom = auth()->user()->hotel_id;
        if ($id_hotelRoom && $roleManager) {
            $rooms = Room::with('hotel')
                ->where('hotel_id', '=', auth()->user()->hotel_id)
                ->get();

            return RoomResource::collection($rooms);
            return $rooms;
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
            'status' =>  $validated['status']
        ]);
        $room->save();
        return MessageStatusAPI::store();
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
