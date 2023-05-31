<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_users', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);

            $table->string('email')->unique()->nullable();
            $table->string('password', 255);
            $table->boolean('gender')->nullable();
            $table->string('phone_number')->unique()->nullable();
            $table->string('avatar', 255);
            $table->tinyInteger('role')->default(1);
            $table->integer('hotel_id');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbl_users');
    }
};
