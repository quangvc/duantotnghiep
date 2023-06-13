<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateBlogRequest;
use App\Models\Blog;
use Illuminate\Http\Request;
use App\Traits\MessageStatusAPI;
use Illuminate\Http\Response;

class BlogController extends Controller
{
    public function index(){
        $blog = Blog::all();
        return response()->json($blog ,200);
    }
    public function create(CreateBlogRequest $request){
        $data = $request->all();
        $blog = Blog::create($data);
        return MessageStatusAPI::store();
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
}
