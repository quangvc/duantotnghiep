<?php

namespace App\Http\Controllers\API\Admin;

use App\Enums\StatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\SupportRequest;
use App\Http\Resources\API\SupportResource;
use App\Models\Support;
use Illuminate\Http\Request;
use App\Traits\MessageStatusAPI;

class SupportController extends Controller
{
    //
    public function index()
    {
        $role = auth()->user()->getRoleNames()->first();
        if ($role == 'client') {
            return MessageStatusAPI::notFound();
        }
        $support = Support::all();
        return SupportResource::collection($support);
    }
    public function changeStatus($id)
    {
        $role = auth()->user()->getRoleNames()->first();
        if ($role == 'client') {
            return MessageStatusAPI::notFound();
        }
        $Support = Support::find($id);
        if (!$Support) {
            return MessageStatusAPI::notFound();
        }
        if ($Support->status == StatusEnum::DEACTIVE) {
            $Support->update(['status' => StatusEnum::ACTIVE]);
        } else {
            $Support->update(['status' => StatusEnum::DEACTIVE]);
        }
        return MessageStatusAPI::update();
    }
    public function show($id)
    {
        $role = auth()->user()->getRoleNames()->first();
        if ($role == 'client') {
            return MessageStatusAPI::notFound();
        }
        $Support = Support::findOrFail($id);
        if (!$Support) {
            return MessageStatusAPI::notFound();
        }
        return SupportResource::collection($Support);
    }
}
