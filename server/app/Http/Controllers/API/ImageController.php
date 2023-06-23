<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Image;
use Illuminate\Http\Request;
use App\Traits\MessageStatusAPI;
use Illuminate\Http\File;

class ImageController extends Controller
{
    public function index()
    {
        $image = Image::all();
        return $image;
    }
    public function storeHotel($id, Request $request)
    {
        if (empty($request->hasFile('path'))) {
            return MessageStatusAPI::notFound();
        }
        $extension = $request->file('path')->getClientOriginalExtension();
        if ($extension == 'jpg' || $extension == 'png' || $extension == 'jpeg') {
            $timestamp = getdate(); // Get current Unix timestamp
            $now = $timestamp['mday'] . '_' . $timestamp['mon'] . '_' . $timestamp['year'];
            $path = $request->file('path')->getClientOriginalName();
            $newFileName = $now . '_Hotel' . $id . '_' . $path;
            $folderHotel = $request->file('path')->move('Images/Hotel', $newFileName);
            $image = new Image([
                'path' => 'Hotel/' . $path,
                'hotel_id' => $id
            ]);
            $image->save();
            return MessageStatusAPI::store();
        }
    }
    public function storeRoomType($id, Request $request)
    {
        $extension = $request->file('path')->getClientOriginalExtension();
        if ($extension == 'jpg' || $extension == 'png' || $extension == 'jpeg') {
            $timestamp = getdate(); // Get current Unix timestamp
            $now = $timestamp['mday'] . '_' . $timestamp['mon'] . '_' . $timestamp['year'];
            $path = $request->file('path')->getClientOriginalName();
            $newFileName = $now . '_RoomType' . $id . '_' . $path;
            $folderHotel = $request->file('path')->move('Images/RoomType', $newFileName);

            $image = new Image([
                'path' => 'RoomType/' . $path,
                'room_type_id' => $id
            ]);
            $image->save();
            return MessageStatusAPI::store();
        }
    }
    public function update($id, Request $request)
    {
    }
    public function destroy($id)
    {
        $image = Image::find($id);
        if (!$image) {
            return MessageStatusAPI::notFound();
        }
        $image->delete();
        return MessageStatusAPI::destroy();
    }
}
