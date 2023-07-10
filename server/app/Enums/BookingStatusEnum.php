<?php

namespace App\Enums;

final class BookingStatusEnum
{
    public const PENDING = 0;
    public const RESERVED = 1;
    public const CONFIRMED = 2;
    public const COMPLETED = 3;
    public const CANCELLED = 4;

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
