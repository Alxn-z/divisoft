import { BadRequestException } from '@nestjs/common';

export function exigeConsentimiento(consentimiento: boolean) {
  if (consentimiento !== true) {
    throw new BadRequestException({
      message: 'La consulta requiere autorización para guardar los datos.',
      code: 'CONSENT_REQUIRED',
    });
  }
}
