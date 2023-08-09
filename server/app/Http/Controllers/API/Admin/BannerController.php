<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\API\BannerResource;
use App\Models\Banner;
use Illuminate\Http\Request;
use App\Traits\MessageStatusAPI;
use App\Enums\StatusEnum;
use Illuminate\Validation\Rule;

class BannerController extends Controller
{
    public function index()
    {
        $banner = Banner::orderBy('status', 'DESC')->get();
        return BannerResource::collection($banner);
    }

    public function store(Request $request)
    {
        $request->validate([
            'image.*' => 'bail|image|max:2048|mimes:jpeg,png,jpg|mimetypes:image/jpeg,image/png,image/jpg',
        ]);

        $role = auth()->user()->getRoleNames()->first();
        if ($role == 'admin') {
            if ($request->hasFile('image')) {
                foreach ($request->file('image') as $file) {
                    // if (!in_array($file->extension(), array('jpg','jpeg','png'))) {
                    //     return response(['error' => 'File upload không phải là ảnh']);
                    // } elseif ($file->getSize() > 2048000) {
                    //     return response(['error' => 'Dung lượng ảnh vượt quá 2Mb']);
                    // }
                    $name = time() . rand(1, 100) . '.' . $file->extension();
                    $file->move(public_path('Images/banners'), $name);
                    Banner::create(['image' =>  $name]);
                }

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
        $images = explode(",", $id);
        foreach ($images as $img) {
            $banner = Banner::find($img);
            if ($banner) {
                if ($banner->image != '' && file_exists(public_path('Images/banners/' . $banner->image))) {
                    unlink(public_path('Images/banners/' . $banner->image));
                }
                $banner->delete();
            }
        }
        return MessageStatusAPI::destroy();
    }

    public function changeStatus($id)
    {
        $banner = Banner::find($id);

        if ($banner->status == StatusEnum::DEACTIVE) {
            $banner->update(['status' => StatusEnum::ACTIVE]);
        }
        if ($banner->status == StatusEnum::ACTIVE) {
            $banner->update(['status' => StatusEnum::ACTIVE]);
        }

        return response([
            'message' => 'Changed status successfully',
        ], 200);
    }
}
