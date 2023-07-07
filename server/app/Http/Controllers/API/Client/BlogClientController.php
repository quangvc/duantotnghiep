<?php

namespace App\Http\Controllers\API\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateBlogRequest;
use App\Http\Resources\API\BlogResource;
use App\Models\Blog;
use Illuminate\Http\Request;
use App\Traits\MessageStatusAPI;
use Illuminate\Support\Str;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;

class BlogClientController extends Controller
{
    public function index()
    {
        $blog = Blog::where('active', '=', '1')->get();
        return BlogResource::collection($blog);
    }
    public function show($slug)
    {
        $blog = Blog::where('active', '=', '1')->where('slug', $slug)->first();
        if ($blog) {
            return new BlogResource($blog);
        } else {
            return MessageStatusAPI::notFound();
        }
    }
}
