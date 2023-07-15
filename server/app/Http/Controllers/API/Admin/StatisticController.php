<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\BookingDetail;
use App\Models\User;
use Carbon\Carbon;

class StatisticController extends Controller
{
    // thống kê doanh thu ngày theo trong thời gian 
    public function filter_by_date($date_from, $date_to) {
        $revenue = [];
        $start_date = Carbon::parse($date_from);
        $end_date = Carbon::parse($date_to);
        if ($end_date->diffInDays($start_date) > 35) {
            return response('Khoảng thời gian quá rộng. Vui lòng thu hẹp khoảng thời gian');
        }
        while ($start_date->lte($end_date)) {
            $revenue[$start_date->toDateString()] = Booking::whereIn('status', [1, 3])
                ->whereDate('checkin_date', $start_date)
                ->sum('total_price');

            $start_date->addDay();
        }

        return $revenue;
    }

    // thống kê doanh thu hàng tháng
    public function monthly_revenue() {
        $revenue = [];
        for ($i = 11; $i >= 0; $i--) {
            $month = now()->subMonths($i)->format('M');
            $revenue[$month] = Booking::whereIn('status', [1,3])
                ->whereMonth('checkin_date', now()->subMonths($i)->month) 
                ->sum('total_price');
        }
        return $revenue;
    }

    // đếm số user mới
    public function countUsers() {
        $countUsers = User::where('created_at', '>', now()->subMonth())
        ->count();
        return $countUsers;
    }

    // doanh thu trong 1 tháng gần nhất
    public function lastMonthRevenue() {
        $lmRevenue = Booking::whereIn('status', [1,3])
        ->where('created_at', '>', now()->subMonth())
        ->sum('total_price');
        return $lmRevenue;
    }

    // doanh thu trong 1 tháng gần nhất
    public function lmCountBooking() {
        $lmRevenue = Booking::whereIn('status', [1,3])
        ->where('created_at', '>', now()->subMonth())
        ->sum('total_price');
        return $lmRevenue;
    }

    // số phòng cho thuê trong 1 tháng gần nhất
    public function lastMonthCountRooms() {
        $lmcRooms = BookingDetail::whereHas('booking', function ($query) {
            $query->where('created_at', '>', now()->subMonth());
        })->count();
        return $lmcRooms;
    }

}
