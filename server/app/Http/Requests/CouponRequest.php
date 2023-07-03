<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Enums\CouponTypeEnum;
use Illuminate\Validation\Rule;

class CouponRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'bail|required|string|max:50',
            'type' => ['required', Rule::in(CouponTypeEnum::arrEnums())],
            'value' => 'bail|required|',
            'min' => 'bail|required|min:0|numeric',
            'max' => 'bail|numeric',
            'hotel_id' => 'bail|required|alpha_num',
            'quantity' => 'bail|required|numeric',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ];
    }

    public function messages()
    {
        $required = 'Vui lòng nhập dữ liệu';
        return [
            'name.required'   => $required,
            'name.max'   => 'Vui lòng nhập dưới 50 ký tự',

            'type.required'   => $required,
            'type.max'   => 'Vui lòng nhập dưới 255 ký tự',

            'value.required'   => $required,

            'min.required'   => $required,
            'min.numeric'   => 'Vui lòng nhập số',
            'min.min'   => 'Giá trị nhỏ nhất là 0',

            'max.required'   => $required,
            'max.numeric'   => 'Vui lòng nhập số',

            'hotel_id.required'   => $required,

            'quantity.required'   => $required,

            'start_date.required'   => $required,

            'end_date.required'   => $required,
        ];
    }
}
