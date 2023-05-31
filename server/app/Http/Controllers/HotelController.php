<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Hotels;
use App\Traits\MessageStatusAPI;

use function PHPUnit\Framework\isEmpty;

class HotelController extends Controller
{
    public function index(Request $request)
    {
        $request = Hotels::all();

        if ($request) {
            return MessageStatusAPI::notFound();
        }
        return $request;
    }
}
