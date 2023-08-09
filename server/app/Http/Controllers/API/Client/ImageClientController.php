<?php

namespace App\Http\Controllers\API\Client;

use App\Http\Controllers\Controller;
use App\Http\Resources\API\ImageResource;
use App\Models\Image;
use Illuminate\Http\Request;
use App\Traits\MessageStatusAPI;
use Illuminate\Http\File;

class ImageClientController extends Controller
{
    public function indexHotel($id)
    {
        $image = Image::where('hotel_id', '=', $id)->get();
        return new ImageResource($image);
    }
    public function indexRoomType($id)
    {
        $image = Image::where('room_type_id', '=', $id)->get();
        return new ImageResource($image);
    }
}
