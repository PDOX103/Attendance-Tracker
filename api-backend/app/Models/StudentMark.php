<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentMark extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'course_id', 
        'mark',
        'mark_out_of'
    ];

    protected $casts = [
        'mark' => 'decimal:2',
        'mark_out_of' => 'integer'
    ];

    /**
     * Get the course that owns the mark
     */
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Get the user (student) that owns the mark
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'student_id', 'id');
    }
}