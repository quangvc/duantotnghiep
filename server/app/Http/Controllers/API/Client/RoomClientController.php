<?php

namespace App\Http\Controllers\API\Client;

use App\Http\Requests\RoomRequest;
use App\Models\Room;
use App\Traits\MessageStatusAPI;
use App\Http\Controllers\Controller;
use App\Http\Resources\API\RoomResource;

class RoomClientController extends Controller
{

    public function index()
    {
        $rooms = Room::where('status', '=', '1')->get();
        return RoomResource::collection($rooms);
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
}
