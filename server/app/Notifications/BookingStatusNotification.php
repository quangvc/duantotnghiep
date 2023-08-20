<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BookingStatusNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(protected $booking_number)
    {
        $this->booking_number = $booking_number;
    }
    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $url = env('APP_URL').'/feedback' . '?booking_number=' . $this->booking_number;
        return (new MailMessage)
            ->subject('Send Email Payment')
            ->greeting('Đơn của bạn đã checkOut' . '!')
            ->line('Đây là mã đơn của bạn:' . ' ' . $this->booking_number)
            ->action('Mời bạn cho đánh giá' . '', $url)
            ->line('Mong nhận được đánh giá của bạn để chúng tôi có thể cải thiện hơn cho dịch vụ của mình .');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
