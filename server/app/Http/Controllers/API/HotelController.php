<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Hotel;
use App\Traits\MessageStatusAPI;
use App\Http\Requests\HotelRequest;
use App\Http\Resources\API\HotelResource;
use App\Models\Image;
use App\Models\Room;

class HotelController extends Controller
{
    public function index()
    {
        // auth('api')->user(); lấy thông tin người dùng đang login
        $hotels = Hotel::whereExists(function ($query) {
            if (auth()->user()->hasRole('manager')) {
                $query->where('id', hotel()->id);
            }
        })->get();
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
    public function changeStatus($id)
    {
        $hotel = Hotel::find($id);
        if (!$hotel) {
            return MessageStatusAPI::notFound();
        }
        if ($hotel->status == 1) {
            $hotel->update(['status' => 0]);
        } else {
            $hotel->update(['status' => 1]);
        }
        return MessageStatusAPI::update();
    }


    public function store(HotelRequest $request)
    {
        $validated = $request->validated();

        $hotel = new Hotel([
            'hotel_name' => $validated['hotel_name'],
            'hotel_phone' => $validated['hotel_phone'],
            'hotel_address' => $validated['hotel_address'],
            'description' => $validated['description'],
            'star_rating' => $validated['star_rating'],
            'region_id' => $validated['region_id'],
            'status' => 1
        ]);

        $hotel->save();

        return MessageStatusAPI::store();
    }
    public function destroy($id)
    {
        $hotel = Hotel::find($id);
        if (!$hotel) {
            return MessageStatusAPI::displayInvalidInput($hotel);
        }
        $hotel->delete();
        return MessageStatusAPI::destroy();
    }
    public function update(Request $request, $id)
    {
        $hotel = Hotel::find($id);
        if (!$hotel) {
            return MessageStatusAPI::displayInvalidInput($hotel);
        }
        $validatedData = $request->validate([
            'hotel_name' => 'required',
            'hotel_phone' => 'required',
            'hotel_address' => 'required',
            'description' => 'nullable',
            'star_rating' => 'required|numeric|min:1|max:5',
            'region_id' => 'required|exists:tbl_regions,id',
            'status' => 'nullable',
        ]);
        $hotel->update($validatedData);
        return MessageStatusAPI::update();
    }
}
