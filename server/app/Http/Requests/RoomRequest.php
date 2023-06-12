<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RoomRequest extends FormRequest
{
    public function rules()
    {
        return [
            'room_number' => 'required',
            'hotel_id' => 'required|exists:tbl_hotels,id',
            'room_type_id' => 'required|exists:tbl_room_types,id',
            'status' => 'required|boolean',
        ];
    }
}
