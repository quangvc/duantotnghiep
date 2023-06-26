<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\BannerRequest;
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
    public function store(BannerRequest $request)
    {
        $role = auth()->user()->getRoleNames()->first();
        $validated = $request->validated();
        if ($role == 'admin') {
            $banner = Banner::firstOrCreate([
                'image' =>  $validated['image']
            ]);
        }
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '.' . $image->getClientOriginalExtension();
            // $image->storeAs('public/Images/blog', $image);
            $path = public_path('Images/banner');
            $image->move($path, $filename);
            $image = url('public/Images/banner' . $filename);
            $banner->image = $filename;
        }
        $banner->save();
        return MessageStatusAPI::store();
    }
    public function update(BannerRequest $request, $id)
    {
        $banner = Banner::find($id);
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '.' . $image->getClientOriginalExtension();
            $path = public_path('Images/blog');
            $image->move($path, $filename);
            $image = url('public/Images/blog' . $filename);
            $banner->image = $filename;
        }
        $banner->update($request->all());
        return MessageStatusAPI::update();
    }
    public function destroy($id)
    {
        $banner = Banner::find($id);
        if ($banner) {
            $banner->delete();
            return MessageStatusAPI::destroy();
        } else {
            return MessageStatusAPI::notFound();
        }
    }
    public function show($id)
    {
        $banner = Banner::find($id);
        if ($banner) {
            return new BannerResource($banner);
        } else {
            return MessageStatusAPI::notFound();
        }
    }
}
