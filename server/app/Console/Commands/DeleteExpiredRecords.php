<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Booking;
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
        $expirationTime = Carbon::now()->subMinutes(5);
        Booking::where([
            ['created_at', '<=', $expirationTime],
            ['status', 0]
        ])->delete();
        $this->info('Expired records deleted successfully.');
        // return Command::SUCCESS;
    }
}
