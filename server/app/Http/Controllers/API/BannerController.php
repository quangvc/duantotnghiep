<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\API\BannerResource;
use App\Models\Banner;
use Illuminate\Http\Request;
use App\Traits\MessageStatusAPI;

class BannerController extends Controller
{
    public function index()
    {
        $banner = Banner::all();
        return BannerResource::collection($banner);
    }

    public function store(Request $request)
    {
        $role = auth()->user()->getRoleNames()->first();
        if ($role == 'admin') {
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $filename = time() . '.' . $image->getClientOriginalExtension();
                $path = public_path('Images/banners');
                $image->move($path, $filename);
                $image = url('public/Images/banners' . $filename);
                Banner::firstOrCreate([
                    'image' =>  $filename
                ]);

                return MessageStatusAPI::store();
            } else {
                return MessageStatusAPI::notFound();
            }            
        } else {
            return abort(403);
        }
    }

    public function destroy($id)
    {
        $banner = Banner::find($id);
        if ($banner) {
            if ($banner->image != '' && file_exists(public_path('Images/banners/' . $banner->image))) {
                unlink(public_path('Images/banners/' . $banner->image));
            }
            $banner->delete();
            return MessageStatusAPI::destroy();
        } else {
            return MessageStatusAPI::notFound();
        }
    }
    
}
