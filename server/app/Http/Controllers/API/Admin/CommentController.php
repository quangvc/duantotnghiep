<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateCommentRequest;
use App\Http\Resources\API\CommentResource;
use App\Models\Comment;
use Illuminate\Http\Request;
use App\Traits\MessageStatusAPI;
use Illuminate\Support\Facades\DB;

class CommentController extends Controller
{
    //
    public function index()
    {
        $comment = Comment::all();
        return CommentResource::collection($comment);
    }
    public function store(CreateCommentRequest $request)
    {

        $validatedData = $request->validate([
            'content' => 'required',
            'rating' => 'required|integer|min:1|max:5',
            'blog_id' => 'required|integer|exists:tbl_blogs,id'
        ]);
        $user_id = auth()->user()->id;

        $comment = new Comment;
        $comment->user_id = $user_id;
        $comment->content = $validatedData['content'];
        $comment->rating = $validatedData['rating'];
        $comment->blog_id = $validatedData['blog_id'];
        $comment->save();

        return response()->json(['message' => 'Comment created successfully.']);
    }
    public function update(CreateCommentRequest $request, $id)
    {
        $cmt = Comment::find($id);
        $user_id = auth()->user()->id;
        if ($user_id !== $cmt->user_id) {
            return MessageStatusAPI::notFound();
        }
        $cmt->update($request->all());
        return MessageStatusAPI::update();
    }
    public function destroy($id)
    {
        $cmt = Comment::find($id);
        $user_id = auth()->user()->name;
        if ($user_id !== 'Admin') {
            return MessageStatusAPI::notFound();
        }
        $cmt->delete();
        return MessageStatusAPI::destroy();
    }
}
