<?php

namespace App\Http\Controllers\API\Client;

use App\Http\Controllers\Controller;
use App\Models\Region;
use App\Http\Requests\RegionRequest;
use App\Http\Resources\API\RegionResource;
use App\Traits\MessageStatusAPI;
use Illuminate\Support\Facades\DB;

class RegionClientController extends Controller
{
    public function index()
    {
        $regions = Region::all();
        return MessageStatusAPI::show($regions);
    }

    public function show($id)
    {
        $region = Region::find($id);
        if ($region) {
            return MessageStatusAPI::show($region);
        } else {
            return MessageStatusAPI::notFound();
        }
    }
}
