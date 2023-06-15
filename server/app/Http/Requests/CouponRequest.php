<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CouponRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => 'max:255',
            'type' => 'max:255',
            'value' => 'alpha_num|min:1|max:2',
            'min' => 'alpha_num|min:1|max:2',
            'max' => 'alpha_num|min:1|max:2',
        ];
    }
}