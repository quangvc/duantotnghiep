<?php

namespace App\Http\Controllers\API\Client;

use App\Http\Controllers\Controller;
use App\Http\Resources\API\BannerResource;
use App\Models\Banner;
use Illuminate\Http\Request;
use App\Traits\MessageStatusAPI;

class BannerClientController extends Controller
{
    public function index()
    {
        $banner = Banner::all();
        return BannerResource::collection($banner);
    }
}
