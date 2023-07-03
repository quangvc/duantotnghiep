<?php

namespace App\Console\Commands;

use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Console\Command;

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
        $querys = Booking::whereDate('checkout_date', '<=', Carbon::now())
            ->where('status', '=', '1')
            ->get();
        foreach ($querys as $query) {
            $query->update(['status' => '0']);
        }
    }
}
