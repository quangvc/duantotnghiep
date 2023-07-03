<?php

namespace App\Enums;

final class CouponTypeEnum
{
    public const PERCENT = 'percent';
    public const VALUE = 'value';

    public static function arrEnums()
    {
        return [
            'Percent'    => self::PERCENT,
            'Value'  => self::VALUE,
        ];
    }
}
