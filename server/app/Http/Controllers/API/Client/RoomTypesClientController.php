<?php

namespace App\Http\Controllers\API\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateRoomTypeRequest;
use App\Http\Resources\API\RoomTypeResource;
use App\Models\Room;
use App\Models\RoomType;
use Illuminate\Http\Request;
use App\Traits\MessageStatusAPI;
use Illuminate\Http\Response;

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

    public function countRoom($hotel_id)
    {
        $roomtypes = RoomType::where('hotel_id', $hotel_id)->get();
        foreach ($roomtypes as $roomtype) {
            $count = Room::where('room_type_id', $roomtype->id)->count();
            $data[] = [
                'room_type' => $roomtype->name,
                'quantity' => $count
            ];
        }

        return $data;
    }



}
