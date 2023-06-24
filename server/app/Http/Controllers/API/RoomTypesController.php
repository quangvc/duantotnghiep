<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateRoomTypeRequest;
use App\Http\Resources\API\RoomTypeResource;
use App\Models\Room;
use App\Models\RoomType;
use Illuminate\Http\Request;
use App\Traits\MessageStatusAPI;
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
            $roomType = RoomType::with(['room' => function ($query) use ($id_hotelRoom) {
                $query->where('hotel_id', '=', $id_hotelRoom);
            }])->get();
            return RoomTypeResource::collection($roomType);
        }
        return MessageStatusAPI::notFound();
    }
    public function store(CreateRoomTypeRequest $request)
    {
        $id_hotel = auth()->user()->hotel_id;
        $role = auth()->user()->getRoleNames()->first();
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
                'room_quantity' => $validated['room_quantity'],
                'capacity' => $validated['capacity'],
                'description' => $validated['description']
            ]);
            $room_type->save();
            return MessageStatusAPI::store();
        }
    }
    public function destroy($id)
    {
        $roomType = RoomType::findOrFail($id);
        if (!$roomType) {
            return MessageStatusAPI::notFound();
        }
        $roomType->delete();
        return MessageStatusAPI::destroy();
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
        $roomtype = RoomType::find($id);
        if ($roomtype) {
            return new RoomTypeResource($roomtype);
        } else {
            return MessageStatusAPI::notFound();
        }
    }
}
