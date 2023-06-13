<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Region;
use App\Http\Requests\RegionRequest;
use App\Traits\MessageStatusAPI;
use Illuminate\Support\Facades\DB;

class RegionController extends Controller
{
    public function index()
    {
        $regions = Region::all();
        // $regions = DB::table('tbl_regions')
        //             ->join('tbl_hotels')

        return response()->json(['data' => $regions, 'message' => 'Message'], 200);
    }

    public function create(RegionRequest $request)
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
}
