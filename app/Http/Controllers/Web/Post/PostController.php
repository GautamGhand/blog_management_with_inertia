<?php

namespace App\Http\Controllers\Web\Post;

use App\Http\Controllers\Controller;
use App\Http\Requests\Web\Post\PostCreateRequest;
use App\Http\Requests\Web\Post\PostUpdateRequest;
use App\Models\Post;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class PostController extends Controller
{
    use AuthorizesRequests;
    public function index()
    {
        $posts = Post::with(['user'])->paginate(10);
        $posts->getCollection()->transform(function ($post) {
            return [
                'id' => $post->id,
                'title' => $post->title,
                'description' => $post->description,
                'user' => $post->user,
                'can_update' => auth()->user()->can('update', $post),
                'can_delete' => auth()->user()->can('delete', $post),
            ];
        });
        return Inertia::render('Posts/Index', [
            'posts' => $posts
        ]);
    }
    public function show($id)
    {
        $post = Post::with(['comments'])->where('id', $id)->firstOrFail();
        return Inertia::render('Posts/Show', [
            'brief_post' => $post
        ]);
    }
    public function create()
    {
        return Inertia::render('Posts/Create');
    }
    public function store(PostCreateRequest $request)
    {
        Post::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'description' => $request->description
        ]);

        return Redirect::route('posts.index')->withSuccess('Post Created Successfully');
    }
    public function edit(Post $post)
    {
        $this->authorize('update', $post);
        return Inertia::render('Posts/Edit', [
            'post' => $post
        ]);
    }
    public function update(PostUpdateRequest $request, Post $post)
    {
        $this->authorize('update', $post);
        $post->update([
            'title' => $request->title,
            'description' => $request->description
        ]);

        return Redirect::route('posts.index')->withSuccess('Post Updated Successfully');
    }
    public function delete(Post $post)
    {
        $this->authorize('delete', $post);
        $post->delete();
        return Redirect::route('posts.index')->withSuccess('Post Deleted Successfully');
    }
}
