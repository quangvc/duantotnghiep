<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Models\Region;
use App\Http\Requests\RegionRequest;
use App\Http\Resources\API\RegionResource;
use App\Traits\MessageStatusAPI;
use Illuminate\Support\Facades\DB;

class RegionController extends Controller
{
    public function index()
    {
        $regions = Region::all();


        return response()->json(['data' => $regions, 'message' => 'Message'], 200);
    }

    public function store(RegionRequest $request)
    {
        $validated = $request->validated();
        $region = new Region([
            'name' =>  $validated['name'],
        ]);

        if ($request->hasFile('image')) {
            $file = $request->avatar;
            $region->image = $file->hashName();
            $file->move(base_path('public/Images/avatar'), $region->image);
        }

        $region->save();
        return MessageStatusAPI::store();
    }

    public function destroy($id)
    {
        $region = Region::find($id);

        if ($region) {
            if ($region->image != '' && file_exists(public_path('Images/regions/' . $region->image))) {
                unlink(public_path('Images/regions/' . $region->image));
            }
            $region->delete();
            return MessageStatusAPI::destroy();
        } else {
            return MessageStatusAPI::notFound();
        }
    }

    public function update(RegionRequest $request, $id)
    {
        $validated = $request->validated();
        $region = Region::findOrFail($id);
        if (!$region) {
            return MessageStatusAPI::displayInvalidInput($region);
        }


        if ($request->hasFile('image')) {
            if ($region->image != '' && file_exists(public_path('Images/regions/' . $region->image))) {
                unlink(public_path('Images/regions/' . $region->image));
            }
            $file = $request->avatar;
            $region->image = $file->hashName();
            $file->move(base_path('public/Images/avatar'), $region->image);
        }

        $region->update([
            'name' => $validated['name'],
            'image' => $validated['image']
        ]);
        return MessageStatusAPI::update();
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
