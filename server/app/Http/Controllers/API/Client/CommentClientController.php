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
    public function index($blog_id)
    {
        $comment = Comment::where('blog_id', '=', $blog_id)->get();
        return CommentResource::collection($comment);
    }
    public function store(CreateCommentRequest $request)
    {
        if (Auth::check()) {
            $userId = auth()->user()->id;
            // Lưu bình luận vào cơ sở dữ liệu
            $comment = new Comment;
            $comment->content = $request->input('content');
            $comment->blog_id = $request->input('blog_id');
            $comment->user_id = $userId;
            $comment->save();

            // Trả về phản hồi thành công
            return response()->json(['message' => 'Bình luận đã được thêm thành công'], 201);
        } else {
            return response()->json(['message' => 'Bạn cần đăng nhập để thêm bình luận'], 401);
        }
    }
    public function listReply($parent_id)
    {
        if ($parent_id) {
            $reply = Comment::where('parent_id', '=', $parent_id)->get();
            return CommentResource::collection($reply);
        }
        return MessageStatusAPI::notFound();
    }
    public function reply(Request $request, $id)
    {
        if (Auth::check()) {
            $parentComment = Comment::find($id);
            // Lấy ID của người dùng hiện tại
            $userId = auth()->user()->id;

            // Lưu bình luận trả lời vào cơ sở dữ liệu
            $reply = new Comment;
            $reply->content = $request->input('content');
            $reply->blog_id = $request->input('blog_id');
            $reply->user_id = $userId;

            // Lưu ID của bình luận cha
            $reply->parent_id = $parentComment->id;

            $reply->save();

            // Trả về phản hồi thành công
            return response()->json(['message' => 'Trả lời bình luận thành công'], 201);
        } else {
            // Trả về phản hồi lỗi nếu người dùng chưa đăng nhập
            return response()->json(['message' => 'Bạn cần đăng nhập để trả lời bình luận'], 401);
        }
    }
}
