<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateBlogRequest;
use App\Http\Resources\API\BlogResource;
use App\Models\Blog;
use Illuminate\Http\Request;
use App\Traits\MessageStatusAPI;
use Illuminate\Support\Str;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;
use App\Enums\StatusEnum;

class BlogController extends Controller
{
    public function index()
    {
        $blog = Blog::all();
        return BlogResource::collection($blog);
    }

    public function store(CreateBlogRequest $request)
    {
        $request;
        $user_id = auth()->user()->id;
        $validated = $request->validated();
        $blog = new Blog([
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']),
            'content' => $validated['content'],
            'user_id' => $user_id,
        ]);
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '.' . $image->getClientOriginalExtension();
            $path = public_path('Images/blog');
            $image->move($path, $filename);
            $image = url('public/Images/blog' . $filename);
            $blog->image = $filename;
        }
        $blog->save();
        return MessageStatusAPI::store();
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'title'     => 'unique:tbl_blogs,title,' . $request->id,
            'content'   =>  'string',
            'image'     =>  'bail|image|max:2048|mimes:jpeg,png,jpg|mimetypes:image/jpeg,image/png,image/jpg',
        ]);

        $blog = Blog::find($id);
        $user_id = auth()->user()->id;
        if (!$user_id) {
            return MessageStatusAPI::displayInvalidInput($blog);
        }
        if ($user_id !== $blog->user_id) {
            return MessageStatusAPI::notFound();
        }
        if ($request->has('title')) {
            $blog->slug = Str::slug($request->title);
        }
        if ($request->hasFile('image')) {
            if ($blog->image != '' && file_exists(public_path('Images/blog/' . $blog->image))) {
                unlink(public_path('Images/blog/' . $blog->image));
            }
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
        if ($blog->image != '' && file_exists(public_path('Images/blog/' . $blog->image))) {
            unlink(public_path('Images/blog/' . $blog->image));
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

    public function changeStatus($id)
    {
        $blog = Blog::find($id);
        if ($blog->active == StatusEnum::DEACTIVE) {
            $blog->update(['active' => StatusEnum::ACTIVE]);
        } else {
            $blog->update(['active' => StatusEnum::DEACTIVE]);
        }

        return response([
            'message' => 'Changed status successfully',
        ], 200);
    }
}

