<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ResetPasswordNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(protected $token)
    {
        $this->token = $token;
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
        $url = env('APP_URL').'/resetPasssword?email=' . urlencode($notifiable->email) . '&token=' . $this->token;
        return (new MailMessage)
            ->subject(__('Reset Password Notification') . ' - ' . config('app.name') . '.')
            ->greeting(__('Xin chào') . '!')
            ->line(__('Bạn đang nhận được email này vì chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.
            ') . '')
            ->action(__('Đổi lại mật khẩu') . '', $url)
            ->line(__('Liên kết đặt lại mật khẩu này sẽ hết hạn trong 60 phút.'))
            ->line(__('Nếu bạn không yêu cầu đặt lại mật khẩu, không cần hành động nào nữa.'));
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
