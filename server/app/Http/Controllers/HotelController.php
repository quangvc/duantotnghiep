<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Hotels;
use App\Traits\MessageStatusAPI;

class HotelController extends Controller
{
    public function index(Request $request)
    {
        $request = Hotels::all();
        if (empty($request) || $request = []) {
            return MessageStatusAPI::notFound();
        }


        return $request;
    }
}
