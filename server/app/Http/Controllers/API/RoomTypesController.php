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
    public function index(){
        $roomtype = RoomType::all();
        return RoomTypeResource::collection($roomtype);
    }
    public function store(CreateRoomTypeRequest $request){
        $data = $request->all();
        $room_type = RoomType::create($data);
        $room_type->save();
        return MessageStatusAPI::store();
    }
    public function destroy($id){
        $roomType = RoomType::findOrFail($id);
        $roomType->delete();
        return MessageStatusAPI::destroy();
    }
    public function update(CreateRoomTypeRequest $request, $id){
        $roomType = RoomType::findOrFail($id);
        $roomType->update($request->all());
        return MessageStatusAPI::update();
        // return response()->json($roomType, Response::HTTP_OK);
    }
    public function show($id){
        $roomtype = RoomType::find($id);
        if ($roomtype) {
            return new RoomTypeResource($roomtype);
        } else {
            return MessageStatusAPI::notFound();
        }
    }
}