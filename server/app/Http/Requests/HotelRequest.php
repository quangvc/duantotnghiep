<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class HotelRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }
    public function rules()
    {
        return [
            'hotel_name' => 'required|string|max:255',
            'hotel_phone' => 'required|string|max:20|min:8',
            'hotel_address' => 'required|string|max:255',
            'description' => 'nullable',
            'star_rating' => 'required|numeric|between:1,5',
            'region_id' => 'required|numeric|exists:tbl_regions,id',
        ];
    }
    public function messages()
    {
        return [
            'hotel_name.required' => 'Vui lòng không được bỏ trống !',
            'hotel_name.string' => 'Nhập không đúng kiểu dữ liệu !',
            'hotel_name.max' => 'Vui lòng không được nhập quá 255 ký tự !',

            'hotel_phone.required' => 'Vui lòng không được bỏ trống !',
            'hotel_phone.string' => 'Nhập không đúng kiểu dữ liệu !',
            'hotel_phone.max' => 'Vui lòng không được nhập nhiều hơn 20 số !',
            'hotel_phone.min' => 'Vui lòng không được nhập ít hơn 8 số !',

            'hotel_address.required' => 'Vui lòng không được bỏ trống !',
            'hotel_address.string' => 'Nhập không đúng kiểu dữ liệu !',
            'hotel_address.max' => 'Vui lòng không được nhập quá 255 ký tự !',

            'star_rating.required' => 'Vui lòng không được nhập quá 20 số !',
            'star_rating.numeric' => 'Nhập không đúng kiểu dữ liệu !',

            'region_id.required' => 'Vui lòng không được nhập quá 20 số !',
            'region_id.numeric' => 'Nhập không đúng kiểu dữ liệu !',

        ];
    }
}
