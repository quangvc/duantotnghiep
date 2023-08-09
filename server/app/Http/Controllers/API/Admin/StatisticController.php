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
    // thống kê doanh thu ngày trong khoảng thời gian 
    public function filter_by_date($date_from, $date_to) {
        $revenue = [];
        $start_date = Carbon::parse($date_from);
        $end_date = Carbon::parse($date_to);
        if ($end_date->diffInDays($start_date) > 35) {
            return response('Khoảng thời gian quá rộng. Vui lòng thu hẹp khoảng thời gian');
        }
        $role = auth()->user()->getRoleNames()->first();
        if ($role == 'admin') {
            while ($start_date->lte($end_date)) {
                $revenue[$start_date->toDateString()] = Booking::whereIn('status', [1, 3])
                    ->whereDate('created_at', $start_date)
                    ->sum('total_price');
    
                $start_date->addDay();
            }
        } elseif ($role == 'manager') {
            while ($start_date->lte($end_date)) {
                $revenue[$start_date->toDateString()] = Booking::whereHas('booking_details.room_type.hotel', function ($query) {
                $query->where('id', auth()->user()->hotel_id);
            })->with('booking_details.room_type.hotel')
                ->whereIn('status', [1, 3])
                    ->whereDate('created_at', $start_date)                    
                    ->sum('total_price');
    
                $start_date->addDay();
            }
        }       

        return $revenue;
    }

    // thống kê doanh thu hàng tháng
    public function monthly_revenue() {
        $revenue = [];
        $role = auth()->user()->getRoleNames()->first();
        for ($i = 11; $i >= 0; $i--) {
            $month = now()->subMonths($i)->format('M');
            if ($role == 'admin') {
                $revenue[$month] = Booking::whereIn('status', [1,3])
                ->whereMonth('created_at', now()->subMonths($i)->month) 
                ->sum('total_price');
            } elseif ($role == 'manager') {
                $revenue[$month] = Booking::whereHas('booking_details.room_type.hotel', function ($query) {
                    $query->where('id', auth()->user()->hotel_id);
                })->with('booking_details.room_type.hotel')
                ->whereIn('status', [1,3])
                ->whereMonth('created_at', now()->subMonths($i)->month) 
                ->sum('total_price');
            }            
            
        }
        return $revenue;
    }

    // thống kê số phòng đã cho thuê hàng tháng
    public function monthly_rooms() {
        $countBookingRevenue = [];
        $role = auth()->user()->getRoleNames()->first();
        for ($i = 11; $i >= 0; $i--) {
            $month = now()->subMonths($i)->format('M');
            if ($role == 'admin') {
                $countBookingRevenue[$month] = BookingDetail::whereHas('booking', function ($query) use ($i) {
                    $query->whereMonth('created_at', now()->subMonths($i)->month)
                    ->whereIn('status', [1,3]);
                })                
                ->count();
            } elseif ($role == 'manager') {
                $countBookingRevenue[$month] = BookingDetail::whereHas('room_type.hotel', function ($query) {
                    $query->where('id', auth()->user()->hotel_id);
                })->with('room_type.hotel')            
                ->whereHas('booking', function ($query) use ($i) {
                    $query->whereMonth('created_at', now()->subMonths($i)->month)
                    ->whereIn('status', [1,3]);
                })                
                ->count();
            }
            
        }
        return $countBookingRevenue;
    }

    // đếm số user mới
    public function countUsers() {
        $countUsers = User::where('created_at', '>', now()->subMonth())
        ->count();
        return $countUsers;
    }

    // doanh thu trong 1 tháng gần nhất
    public function lastMonthRevenue() {
        $role = auth()->user()->getRoleNames()->first();
        if ($role == 'admin') {
            $lmRevenue = Booking::whereIn('status', [1,3])
            ->where('created_at', '>', now()->subMonth())
            ->sum('total_price');
        } elseif ($role == 'manager') {
            $lmRevenue = Booking::whereHas('booking_details.room_type.hotel', function ($query) {
                $query->where('id', auth()->user()->hotel_id);
            })->with('booking_details.room_type.hotel')  
            ->whereIn('status', [1,3])
            ->where('created_at', '>', now()->subMonth())
            ->sum('total_price');
        }       

        return $lmRevenue;
    }

    // số booking trong 1 tháng gần nhất
    public function lmCountBooking() {
        $role = auth()->user()->getRoleNames()->first();
        if ($role == 'admin') {
            $lmCountBooking = Booking::whereIn('status', [1,3])
            ->where('created_at', '>', now()->subMonth())
            ->count();
        } elseif ($role == 'manager') {
            $lmCountBooking = Booking::whereHas('booking_details.room_type.hotel', function ($query) {
                $query->where('id', auth()->user()->hotel_id);
            })->with('booking_details.room_type.hotel')
            ->whereIn('status', [1,3])
            ->where('created_at', '>', now()->subMonth())
            ->count();
        }
        
        return $lmCountBooking;
    }

    // số phòng cho thuê trong 1 tháng gần nhất
    public function lastMonthCountRooms() {
        $role = auth()->user()->getRoleNames()->first();
        if ($role == 'admin') {
            $lmcRooms = BookingDetail::whereHas('booking', function ($query) {
                $query->where('created_at', '>', now()->subMonth());
            })->count();
        } elseif ($role == 'manager') {
            $lmcRooms = BookingDetail::whereHas('room_type.hotel', function ($query) {
                $query->where('id', auth()->user()->hotel_id);
            })->with('room_type.hotel')          
                ->whereHas('booking', function ($query) {
                $query->where('created_at', '>', now()->subMonth());
            })->count();
        }

        return $lmcRooms;
    }

}
