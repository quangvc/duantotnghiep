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
        // sửa bảng booking
        Schema::table('tbl_bookings', function (Blueprint $table) {
            $table->dropColumn('comment_id');
        });
        // tạo bảng feedBacks
        Schema::create('tbl_feedbacks', function (Blueprint $table) {
            $table->id();
            $table->integer('booking_id');
            $table->text('content');
            $table->integer('rating');
            $table->timestamps();
        });
        //sửa bảng comment
        Schema::table('tbl_comment', function (Blueprint $table) {
            $table->integer('user_id')->after('id');
            $table->integer('blog_id')->after('user_id');
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
