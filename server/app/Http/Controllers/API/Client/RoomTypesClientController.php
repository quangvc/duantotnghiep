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
}
