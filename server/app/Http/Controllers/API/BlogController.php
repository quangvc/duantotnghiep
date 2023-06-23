<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateBlogRequest;
use App\Http\Resources\API\BlogResource;
use App\Models\Blog;
use Illuminate\Http\Request;
use App\Traits\MessageStatusAPI;
use Illuminate\Support\Str;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;

class BlogController extends Controller
{
    public function index()
    {
        $blog = Blog::all();
        return BlogResource::collection($blog);
    }
    public function store(CreateBlogRequest $request)
    {
        $user_id = auth()->user()->id;
        $validated = $request->validated();
        $blog = new Blog([
            'title' => $validated['title'],
            // 'slug' => Str::slug($validated['title']),
            'content' => $validated['content'],
            'image' => $validated['image'],
            'user_id' => $user_id,
        ]);
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '.' . $image->getClientOriginalExtension();
            // $image->storeAs('public/Images/blog', $image);
            $path = public_path('Images/blog');
            $image->move($path, $filename);
            $image = url('public/Images/blog' . $filename);
            $blog->image = $filename;
        }
        $blog->save();
        return MessageStatusAPI::store();
    }
    public function update(CreateBlogRequest $request, $id)
    {
        $request->validate([
            // 'title' => [Rule::unique('tbl_blogs')->ignore($request->id),]
            'title'     => 'required|unique:tbl_blogs,title,' . $request->id,
        ]);
        $blog = Blog::find($id);
        $user_id = auth()->user()->id;
        if (!$user_id) {
            return MessageStatusAPI::displayInvalidInput($blog);
        }
        if ($user_id !== $blog->user_id) {
            return MessageStatusAPI::notFound();
        }
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '.' . $image->getClientOriginalExtension();
            $path = public_path('Images/blog');
            $image->move($path, $filename);
            $image = url('public/Images/blog' . $filename);
            $blog->image = $filename;
        }
        $blog->update($request->all());
        return MessageStatusAPI::update();
    }
    public function destroy($id)
    {
        $blog = Blog::find($id);
        $user_id = auth()->user()->id;
        if (!$user_id) {
            return MessageStatusAPI::displayInvalidInput($blog);
        }
        if ($user_id !== $blog->user_id) {
            return MessageStatusAPI::notFound();
        }
        $blog->delete();
        return MessageStatusAPI::destroy();
    }
    public function show($id)
    {
        $blog = Blog::find($id);
        if ($blog) {
            return new BlogResource($blog);
        } else {
            return MessageStatusAPI::notFound();
        }
    }
}
