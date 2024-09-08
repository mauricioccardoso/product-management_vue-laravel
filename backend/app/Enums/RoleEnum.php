<?php

namespace App\Enums;

enum RoleEnum: string {
    case USER = 'USER';
    case MANAGER = 'MANAGER';
    case ADMIN = 'ADMIN';
}
