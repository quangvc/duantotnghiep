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
            'name' => 'required|max:255',
            'type' => 'required|max:255',
            'value' => 'required|alpha_num',
            'min' => 'alpha_num',
            'max' => 'alpha_num',
            'hotel_id' => 'alpha_num',
            'quantity'=> 'alpha_num',
            'dateStart'=>'date',
            'dateEnd'=>'date',
        ];
    }
    
    public function messages(){
        return [
            'name.required'   => 'lỗi',
           ];
    }

}