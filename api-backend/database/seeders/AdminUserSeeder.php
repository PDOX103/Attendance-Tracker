<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run()
{
    // Check if the admin user already exists
    $adminUser = DB::table('users')->where('name', 'Priyom Parial')->first();
    
    if (!$adminUser) {
        // Log or dump for debugging
        \Log::info('Creating admin user');
        
        DB::table('users')->insert([
            'name' => 'Priyom Parial',
            'email'=> 'priyomparial17@gmail.com',
            'password' => Hash::make(env('ADMIN_PASSWORD')), // Hash the password
            'role' => 'admin',
        ]);
    } else {
        \Log::info('Admin user already exists');
    }
}
}