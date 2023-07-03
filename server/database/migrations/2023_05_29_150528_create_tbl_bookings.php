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
            $table->integer('user_id');
            $table->dateTime('checkin_date');
            $table->dateTime('checkout_date');
            $table->integer('people_quantity');
            $table->integer('coupon_id')->nullable();
            $table->text('note')->nullable();
            $table->string('guest_name');
            $table->string('guest_email')->nullable();
            $table->string('guest_phone')->nullable();
            $table->integer('total_price')->nullable();
            $table->integer('comment_id');
            $table->tinyInteger('status')->default(1);
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
