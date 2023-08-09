<?php

namespace App\Enums;

final class StatusEnum
{
    public const ACTIVE = 1;
    public const DEACTIVE = 0;

    public static function arrEnums()
    {
        return [
            'Active'    => self::ACTIVE,
            'Deactive'  => self::DEACTIVE,
        ];
    }
}
