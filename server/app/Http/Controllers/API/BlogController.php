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
        
        $data = $request->all();
        $blog = Blog::create($data);
        return MessageStatusAPI::store($blog);
    }
    public function update(CreateBlogRequest $request, $id){
        $blog = Blog::find($id);
        $blog->update($request->all());
        return MessageStatusAPI::update();
    }
    public function destroy($id){
        $blog = Blog::findOrFail($id);
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
