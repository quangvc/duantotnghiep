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
        Schema::create('tbl_bookings', function (Blueprint $table) {
            $table->id();
            $table->dateTime('booking_date');
            $table->dateTime('checkin_date');
            $table->dateTime('checkout_date');
            $table->integer('people_quantity');
            $table->integer('coupon_id')->nullable();
            $table->integer('user_id');
            $table->string('guest_name');
            $table->string('guest_email');
            $table->string('guest_phone');
            $table->text('note')->nullable();
            $table->integer('comment_id');
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
        Schema::dropIfExists('tbl_bookings');
    }
};
