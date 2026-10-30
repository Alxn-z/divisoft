import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : 500;

    if (!(exception instanceof HttpException)) {
      this.logger.error(exception?.stack || exception?.message || exception);
    }
    let message = 'Error interno del servidor';
    let code: string | undefined;
    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      if (typeof res === 'string') {
        message = res;
      } else if (res && typeof res === 'object') {
        const raw = (res as { message?: string | string[]; code?: string }).message;
        message = Array.isArray(raw) ? raw.join(', ') : raw || exception.message;
        code = (res as { code?: string }).code;
      }
    }

    response.status(status).json({
      ok: false,
      data: null,
      msg: message,
      ...(code ? { code } : {}),
    });
  }
}