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
        $region->save();
        return MessageStatusAPI::store();
    }

    public function destroy($id)
    {
        $region = Region::find($id);

        if ($region) {
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
        $region->update([
            'name' => $validated['name'],
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
