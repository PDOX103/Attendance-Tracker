<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAttendancesTable extends Migration
{
    public function up()
    {
        Schema::create('attendances', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->foreignId('session_id')->constrained('sessions')->onDelete('cascade'); // Session foreign key
            $table->foreignId('enrollment_id')->constrained('enrollments')->onDelete('cascade'); // Enrollment foreign key
            $table->boolean('present')->default(false); // Attendance status
            $table->timestamps(); // Created and updated timestamps
        });
    }

    public function down()
    {
        Schema::dropIfExists('attendances');
    }
}