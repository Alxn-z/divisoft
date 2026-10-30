import { SetMetadata } from '@nestjs/common';

export const META_ROL = 'rol';

export const RolProtected = (...args: string[]) => {
    return SetMetadata(META_ROL, args);
}
