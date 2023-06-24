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
        Schema::table('tbl_booking_detail', function (Blueprint $table) {
            $table->dateTime('booking_date')->after('room_type_id');
            $table->dateTime('checkin_date')->after('booking_date');
            $table->dateTime('checkout_date')->after('checkin_date');
            $table->integer('quantity')->after('checkout_date');
        });
        Schema::table('tbl_bookings', function (Blueprint $table) {
            $table->dropColumn('booking_date');
            $table->dropColumn('checkin_date');
            $table->dropColumn('checkout_date');
            $table->double('total_price', 16, 2);
        });
        Schema::table('tbl_room_types', function (Blueprint $table) {
            $table->integer('hotel_id')->after('id');
            $table->integer('room_quantity')->after('name');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
