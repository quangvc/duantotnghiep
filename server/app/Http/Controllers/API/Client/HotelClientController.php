<?php

namespace App\Http\Controllers\API\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Hotel;
use App\Traits\MessageStatusAPI;
use App\Http\Requests\HotelRequest;
use App\Http\Resources\API\HotelResource;
use App\Models\Image;
use App\Models\Room;

class HotelClientController extends Controller
{
    public function index()
    {
        // auth('api')->user(); lấy thông tin người dùng đang login
        $hotels = Hotel::where('status', '=', '1')->get();
        return HotelResource::collection($hotels);
    }
    public function show($id)
    {
        $hotelDetail = Hotel::join('tbl_regions', 'tbl_hotels.region_id', '=', 'tbl_regions.id')
            ->select('tbl_hotels.*', 'tbl_regions.name as region_name')
            ->where('tbl_hotels.id', $id)
            ->first();
        if (!$hotelDetail) {
            return MessageStatusAPI::notFound();
        }
        return MessageStatusAPI::show($hotelDetail);
    }
}
