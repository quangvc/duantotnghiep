<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateRoomTypeRequest;
use App\Http\Resources\API\RoomTypeResource;
use App\Models\RoomType;
use Illuminate\Http\Request;
use App\Traits\MessageStatusAPI;
use Illuminate\Http\Response;

class RoomTypesController extends Controller
{
    //
    public function index()
    {
        $roomtype = RoomType::all();
        return RoomTypeResource::collection($roomtype);
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
                'name' => "HOTEL" . $id_hotel . '_' . $validated['name'],
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
