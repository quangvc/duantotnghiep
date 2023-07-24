<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Booking;
use Illuminate\Support\Facades\Auth;
use App\Models\RoomType;

class StaticController extends Controller
{
    public function index(Request $request)
    {
        // Lấy ID của tài khoản đang đăng nhập
        $accountId = $request->user()->id;
        // Tính tổng tiền các booking của tài khoản đang đăng nhập
        $tongTien = Booking::where('user_id', $accountId)->sum('total_price');

        // tổng đơn các booking của tài khoản đang đăng nhập
        $count = Booking::where('user_id', $accountId)->count();
        // tổng giá tiền và đơn theo loại phòng của tài khoản đang đăng nhập
        $revenueByRoomType = DB::table('tbl_bookings')
        ->join('tbl_rooms', 'tbl_bookings.booking_number', '=', 'tbl_rooms.id')
        ->join('tbl_room_types', 'tbl_rooms.room_type_id', '=', 'tbl_room_types.id')
        ->select('tbl_room_types.name', DB::raw('count(tbl_room_types.name) as tong_don'), DB::raw('SUM(tbl_bookings.total_price) as tong_tien'))
        ->where('tbl_bookings.user_id', $accountId)
        ->groupBy('tbl_room_types.name')
        ->get();

        return response()->json(['tong tien' => $tongTien,
                                 'tong don' => $count,
                                'tong tien loai phong' => $revenueByRoomType,
                                 ]);
    }
    public function revenueByDay(Request $request, $date)
    {
        // Lấy ID của tài khoản đang đăng nhập
        $accountId = $request->user()->id;
        $typeNames = DB::table('tbl_bookings')
        ->join('tbl_rooms', 'tbl_bookings.booking_number', '=', 'tbl_rooms.id')
        ->join('tbl_room_types', 'tbl_rooms.room_type_id', '=', 'tbl_room_types.id')
        ->select('tbl_bookings.created_at','tbl_room_types.name', DB::raw('COUNT(tbl_room_types.name) as don'), DB::raw('sum(tbl_bookings.total_price) as tong_tien'))
        ->whereDate('tbl_bookings.created_at', '=', $date)
        ->where('tbl_bookings.user_id', $accountId)
        ->groupBy('tbl_bookings.created_at','tbl_room_types.name')
        ->get();
        $revenus = 0;
        $oder = 0;
        foreach ($typeNames as $value){
            $revenus += $value->tong_tien;
            $oder += $value->don;
        }
        return response()->json(['don theo ngay' => $typeNames,'tong tien theo ngay'=>$revenus, 'tong don theo ngay' =>$oder],);
    }
   
    }