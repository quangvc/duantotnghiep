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
        $request->validated();
        $validated = request()->all();
        $user_id = auth()->user()->id;

        $comment = new Comment;
        $comment->user_id = $user_id;
        $comment->content = $validated['content'];
        $comment->blog_id = $validated['blog_id'];

        if ($request->has('cmt_id')) {
            $comment->parent_id = $request->cmt_id;
        }

        $comment->save();
        return MessageStatusAPI::store();
    }
    // public function update(CreateCommentRequest $request, $id)
    // {
    //     $cmt = Comment::find($id);
    //     $user_id = auth()->user()->id;
    //     if ($user_id !== $cmt->user_id) {
    //         return MessageStatusAPI::notFound();
    //     }
    //     $cmt->update($request->all());
    //     return MessageStatusAPI::update();
    // }
    public function destroy($id)
    {
        $cmt = Comment::find($id);
        $role = auth()->user()->getRoleNames()->first();
        if ($role == 'Admin' || auth()->user()->id == $cmt->blog->user_id) { // $cmt->user()->id == $cmt->user_id
            $cmt->delete();
            return MessageStatusAPI::destroy();
        }
        return abort(403, 'Forbidden: You don’t have permission');
    }
}
