<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Carbon\Carbon;

class Session extends Model
{
    protected $fillable = ['date', 'start_time', 'end_time', 'status', 'course_id'];

    // Mutator to format start_time
    public function getStartTimeAttribute($value)
    {
        return Carbon::parse($value)->format('h:i A'); // Converts to 12-hour format
    }

    // Mutator to format end_time
    public function getEndTimeAttribute($value)
    {
        return $value ? Carbon::parse($value)->format('h:i A') : null; // Converts to 12-hour format
    }
}

