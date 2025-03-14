<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;
    protected $fillable = ['course_no', 'course_title', 'status', 'instructor_id', 'unique_code'];

    public function instructor()
    {
        return $this->belongsTo(User::class, 'instructor_id');
    }

    public function sessions()
    {
        return $this->hasMany(Session::class, 'course_id');
    }
    
}
