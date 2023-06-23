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
        
        //sửa bảng comment
        Schema::table('tbl_comment', function (Blueprint $table) {
            $table->integer('user_id')->after('id');
            $table->integer('blog_id')->after('user_id');
        });
        //sửa bảng comment
        Schema::table('tbl_blogs', function (Blueprint $table) {
            $table->string('slug')->nullable()->after('title');
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
