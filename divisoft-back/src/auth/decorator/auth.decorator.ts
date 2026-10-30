import { UseGuards, applyDecorators } from '@nestjs/common';
import { RolProtected } from './rol-protected.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role.guard';

// Ahora acepta strings para los nombres de roles
export function Auth(...rols: string[]){
    return applyDecorators(
        RolProtected(...rols),
        UseGuards(AuthGuard(), UserRoleGuard)        
    )
}