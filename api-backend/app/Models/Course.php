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

    /**
     * Get the enrollments for the course
     */
    public function enrollments()
    {
        return $this->hasMany(\App\Models\Enrollment::class, 'course_id');
    }

    /**
     * Get the students enrolled in this course through enrollments
     */
    public function students()
    {
        return $this->belongsToMany(\App\Models\User::class, 'enrollments', 'course_id', 'student_id');
    }
}