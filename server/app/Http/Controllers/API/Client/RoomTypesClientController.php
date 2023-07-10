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
}
