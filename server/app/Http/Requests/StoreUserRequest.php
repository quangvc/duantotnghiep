<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Enums\StatusEnum;
use Illuminate\Validation\Rule;

class StoreUserRequest extends FormRequest
{
    /**
     * Indicates if the validator should stop on the first rule failure.
     *
     * @var bool
     */
    protected $stopOnFirstFailure = true;

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
            'name' => 'required|string|min:6|max:50',
            'email' => 'required_without:phone|email|unique:tbl_users,email',
            'phone_number' => 'required_without:email|unique:tbl_users,phone_number|numeric|digits_between:9,12',
            'password' => 'required|confirmed',
            'active' =>  [Rule::in(StatusEnum::arrEnums())],
        ];
    }

    public function messages()
{
    return [
        'name.required' => 'A name is required',
        'password.required' => 'A password is required',
    ];
}
}
