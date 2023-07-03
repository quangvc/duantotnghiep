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
        Schema::create('tbl_hotels', function (Blueprint $table) {
            $table->id();
            $table->string('hotel_name', 255);
            $table->string('hotel_phone', 255);
            $table->string('hotel_address', 255);
            $table->text('description');
            $table->tinyInteger('star_rating');
            $table->integer('region_id');
            $table->tinyInteger('status');
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
        Schema::dropIfExists('tbl_hotels');
    }
};
