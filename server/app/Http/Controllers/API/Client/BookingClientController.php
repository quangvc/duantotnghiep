<?php

namespace App\Http\Controllers\API\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\BookingRequest;
use App\Http\Resources\API\BookingResource;
use App\Http\Resources\API\RoomResource;
use App\Models\Booking;
use App\Models\BookingDetail;
use App\Models\Room;
use App\Models\RoomType;
use App\Traits\MessageStatusAPI;
use Carbon\Carbon;
use Illuminate\Http\Request as HttpRequest;
use Illuminate\Support\Facades\Hash;

class BookingClientController extends Controller
{
    public function index($number_booking)
    {
        $bookings = Booking::where('status', '=', '1')
            ->where('booking_number', '=', $number_booking)
            ->get();
        return BookingResource::collection($bookings);
    }

    public function store(HttpRequest $request)
    {
    }
}
