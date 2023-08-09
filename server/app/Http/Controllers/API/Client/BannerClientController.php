<?php

namespace App\Http\Controllers\API\Client;

use App\Http\Controllers\Controller;
use App\Http\Resources\API\BannerResource;
use App\Models\Banner;

class BannerClientController extends Controller
{
    public function index()
    {
        $banner = Banner::where('status', '=', '1')
            ->orderBy('created_at', 'desc')
            ->take(3)
            ->get();
        return BannerResource::collection($banner);
    }
}
