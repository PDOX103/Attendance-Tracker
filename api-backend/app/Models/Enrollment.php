<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'course_id',
        'enrolled_at'
    ];

    protected $dates = [
        'enrolled_at'
    ];

    /**
     * Get the course that owns the enrollment
     */
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Get the user (student) that owns the enrollment
     * This is the missing relationship that's causing the error
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'student_id', 'id');
    }

    /**
     * Alternative: Get the student that owns the enrollment
     */
    public function student()
    {
        return $this->belongsTo(User::class, 'student_id', 'id');
    }
}
