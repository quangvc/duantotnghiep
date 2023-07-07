<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class KeywordCheckMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $keywords = ['bad', 'inappropriate', 'sex', 'http', 'shope', 'địt mẹ']; // Các từ khóa cần kiểm tra

        $content = $request->input('content'); // Giả sử nội dung cần kiểm tra là trường 'content'

        foreach ($keywords as $keyword) {
            if (stripos($content, $keyword) !== false) {
                // Nếu tìm thấy từ khóa trong nội dung, bạn có thể xử lý tùy ý, ví dụ: trả về mã lỗi hoặc thông báo
                return response()->json(['error' => 'Bình luận của bạn vi phạm tiêu chuẩn của chúng tôi.'], 400);
            }
        }
        return $next($request);
    }
}
