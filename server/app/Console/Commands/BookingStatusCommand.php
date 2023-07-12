<?php

namespace App\Console\Commands;

use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use App\Mail\BookingStatusNotification;

class BookingStatusCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:booking_checkStatus';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $bookings = Booking::whereDate('checkout_date', '<=', Carbon::now())
            ->where('status', '=', '1')
            ->get();
        foreach ($bookings as $booking) {
            $booking->update(['status' => '0']);
            Mail::to($booking->guest_email)->send(new BookingStatusNotification($booking));
        }
    }
}
