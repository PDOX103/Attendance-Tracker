<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentMarksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('student_marks', function (Blueprint $table) {
            $table->id();
            $table->string('student_id'); // Match with your student ID format
            $table->foreignId('course_id')->constrained('courses')->onDelete('cascade');
            $table->decimal('mark', 5, 2); // Supports marks like 99.99
            $table->integer('mark_out_of'); // 10 or 20
            $table->timestamps();
            
            // Ensure one mark per student per course
            $table->unique(['student_id', 'course_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('student_marks');
    }
}