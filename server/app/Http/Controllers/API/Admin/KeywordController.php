<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Keyword;
use App\Traits\MessageStatusAPI;

class KeywordController extends Controller
{
    public function index() {
        $keywords = Keyword::pluck('keyword');
        return $keywords;
    }

    public function show() {
        $keywords = Keyword::all();
        return $keywords;
    }

    public function store(Request $request) {
        Keyword::create(['keyword' => $request->keyword]);
        return MessageStatusAPI::store();
    }

    public function destroy($id) {
        Keyword::destroy($id);
        return MessageStatusAPI::destroy();
    }
}
