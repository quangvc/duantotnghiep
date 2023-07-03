<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    use HasFactory;
    protected $table = 'tbl_comments';

    protected $fillable = [
        'user_id', 'parent_id', 'blog_id', 'content', 'rating',
    ];

    public function blog(): belongsTo
    {
        return $this->belongsTo(Blog::class);
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

}
