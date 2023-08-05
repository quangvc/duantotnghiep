<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Booking;
use App\Models\BookingDetail;
use Carbon\Carbon;

class DeleteExpiredRecords extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'records:delete-expired';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete expired records created 15 minutes ago';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // Đoạn đếm thời gian
        $expirationTime = Carbon::now()->subMinutes(1);
        $bookings = Booking::where([
            ['created_at', '<=', $expirationTime],
            ['status', 0]
        ])->get();
        foreach ($bookings as $booking) {
            BookingDetail::where([
                ['booking_id', $booking->id]
            ])->delete();
        }
        Booking::whereIn('id', $bookings->pluck('id'))->delete();
            $this->info('Expired records deleted successfully.');
        // return Command::SUCCESS;
    }
}
