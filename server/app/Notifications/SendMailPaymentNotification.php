<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SendMailPaymentNotification extends Notification
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
        $url = 'https://nine09booking.site/' . '&booking_number=' . $this->booking_number;
        return (new MailMessage)
            ->subject('Send Email Payment')
            ->greeting('Đơn đã thanh toán' . '!')
            ->line('Đây là mã đơn của bạn:' . ' ' . $this->booking_number)
            ->action('Kiểm tra đơn hàng' . '', $url)
            ->line('Bạn có thể dùng mã đơn này để tìm kiếm tại trang Web .');
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
