import { UnauthorizedException } from '@nestjs/common';

export function error401() {
    throw new UnauthorizedException('ERROR: No puede acceder al recurso solicitado.');
}
