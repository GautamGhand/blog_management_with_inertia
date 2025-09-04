<?php

namespace App\Http\Controllers\Web\Comment;

use App\Http\Controllers\Controller;
use App\Http\Requests\Web\Comment\CommentStoreRequest;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class CommentController extends Controller
{
    public function store(CommentStoreRequest $request,$post_id){
        $post = Post::where('id',$post_id)->firstOrFail();
        $post->comments()->create([
            'user_id' => Auth::id(),
            'post_id' => $post->id,
            'comment' => $request->comment
        ]);

        return Redirect::back()->withSuccess('Comment Created Successfully');
    }
}
