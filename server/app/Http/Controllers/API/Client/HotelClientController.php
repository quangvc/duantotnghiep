<?php

namespace App\Http\Controllers\API\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Hotel;
use App\Traits\MessageStatusAPI;
use App\Http\Resources\API\HotelResource;


class HotelClientController extends Controller
{
    public function index()
    {
        $hotels = Hotel::where('status', '=', '1')->get();
        return HotelResource::collection($hotels);
    }
    public function filterRegion($region_id)
    {
        if (!empty($region_id)) {
            $hotels = Hotel::where('status', '=', '1')
                ->where('region_id', '=', $region_id)
                ->get();
            return HotelResource::collection($hotels);
        }
        return MessageStatusAPI::notFound();
    }
    public function show($id)
    {
        $hotelDetail = Hotel::where('status', '=', '1')
            ->where('id', '=', $id)
            ->get();
        if (!$hotelDetail) {
            return MessageStatusAPI::notFound();
        }
        return HotelResource::collection($hotelDetail);
    }
}
