<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateCommentRequest;
use App\Http\Resources\API\CommentResource;
use App\Models\Comment;
use Illuminate\Http\Request;
use App\Traits\MessageStatusAPI;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CommentClientController extends Controller
{
    //
    public function index()
    {
        $comment = Comment::all();
        return CommentResource::collection($comment);
    }
    public function store(CreateCommentRequest $request)
    {
        if(Auth::check()){
            $userId = auth()->user()->id;
            // Lưu bình luận vào cơ sở dữ liệu
            $comment = new Comment;
            $comment->content = $request->input('content');
            $comment->blog_id = $request->input('blog_id');
            $comment->user_id = $userId;
            $comment->save();
        
            // Trả về phản hồi thành công
            return response()->json(['message' => 'Bình luận đã được thêm thành công'], 201);
        }else{
            return response()->json(['message' => 'Bạn cần đăng nhập để thêm bình luận'], 401);
        }
    
    }
}
