<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateCommentRequest extends FormRequest
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
            'content' => 'required',
            'blog_id' => 'required|integer|exists:tbl_blogs,id',
            // 'cmt_id' => 'exists:tbl_comments,id',
        ];
    }
    public function messages()
    {
        return [
            'content.required' => 'Vui lòng nhập bình luận',
            'blog_id.required' => 'Vui lòng không bỏ trống blog_id',
        ];
    }
}
