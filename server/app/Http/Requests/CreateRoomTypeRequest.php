<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateRoomTypeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name'            => 'required|string',
            'price_per_night' => 'required|int', 
            'capacity'        => 'required|int', 
            'description'     => 'required|string', 
        ];
    }
    public function messages()
    {
       return [
        'name.required'     => 'vui lòng không bỏ trống tên',
        'name.string'       => 'vui long viet dung kieu du lieu',
        'price_per_night'   => 'vui lòng không bỏ trống giá qua đêm và đúng kiểu dữ liệu', 
        'capacity'          => 'vui lòng không bỏ trống số lượng và đúng kiểu dữ liệu', 
        'description'       => 'vui lòng không bỏ trống mô tả và đúng kiểu dữ liệu', 
       ];
    }
}
