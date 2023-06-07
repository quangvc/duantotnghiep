<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\RoomRequest;
use App\Models\Room;
use App\Traits\MessageStatusAPI;
use App\Http\Controllers\Controller;

class RoomController extends Controller
{

    public function index()
    {
        $rooms = Room::select('tbl_rooms.*', 'tbl_room_types.name as room_type_name', 'tbl_room_types.price_per_night as price', 'tbl_room_types.capacity as capacity', 'tbl_hotels.hotel_name')
            ->join('tbl_room_types', 'tbl_rooms.room_type_id', '=', 'tbl_room_types.id')
            ->join('tbl_hotels', 'tbl_rooms.hotel_id', '=', 'tbl_hotels.id')
            ->get();

        return response()->json(['data' => $rooms, 'message' => 'Message'], 200);
    }

    public function create(RoomRequest $request)
    {
        $validated = $request->validated();
        $room = new Room([
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
