<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Log;

class Logger
{
    public static function log($exception, string $message = null)
    {
        $context = [
            'message' => $message ?? $exception->getMessage(),
            'file' => $exception->getFile(),
            'line' => $exception->getLine(),
        ];

        Log::error($exception->getMessage(), $context);
    }
}
