<?php

namespace App\Http\Controllers\API\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\SupportRequest;
use App\Http\Resources\API\SupportResource;
use App\Models\Support;
use Illuminate\Http\Request;
use App\Traits\MessageStatusAPI;

class SupportClientController extends Controller
{
    //
    public function index()
    {
        $support = Support::all();
        return SupportResource::collection($support);
    }
    public function store(SupportRequest $request)
    {
        $data = $request->all();
        $support = Support::create($data);
        return MessageStatusAPI::store($support);
    }
    public function update(SupportRequest $request, $id)
    {
        $Support = Support::find($id);
        $Support->update($request->all());
        return MessageStatusAPI::update();
    }
}
