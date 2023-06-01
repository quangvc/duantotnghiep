<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Hotel;
use App\Traits\MessageStatusAPI;
use App\Http\Requests\HotelRequest;

use function PHPUnit\Framework\isEmpty;

class HotelController extends Controller
{
    public function index()
    {
        $hotels = Hotel::leftJoin('tbl_regions', 'tbl_regions.id', '=', 'tbl_hotels.region_id')
            ->select('tbl_hotels.*', 'tbl_regions.name as region_name')
            ->orderBy('tbl_hotels.id', 'desc')
            ->get();
        return $hotels;
    }

    public function create(HotelRequest $request)
    {
        $validated = $request->validated();

        $hotel = new Hotel([
            'hotel_name' => $validated['hotel_name'],
            'hotel_phone' => $validated['hotel_phone'],
            'hotel_address' => $validated['hotel_address'],
            'description' => $validated['description'],
            'star_rating' => $validated['star_rating'],
            'region_id' => $validated['region_id'],
            'status' => $validated['status'],
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
