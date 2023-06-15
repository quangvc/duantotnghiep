<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateBlogRequest;
use App\Http\Resources\API\BlogResource;
use App\Models\Blog;
use Illuminate\Http\Request;
use App\Traits\MessageStatusAPI;
use Illuminate\Http\Response;

class BlogController extends Controller
{
    public function index(){
        $blog = Blog::all();
        return BlogResource::collection($blog);
    }
    public function store(CreateBlogRequest $request){
        $user_id = auth()->user()->id;
        $validated = $request->validated();
        $blog = new Blog([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'user_id' => $user_id,
        ]);
        $blog->save();
        return MessageStatusAPI::store();
       
    }
    public function update(CreateBlogRequest $request, $id){
        $blog = Blog::find($id);
        $user_id = auth()->user()->id;
        if(!$user_id){
            return MessageStatusAPI::displayInvalidInput($blog);
        }
        if($user_id !== $blog->user_id){
            return MessageStatusAPI::notFound();
        }
        $blog->update($request->all());
        return MessageStatusAPI::update();
    }
    public function destroy($id){
        $blog = Blog::find($id);
        $user_id = auth()->user()->id;
        if(!$user_id){
            return MessageStatusAPI::displayInvalidInput($blog);
        }
        if($user_id !== $blog->user_id){
            return MessageStatusAPI::notFound();
        }
        $blog->delete();
        return MessageStatusAPI::destroy();
    }
    public function show($id){
        $blog = Blog::find($id);
        if ($blog) {
            return new BlogResource($blog);
        } else {
            return MessageStatusAPI::notFound();
        }
    }
}
