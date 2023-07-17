<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Models\Region;
use App\Http\Requests\RegionRequest;
use App\Http\Resources\API\RegionResource;
use App\Traits\MessageStatusAPI;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

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
            $image = $request->file('image');
            $filename = time() . '.' . $image->getClientOriginalExtension();
            $path = public_path('/Images/regions');
            $image->move($path, $filename);
            $image = url('/Images/regions' . $filename);
            $region->image = $filename;
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

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' =>  'string',
            'image' =>  'bail|image|max:2048|mimes:jpeg,png,jpg|mimetypes:image/jpeg,image/png,image/jpg',
        ]);

        $region = Region::find($id);

        if (!$region) {
            return MessageStatusAPI::displayInvalidInput($region);
        }

        if ($request->hasFile('image')) {
            if ($region->image != '' && file_exists(public_path('Images/regions/' . $region->image))) {
                unlink(public_path('Images/regions/' . $region->image));
            }
            $image = $request->file('image');
            $filename = time() . '.' . $image->getClientOriginalExtension();
            $path = public_path('/Images/regions');
            $image->move($path, $filename);
            $image = url('/Images/regions' . $filename);
            $region->image = $filename;
        }



        $region->update([
            'name' => $request['name'],
            'image' => $request['image']
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
