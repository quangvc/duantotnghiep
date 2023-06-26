<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SupportRequest extends FormRequest
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
            'name' => 'required|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|regex:/^([0-9\s\-\+\(\)]*)$/|min:10',
            'content' => 'required|max:1000',
            'status' => 'required|in:pending,approved,denied',
        ];
    }
    public function messages()
    {
       return [
        'name.required' => 'lỗi',
        'email.required' => 'lỗi',
        'phone.required' => 'lỗi',
        'content.required' => 'lỗi',
        'status.required' => 'lỗi',
       ];
    }
}
