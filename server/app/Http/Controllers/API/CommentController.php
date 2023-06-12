<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateCommentRequest;
use App\Models\Comment;
use Illuminate\Http\Request;
use App\Traits\MessageStatusAPI;

class CommentController extends Controller
{
    //
    public function index(){
        $comment = Comment::all();
        return response()->json($comment ,200);
    }
    public function create(CreateCommentRequest $request){
        $data = $request->all();
        $comment = Comment::create($data);
        return MessageStatusAPI::store();
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
}
