<?php

use App\Models\Hotel;

if (!function_exists('hotel')) {
    function hotel()
    {
        if (session()->has('hotel')) {
            return session('hotel');
        }
        if (auth()->user()) {
            $hotelID = auth()->user()->hotel_id;
            if (!is_null($hotelID)) {
                $hotel = Hotel::find($hotelID);
                session(['hotel' => $hotel]);
            }
            return session('hotel');
        }

        return false;
    }
}
