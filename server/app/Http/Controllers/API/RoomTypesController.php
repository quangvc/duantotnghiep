<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateRoomTypeRequest;
use App\Models\RoomType;
use Illuminate\Http\Request;
use App\Traits\MessageStatusAPI;
use Illuminate\Http\Response;

class RoomTypesController extends Controller
{
    //
    public function index(){
        $roomtype = RoomType::all();
        return response()->json($roomtype ,200);
    }
    public function create(CreateRoomTypeRequest $request){
        $data = $request->all();
        $room_type = RoomType::create($data);
        $room_type->save();
        return MessageStatusAPI::store();
        // return response()->json($room_type, Response::HTTP_OK);
        // echo "xinchao";
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
    public function detail(MessageStatusAPI $id){
        $roomType = RoomType::find($id);
        return response()->json($roomType, Response::HTTP_OK);
    }
}
