<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RoomRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }
    public function rules()
    {
        return [
            'room_number' => 'required|string',
            'room_type_id' => 'required|exists:tbl_room_types,id',
            'status' => 'required|boolean',
        ];
    }
    public function messages()
    {
        return [
            'room_number.required' => 'Vui lòng không được bỏ trống !',
            'room_number.string' => 'Nhập không đúng kiểu dữ liệu !',
            'room_type_id.required' => 'Vui lòng không được bỏ trống !',
            'status.required' => 'Vui lòng không được bỏ trống !',
            'status.boolean' => 'Nhập không đúng kiểu dữ liệu !',
        ];
    }
}