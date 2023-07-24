<?php

namespace App\Http\Controllers\API\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Hotel;
use App\Traits\MessageStatusAPI;
use App\Http\Resources\API\HotelResource;
use App\Models\BookingDetail;
use App\Models\Room;
use App\Models\RoomType;
use Carbon\Carbon;

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
    public function getHotel($region_id, $checkin_date, $checkout_date)
    {
        $hotels = Hotel::where('status', '=', '1')
            ->where('region_id', '=', $region_id)
            ->get();
        if (count($hotels) == 0) {
            return MessageStatusAPI::notFound();
        }
        foreach ($hotels as $hotel) {
            $hotel_id[] = $hotel->id;
        }
        $roomtypes = RoomType::whereIn('hotel_id', $hotel_id)->get();

        $checkin_date = Carbon::parse($checkin_date);
        $checkout_date = Carbon::parse($checkout_date);

        foreach ($roomtypes as $roomtype) {
            $count_all_rooms = Room::where([
                ['room_type_id', $roomtype->id],
                ['status', 1]
            ])->count();


            $count_booked_rooms = BookingDetail::join('tbl_bookings', 'tbl_bookings.id', '=', 'booking_id')
                ->where([
                    ['room_type_id', $roomtype->id],
                    ['tbl_bookings.status', 1],
                ])
                ->where(function ($query) use ($checkin_date, $checkout_date) {
                    $query->where([
                        ['checkin_date', '>=', $checkin_date],
                        ['checkout_date', '<=', $checkout_date],
                    ])->orWhere([
                        ['checkin_date', '<=', $checkin_date],
                        ['checkout_date', '>=', $checkout_date],
                    ])->orWhere([
                        ['checkin_date', '>', $checkin_date],
                        ['checkin_date', '<', $checkout_date],
                    ])->orWhere([
                        ['checkout_date', '>', $checkin_date],
                        ['checkout_date', '<', $checkout_date],
                    ]);
                })
                ->count();
            if ($count_all_rooms - $count_booked_rooms > 0) {
                $datas[] = [
                    'room_type' => $roomtype,
                    'rooms_count' => $count_all_rooms - $count_booked_rooms
                ];
            }
        }
        foreach ($datas as $data) {
            $hotelId[] = $data['room_type']['hotel_id'];
        }
        $hotelId = array_values(array_unique($hotelId));

        $hotelFilter = Hotel::find($hotelId)->where('status', '=', '1');
        return $hotelFilter;
    }
}