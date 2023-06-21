<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CouponRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'bail|required|string|max:10',
            'type' => 'bail|required|max:255',
            'value' => 'bail|required|',
            'min' => 'bail|required|max:2|numeric',
            'max' => 'bail|required|numeric|max:2',
            'hotel_id' => 'bail|required|alpha_num',
            'quantity'=> 'bail|required|numeric|max:3',
            'dateStart'=>'required|date',
            'dateEnd'=>'required|date',
        ];
    }
    
    public function messages(){
        return [
            'name.required'   => 'Vui lòng nhập dữ liệu',
            'name.max'   => 'Vui lòng nhập dưới 10 ký tự',

            'type.required'   => 'Vui lòng nhập dữ liệu',
            'type.max'   => 'Vui lòng nhập dưới 255 ký tự',

            'value.required'   => 'Vui lòng nhập dữ liệu',

            'min.required'   => 'Vui lòng nhập dữ liệu',
            'min.numeric'   => 'Vui lòng nhập số',
            'min.max'   => 'Vui lòng nhập dưới 2 ký tự',

            'max.required'   => 'Vui lòng nhập dữ liệu',
            'max.numeric'   => 'Vui lòng nhập số',
            'max.max'   => 'Vui lòng nhập dưới 2 ký tự',

            'hotel_id.required'   => 'Vui lòng nhập dữ liệu',

            'quantity.required'   => 'Vui lòng nhập dữ liệu',

            'dateStart.required'   => 'Vui lòng nhập dữ liệu',

            'dateEnd.required'   => 'Vui lòng nhập dữ liệu',
           ];
    }

}