<?php

namespace App\Http\Controllers\API\Client;

use App\Http\Controllers\Controller;
use App\Models\Image;
use Illuminate\Http\Request;
use App\Traits\MessageStatusAPI;
use Illuminate\Http\File;

class ImageClientController extends Controller
{
    public function index()
    {
        $image = Image::all();
        return $image;
    }
}
