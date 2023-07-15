<?php

namespace App\Enums;

final class BookingStatusEnum
{
    public const PENDING = 0;   // đang đặt, chưa thanh toán
    public const RESERVED = 1;  // đã thanh toán
    public const CONFIRMED = 2; // admin xác nhận
    public const COMPLETED = 3; // đã checkout
    public const CANCELLED = 4; // hủy

    public static function arrEnums()
    {
        return [
            'Pending'    => self::PENDING,
            'Reserved'  => self::RESERVED,
            'Confirmed'  => self::CONFIRMED,
            'Completed'  => self::COMPLETED,
            'Cancelled'  => self::CANCELLED,
        ];
    }
}
