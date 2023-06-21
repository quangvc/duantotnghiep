<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateCommentRequest;
use App\Http\Resources\API\CommentResource;
use App\Models\Comment;
use Illuminate\Http\Request;
use App\Traits\MessageStatusAPI;

class CommentController extends Controller
{
    //
    public function index(){
        $comment = Comment::all();
        return CommentResource::collection($comment);
    }
    public function store(CreateCommentRequest $request){
        $data = $request->all();
        $comment = Comment::create($data);
        return MessageStatusAPI::store($comment);
    }
    public function update(CreateCommentRequest $request, $id){
        $comment = Comment::find($id);
        $comment->update($request->all());
        return MessageStatusAPI::update();
    }
    public function destroy($id){
        $comment = Comment::findOrFail($id);
        $comment->delete();
        return MessageStatusAPI::destroy();
    }
    public function show($id){
        $comment = Comment::find($id);
        if ($comment) {
            return new CommentResource($comment);
        } else {
            return MessageStatusAPI::notFound();
        }
    }
}
